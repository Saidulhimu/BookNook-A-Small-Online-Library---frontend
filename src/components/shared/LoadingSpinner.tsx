import React from "react";

export function LoadingSpinner({ message = "Loading BookNook..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full p-8 text-center">
      <span className="loading loading-spinner loading-lg text-emerald-600" aria-label="Loading"></span>
      <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300 animate-pulse">
        {message}
      </p>
    </div>
  );
}

