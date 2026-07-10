"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "!bg-stage-raised !border !border-stage-line !text-cream !font-body !rounded-xl !shadow-[0_14px_34px_-18px_rgba(0,0,0,0.78)]",
          title: "!text-cream !font-semibold",
          description: "!text-cream-dim",
          actionButton: "!bg-marigold !text-ink",
          cancelButton: "!bg-stage !text-cream-dim",
          closeButton: "!bg-stage-raised !border-stage-line !text-cream-dim",
          error: "!border-sindoor/50 !text-sindoor",
          success: "!border-marigold/40",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
