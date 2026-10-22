import type { SiteMedia } from "@/shared/lib/media";
import { About } from "./sections/About";
import { Contacts } from "./sections/Contacts";
import { Features } from "./sections/Features";
import { Footer } from "./sections/Footer";
import { Gallery } from "./sections/Gallery";
import { Groups } from "./sections/Groups";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Schedule } from "./sections/Schedule";

/** Desktop & laptop composition (≥ 1024px). Tuned first of all for 1366×768. */
export function Website({ media }: { media: SiteMedia }) {
  return (
    <>
      <Header />
      <main id="main">
        <Hero media={media.hero} />
        <About media={media.about} />
        <Groups />
        <Features />
        <Gallery items={media.gallery} />
        <Schedule />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
