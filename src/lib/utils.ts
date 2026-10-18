/* Ported from https://github.com/AdityaKodez/adityaojha (MIT, (c) 2026 Aditya Ojha)
   Source: lib/utils.ts — the standard shadcn/ui helper, unchanged. */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
