import { z } from "zod";
import { isEmbeddableOrEmpty, SUPPORTED_VIDEO_HOSTS } from "@/lib/video-url";

const numericString = (label: string) =>
  z
    .string()
    .min(1, "Required")
    .refine((v) => !Number.isNaN(Number(v)), `${label} must be a number`);

export const testimonialFormSchema = z.object({
  name: z.string().min(1, "Required"),
  location: z.string().optional(),
  quote: z.string().min(1, "Required"),
  rating: numericString("Rating"),
  avatarUrl: z.string().optional(),
  /** Unlisted video link. When set, the card renders as a video testimonial. */
  videoUrl: z
    .string()
    .optional()
    .refine(
      isEmbeddableOrEmpty,
      `That link can't be embedded. Paste a ${SUPPORTED_VIDEO_HOSTS} URL.`
    ),
  order: numericString("Order"),
});

export type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;
