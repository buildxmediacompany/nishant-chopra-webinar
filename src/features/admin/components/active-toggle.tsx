"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import type { ActionResult } from "@/features/admin/action-result";

export function ActiveToggle({
  defaultChecked,
  action,
}: {
  defaultChecked: boolean;
  action: (checked: boolean) => Promise<ActionResult>;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  const [isPending, startTransition] = useTransition();

  return (
    <Switch
      checked={checked}
      disabled={isPending}
      onCheckedChange={(next) => {
        setChecked(next);
        startTransition(async () => {
          const result = await action(next);
          if (result.ok) {
            toast.success(next ? "Shown on the site" : "Hidden from the site");
          } else {
            // The server rejected it, so the switch shouldn't claim otherwise.
            setChecked(!next);
            toast.error(result.error);
          }
        });
      }}
    />
  );
}
