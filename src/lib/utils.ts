import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
//to dynamiclly add css
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
