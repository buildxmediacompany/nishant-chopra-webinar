"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import type { ActionResult } from "@/features/admin/action-result";

export function SetLiveButton({
  slug,
  action,
}: {
  slug: string;
  action: () => Promise<ActionResult>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const result = await action();
          if (result.ok) toast.success(`${slug} is now live`);
          else toast.error(result.error);
        })
      }
      className="rounded-full border border-stage-line px-2.5 py-1 text-xs text-cream-dim transition-colors hover:border-marigold hover:text-marigold disabled:opacity-50"
    >
      {isPending ? "Setting…" : "Set as Live"}
    </button>
  );
}
