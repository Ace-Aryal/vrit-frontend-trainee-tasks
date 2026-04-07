import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncate(string: string, limit: number) {
  if (string.length <= limit) {
    return string
  }
  return string.slice(0, limit + 1) + "..."
}