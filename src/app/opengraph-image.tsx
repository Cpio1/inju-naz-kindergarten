import { ImageResponse } from "next/og";
import { loadGoogleFont, logoDataUri } from "@/shared/lib/og";

export const alt = "«ІНЖУ-НАЗ» балабақшасы — Алматы облысы, Іле ауданы";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const title = "ІНЖУ-НАЗ";
  const subtitle = "Балалардың бақытты балалық шағы басталатын мекен";
  const facts = ["1–6 жас", "5 топ", "08:00–18:00", "Қазақ тілінде"];
  const place = "Алматы облысы · Іле ауданы · Мұхаметжан Түймебаев ауылы";

  const [display, body] = await Promise.all([
    loadGoogleFont("Lora", 600, title + subtitle + "«»"),
    loadGoogleFont("Onest", 500, facts.join("") + place + "балабақшасы"),
  ]);
  const fonts = [
    ...(display ? [{ name: "Lora", data: display, weight: 600 as const }] : []),
    ...(body ? [{ name: "Onest", data: body, weight: 500 as const }] : []),
  ];

  const pearl = (s: number, x: number, y: number, tint: string) => (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: s,
        height: s,
        borderRadius: 999,
        background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${tint} 60%, #c9c0b1 100%)`,
        display: "flex",
      }}
    />
  );

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F8F7F2", position: "relative", fontFamily: "Onest", color: "#294E59" }}>
        <div style={{ position: "absolute", right: -140, top: -120, width: 620, height: 620, borderRadius: "46% 54% 42% 58%", background: "#DCD1F4", opacity: 0.6, display: "flex" }} />
        <div style={{ position: "absolute", right: 160, bottom: -160, width: 420, height: 420, borderRadius: "58% 42% 50% 50%", background: "#A7DCD7", opacity: 0.55, display: "flex" }} />
        <div style={{ position: "absolute", left: -80, bottom: -120, width: 300, height: 300, borderRadius: 999, background: "#F2D7E6", opacity: 0.7, display: "flex" }} />
        {pearl(46, 700, 90, "#F2D7E6")}
        {pearl(28, 760, 150, "#ffffff")}
        {pearl(36, 620, 520, "#DCD1F4")}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 26, color: "#5FA9A3" }}>{place}</div>
          <div style={{ display: "flex", fontFamily: "Lora", fontSize: 112, lineHeight: 1, marginTop: 26 }}>{title}</div>
          <div style={{ display: "flex", fontFamily: "Lora", fontSize: 40, lineHeight: 1.2, marginTop: 18, maxWidth: 640 }}>{subtitle}</div>
          <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
            {facts.map((f) => (
              <span key={f} style={{ display: "flex", background: "#FFFFFF", borderRadius: 999, padding: "12px 24px", fontSize: 26, border: "1px solid #E6E2D6" }}>
                {f}
              </span>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", right: 110, top: 150, display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoDataUri()} width={300} height={300} alt="" />
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
