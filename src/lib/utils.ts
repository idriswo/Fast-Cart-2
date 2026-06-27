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

/**
 * Расмро дар браузер хурд/фишурда мекунад, то сервер хатои 413
 * (Payload Too Large) надиҳад. Андозаро то maxSize паст мекунад ва
 * сифатро то ба ҳадафи ҳаҷм расидан кам мекунад.
 */
export async function compressImage(
  file: File,
  maxSize = 1024,
  maxBytes = 1_000_000
): Promise<File> {
  // Агар расм нест ё аллакай хурд аст — ҳамоно бармегардонем
  if (!file.type.startsWith("image/")) return file;

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = reject;
    el.src = dataUrl;
  });

  let { width, height } = img;
  if (width > maxSize || height > maxSize) {
    const scale = Math.min(maxSize / width, maxSize / height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(img, 0, 0, width, height);

  // Сифатро паст мекунем то ба maxBytes расем
  let quality = 0.85;
  let blob = await canvasToBlob(canvas, quality);
  while (blob && blob.size > maxBytes && quality > 0.4) {
    quality -= 0.15;
    blob = await canvasToBlob(canvas, quality);
  }
  if (!blob) return file;

  const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], name, { type: "image/jpeg" });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  quality: number
): Promise<Blob | null> {
  return new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/jpeg", quality)
  );
}
