import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-body font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        cta: "bg-sindoor text-cream shadow-[0_8px_24px_-8px_rgba(194,59,51,0.6)] hover:bg-sindoor-deep",
        gold: "bg-marigold text-ink hover:bg-marigold-soft",
        outline:
          "border border-stage-line bg-transparent text-cream hover:bg-stage-raised",
        ghost: "bg-transparent text-cream hover:bg-stage-raised",
        link: "text-marigold underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        sm: "h-9 px-4 text-sm",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "cta",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
