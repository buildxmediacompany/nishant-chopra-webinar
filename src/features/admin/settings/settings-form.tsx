"use client";

import { useState } from "react";
import { unstable_rethrow } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputFormField, TextareaFormField } from "@/features/admin/components/form-fields";
import { settingsFormSchema, type SettingsFormValues } from "./schema";
import type { siteSettings } from "@/db/schema";

type Settings = typeof siteSettings.$inferSelect;

export function SettingsForm({
  settings,
  onSubmit,
}: {
  settings: Settings | null;
  onSubmit: (values: SettingsFormValues) => Promise<void>;
}) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

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

  async function handleSubmit(values: SettingsFormValues) {
    setSubmitError(null);
    setSaved(false);
    try {
      await onSubmit(values);
      setSaved(true);
    } catch (err) {
      unstable_rethrow(err);
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  }

  if (!settings) {
    return (
      <p className="rounded-lg border border-sindoor/40 bg-sindoor-dim px-4 py-3 text-sm text-sindoor">
        No settings row found. Run <code>npm run db:seed</code> once to create it, then reload
        this page.
      </p>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex max-w-xl flex-col gap-4">
        {submitError && (
          <p className="rounded-lg border border-sindoor/40 bg-sindoor-dim px-4 py-3 text-sm text-sindoor">
            {submitError}
          </p>
        )}
        {saved && !submitError && (
          <p className="rounded-lg border border-marigold/30 bg-marigold-dim px-4 py-3 text-sm text-marigold">
            Saved.
          </p>
        )}
        <InputFormField control={form.control} name="siteName" label="Site name" required />
        <InputFormField
          control={form.control}
          name="defaultRegistrationUrl"
          label="Default registration URL"
          type="url"
          description="Fallback if a webinar doesn't set its own"
        />
        <InputFormField control={form.control} name="supportEmail" label="Support email" type="email" />
        <InputFormField control={form.control} name="supportPhone" label="Support phone" />
        <TextareaFormField control={form.control} name="footerText" label="Footer text" />
        <div className="flex justify-end border-t border-stage-line pt-6">
          <Button type="submit" variant="gold" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving…" : "Save settings"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
