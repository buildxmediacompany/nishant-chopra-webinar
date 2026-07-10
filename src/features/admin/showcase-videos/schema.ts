import { z } from "zod";

const numericString = (label: string) =>
  z
    .string()
    .min(1, "Required")
    .refine((v) => !Number.isNaN(Number(v)), `${label} must be a number`);

export const showcaseVideoFormSchema = z.object({
  title: z.string().min(1, "Required"),
  videoUrl: z.string().min(1, "Required").url("Must be a valid URL"),
  thumbnailUrl: z.string().optional(),
  order: numericString("Order"),
});

export type ShowcaseVideoFormValues = z.infer<typeof showcaseVideoFormSchema>;
