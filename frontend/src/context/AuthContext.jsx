import { createContext, useCallback, useMemo, useState } from "react";
import { loginUser, registerUser } from "../api/authApi";
import { extractErrorMessage } from "../api/axiosClient";
import {
  clearToken,
  decodeTokenPayload,
  getToken,
  isTokenExpired,
  setToken as persistToken,
} from "../utils/tokenStorage";

export const AuthContext = createContext(null);

function usernameFromToken(token) {
  if (!token) return null;
  const payload = decodeTokenPayload(token);
  return payload?.sub || null;
}

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => {
    const stored = getToken();
    if (stored && !isTokenExpired(stored)) return stored;
    if (stored) clearToken(); // stale/expired — don't hang on to it
    return null;
  });

  const username = useMemo(() => usernameFromToken(token), [token]);
  const isAuthenticated = Boolean(token);

  const login = useCallback(async ({ username, password }) => {
    try {
      const { access_token } = await loginUser({ username, password });
      persistToken(access_token);
      setTokenState(access_token);
      return { success: true };
    } catch (error) {
      return { success: false, message: extractErrorMessage(error, "Login failed. Check your credentials.") };
    }
  }, []);

  const register = useCallback(async ({ username, email, password }) => {
    try {
      await registerUser({ username, email, password });
      return { success: true };
    } catch (error) {
      return { success: false, message: extractErrorMessage(error, "Registration failed.") };
    }
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setTokenState(null);
  }, []);

  const value = useMemo(
    () => ({ token, username, isAuthenticated, login, register, logout }),
    [token, username, isAuthenticated, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
