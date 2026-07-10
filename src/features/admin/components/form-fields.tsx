"use client";

import { ChevronDown } from "lucide-react";
import type { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fieldBase } from "@/components/ui/field-base";
import { cn } from "@/lib/utils";

type BaseProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  required?: boolean;
  placeholder?: string;
  /** Span more than one column of the surrounding FormSection grid. */
  full?: boolean;
};

function Labelled({
  label,
  required,
  description,
  children,
}: {
  label: string;
  required?: boolean;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <FormLabel className="text-xs font-semibold tracking-wide text-cream-dim uppercase">
        {label}
        {required && <span className="ml-1 text-sindoor">*</span>}
      </FormLabel>
      {children}
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </>
  );
}

export function InputFormField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  placeholder,
  full,
  type = "text",
}: BaseProps<T> & { type?: string }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(full && "col-span-full")}>
          <Labelled label={label} required={required} description={description}>
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
          </Labelled>
        </FormItem>
      )}
    />
  );
}

export function TextareaFormField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  placeholder,
  full = true,
}: BaseProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(full && "col-span-full")}>
          <Labelled label={label} required={required} description={description}>
            <FormControl>
              <Textarea placeholder={placeholder} {...field} value={field.value ?? ""} />
            </FormControl>
          </Labelled>
        </FormItem>
      )}
    />
  );
}

export function SelectFormField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  full,
  options,
}: BaseProps<T> & { options: readonly string[] }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(full && "col-span-full")}>
          <Labelled label={label} required={required} description={description}>
            <div className="relative">
              <FormControl>
                <select
                  {...field}
                  value={field.value ?? ""}
                  className={cn(fieldBase, "h-11 appearance-none pr-10")}
                >
                  {options.map((opt) => (
                    <option key={opt} value={opt} className="bg-stage text-cream">
                      {opt}
                    </option>
                  ))}
                </select>
              </FormControl>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-cream-faint" />
            </div>
          </Labelled>
        </FormItem>
      )}
    />
  );
}
