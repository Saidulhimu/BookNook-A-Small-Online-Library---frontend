import React from "react";

export function LoadingSpinner({ message = "Loading BookNook..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full p-8 text-center">
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-200 dark:border-emerald-950 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300 animate-pulse">
        {message}
      </p>
    </div>
  );
}

