import { z } from "zod";
import { isEmbeddableOrEmpty, SUPPORTED_VIDEO_HOSTS } from "@/lib/video-url";

const numericString = (label: string) =>
  z
    .string()
    .min(1, "Required")
    .refine((v) => !Number.isNaN(Number(v)), `${label} must be a number`);

const optionalNumericString = (label: string) =>
  z
    .string()
    .optional()
    .refine((v) => !v || !Number.isNaN(Number(v)), `${label} must be a number`);

/**
 * Every field here is a plain string — including the "numeric" ones — so
 * this schema's input type and output type are identical. That's what
 * keeps react-hook-form's zodResolver generics happy (mixing z.coerce with
 * react-hook-form + zod v4 causes an input/output type mismatch). Numbers
 * are parsed once, server-side, in features/admin/webinars/queries.ts.
 */
export const webinarFormSchema = z.object({
  slug: z
    .string()
    .min(1, "Required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  announcementBarText: z.string().min(1, "Required"),
  countdownTargetAt: z.string().optional(), // datetime-local string, optional
  heroHeadline: z.string().min(1, "Required"),
  heroSubheadline: z.string().optional(),
  heroVideoUrl: z
    .string()
    .optional()
    .refine(
      isEmbeddableOrEmpty,
      `That link can't be embedded. Paste a ${SUPPORTED_VIDEO_HOSTS} URL.`
    ),
  heroVideoThumbnailUrl: z.string().optional(),
  eventDate: z.string().min(1, "Required"),
  eventTime: z.string().min(1, "Required"),
  language: z.string().min(1, "Required"),
  mode: z.string().min(1, "Required"),
  ratingValue: z.string().min(1, "Required"),
  studentsTrainedLabel: z.string().min(1, "Required"),
  seatsRegisteredLabel: z.string().optional(),
  originalPricePaise: numericString("Original price"),
  offerPricePaise: numericString("Offer price"),
  seatsLeftCount: optionalNumericString("Seats left count"),
  seatsLeftText: z.string().optional(),
  registrationUrl: z.string().url("Enter a valid URL"),
  mentorName: z.string().min(1, "Required"),
  mentorTagline: z.string().min(1, "Required"),
  mentorBio: z.string().optional(),
  mentorPhotoUrl: z.string().optional(),
  mentorBadges: z.string().optional(),
});

export type WebinarFormValues = z.infer<typeof webinarFormSchema>;
