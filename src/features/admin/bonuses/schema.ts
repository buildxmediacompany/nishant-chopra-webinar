import { z } from "zod";

const numericString = (label: string) =>
  z
    .string()
    .min(1, "Required")
    .refine((v) => !Number.isNaN(Number(v)), `${label} must be a number`);

export const bonusFormSchema = z.object({
  title: z.string().min(1, "Required"),
  valuePaise: numericString("Value"),
  description: z.string().optional(),
  iconName: z.string().min(1, "Required"),
  order: numericString("Order"),
});

export type BonusFormValues = z.infer<typeof bonusFormSchema>;
