/**
 * Confirmed facts about the kindergarten. Everything on the site is built from this file
 * and the dictionaries in `shared/i18n` — nothing else should be invented.
 */

export const kindergarten = {
  brand: "ІНЖУ-НАЗ",
  legalName: "ТОО Детский ясли-сад «ІНЖУ-НАЗ»",
  ages: "1–6",
  groupsCount: 5,
  meals: 4,
  hours: { opens: "08:00", closes: "18:00" },
  phones: [
    { person: "Р.Т. Сарсенбиева", display: "+7 775 164 18 75", tel: "+77751641875" },
    { person: "Р.С. Макенова", display: "+7 747 925 17 82", tel: "+77479251782" },
  ],
  instagram: {
    handle: "@inzhu_naz_balabaksha",
    url: "https://www.instagram.com/inzhu_naz_balabaksha/",
  },
  /**
   * «Құжаттар / Документы»: the documents live in a public Cloud Mail.ru folder, the site only
   * links to it. While the link is empty, the button shows "the link will appear soon" instead of a dead link.
   */
  documents: {
    url: "https://cloud.mail.ru/public/EpLt/XSbaCop7P",
  },
  /**
   * 2GIS has no organisation card for the kindergarten yet, but it does know the building
   * «Улица Аль-Фараби, 35, с. Мухаметжан Туймебаев» (geo id below). The point is 2GIS's own
   * position of that building — not hand-picked coordinates.
   */
  twoGis: {
    geoId: "9430047404769404",
    lat: 43.415744,
    lng: 76.918887,
  },
} as const;

const { twoGis } = kindergarten;

export const links = {
  twoGisCard: `https://2gis.kz/almaty/geo/${twoGis.geoId}/${twoGis.lng},${twoGis.lat}`,
  /** Keyless 2GIS static map with a marker on the building. */
  twoGisStatic: (w: number, h: number, zoom = 16) =>
    `https://static.maps.2gis.com/1.0?zoom=${zoom}&size=${w},${h}&markers=${twoGis.lng},${twoGis.lat}`,
} as const;

export type GroupMotif = "beads" | "bead-string" | "dove" | "butterfly" | "camel";

/** Group names are proper names — identical in both languages. */
export const groups = [
  { id: "monshak", name: "Моншақ", ages: [1, 2], motif: "beads", tone: "pink" },
  { id: "businka", name: "Бусинка", ages: [2, 3], motif: "bead-string", tone: "lilac" },
  { id: "kogershin", name: "Көгершін", ages: [3, 4], motif: "dove", tone: "sky" },
  { id: "kobelek", name: "Көбелек", ages: [4, 5], motif: "butterfly", tone: "peach" },
  { id: "botakan", name: "Ботақан", ages: [5, 6], motif: "camel", tone: "sand" },
] as const satisfies readonly { id: string; name: string; ages: readonly [number, number]; motif: GroupMotif; tone: string }[];

export type Group = (typeof groups)[number];
export type GroupId = Group["id"];
export type Tone = Group["tone"];

/** Section ids, shared by both layouts so anchors survive switching between them. */
export const sectionIds = {
  home: "home",
  about: "about",
  groups: "groups",
  features: "features",
  gallery: "gallery",
  schedule: "schedule",
  documents: "documents",
  contacts: "contacts",
} as const;

export type SectionId = keyof typeof sectionIds;

/** Header navigation (order matters). */
export const navSections = ["home", "about", "groups", "gallery", "documents", "contacts"] as const satisfies readonly SectionId[];
