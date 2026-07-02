import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { listWebinars } from "@/features/admin/webinars/queries";
import { db } from "@/db";
import { testimonials, bonuses, faqs, featureHighlights, audienceSegments } from "@/db/schema";

export default async function AdminDashboardPage() {
  const [webinarList, testimonialCount, bonusCount, faqCount, featureCount, audienceCount] =
    await Promise.all([
      listWebinars(),
      db.$count(testimonials),
      db.$count(bonuses),
      db.$count(faqs),
      db.$count(featureHighlights),
      db.$count(audienceSegments),
    ]);

  const liveWebinar = webinarList.find((w) => w.isActive);

  const stats = [
    { label: "Webinars", value: webinarList.length, href: "/admin/webinars" },
    { label: "Testimonials", value: testimonialCount, href: "/admin/testimonials" },
    { label: "Bonuses", value: bonusCount, href: "/admin/bonuses" },
    { label: "FAQs", value: faqCount, href: "/admin/faqs" },
    { label: "Feature highlights", value: featureCount, href: "/admin/features" },
    { label: "Audience segments", value: audienceCount, href: "/admin/audience" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-cream">Dashboard</h1>

      <div className="mt-4 rounded-xl border border-stage-line bg-stage-raised p-5">
        {liveWebinar ? (
          <p className="text-sm text-cream-dim">
            Currently live:{" "}
            <span className="font-semibold text-marigold">{liveWebinar.slug}</span> on{" "}
            {liveWebinar.eventDate}
            {" · "}
            <Link href="/" target="_blank" className="inline-flex items-center gap-1 text-marigold underline-offset-4 hover:underline">
              View public page <ExternalLink className="size-3.5" />
            </Link>
          </p>
        ) : (
          <p className="text-sm text-sindoor">
            No webinar is currently live — the public page will show an empty state until you
            mark one active.
          </p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-xl border border-stage-line bg-stage-raised p-4 transition-colors hover:border-marigold/40"
          >
            <p className="font-display text-2xl font-semibold text-cream">{s.value}</p>
            <p className="mt-1 text-xs text-cream-dim">{s.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
