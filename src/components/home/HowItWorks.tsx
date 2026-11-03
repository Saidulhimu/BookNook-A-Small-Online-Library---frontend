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
    <section className="my-16 py-12 px-6 sm:px-12 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          How Borrowing Works
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Experience our simple three-step borrowing process designed to keep good books circulating among readers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item, index) => {
          const Icon = item.icon;
          return (
            <FadeIn key={index} delay={index * 0.1} className="h-full">
            <div
              className="relative h-full flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <div className="absolute -top-3.5 px-3 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-xs tracking-wider shadow">
                STEP {item.step}
              </div>

              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center my-4">
                <Icon className="w-7 h-7" />
              </div>

              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
            </FadeIn>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-colors"
        >
          <span>Get Started Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

