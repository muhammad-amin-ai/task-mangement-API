import axios from "axios";
import { getToken, clearToken } from "../utils/tokenStorage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT to every outgoing request, if we have one.
axiosClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralize 401 handling: the token is invalid/expired, so clear it and
// send the user back to login. We redirect with a hard navigation rather
// than router state, since this can fire outside any component tree.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

/** Normalizes FastAPI's error shapes (detail string, validation array, network error) into one message. */
export function extractErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  const detail = error?.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail.length > 0) {
    return detail.map((d) => d.msg || d).join(" ");
  }
  if (error?.response?.data?.errors?.length) {
    return error.response.data.errors.map((e) => e.msg).join(" ");
  }
  if (error?.message === "Network Error") {
    return "Can't reach the server. Check your connection and try again.";
  }
  return fallback;
}

export default axiosClient;
