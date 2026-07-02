import { getWebinarPageData } from "@/features/webinar/queries/get-page-data";
import { AnnouncementBar } from "@/features/webinar/components/announcement-bar";
import { Hero } from "@/features/webinar/components/hero";
import { ScreenshotGrid } from "@/features/webinar/components/screenshot-grid";
import { FeatureGrid } from "@/features/webinar/components/feature-grid";
import { AudienceGrid } from "@/features/webinar/components/audience-grid";
import { TestimonialGrid } from "@/features/webinar/components/testimonial-grid";
import { BonusStack } from "@/features/webinar/components/bonus-stack";
import { MentorBio } from "@/features/webinar/components/mentor-bio";
import { FaqSection } from "@/features/webinar/components/faq-section";
import { ClosingCta } from "@/features/webinar/components/closing-cta";
import { SiteFooter } from "@/features/webinar/components/site-footer";

// Always fetch fresh data — admin edits should show up immediately.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getWebinarPageData();

  if (!data) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-2xl font-semibold text-cream">
          No live webinar right now
        </h1>
        <p className="mt-2 max-w-md font-body text-cream-dim">
          There&apos;s no active webinar to display. Set one as active from the
          admin panel to publish this page.
        </p>
      </main>
    );
  }

  const { webinar, screenshots, testimonials, bonuses, features, audience, faqs, settings } =
    data;

  return (
    <main className="min-h-screen">
      <AnnouncementBar
        text={webinar.announcementBarText}
        countdownTargetAt={webinar.countdownTargetAt}
        registrationUrl={webinar.registrationUrl}
        offerPricePaise={webinar.offerPricePaise}
      />

      <Hero
        heroHeadline={webinar.heroHeadline}
        heroSubheadline={webinar.heroSubheadline}
        heroVideoThumbnailUrl={webinar.heroVideoThumbnailUrl}
        eventDate={webinar.eventDate}
        eventTime={webinar.eventTime}
        language={webinar.language}
        mode={webinar.mode}
        ratingValue={webinar.ratingValue}
        studentsTrainedLabel={webinar.studentsTrainedLabel}
        seatsRegisteredLabel={webinar.seatsRegisteredLabel}
        registrationUrl={webinar.registrationUrl}
        offerPricePaise={webinar.offerPricePaise}
        seatsLeftText={webinar.seatsLeftText}
      />

      <ScreenshotGrid screenshots={screenshots} />

      <FeatureGrid features={features} />

      <AudienceGrid segments={audience} />

      <TestimonialGrid testimonials={testimonials} />

      <BonusStack
        bonuses={bonuses}
        offerPricePaise={webinar.offerPricePaise}
        registrationUrl={webinar.registrationUrl}
      />

      <ScreenshotGrid screenshots={screenshots} />

      <MentorBio
        mentorName={webinar.mentorName}
        mentorTagline={webinar.mentorTagline}
        mentorBio={webinar.mentorBio}
        mentorPhotoUrl={webinar.mentorPhotoUrl}
        mentorBadges={webinar.mentorBadges}
      />

      <FaqSection faqs={faqs} />

      <ClosingCta
        registrationUrl={webinar.registrationUrl}
        offerPricePaise={webinar.offerPricePaise}
        seatsLeftText={webinar.seatsLeftText}
      />

      <SiteFooter
        supportEmail={settings?.supportEmail}
        supportPhone={settings?.supportPhone}
        footerText={settings?.footerText}
      />
    </main>
  );
}
