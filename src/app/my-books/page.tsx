"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { Book } from "@/components/books/BookCard";
import { EditBookModal } from "@/components/my-books/EditBookModal";
import { DeleteModal } from "@/components/my-books/DeleteModal";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { API_BASE } from "@/lib/api";
import Link from "next/link";
import { Library, PlusCircle, Edit3, Trash2, Eye, Tag, Layers } from "lucide-react";

export default function MyBooksPage() {
  const router = useRouter();
  const { user, isPending } = useAuth();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);

  useEffect(() => {
    document.title = "BookNook | My Books";
    if (!isPending && !user) {
      router.push("/login?callbackUrl=/my-books");
    }
  }, [user, isPending, router]);

  const loadMyBooks = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/books?userEmail=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setBooks(data.data);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error("Failed to load user books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      loadMyBooks();
    }
  }, [user?.email]);

  if (isPending || !user) {
    return <LoadingSpinner message="Checking authentication status..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <Library className="w-3.5 h-3.5" />
            <span>Personal Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            My Added Books
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage, update copy quantities, or remove books you contributed to BookNook.
          </p>
        </div>

        <Link
          href="/add-book"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Another Book</span>
        </Link>
      </div>

      {/* Books Content */}
      {loading ? (
        <LoadingSpinner message="Loading your library additions..." />
      ) : books.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <Library className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            You haven&apos;t added any books yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
            Share favorite literature or textbooks with the community by adding your first book.
          </p>
          <Link
            href="/add-book"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Your First Book</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Book</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Copies</th>
                  <th className="px-6 py-4">Added Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {books.map((book) => (
                  <tr key={book._id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    {/* Book Cover & Title */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-10 h-14 object-cover rounded-lg flex-shrink-0 bg-slate-100 dark:bg-slate-800"
                        />
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                            {book.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            By {book.author}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        <Tag className="w-3 h-3 text-emerald-600" />
                        {book.category}
                      </span>
                    </td>

                    {/* Total Copies */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <Layers className="w-3.5 h-3.5 text-emerald-600" />
                        {book.totalCopies} {book.totalCopies === 1 ? "Copy" : "Copies"}
                      </span>
                    </td>

                    {/* Added Date */}
                    <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">
                      {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : "Recently"}
                    </td>

                    {/* Actions: View Details, Edit, Delete */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/books/${book._id}`}
                          title="View Details"
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setEditingBook(book)}
                          title="Edit Book"
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingBook(book)}
                          title="Delete Book"
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-slate-600 dark:text-slate-300 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal Dialog */}
      <EditBookModal
        book={editingBook}
        isOpen={Boolean(editingBook)}
        onClose={() => setEditingBook(null)}
        onSuccess={(updated) => {
          setBooks((prev) =>
            prev.map((b) => (b._id === updated._id ? { ...b, ...updated } : b))
          );
        }}
      />

      {/* Custom Delete Confirmation Modal Dialog */}
      <DeleteModal
        book={deletingBook}
        isOpen={Boolean(deletingBook)}
        onClose={() => setDeletingBook(null)}
        onSuccess={(deletedId) => {
          setBooks((prev) => prev.filter((b) => b._id !== deletedId));
        }}
      />
    </div>
  );
}

