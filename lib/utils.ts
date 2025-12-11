import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// conver prisma object to a regular js object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [intValue, floatValue] = num.toFixed(2).split(".");
  return floatValue
    ? `$${intValue}.${floatValue.padEnd(2, "0")}`
    : `$${intValue}.00`;
}
