import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function baseUrl() {
  return process.env.NODE_ENV === "production"
    ? siteConfig.url
    : "http://localhost:3000";
}
