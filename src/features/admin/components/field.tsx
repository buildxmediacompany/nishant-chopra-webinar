import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  helpText,
  textarea,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  helpText?: string;
  textarea?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>
        {label} {required && <span className="text-sindoor">*</span>}
      </Label>
      {textarea ? (
        <Textarea id={name} name={name} defaultValue={defaultValue ?? ""} required={required} />
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue ?? ""}
          required={required}
        />
      )}
      {helpText && <p className="text-xs text-cream-faint">{helpText}</p>}
    </div>
  );
}
