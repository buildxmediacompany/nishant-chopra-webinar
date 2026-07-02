import { z } from "zod";

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
  order: numericString("Order"),
});

export type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;
