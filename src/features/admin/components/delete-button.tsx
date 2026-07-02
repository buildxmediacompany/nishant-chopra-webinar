"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export function DeleteButton({
  action,
  confirmMessage = "Delete this? This can't be undone.",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!confirm(confirmMessage)) return;
        startTransition(() => {
          action();
        });
      }}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-cream-dim transition-colors hover:bg-sindoor-dim hover:text-sindoor disabled:opacity-50"
    >
      <Trash2 className="size-4" />
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
