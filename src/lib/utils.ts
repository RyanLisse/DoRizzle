import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function baseUrl() {
  return process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "http://localhost:3000";
}
