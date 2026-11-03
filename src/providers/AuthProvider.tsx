"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSession, signOut as clientSignOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  isPending: boolean;
  token: string | null;
  logout: () => Promise<void>;
  syncJWT: () => Promise<string | null>;
}

const TOKEN_KEY = "booknook_token";

const AuthContext = createContext<AuthContextType>({
  user: null,
  isPending: true,
  token: null,
  logout: async () => {},
  syncJWT: async () => null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // BetterAuth's inferred session type is too narrow here, so keep it loose.
  const sessionResult = useSession() as any;
  const session = sessionResult?.data;
  const sessionLoading: boolean = sessionResult?.isPending ?? false;

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  // true once the JWT exchange for the current session has finished (success or failure)
  const [settled, setSettled] = useState(false);

  // Asks the Next.js server for a JWT. It only answers when the BetterAuth session cookie is valid.
  const syncJWT = useCallback(async (): Promise<string | null> => {
    try {
      const res = await fetch("/api/jwt", { method: "POST", credentials: "include" });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setUser(data.user);
        return data.token;
      }
    } catch (err) {
      console.error("JWT sync error:", err);
    }
    return null;
  }, []);

  useEffect(() => {
    if (sessionLoading) return;

    if (!session?.user) {
      // Logged out (or session expired): drop everything.
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setUser(null);
      setSettled(true);
      return;
    }

    // Logged in: always refresh the JWT on load so reloading a private route never bounces to Login.
    setSettled(false);
    syncJWT().finally(() => setSettled(true));
  }, [session?.user?.id, sessionLoading, syncJWT]);

  const logout = async () => {
    try {
      await (clientSignOut as any)();
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setUser(null);
      toast.success("Successfully logged out");
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to log out cleanly");
    }
  };

  // Stay "pending" until the session is resolved AND, for logged in users, the JWT exchange is done.
  const isPending = sessionLoading || (Boolean(session?.user) && !settled);

  return (
    <AuthContext.Provider value={{ user, isPending, token, logout, syncJWT }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
