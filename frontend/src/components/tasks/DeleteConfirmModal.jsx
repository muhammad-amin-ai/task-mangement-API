import { useState } from "react";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import { extractErrorMessage } from "../../api/axiosClient";

export default function DeleteConfirmModal({ task, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  async function handleConfirm() {
    setIsDeleting(true);
    setError(null);
    try {
      await onConfirm(task.id);
      onClose();
    } catch (err) {
      setError(extractErrorMessage(err, "Couldn't delete this task."));
      setIsDeleting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="w-full max-w-sm rounded-xl bg-surface p-6 shadow-raised" onClick={(e) => e.stopPropagation()}>
        <h2 className="font-display text-lg font-semibold text-ink">Delete task?</h2>
        <p className="mt-2 text-sm text-muted">
          <span className="font-medium text-ink">&ldquo;{task.title}&rdquo;</span> will be permanently
          removed. This can't be undone.
        </p>

        {error && (
          <div className="mt-3">
            <Alert>{error}</Alert>
          </div>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm} isLoading={isDeleting}>
            Delete task
          </Button>
        </div>
      </div>
    </div>
  );
}
