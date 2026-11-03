import React from "react";
import Link from "next/link";
import { BookX, Home, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNook | Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20 max-w-lg mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 shadow-inner">
        <BookX className="w-10 h-10" />
      </div>

      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
        Error 404
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
        Page Not Found
      </h1>

      <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        The book chapter or page you are looking for has been moved, archived, or never existed in the BookNook catalog.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          href="/books"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Library</span>
        </Link>
      </div>
    </div>
  );
}

