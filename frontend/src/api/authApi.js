import axiosClient from "./axiosClient";

/**
 * POST /auth/register
 * Body: { username, email, password } -> UserOut
 */
export function registerUser({ username, email, password }) {
  return axiosClient
    .post("/auth/register", { username, email, password })
    .then((res) => res.data);
}

/**
 * POST /auth/login
 * FastAPI's OAuth2PasswordRequestForm expects x-www-form-urlencoded
 * fields "username" and "password" — NOT JSON.
 * Returns: { access_token, token_type }
 */
export function loginUser({ username, password }) {
  const form = new URLSearchParams();
  form.append("username", username);
  form.append("password", password);

  return axiosClient
    .post("/auth/login", form, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    .then((res) => res.data);
}
