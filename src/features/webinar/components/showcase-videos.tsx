import { Section } from "./section";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { VideoEmbed } from "./video-embed";
import { Tilt } from "@/components/ui/tilt";

export function ShowcaseVideos({
  videos,
}: {
  videos: {
    id: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string | null;
  }[];
}) {
  if (videos.length === 0) return null;

  const [lead, ...rest] = videos;

  return (
    <Section tone="raised" pad="lg">
      <SectionHeading
        eyebrow="Hear him sing"
        title="Watch Nishant {gold}Perform{/gold}"
        subtitle="A teacher worth learning from should be worth listening to. Judge for yourself."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Lead clip plays big; the rest sit beside it. */}
        <Reveal className="lg:col-span-2">
          <Tilt rotationFactor={4}>
            <VideoEmbed
              url={lead.videoUrl}
              title={lead.title}
              thumbnailUrl={lead.thumbnailUrl}
              className="shadow-featured ring-1 ring-marigold/20"
            />
          </Tilt>
          <p className="mt-3 font-body text-sm font-medium text-cream">{lead.title}</p>
        </Reveal>

        {rest.length > 0 && (
          <div className="flex flex-col gap-5">
            {rest.slice(0, 2).map((v, i) => (
              <Reveal key={v.id} delay={(i + 1) * 80}>
                <VideoEmbed
                  url={v.videoUrl}
                  title={v.title}
                  thumbnailUrl={v.thumbnailUrl}
                  className="shadow-soft"
                />
                <p className="mt-2 font-body text-sm text-cream-dim">{v.title}</p>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Any further clips flow into a plain grid below. */}
      {rest.length > 2 && (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(2).map((v, i) => (
            <Reveal key={v.id} delay={(i % 3) * 80}>
              <VideoEmbed
                url={v.videoUrl}
                title={v.title}
                thumbnailUrl={v.thumbnailUrl}
                className="shadow-soft"
              />
              <p className="mt-2 font-body text-sm text-cream-dim">{v.title}</p>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
