export const TASK_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

export const TASK_PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const STATUS_FILTERS = [{ value: "all", label: "All" }, ...TASK_STATUSES];

export function statusLabel(value) {
  return TASK_STATUSES.find((s) => s.value === value)?.label || value;
}

export function priorityLabel(value) {
  return TASK_PRIORITIES.find((p) => p.value === value)?.label || value;
}
