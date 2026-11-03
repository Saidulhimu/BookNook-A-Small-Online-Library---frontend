"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession, signOut as clientSignOut } from "@/lib/auth-client";
import { API_BASE } from "@/lib/api";
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
  syncJWT: (user: User) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isPending: true,
  token: null,
  logout: async () => {},
  syncJWT: async () => null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const sessionResult = useSession() as any;
  const session = sessionResult?.data;
  const sessionLoading = sessionResult?.isPending ?? false;

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const syncJWT = async (currentUser: User): Promise<string | null> => {
    try {
      const res = await fetch(`${API_BASE}/jwt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentUser.email,
          name: currentUser.name,
          id: currentUser.id,
        }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem("booknook_token", data.token);
        setToken(data.token);
        return data.token;
      }
    } catch (err) {
      console.error("JWT sync error:", err);
    }
    return null;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("booknook_token");
      if (storedToken) setToken(storedToken);
    }

    if (session?.user) {
      const activeUser: User = {
        id: session.user.id,
        name: session.user.name || "Library Member",
        email: session.user.email,
        image: session.user.image || undefined,
      };
      setUser(activeUser);
      setIsSyncing(true);
      syncJWT(activeUser).finally(() => setIsSyncing(false));
    } else if (typeof window !== "undefined" && localStorage.getItem("booknook_demo_user")) {
      try {
        const demoUser = JSON.parse(localStorage.getItem("booknook_demo_user") || "");
        if (demoUser && demoUser.email) {
          setUser(demoUser);
        }
      } catch (e) {}
    } else if (!sessionLoading) {
      setUser(null);
    }
  }, [session, sessionLoading]);

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/logout`, { method: "POST" }).catch(() => {});
      localStorage.removeItem("booknook_token");
      localStorage.removeItem("booknook_demo_user");
      setToken(null);
      setUser(null);
      await (clientSignOut as any)();
      toast.success("Successfully logged out");
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to log out cleanly");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isPending: sessionLoading || isSyncing,
        token,
        logout,
        syncJWT,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
