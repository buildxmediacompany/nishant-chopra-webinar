import { z } from "zod";

const numericString = (label: string) =>
  z
    .string()
    .min(1, "Required")
    .refine((v) => !Number.isNaN(Number(v)), `${label} must be a number`);

export const faqFormSchema = z.object({
  question: z.string().min(1, "Required"),
  answer: z.string().min(1, "Required"),
  order: numericString("Order"),
});

export type FaqFormValues = z.infer<typeof faqFormSchema>;
