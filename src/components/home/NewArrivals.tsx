"use client";

import { FadeIn } from "../shared/FadeIn";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BookCard, Book } from "../books/BookCard";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { API_BASE } from "@/lib/api";
import { ArrowRight, Sparkles } from "lucide-react";

export function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNewArrivals() {
      try {
        setLoading(true);
        // Call backend API with sort=newest and limit=6
        const res = await fetch(`${API_BASE}/books?limit=6`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setBooks(json.data);
        } else {
          setError(json.message || "Could not load new arrivals.");
        }
      } catch (err) {
        setError("Could not reach the library server. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchNewArrivals();
  }, []);

  return (
    <section className="my-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-300/40 dark:border-emerald-700/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fresh Off The Press</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            New Arrivals
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Explore the latest editions recently added to the BookNook collection.
          </p>
        </div>

        <Link
          href="/books"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all duration-200 group"
        >
          <span>See All Books</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid of Books */}
      {loading ? (
        <LoadingSpinner message="Fetching newest arrivals..." />
      ) : error ? (
        <div className="text-center py-12 bg-rose-50 dark:bg-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-900">
          <p className="text-rose-700 dark:text-rose-300">{error}</p>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-300">No books found in the collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, i) => (
            <FadeIn key={book._id} className="h-full" delay={(i % 3) * 0.08}>
              <BookCard book={book} />
            </FadeIn>
          ))}
        </div>
      )}

      {/* Mobile See All Button */}
      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-colors"
        >
          <span>See All Books</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
