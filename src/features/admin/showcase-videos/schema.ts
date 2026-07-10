import { z } from "zod";
import { parseVideoUrl, SUPPORTED_VIDEO_HOSTS } from "@/lib/video-url";

const numericString = (label: string) =>
  z
    .string()
    .min(1, "Required")
    .refine((v) => !Number.isNaN(Number(v)), `${label} must be a number`);

export const showcaseVideoFormSchema = z.object({
  title: z.string().min(1, "Required"),
  videoUrl: z
    .string()
    .min(1, "Required")
    .url("Must be a valid URL")
    .refine(
      (v) => parseVideoUrl(v) !== null,
      `That link can't be embedded. Paste a ${SUPPORTED_VIDEO_HOSTS} URL.`
    ),
  thumbnailUrl: z.string().optional(),
  order: numericString("Order"),
});

export type ShowcaseVideoFormValues = z.infer<typeof showcaseVideoFormSchema>;
