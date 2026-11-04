import React from "react";
import Link from "next/link";
import { FadeIn } from "../shared/FadeIn";
import { Search, BookCheck, RotateCcw, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Discover Your Book",
    description:
      "Browse our growing catalog by category, author, or title. Check real-time copy availability before borrowing.",
  },
  {
    step: "02",
    icon: BookCheck,
    title: "Borrow in One Click",
    description:
      "Log in securely, confirm your borrow period, and reserve your copy. Available copies decrement instantly.",
  },
  {
    step: "03",
    icon: RotateCcw,
    title: "Enjoy & Return",
    description:
      "Track your borrowed books on your dashboard and return them with a single click so other readers can enjoy them.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="my-20 py-16 px-6 sm:px-12 bg-gradient-to-b from-slate-50 to-emerald-50/20 dark:from-slate-800/50 dark:to-emerald-950/20 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden">
      {/* Background soft glow decoration */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center mb-16 relative z-10">
        <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3 border border-emerald-300/40 dark:border-emerald-700/50">
          Effortless Experience
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How Borrowing Works
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
          Experience our simple three-step borrowing process designed to keep good books circulating freely among readers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {steps.map((item, index) => {
          const Icon = item.icon;
          return (
            <FadeIn key={index} delay={index * 0.1} className="h-full">
              <div
                className="relative h-full flex flex-col items-center text-center p-8 bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/90 dark:border-slate-700/80 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="absolute -top-4 px-3.5 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs tracking-widest shadow-md">
                  STEP {item.step}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/70 dark:to-teal-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center my-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm border border-emerald-200/60 dark:border-emerald-800/40">
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2.5">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          );
        })}
      </div>

      <div className="mt-12 text-center relative z-10">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-900/30 hover:shadow-emerald-600/40 transition-all duration-300 hover:scale-105 group"
        >
          <span>Get Started Now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

