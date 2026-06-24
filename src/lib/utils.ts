import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const IMG = import.meta.env.VITE_IMAGE_URL as string;

/** Сохтани URL-и пурраи расм аз номи файл */
export function imageUrl(file?: string | null): string {
  if (!file) return "https://placehold.co/400x400?text=No+Image";
  if (file.startsWith("http")) return file;
  return `${IMG}/${file}`;
}

/** Форматкунии нарх (сомонӣ) */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value) + " с.";
}
