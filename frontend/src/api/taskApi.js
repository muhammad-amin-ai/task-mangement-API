import axiosClient from "./axiosClient";

/** GET /tasks -> TaskOut[] */
export function fetchTasks() {
  return axiosClient.get("/tasks").then((res) => res.data);
}

/** GET /tasks/{id} -> TaskOut */
export function fetchTask(taskId) {
  return axiosClient.get(`/tasks/${taskId}`).then((res) => res.data);
}

/** POST /tasks -> TaskOut */
export function createTask(payload) {
  return axiosClient.post("/tasks", payload).then((res) => res.data);
}

/** PUT /tasks/{id} (partial update) -> TaskOut */
export function updateTask(taskId, payload) {
  return axiosClient.put(`/tasks/${taskId}`, payload).then((res) => res.data);
}

/** DELETE /tasks/{id} -> 204 No Content */
export function deleteTask(taskId) {
  return axiosClient.delete(`/tasks/${taskId}`);
}
