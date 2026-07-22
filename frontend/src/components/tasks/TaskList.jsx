import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";
import { PageLoader } from "../ui/Spinner";
import Alert from "../ui/Alert";

export default function TaskList({
  tasks,
  isLoading,
  error,
  mutatingId,
  onEdit,
  onDelete,
  onCreateClick,
  hasAnyTasks,
}) {
  if (isLoading) return <PageLoader label="Loading your tasks…" />;

  if (error) return <Alert>{error}</Alert>;

  if (tasks.length === 0) {
    return hasAnyTasks ? (
      <EmptyState
        title="No tasks match this filter"
        subtitle="Try a different status, or create a new task."
      />
    ) : (
      <EmptyState
        title="No tasks yet"
        subtitle="Create your first task to start tracking your work."
        actionLabel="Create a task"
        onAction={onCreateClick}
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          isMutating={mutatingId === task.id}
        />
      ))}
    </div>
  );
}
