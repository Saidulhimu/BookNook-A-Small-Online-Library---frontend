"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { fetchWithAuth } from "@/lib/api";
import Link from "next/link";
import toast from "react-hot-toast";
import { Bookmark, RotateCcw, Calendar, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

interface BorrowRecord {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  bookAuthor?: string;
  userEmail: string;
  userName?: string;
  borrowDate: string;
  returnDate: string;
}

export default function MyBorrowsPage() {
  const router = useRouter();
  const { user, isPending } = useAuth();

  const [borrows, setBorrows] = useState<BorrowRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  useEffect(() => {
    document.title = "BookNook | My Borrows";
    if (!isPending && !user) {
      router.push("/login?callbackUrl=/my-borrows");
    }
  }, [user, isPending, router]);

  const loadBorrows = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth("/borrows");
      if (res.success && Array.isArray(res.data)) {
        setBorrows(res.data);
      } else {
        setBorrows([]);
      }
    } catch (err: any) {
      console.error("Failed to load borrowed books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadBorrows();
    }
  }, [user]);

  const handleReturnBook = async (record: BorrowRecord) => {
    setReturningId(record._id);
    const toastId = toast.loading(`Returning "${record.bookTitle}"...`);
    try {
      const res = await fetchWithAuth(`/borrows/${record._id}`, {
        method: "DELETE",
      });

      if (res.success) {
        toast.success(`Successfully returned "${record.bookTitle}". Thank you!`, { id: toastId });
        setBorrows((prev) => prev.filter((b) => b._id !== record._id));
      } else {
        toast.error(res.message || "Failed to return book", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.message || "Could not complete book return", { id: toastId });
    } finally {
      setReturningId(null);
    }
  };

  if (isPending || !user) {
    return <LoadingSpinner message="Validating member borrowing credentials..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Page Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Active Loans</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          My Borrowed Books
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review books currently in your care and return them when you finish reading.
        </p>
      </div>

      {loading ? (
        <LoadingSpinner message="Retrieving your borrowed books..." />
      ) : borrows.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            No Active Book Borrows
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
            You currently have no borrowed books. Find your next favorite story in our library catalog!
          </p>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow"
          >
            <span>Browse Books</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Book Details</th>
                  <th className="px-6 py-4">Borrow Date</th>
                  <th className="px-6 py-4">Return Deadline</th>
                  <th className="px-6 py-4 text-right">Return Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {borrows.map((record) => {
                  const isReturning = returningId === record._id;
                  const isPastDue = new Date(record.returnDate) < new Date();

                  return (
                    <tr
                      key={record._id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Image & Title */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={record.bookImage}
                            alt={record.bookTitle}
                            className="w-10 h-14 object-cover rounded-lg flex-shrink-0 bg-slate-100 dark:bg-slate-800 shadow-sm"
                          />
                          <div>
                            <Link
                              href={`/books/${record.bookId}`}
                              className="font-semibold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 line-clamp-1 transition-colors"
                            >
                              {record.bookTitle}
                            </Link>
                            {record.bookAuthor && (
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                By {record.bookAuthor}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Borrow Date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{new Date(record.borrowDate).toLocaleDateString()}</span>
                        </div>
                      </td>

                      {/* Return Date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span
                            className={
                              isPastDue
                                ? "text-rose-600 dark:text-rose-400 font-semibold"
                                : "text-slate-600 dark:text-slate-300 font-medium"
                            }
                          >
                            {new Date(record.returnDate).toLocaleDateString()}
                          </span>
                        </div>
                      </td>

                      {/* Return Button */}
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleReturnBook(record)}
                          disabled={isReturning}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-emerald-600 dark:bg-slate-800 dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-200 hover:text-white dark:hover:text-white font-semibold text-xs shadow-sm transition-all"
                        >
                          <RotateCcw className={`w-3.5 h-3.5 ${isReturning ? "animate-spin" : ""}`} />
                          <span>{isReturning ? "Returning..." : "Return Book"}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

