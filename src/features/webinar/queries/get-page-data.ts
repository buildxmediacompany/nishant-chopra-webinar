import "server-only";
import { and, asc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  webinars,
  testimonialScreenshots,
  testimonials,
  bonuses,
  featureHighlights,
  audienceSegments,
  faqs,
  siteSettings,
} from "@/db/schema";

/**
 * All read access for the public landing page lives here. Runs the
 * content-pool queries in parallel and returns `null` if there's no
 * active webinar (page.tsx renders an empty-state in that case).
 */
export async function getWebinarPageData() {
  const [activeWebinar] = await db
    .select()
    .from(webinars)
    .where(eq(webinars.isActive, true))
    .limit(1);

  if (!activeWebinar) return null;

  const [
    screenshots,
    quoteTestimonials,
    bonusList,
    features,
    audience,
    faqList,
    [settings],
  ] = await Promise.all([
    db
      .select()
      .from(testimonialScreenshots)
      .where(eq(testimonialScreenshots.isActive, true))
      .orderBy(asc(testimonialScreenshots.order)),
    db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isActive, true))
      .orderBy(asc(testimonials.order)),
    db.select().from(bonuses).where(eq(bonuses.isActive, true)).orderBy(asc(bonuses.order)),
    db
      .select()
      .from(featureHighlights)
      .where(eq(featureHighlights.isActive, true))
      .orderBy(asc(featureHighlights.order)),
    db
      .select()
      .from(audienceSegments)
      .where(eq(audienceSegments.isActive, true))
      .orderBy(asc(audienceSegments.order)),
    db.select().from(faqs).where(eq(faqs.isActive, true)).orderBy(asc(faqs.order)),
    db.select().from(siteSettings).where(eq(siteSettings.id, 1)),
  ]);

  return {
    webinar: activeWebinar,
    screenshots,
    testimonials: quoteTestimonials,
    bonuses: bonusList,
    features,
    audience,
    faqs: faqList,
    settings: settings ?? null,
  };
}

// Kept for symmetry / future use (e.g. a "past webinars" admin view).
export async function getWebinarBySlug(slug: string) {
  const [webinar] = await db
    .select()
    .from(webinars)
    .where(and(eq(webinars.slug, slug)))
    .limit(1);
  return webinar ?? null;
}
