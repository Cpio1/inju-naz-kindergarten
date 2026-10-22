import type { Metadata, Viewport } from "next";
import { Lora, Onest } from "next/font/google";
import { kindergarten } from "@/shared/data/kindergarten";
import { seo } from "@/shared/data/seo";
import { LanguageProvider } from "@/shared/i18n/LanguageProvider";
import { SITE_URL } from "@/shared/lib/site-url";
import { MotionProvider } from "@/shared/ui/MotionProvider";
import "@/styles/globals.css";

// Both families really ship Ә Ғ Қ Ң Ө Ұ Ү Һ І in their cyrillic-ext files (checked glyph by glyph).
const lora = Lora({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});
const onest = Onest({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: seo.title,
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: "ІНЖУ-НАЗ",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "kk_KZ",
    alternateLocale: ["ru_RU"],
    url: "/",
    siteName: "«ІНЖУ-НАЗ» балабақшасы",
    title: seo.title,
    description: seo.description,
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#F8F7F2",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Preschool",
  name: "«ІНЖУ-НАЗ» балабақшасы",
  alternateName: "Детский ясли-сад «ІНЖУ-НАЗ»",
  legalName: kindergarten.legalName,
  url: SITE_URL,
  telephone: kindergarten.phones.map((p) => p.tel),
  sameAs: [kindergarten.instagram.url],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Әл-Фараби көшесі, 35, «Ақжол» ПКСТ",
    addressLocality: "Мұхаметжан Түймебаев ауылы",
    addressRegion: "Алматы облысы, Іле ауданы",
    addressCountry: "KZ",
  },
  geo: { "@type": "GeoCoordinates", latitude: kindergarten.twoGis.lat, longitude: kindergarten.twoGis.lng },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    opens: kindergarten.hours.opens,
    closes: kindergarten.hours.closes,
  },
  availableLanguage: ["kk", "ru"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kk" className={`${lora.variable} ${onest.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LanguageProvider>
          <MotionProvider>{children}</MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
