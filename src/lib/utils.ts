import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLandlord(
  user: { userType?: string } | null | undefined,
): boolean {
  return user?.userType === "LANDLORD";
}

export function isTenant(
  user: { userType?: string } | null | undefined,
): boolean {
  return user?.userType === "TENANT";
}
