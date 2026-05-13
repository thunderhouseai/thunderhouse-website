import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, locale: string = "en"): string {
  return new Intl.DateTimeFormat(locale === "es" ? "es-PR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
