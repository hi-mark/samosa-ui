import { format } from "date-fns";

export function convertToMMDDYYYY(isoDate: string): string {
  const date = new Date(isoDate);
  return format(date, "MM/dd/yyyy");
}

export function convertToTimeOfDay(isoDate: string): string {
  const date = new Date(isoDate);
  return format(date, "hh:mm a");
}

export const spring = {
  type: "spring",
  stiffness: 50,
  damping: 8,
  mass: 0.6,
};
