"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { ActionResult } from "@/features/admin/action-result";

export function DeleteButton({
  action,
  confirmMessage = "Delete this? This can't be undone.",
  successMessage = "Deleted",
}: {
  action: () => Promise<ActionResult>;
  confirmMessage?: string;
  successMessage?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!confirm(confirmMessage)) return;
        startTransition(async () => {
          const result = await action();
          if (result.ok) toast.success(successMessage);
          else toast.error(result.error);
        });
      }}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-cream-dim transition-colors hover:bg-sindoor-dim hover:text-sindoor disabled:opacity-50"
    >
      <Trash2 className="size-4" />
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
