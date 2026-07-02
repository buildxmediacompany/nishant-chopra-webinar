import { z } from "zod";

const numericString = (label: string) =>
  z
    .string()
    .min(1, "Required")
    .refine((v) => !Number.isNaN(Number(v)), `${label} must be a number`);

export const screenshotFormSchema = z.object({
  imageUrl: z.string().min(1, "Required"),
  altText: z.string().min(1, "Required"),
  order: numericString("Order"),
});

export type ScreenshotFormValues = z.infer<typeof screenshotFormSchema>;
