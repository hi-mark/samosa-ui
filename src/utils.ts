import { format } from "date-fns";

export function convertToMMDDYYYY(isoDate: string): string {
  const date = new Date(isoDate);
  return format(date, "MM/dd/yyyy");
}

export function convertToTimeOfDay(isoDate: string): string {
  const date = new Date(isoDate);
  return format(date, "hh:mm a");
}
type projectProps = {
  projectId: string;
  hwset1: number;
  hwset2: number;
  dateCreated: string;
};
export function getMostRecentProjects(
  projects: projectProps[]
): projectProps[] {
  return projects
    .sort(
      (a, b) =>
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    )
    .slice(0, 4);
}

export const spring = {
  type: "spring",
  stiffness: 50,
  damping: 8,
  mass: 0.6,
};
