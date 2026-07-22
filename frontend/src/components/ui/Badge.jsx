const STATUS_STYLES = {
  pending: "bg-gray-100 text-gray-600",
  in_progress: "bg-accent-ink text-accent-hover",
  completed: "bg-emerald-50 text-priority-low",
};

const PRIORITY_DOT = {
  low: "bg-priority-low",
  medium: "bg-priority-medium",
  high: "bg-priority-high",
};

export function StatusBadge({ status, label }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {label}
    </span>
  );
}

export function PriorityTag({ priority, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
      <span className={`h-1.5 w-1.5 rounded-full ${PRIORITY_DOT[priority] || "bg-gray-400"}`} />
      {label}
    </span>
  );
}
