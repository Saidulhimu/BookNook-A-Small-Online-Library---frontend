import React from "react";
import Link from "next/link";
import { BookOpen, User, Tag, Layers } from "lucide-react";

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  userName?: string;
  userEmail?: string;
  createdAt?: string;
}

export function BookCard({ book }: { book: Book }) {
  const isAvailable = (book.totalCopies || 0) > 0;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 group">
      {/* Book Cover Image Container */}
      <div className="relative w-full h-56 sm:h-64 bg-slate-100 dark:bg-slate-900 overflow-hidden">
        <img
          src={book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80"}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 shadow-sm backdrop-blur-sm">
            <Tag className="w-3 h-3 text-emerald-600" />
            {book.category}
          </span>
        </div>

        {/* Available Copies Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm ${
              isAvailable
                ? "bg-emerald-600/90 text-white"
                : "bg-rose-600/90 text-white"
            }`}
          >
            <Layers className="w-3 h-3" />
            {isAvailable ? `${book.totalCopies} Copies` : "Not Available"}
          </span>
        </div>
      </div>

      {/* Book Information */}
      <div className="flex flex-col flex-grow p-5 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {book.title}
        </h3>

        {/* Author */}
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <User className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="truncate">{book.author}</span>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {book.description}
        </p>

        {/* Action Button at bottom */}
        <div className="pt-2 mt-auto">
          <Link
            href={`/books/${book._id}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-700/60 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-slate-800 dark:text-slate-200 hover:text-white dark:hover:text-white font-medium text-sm transition-all duration-200 shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span>View Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

