"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminForm } from "@/features/admin/components/form-shell";
import { FormSection } from "@/features/admin/components/form-section";
import { InputFormField, TextareaFormField } from "@/features/admin/components/form-fields";
import type { ActionResult } from "@/features/admin/action-result";
import { settingsFormSchema, type SettingsFormValues } from "./schema";
import type { siteSettings } from "@/db/schema";

type Settings = typeof siteSettings.$inferSelect;

export function SettingsForm({
  settings,
  onSubmit,
}: {
  settings: Settings | null;
  onSubmit: (values: SettingsFormValues) => Promise<ActionResult>;
}) {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      siteName: settings?.siteName ?? "",
      defaultRegistrationUrl: settings?.defaultRegistrationUrl ?? "",
      supportEmail: settings?.supportEmail ?? "",
      supportPhone: settings?.supportPhone ?? "",
      footerText: settings?.footerText ?? "",
    },
  });

  if (!settings) {
    return (
      <p className="rounded-xl border border-sindoor/40 bg-sindoor-dim px-4 py-3 text-sm text-sindoor">
        No settings row found. Run <code>npm run db:seed</code> once to create it, then reload
        this page.
      </p>
    );
  }

  return (
    <AdminForm
      form={form}
      action={onSubmit}
      backHref="/admin"
      submitLabel="Save settings"
      successMessage="Settings saved"
    >
      <FormSection title="Site" description="Used wherever a webinar doesn't override it.">
        <InputFormField control={form.control} name="siteName" label="Site name" required />
        <InputFormField
          control={form.control}
          name="defaultRegistrationUrl"
          label="Default registration URL"
          type="url"
          description="Fallback if a webinar doesn't set its own."
        />
      </FormSection>

      <FormSection title="Support" columns={2} description="How students reach you.">
        <InputFormField
          control={form.control}
          name="supportEmail"
          label="Support email"
          type="email"
        />
        <InputFormField control={form.control} name="supportPhone" label="Support phone" />
      </FormSection>

      <FormSection title="Footer">
        <TextareaFormField control={form.control} name="footerText" label="Footer text" />
      </FormSection>
    </AdminForm>
  );
}
