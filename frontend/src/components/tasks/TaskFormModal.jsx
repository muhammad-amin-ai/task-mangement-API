import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import Alert from "../ui/Alert";
import { TASK_STATUSES, TASK_PRIORITIES } from "../../utils/constants";
import { isoToLocalInput, localInputToISOString } from "../../utils/formatDate";
import { extractErrorMessage } from "../../api/axiosClient";

const emptyForm = { title: "", description: "", status: "pending", priority: "medium", due_date: "" };

export default function TaskFormModal({ task, onClose, onCreate, onUpdate }) {
  const isEditing = Boolean(task);
  const [form, setForm] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "pending",
        priority: task.priority || "medium",
        due_date: isoToLocalInput(task.due_date),
      });
    } else {
      setForm(emptyForm);
    }
    setFieldErrors({});
    setFormError(null);
  }, [task]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate() {
    const errors = {};
    if (!form.title.trim()) errors.title = "Title is required.";
    else if (form.title.length > 200) errors.title = "Title must be 200 characters or fewer.";
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      status: form.status,
      priority: form.priority,
      due_date: localInputToISOString(form.due_date),
    };

    try {
      if (isEditing) {
        await onUpdate(task.id, payload);
      } else {
        await onCreate(payload);
      }
      onClose();
    } catch (err) {
      setFormError(extractErrorMessage(err, "Couldn't save this task. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-surface p-6 shadow-raised"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="task-modal-title" className="font-display text-lg font-semibold text-ink">
            {isEditing ? "Edit task" : "New task"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-muted hover:bg-bg hover:text-ink"
            aria-label="Close"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Alert>{formError}</Alert>

          <Input
            id="title"
            label="Title"
            placeholder="Write the launch announcement"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            error={fieldErrors.title}
            autoFocus
          />

          <Textarea
            id="description"
            label="Description"
            placeholder="Add any useful detail (optional)"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              id="status"
              label="Status"
              value={form.status}
              onChange={(e) => updateField("status", e.target.value)}
              options={TASK_STATUSES}
            />
            <Select
              id="priority"
              label="Priority"
              value={form.priority}
              onChange={(e) => updateField("priority", e.target.value)}
              options={TASK_PRIORITIES}
            />
          </div>

          <Input
            id="due_date"
            type="datetime-local"
            label="Due date"
            value={form.due_date}
            onChange={(e) => updateField("due_date", e.target.value)}
          />

          <div className="mt-2 flex justify-end gap-2">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {isEditing ? "Save changes" : "Create task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
