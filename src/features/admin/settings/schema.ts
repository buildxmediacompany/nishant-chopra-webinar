import { z } from "zod";

export const settingsFormSchema = z.object({
  siteName: z.string().min(1, "Required"),
  defaultRegistrationUrl: z.string().optional(),
  supportEmail: z.string().optional(),
  supportPhone: z.string().optional(),
  footerText: z.string().optional(),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
