import { StatusBadge, PriorityTag } from "../ui/Badge";
import { formatDueDate, isOverdue } from "../../utils/formatDate";
import { statusLabel, priorityLabel } from "../../utils/constants";
import { Spinner } from "../ui/Spinner";

const STRIPE_COLOR = {
  low: "bg-priority-low",
  medium: "bg-priority-medium",
  high: "bg-priority-high",
};

export default function TaskCard({ task, onEdit, onDelete, isMutating }) {
  const dueLabel = formatDueDate(task.due_date);
  const overdue = isOverdue(task.due_date, task.status);

  return (
    <div className="group relative flex items-stretch overflow-hidden rounded-lg border border-border bg-surface shadow-card transition-shadow hover:shadow-raised">
      <span className={`w-1 shrink-0 ${STRIPE_COLOR[task.priority] || "bg-gray-300"}`} aria-hidden="true" />

      <div className="flex flex-1 flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            <h3 className="truncate text-sm font-semibold text-ink">{task.title}</h3>
            <StatusBadge status={task.status} label={statusLabel(task.status)} />
          </div>
          {task.description && (
            <p className="mt-1 line-clamp-2 text-sm text-muted">{task.description}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            <PriorityTag priority={task.priority} label={`${priorityLabel(task.priority)} priority`} />
            {dueLabel && (
              <span className={`font-mono text-xs ${overdue ? "text-danger" : "text-subtle"}`}>
                {overdue ? "Overdue · " : "Due "}
                {dueLabel}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 self-start sm:self-center">
          {isMutating ? (
            <Spinner className="h-4 w-4 mx-2" />
          ) : (
            <>
              <button
                type="button"
                onClick={() => onEdit(task)}
                className="rounded-md p-2 text-muted transition-colors hover:bg-bg hover:text-ink"
                aria-label={`Edit ${task.title}`}
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.6">
                  <path
                    d="M13.5 3.5l3 3L6 17H3v-3L13.5 3.5z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => onDelete(task)}
                className="rounded-md p-2 text-muted transition-colors hover:bg-danger-ink hover:text-danger"
                aria-label={`Delete ${task.title}`}
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.6">
                  <path
                    d="M4 6h12M8 6V4.5a1 1 0 011-1h2a1 1 0 011 1V6m-7 0l.7 9.1a1.5 1.5 0 001.5 1.4h4.6a1.5 1.5 0 001.5-1.4L15 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
