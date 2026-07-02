import { z } from "zod";

const numericString = (label: string) =>
  z
    .string()
    .min(1, "Required")
    .refine((v) => !Number.isNaN(Number(v)), `${label} must be a number`);

export const featureFormSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  iconName: z.string().min(1, "Required"),
  order: numericString("Order"),
});

export type FeatureFormValues = z.infer<typeof featureFormSchema>;
