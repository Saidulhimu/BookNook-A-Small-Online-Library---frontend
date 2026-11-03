"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Book } from "@/components/books/BookCard";
import { BorrowModal } from "@/components/books/BorrowModal";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useAuth } from "@/providers/AuthProvider";
import { API_BASE } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, BookOpen, Layers, User, Tag, Calendar, Bookmark, AlertCircle } from "lucide-react";

export default function BookDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { user, isPending } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Authentication protection: redirect to login with callbackUrl if not logged in
  useEffect(() => {
    if (!isPending && !user) {
      router.push(`/login?callbackUrl=/books/${id}`);
    }
  }, [user, isPending, id, router]);

  const loadBookDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/books/${id}`);
      const data = await res.json();
      if (data.success && data.data) {
        setBook(data.data);
        document.title = `BookNook | ${data.data.title}`;
      } else {
        setError(data.message || "Book details could not be retrieved");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load book details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadBookDetails();
    }
  }, [id]);

  if (isPending || (!user && isPending)) {
    return <LoadingSpinner message="Verifying authentication session..." />;
  }

  if (loading) {
    return <LoadingSpinner message="Fetching book details..." />;
  }

  if (error || !book) {
    return (
      <div className="max-w-xl mx-auto my-16 text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Book Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{error || "This book is not available in our collection."}</p>
        <Link
          href="/books"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Books</span>
        </Link>
      </div>
    );
  }

  const isAvailable = (book.totalCopies || 0) > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Books Catalog</span>
        </Link>
      </div>

      {/* Main Details Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Book Cover */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white shadow backdrop-blur-sm">
                  <Tag className="w-3 h-3 text-emerald-600" />
                  {book.category}
                </span>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="mt-4 w-full max-w-sm flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Total Available Copies:
                </span>
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  isAvailable
                    ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                    : "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
                }`}
              >
                {book.totalCopies} {book.totalCopies === 1 ? "Copy" : "Copies"}
              </span>
            </div>
          </div>

          {/* Right: Book Details */}
          <div className="md:col-span-7 flex flex-col space-y-6">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {book.title}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-slate-600 dark:text-slate-300 font-medium text-sm">
                <User className="w-4 h-4 text-emerald-600" />
                <span>Written by <strong className="text-slate-900 dark:text-white">{book.author}</strong></span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Synopsis & Summary
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {book.description}
              </p>
            </div>

            {/* Contributor / Added By Info */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-1.5 text-xs">
              <span className="font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Community Contribution
              </span>
              <p className="text-slate-700 dark:text-slate-300">
                Added to catalog by: <span className="font-semibold text-slate-900 dark:text-white">{book.userName || "Library Curator"}</span> ({book.userEmail || "curator@booknook.org"})
              </p>
              {book.createdAt && (
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Added on {new Date(book.createdAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* Borrow Action Button with Available Copies challenge check */}
            <div className="pt-4">
              {isAvailable ? (
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all hover:scale-105 active:scale-95"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Borrow This Book</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-semibold text-sm cursor-not-allowed border border-slate-300 dark:border-slate-700"
                >
                  <span>Not Available (Out of Copies)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Borrow Modal Dialog */}
      {book && (
        <BorrowModal
          book={book}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            // Decrement copies locally to immediately reflect the change
            setBook((prev) =>
              prev ? { ...prev, totalCopies: Math.max(0, prev.totalCopies - 1) } : null
            );
          }}
        />
      )}
    </div>
  );
}

