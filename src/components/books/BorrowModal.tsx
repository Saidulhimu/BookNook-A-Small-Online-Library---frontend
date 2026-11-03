"use client";

import React, { useState } from "react";
import { Book } from "./BookCard";
import { useAuth } from "@/providers/AuthProvider";
import { fetchWithAuth } from "@/lib/api";
import toast from "react-hot-toast";
import { X, Calendar, User, Mail, BookOpen, Check } from "lucide-react";

interface BorrowModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function BorrowModal({ book, isOpen, onClose, onSuccess }: BorrowModalProps) {
  const { user } = useAuth();
  const [returnDate, setReturnDate] = useState(() => {
    // Default 7 days from now
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to borrow books");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetchWithAuth("/borrows", {
        method: "POST",
        body: JSON.stringify({
          bookId: book._id,
          returnDate: new Date(returnDate).toISOString(),
          userName: user.name,
        }),
      });

      if (res.success) {
        toast.success(res.message || "Book borrowed successfully!");
        onSuccess();
        onClose();
      } else {
        toast.error(res.message || "Failed to borrow book");
      }
    } catch (err: any) {
      // Challenge 2: No double borrow error toast handled here
      toast.error(err.message || "Could not complete borrow request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Confirm Borrowing
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Review details and select expected return date
            </p>
          </div>
        </div>

        {/* Book Preview summary */}
        <div className="flex gap-4 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/50 mb-6">
          <img
            src={book.image}
            alt={book.title}
            className="w-14 h-20 object-cover rounded-lg flex-shrink-0"
          />
          <div className="flex flex-col justify-center">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
              {book.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              By {book.author}
            </p>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
              {book.totalCopies} Available Copies
            </span>
          </div>
        </div>

        <form onSubmit={handleConfirm} className="space-y-4">
          {/* User Name (Read-Only) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Borrower Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                readOnly
                value={user?.name || ""}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium cursor-not-allowed"
              />
            </div>
          </div>

          {/* User Email (Read-Only) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Borrower Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                readOnly
                value={user?.email || ""}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium cursor-not-allowed"
              />
            </div>
          </div>

          {/* Expected Return Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Expected Return Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs shadow-md transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>{submitting ? "Confirming..." : "Confirm Borrow"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

