import { useMemo, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import TaskFilterTabs from "../components/tasks/TaskFilterTabs";
import TaskList from "../components/tasks/TaskList";
import TaskFormModal from "../components/tasks/TaskFormModal";
import DeleteConfirmModal from "../components/tasks/DeleteConfirmModal";
import Button from "../components/ui/Button";
import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
  const { username } = useAuth();
  const { tasks, isLoading, error, mutatingId, addTask, editTask, removeTask } = useTasks();

  const [activeFilter, setActiveFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null); // task object, or null when closed
  const [isCreating, setIsCreating] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);

  const counts = useMemo(() => {
    return tasks.reduce(
      (acc, t) => {
        acc.all += 1;
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
      },
      { all: 0, pending: 0, in_progress: 0, completed: 0 }
    );
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (activeFilter === "all") return tasks;
    return tasks.filter((t) => t.status === activeFilter);
  }, [tasks, activeFilter]);

  const isModalOpen = isCreating || Boolean(editingTask);

  function closeModal() {
    setIsCreating(false);
    setEditingTask(null);
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-ink">
              {username ? `${username}'s tasks` : "Your tasks"}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {counts.all === 0
                ? "Nothing tracked yet."
                : `${counts.pending + counts.in_progress} open, ${counts.completed} completed.`}
            </p>
          </div>
          <Button onClick={() => setIsCreating(true)}>
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current" strokeWidth="2">
              <path d="M10 4v12M4 10h12" strokeLinecap="round" />
            </svg>
            New task
          </Button>
        </div>

        <TaskFilterTabs activeFilter={activeFilter} onChange={setActiveFilter} counts={counts} />

        <TaskList
          tasks={filteredTasks}
          isLoading={isLoading}
          error={error}
          mutatingId={mutatingId}
          onEdit={setEditingTask}
          onDelete={setDeletingTask}
          onCreateClick={() => setIsCreating(true)}
          hasAnyTasks={counts.all > 0}
        />
      </div>

      {isModalOpen && (
        <TaskFormModal
          task={editingTask}
          onClose={closeModal}
          onCreate={addTask}
          onUpdate={editTask}
        />
      )}

      {deletingTask && (
        <DeleteConfirmModal
          task={deletingTask}
          onClose={() => setDeletingTask(null)}
          onConfirm={removeTask}
        />
      )}
    </DashboardLayout>
  );
}
