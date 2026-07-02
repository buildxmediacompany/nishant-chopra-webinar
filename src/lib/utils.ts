import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format integer paise as an Indian Rupee display string, e.g. 9900 -> "₹99" */
export function formatPaise(paise: number): string {
  const rupees = paise / 100;
  const isWhole = Number.isInteger(rupees);
  return `₹${rupees.toLocaleString("en-IN", {
    maximumFractionDigits: isWhole ? 0 : 2,
  })}`;
}
