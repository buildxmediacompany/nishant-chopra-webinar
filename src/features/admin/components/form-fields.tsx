"use client";

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

type BaseProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  required?: boolean;
  placeholder?: string;
};

export function InputFormField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  placeholder,
  type = "text",
}: BaseProps<T> & { type?: string }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-sindoor">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              value={field.value ?? ""}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
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
}: BaseProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-sindoor">*</span>}
          </FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} value={field.value ?? ""} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
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
  options,
}: BaseProps<T> & { options: readonly string[] }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-sindoor">*</span>}
          </FormLabel>
          <FormControl>
            <select
              {...field}
              value={field.value ?? ""}
              className="flex h-10 w-full rounded-lg border border-stage-line bg-stage px-3 py-2 text-sm text-cream outline-none transition-colors focus:border-marigold"
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
