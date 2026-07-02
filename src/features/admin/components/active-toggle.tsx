"use client";

import { useTransition } from "react";
import { Switch } from "@/components/ui/switch";

export function ActiveToggle({
  defaultChecked,
  action,
}: {
  defaultChecked: boolean;
  action: (checked: boolean) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Switch
      defaultChecked={defaultChecked}
      disabled={isPending}
      onCheckedChange={(checked) => {
        startTransition(() => {
          action(checked);
        });
      }}
    />
  );
}
