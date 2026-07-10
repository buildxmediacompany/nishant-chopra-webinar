import * as React from "react";
import { cn } from "@/lib/utils";
import { fieldBase } from "./field-base";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} className={cn(fieldBase, "h-11", className)} {...props} />;
}

export { Input };
