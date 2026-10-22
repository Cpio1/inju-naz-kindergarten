import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Photos and videos are picked up from /public at build time:
 *  - main-page.*   — Hero photo (image or video)
 *  - main-page2.*  — second photo or video, shown in «Біздің балабақша»
 *  - everything else in public/images — gallery, sorted by file name
 * Named files may sit in /public or in /public/images.
 * A video may have a poster next to it: `<name>-poster.jpg`.
 * Drop files in and redeploy — no code changes needed.
 */

export type ImageMedia = { kind: "image"; src: string; width: number; height: number };
export type VideoMedia = { kind: "video"; src: string; type: string; poster: ImageMedia | null };
export type Media = ImageMedia | VideoMedia;

export type SiteMedia = {
  hero: Media | null;
  /** main-page2 — photo or video */
  about: Media | null;
  gallery: Media[];
};

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;
const VIDEO_TYPES: Record<string, string> = { ".mp4": "video/mp4", ".webm": "video/webm", ".mov": "video/mp4", ".m4v": "video/mp4" };
const SKIP = /^(logo|favicon|icon|og|opengraph)/i;

/** Pixel size read from the file header (JPEG / PNG / WebP / GIF / AVIF). */
function readSize(buf: Buffer): { width: number; height: number } | null {
  if (buf.length < 32) return null;
  if (buf.readUInt32BE(0) === 0x89504e47) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  if (buf.toString("ascii", 0, 3) === "GIF") return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
    return null;
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) return readJpegSize(buf);
  const ispe = buf.indexOf("ispe");
  if (buf.toString("ascii", 4, 8) === "ftyp" && ispe > 0) {
    return { width: buf.readUInt32BE(ispe + 8), height: buf.readUInt32BE(ispe + 12) };
  }
  return null;
}

function readJpegSize(buf: Buffer) {
  let size: { width: number; height: number } | null = null;
  let orientation = 1;
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = buf[i + 1];
    const length = buf.readUInt16BE(i + 2);
    if (marker === 0xe1 && buf.toString("ascii", i + 4, i + 8) === "Exif") orientation = readExifOrientation(buf, i + 10);
    const isSOF = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isSOF) {
      size = { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      break;
    }
    i += 2 + length;
  }
  // Phone photos are often stored sideways with an EXIF rotation flag (5–8 = rotated 90°).
  if (size && orientation >= 5) return { width: size.height, height: size.width };
  return size;
}

function readExifOrientation(buf: Buffer, tiff: number) {
  try {
    const le = buf.toString("ascii", tiff, tiff + 2) === "II";
    const u16 = (o: number) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
    const u32 = (o: number) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
    const ifd = tiff + u32(tiff + 4);
    const count = u16(ifd);
    for (let n = 0; n < count; n++) {
      const entry = ifd + 2 + n * 12;
      if (u16(entry) === 0x0112) return u16(entry + 8);
    }
  } catch {
    /* malformed EXIF — keep the stored orientation */
  }
  return 1;
}

function list(dir: string) {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isFile() && !d.name.startsWith("."))
      .map((d) => d.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

const stem = (file: string) => path.parse(file).name.toLowerCase();
const url = (prefix: string, file: string) => `${prefix}/${encodeURIComponent(file)}`;

function loadImage(dir: string, prefix: string, file: string): ImageMedia | null {
  const size = readSize(fs.readFileSync(path.join(dir, file)).subarray(0, 256 * 1024));
  return size && size.width > 0 && size.height > 0 ? { kind: "image", src: url(prefix, file), ...size } : null;
}

function loadFolder(dir: string, prefix: string) {
  const files = list(dir);
  const posters = new Set(files.filter((f) => stem(f).endsWith("-poster") && IMAGE_EXT.test(f)));
  const items: { name: string; media: Media }[] = [];
  for (const file of files) {
    if (posters.has(file)) continue;
    const ext = path.extname(file).toLowerCase();
    if (IMAGE_EXT.test(file)) {
      const media = loadImage(dir, prefix, file);
      if (media) items.push({ name: stem(file), media });
    } else if (VIDEO_TYPES[ext]) {
      const posterFile = [...posters].find((p) => stem(p) === `${stem(file)}-poster`);
      const poster = posterFile ? loadImage(dir, prefix, posterFile) : null;
      items.push({ name: stem(file), media: { kind: "video", src: url(prefix, file), type: VIDEO_TYPES[ext], poster } });
    }
  }
  return items;
}

export function getSiteMedia(): SiteMedia {
  const inImages = loadFolder(IMAGES_DIR, "/images");
  // Named files may also sit directly in /public.
  const named = [...inImages, ...loadFolder(PUBLIC_DIR, "")];
  const find = (name: string) => named.find((m) => m.name === name)?.media ?? null;

  const hero = find("main-page");
  const about = find("main-page2");
  const gallery = inImages
    .filter((m) => m.media !== hero && m.media !== about && !SKIP.test(m.name))
    .map((m) => m.media);

  return { hero, about, gallery };
}
