"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE } from "@/lib/api";
import { Star, Quote, Compass, Atom, Landmark, Smile, MoreHorizontal } from "lucide-react";

const categories = [
  { name: "Fiction", icon: Compass, color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50" },
  { name: "Science", icon: Atom, color: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/50" },
  { name: "History", icon: Landmark, color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50" },
  { name: "Kids", icon: Smile, color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50" },
  { name: "Others", icon: MoreHorizontal, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50" },
];

const reviews = [
  {
    name: "Ayesha Rahman",
    role: "Literature Enthusiast",
    review: "BookNook completely changed how I read. Borrowing takes seconds, and returning a book when done keeps the collection fresh for others.",
    rating: 5,
  },
  {
    name: "Tanvir Ahmed",
    role: "History Researcher",
    review: "The catalog includes both rare historical documents and modern perspectives. The clean interface makes discovering new reads effortless.",
    rating: 5,
  },
  {
    name: "Farzana Chowdhury",
    role: "Parent & Teacher",
    review: "The Kids section has fantastic titles that my children love reading before bedtime. A truly welcoming digital library community.",
    rating: 5,
  },
];

export function TopCategories() {
  // Real number of books per category, counted from the database.
  const [counts, setCounts] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/books`)
      .then((res) => res.json())
      .then((json) => {
        const tally: Record<string, number> = {};
        (json.data || []).forEach((b: { category: string }) => {
          const key = (b.category || "Others").toLowerCase();
          tally[key] = (tally[key] || 0) + 1;
        });
        setCounts(tally);
      })
      .catch(() => setCounts({}));
  }, []);

  const countLabel = (name: string) => {
    if (!counts) return "\u00A0";
    const n = counts[name.toLowerCase()] || 0;
    return `${n} ${n === 1 ? "Title" : "Titles"}`;
  };

  return (
    <section className="my-16 space-y-16">
      {/* Top Categories Block */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3 border border-emerald-300/40 dark:border-emerald-700/50">
            Curated Collections
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Top Categories
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Dive into our most popular literary genres curated for curious minds.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link
                key={i}
                href={`/books?category=${cat.name}`}
                className="flex flex-col items-center p-6 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1.5"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm ${cat.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {cat.name}
                </h4>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                  {countLabel(cat.name)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Reader Reviews Block */}
      <div className="pt-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 border border-amber-300/40 dark:border-amber-700/50">
            Community Love
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Reader Reviews
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            See what our community members love about reading and borrowing with BookNook.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="flex flex-col justify-between p-7 bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative group"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, starIdx) => (
                    <Star key={starIdx} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-sm" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{r.review}&rdquo;
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-700/70 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {r.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {r.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

