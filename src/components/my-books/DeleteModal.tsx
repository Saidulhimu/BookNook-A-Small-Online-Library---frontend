"use client";

import React, { useState } from "react";
import { Book } from "../books/BookCard";
import { fetchWithAuth } from "@/lib/api";
import toast from "react-hot-toast";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface DeleteModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (deletedId: string) => void;
}

export function DeleteModal({ book, isOpen, onClose, onSuccess }: DeleteModalProps) {
  const [deleting, setDeleting] = useState(false);

  if (!isOpen || !book) return null;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetchWithAuth(`/books/${book._id}`, {
        method: "DELETE",
      });

      if (res.success) {
        toast.success(`"${book.title}" was permanently removed.`);
        onSuccess(book._id);
        onClose();
      } else {
        toast.error(res.message || "Failed to delete book");
      }
    } catch (err: any) {
      toast.error(err.message || "Could not delete book from catalog");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl text-center">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          Delete Book
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
          Are you sure you want to remove <strong className="text-slate-900 dark:text-white">&ldquo;{book.title}&rdquo;</strong>? This action will permanently remove it from the catalog.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="w-1/2 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-semibold text-xs shadow-md shadow-rose-600/30 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{deleting ? "Deleting..." : "Delete"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

