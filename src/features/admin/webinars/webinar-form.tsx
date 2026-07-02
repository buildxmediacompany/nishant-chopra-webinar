"use client";

import { useState } from "react";
import { unstable_rethrow } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputFormField, TextareaFormField } from "@/features/admin/components/form-fields";
import { webinarFormSchema, type WebinarFormValues } from "./schema";
import type { webinars } from "@/db/schema";

type Webinar = typeof webinars.$inferSelect;

function toDatetimeLocal(date: Date | string | null | undefined) {
  if (!date) return "";
  const d = new Date(date);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

export function WebinarForm({
  webinar,
  onSubmit,
}: {
  webinar?: Webinar | null;
  onSubmit: (values: WebinarFormValues) => Promise<void>;
}) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<WebinarFormValues>({
    resolver: zodResolver(webinarFormSchema),
    defaultValues: {
      slug: webinar?.slug ?? "",
      announcementBarText: webinar?.announcementBarText ?? "",
      countdownTargetAt: toDatetimeLocal(webinar?.countdownTargetAt),
      heroHeadline: webinar?.heroHeadline ?? "",
      heroSubheadline: webinar?.heroSubheadline ?? "",
      heroVideoUrl: webinar?.heroVideoUrl ?? "",
      heroVideoThumbnailUrl: webinar?.heroVideoThumbnailUrl ?? "",
      eventDate: webinar?.eventDate ?? "",
      eventTime: webinar?.eventTime ?? "",
      language: webinar?.language ?? "Hindi and English",
      mode: webinar?.mode ?? "Zoom",
      ratingValue: webinar?.ratingValue ?? "4.9",
      studentsTrainedLabel: webinar?.studentsTrainedLabel ?? "",
      seatsRegisteredLabel: webinar?.seatsRegisteredLabel ?? "",
      originalPricePaise: String(webinar?.originalPricePaise ?? 0),
      offerPricePaise: String(webinar?.offerPricePaise ?? 0),
      seatsLeftCount:
        webinar?.seatsLeftCount !== null && webinar?.seatsLeftCount !== undefined
          ? String(webinar.seatsLeftCount)
          : "",
      seatsLeftText: webinar?.seatsLeftText ?? "",
      registrationUrl: webinar?.registrationUrl ?? "",
      mentorName: webinar?.mentorName ?? "",
      mentorTagline: webinar?.mentorTagline ?? "",
      mentorBio: webinar?.mentorBio ?? "",
      mentorPhotoUrl: webinar?.mentorPhotoUrl ?? "",
      mentorBadges: webinar?.mentorBadges ?? "",
    },
  });

  async function handleSubmit(values: WebinarFormValues) {
    setSubmitError(null);
    try {
      await onSubmit(values);
    } catch (err) {
      unstable_rethrow(err); // let redirect()/notFound() pass through untouched
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-8">
        {submitError && (
          <p className="rounded-lg border border-sindoor/40 bg-sindoor-dim px-4 py-3 text-sm text-sindoor">
            {submitError}
          </p>
        )}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <h2 className="col-span-full font-display text-lg font-semibold text-cream">
            Basics
          </h2>
          <InputFormField
            control={form.control}
            name="slug"
            label="Slug"
            required
            description="Lowercase, hyphenated identifier (e.g. sing-like-a-pro)"
          />
          <InputFormField
            control={form.control}
            name="registrationUrl"
            label="Registration URL"
            type="url"
            required
            description="Where 'Register Now' buttons send people"
          />
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <h2 className="col-span-full font-display text-lg font-semibold text-cream">
            Announcement bar & countdown
          </h2>
          <InputFormField
            control={form.control}
            name="announcementBarText"
            label="Announcement bar text"
            required
          />
          <InputFormField
            control={form.control}
            name="countdownTargetAt"
            label="Countdown target"
            type="datetime-local"
            description="Leave blank to hide the countdown"
          />
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <h2 className="col-span-full font-display text-lg font-semibold text-cream">
            Hero
          </h2>
          <div className="col-span-full">
            <TextareaFormField
              control={form.control}
              name="heroHeadline"
              label="Headline"
              required
              description={
                'Use {gold}...{/gold} or {red}...{/red} to color part of the text, e.g. "In {gold}3 Simple Steps{/gold} Master..."'
              }
            />
          </div>
          <div className="col-span-full">
            <TextareaFormField control={form.control} name="heroSubheadline" label="Subheadline" />
          </div>
          <InputFormField
            control={form.control}
            name="heroVideoUrl"
            label="Video URL"
            description="Optional — link to the intro video"
          />
          <InputFormField
            control={form.control}
            name="heroVideoThumbnailUrl"
            label="Video thumbnail URL"
          />
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <h2 className="col-span-full font-display text-lg font-semibold text-cream">
            Schedule
          </h2>
          <InputFormField control={form.control} name="eventDate" label="Event date" type="date" required />
          <InputFormField control={form.control} name="eventTime" label="Event time" required />
          <InputFormField control={form.control} name="language" label="Language" required />
          <InputFormField control={form.control} name="mode" label="Mode" required />
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <h2 className="col-span-full font-display text-lg font-semibold text-cream">
            Social proof
          </h2>
          <InputFormField control={form.control} name="ratingValue" label="Rating value" required />
          <InputFormField
            control={form.control}
            name="studentsTrainedLabel"
            label="Students trained label"
            required
          />
          <InputFormField
            control={form.control}
            name="seatsRegisteredLabel"
            label="Seats registered label"
          />
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <h2 className="col-span-full font-display text-lg font-semibold text-cream">
            Pricing & scarcity
          </h2>
          <InputFormField
            control={form.control}
            name="originalPricePaise"
            label="Original price (paise)"
            type="number"
            required
            description="₹1 = 100 paise"
          />
          <InputFormField
            control={form.control}
            name="offerPricePaise"
            label="Offer price (paise)"
            type="number"
            required
          />
          <InputFormField
            control={form.control}
            name="seatsLeftCount"
            label="Seats left count"
            type="number"
          />
          <InputFormField control={form.control} name="seatsLeftText" label="Seats left text" />
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <h2 className="col-span-full font-display text-lg font-semibold text-cream">
            Mentor
          </h2>
          <InputFormField control={form.control} name="mentorName" label="Mentor name" required />
          <InputFormField
            control={form.control}
            name="mentorTagline"
            label="Mentor tagline"
            required
          />
          <div className="col-span-full">
            <TextareaFormField control={form.control} name="mentorBio" label="Mentor bio" />
          </div>
          <InputFormField
            control={form.control}
            name="mentorPhotoUrl"
            label="Mentor photo URL"
          />
          <InputFormField
            control={form.control}
            name="mentorBadges"
            label="Mentor badges"
            description="Comma-separated, e.g. 1000+ Students, 4.9/5 Rating, Award Winner"
          />
        </section>

        <div className="flex justify-end gap-3 border-t border-stage-line pt-6">
          <Button type="submit" variant="gold" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? "Saving…"
              : webinar
                ? "Save changes"
                : "Create webinar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
