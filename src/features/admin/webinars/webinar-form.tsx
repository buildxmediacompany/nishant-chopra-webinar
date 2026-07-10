"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminForm } from "@/features/admin/components/form-shell";
import { FormSection } from "@/features/admin/components/form-section";
import { InputFormField, TextareaFormField } from "@/features/admin/components/form-fields";
import type { ActionResult } from "@/features/admin/action-result";
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
  onSubmit: (values: WebinarFormValues) => Promise<ActionResult>;
}) {
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

  return (
    <AdminForm
      form={form}
      action={onSubmit}
      backHref="/admin/webinars"
      submitLabel={webinar ? "Save changes" : "Create webinar"}
      successMessage={webinar ? "Webinar saved" : "Webinar created"}
    >
      <FormSection title="Basics" columns={2}>
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
      </FormSection>

      <FormSection title="Announcement bar & countdown" columns={2}>
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
      </FormSection>

      <FormSection title="Hero" columns={2}>
        <TextareaFormField
          control={form.control}
          name="heroHeadline"
          label="Headline"
          required
          description={
            'Use {gold}…{/gold} or {red}…{/red} to color part of the text, e.g. "In {gold}3 Simple Steps{/gold} Master…"'
          }
        />
        <TextareaFormField control={form.control} name="heroSubheadline" label="Subheadline" />
        <InputFormField
          control={form.control}
          name="heroVideoUrl"
          label="Video URL"
          placeholder="https://youtu.be/… or https://vimeo.com/…"
          description="Optional — a YouTube or Vimeo link to the intro video"
        />
        <InputFormField
          control={form.control}
          name="heroVideoThumbnailUrl"
          label="Video thumbnail URL"
          description="Defaults to the YouTube poster frame. Required for Vimeo, which has none."
        />
      </FormSection>

      <FormSection title="Schedule" columns={4}>
        <InputFormField
          control={form.control}
          name="eventDate"
          label="Event date"
          type="date"
          required
        />
        <InputFormField control={form.control} name="eventTime" label="Event time" required />
        <InputFormField control={form.control} name="language" label="Language" required />
        <InputFormField control={form.control} name="mode" label="Mode" required />
      </FormSection>

      <FormSection title="Social proof" columns={3}>
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
      </FormSection>

      <FormSection title="Pricing & scarcity" columns={4}>
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
      </FormSection>

      <FormSection title="Mentor" columns={2}>
        <InputFormField control={form.control} name="mentorName" label="Mentor name" required />
        <InputFormField
          control={form.control}
          name="mentorTagline"
          label="Mentor tagline"
          required
        />
        <TextareaFormField control={form.control} name="mentorBio" label="Mentor bio" />
        <InputFormField control={form.control} name="mentorPhotoUrl" label="Mentor photo URL" />
        <InputFormField
          control={form.control}
          name="mentorBadges"
          label="Mentor badges"
          description="Comma-separated, e.g. 1000+ Students, 4.9/5 Rating, Award Winner"
        />
      </FormSection>
    </AdminForm>
  );
}
