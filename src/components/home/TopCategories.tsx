import React from "react";
import Link from "next/link";
import { Star, Quote, Compass, Atom, Landmark, Smile, MoreHorizontal } from "lucide-react";

const categories = [
  { name: "Fiction", icon: Compass, count: "120+ Titles", color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50" },
  { name: "Science", icon: Atom, count: "85+ Titles", color: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/50" },
  { name: "History", icon: Landmark, count: "64+ Titles", color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50" },
  { name: "Kids", icon: Smile, count: "90+ Titles", color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50" },
  { name: "Others", icon: MoreHorizontal, count: "40+ Titles", color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50" },
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
  return (
    <section className="my-16 space-y-16">
      {/* Top Categories Block */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Top Categories
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Dive into our most popular literary genres curated for curious minds.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link
                key={i}
                href={`/books?category=${cat.name}`}
                className="flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${cat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-base">
                  {cat.name}
                </h4>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Reader Reviews Block */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Reader Reviews
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            See what our community members love about reading and borrowing with BookNook.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="flex flex-col justify-between p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: r.rating }).map((_, starIdx) => (
                    <Star key={starIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{r.review}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
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

