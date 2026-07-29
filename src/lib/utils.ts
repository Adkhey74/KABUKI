import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine des classes avec clsx et fusionne les conflits Tailwind via tailwind-merge.
 * Usage: cn("px-4 py-2", isActive && "bg-red-500", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
