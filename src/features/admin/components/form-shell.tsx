"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import type { ActionResult } from "@/features/admin/action-result";

export function AdminForm<T extends FieldValues>({
  form,
  action,
  submitLabel,
  successMessage,
  backHref,
  children,
}: {
  form: UseFormReturn<T>;
  action: (values: T) => Promise<ActionResult>;
  submitLabel: string;
  /** Names the action in the past tense, e.g. "FAQ saved". */
  successMessage: string;
  backHref: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const pending = form.formState.isSubmitting || isNavigating;

  async function handleSubmit(values: T) {
    let result: ActionResult;
    try {
      result = await action(values);
    } catch {
      toast.error("Couldn't reach the server. Check your connection and try again.");
      return;
    }

    if (!result.ok) {
      const known = new Set(Object.keys(form.getValues()));
      for (const [name, messages] of Object.entries(result.fieldErrors ?? {})) {
        if (known.has(name)) {
          form.setError(name as Path<T>, { type: "server", message: messages[0] });
        }
      }
      toast.error(result.error);
      return;
    }

    toast.success(successMessage);

    if (result.redirectTo) {
      setIsNavigating(true);
      router.push(result.redirectTo);
    } else {
      // Keeps the form clean so the browser stops warning about unsaved changes.
      form.reset(values);
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6 pb-4"
      >
        {children}

        <div className="sticky bottom-0 z-10 flex items-center justify-end gap-3 rounded-xl border border-stage-line bg-stage/85 px-5 py-4 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.6)] backdrop-blur">
          <Button asChild variant="ghost" type="button">
            <Link href={backHref}>Cancel</Link>
          </Button>
          <Button type="submit" variant="gold" disabled={pending}>
            {pending ? "Saving…" : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
