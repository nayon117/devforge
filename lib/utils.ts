import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAndDivideNumber(value: number | undefined): string {
  if (typeof value !== 'number' || isNaN(value)) {
    return ''; // or any default value you prefer
  }
  return value.toLocaleString();
}