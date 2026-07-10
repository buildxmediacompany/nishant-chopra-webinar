import * as React from "react";
import { cn } from "@/lib/utils";
import { fieldBase } from "./field-base";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(fieldBase, "min-h-28 resize-y", className)} {...props} />;
}

export { Textarea };
