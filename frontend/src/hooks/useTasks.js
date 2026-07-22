import { useCallback, useEffect, useState } from "react";
import { createTask, deleteTask, fetchTasks, updateTask } from "../api/taskApi";
import { extractErrorMessage } from "../api/axiosClient";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mutatingId, setMutatingId] = useState(null); // task currently being updated/deleted

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(extractErrorMessage(err, "Couldn't load your tasks."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = useCallback(async (payload) => {
    const created = await createTask(payload);
    setTasks((prev) => [created, ...prev]);
    return created;
  }, []);

  const editTask = useCallback(async (taskId, payload) => {
    setMutatingId(taskId);
    try {
      const updated = await updateTask(taskId, payload);
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
      return updated;
    } finally {
      setMutatingId(null);
    }
  }, []);

  const removeTask = useCallback(async (taskId) => {
    setMutatingId(taskId);
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } finally {
      setMutatingId(null);
    }
  }, []);

  return { tasks, isLoading, error, mutatingId, loadTasks, addTask, editTask, removeTask };
}
