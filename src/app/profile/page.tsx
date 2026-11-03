"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Mail, User as UserIcon } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isPending } = useAuth();

  useEffect(() => {
    document.title = "BookNook | My Profile";
    if (!isPending && !user) {
      router.push("/login?callbackUrl=/profile");
    }
  }, [user, isPending, router]);

  if (isPending || !user) {
    return <LoadingSpinner message="Loading your profile..." />;
  }

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl text-center">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-emerald-100 dark:border-emerald-900"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-emerald-600 text-white text-3xl font-bold flex items-center justify-center mx-auto">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h1>

        <div className="mt-6 space-y-3 text-left text-sm">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <UserIcon className="w-4 h-4 text-emerald-600" />
            <span className="text-slate-700 dark:text-slate-200">{user.name}</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <Mail className="w-4 h-4 text-emerald-600" />
            <span className="text-slate-700 dark:text-slate-200 break-all">{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
