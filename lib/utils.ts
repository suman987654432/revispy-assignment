import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encodeURLComponent(str: string): string {
  return encodeURIComponent(str);
}

export function decodeURLComponent(encodedStr: string): string {
  return decodeURIComponent(encodedStr);
}