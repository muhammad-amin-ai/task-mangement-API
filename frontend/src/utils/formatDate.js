export function formatDueDate(isoString) {
  if (!isoString) return null;
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function isOverdue(isoString, status) {
  if (!isoString || status === "completed") return false;
  return new Date(isoString).getTime() < Date.now();
}

/** Converts a datetime-local input value ("2026-07-21T14:30") to an ISO string for the API. */
export function localInputToISOString(localValue) {
  if (!localValue) return null;
  const date = new Date(localValue);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

/** Converts an API ISO datetime string to the value a datetime-local input expects. */
export function isoToLocalInput(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}
