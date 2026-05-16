import React, { useState, useEffect, useCallback } from "react";
import { User } from "../types";
import { authApi } from "../services/api";
import { AuthContext } from "./auth-context";

const TOKEN_KEY = "toolshop_token";
const USER_KEY = "toolshop_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check token validity on mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && !user) {
      // Verify token by fetching user
      setIsLoading(true);
      authApi
        .getMe()
        .then((response) => {
          if (response.success && response.data?.user) {
            setUser(response.data.user);
            localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
          }
        })
        .catch(() => {
          // Token invalid, clear storage
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user]);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authApi.login(email, password);
        if (response.success && response.data) {
          localStorage.setItem(TOKEN_KEY, response.data.token);
          localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
          setUser(response.data.user);
          return true;
        }
        setError(response.message || "Login failed");
        return false;
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error && "response" in err
            ? (err as { response?: { data?: { message?: string } } }).response
                ?.data?.message || "Login failed"
            : "Login failed";
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const register = useCallback(
    async (email: string, password: string, name: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authApi.register(email, password, name);
        if (response.success && response.data) {
          localStorage.setItem(TOKEN_KEY, response.data.token);
          localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
          setUser(response.data.user);
          return true;
        }
        setError(response.message || "Registration failed");
        return false;
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error && "response" in err
            ? (
                err as {
                  response?: {
                    data?: {
                      message?: string;
                      errors?: Array<{ msg: string }>;
                    };
                  };
                }
              ).response?.data?.message ||
              (
                err as {
                  response?: { data?: { errors?: Array<{ msg: string }> } };
                }
              ).response?.data?.errors?.[0]?.msg ||
              "Registration failed"
            : "Registration failed";
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setError(null);
  }, []);

  const updateUser = useCallback(
    async (data: Partial<User>): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authApi.updateProfile({
          name: data.name,
          phone: data.phone || undefined,
          address: data.address || undefined,
        });
        if (response.success && response.data) {
          const updatedUser = response.data.user;
          localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
          setUser(updatedUser);
          return true;
        }
        setError(response.message || "Update failed");
        return false;
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error && "response" in err
            ? (err as { response?: { data?: { message?: string } } }).response
                ?.data?.message || "Update failed"
            : "Update failed";
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        updateUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
