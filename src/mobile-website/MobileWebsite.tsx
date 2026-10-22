import type { SiteMedia } from "@/shared/lib/media";
import { MobileAbout } from "./sections/MobileAbout";
import { MobileContacts } from "./sections/MobileContacts";
import { MobileDocuments } from "./sections/MobileDocuments";
import { MobileFeatures } from "./sections/MobileFeatures";
import { MobileFooter } from "./sections/MobileFooter";
import { MobileGallery } from "./sections/MobileGallery";
import { MobileGroups } from "./sections/MobileGroups";
import { MobileHeader } from "./sections/MobileHeader";
import { MobileHero } from "./sections/MobileHero";
import { MobileSchedule } from "./sections/MobileSchedule";

/** Phone composition (< 1024px), designed for 360–430px wide screens; tablets get a centred column. */
export function MobileWebsite({ media }: { media: SiteMedia }) {
  return (
    <>
      <MobileHeader />
      <main id="main">
        <MobileHero media={media.hero} />
        <MobileAbout media={media.about} />
        <MobileGroups />
        <MobileFeatures />
        <MobileGallery items={media.gallery} />
        <MobileSchedule />
        <MobileDocuments />
        <MobileContacts />
      </main>
      <MobileFooter />
    </>
  );
}
