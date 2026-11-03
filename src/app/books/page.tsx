"use client";

import { FadeIn } from "@/components/shared/FadeIn";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BookCard, Book } from "@/components/books/BookCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { API_BASE } from "@/lib/api";
import { Search, Filter, BookOpen } from "lucide-react";

const categories = ["All", "Fiction", "Science", "History", "Kids", "Others"];

function BooksContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    document.title = "BookNook | All Books";
  }, []);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        if (selectedCategory && selectedCategory !== "All") {
          queryParams.append("category", selectedCategory);
        }
        if (searchTerm.trim() !== "") {
          queryParams.append("search", searchTerm.trim());
        }

        const res = await fetch(`${API_BASE}/books?${queryParams.toString()}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setBooks(data.data);
        } else {
          setBooks([]);
        }
      } catch (err) {
        console.error("Failed to load books:", err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadBooks();
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  return (
    <>
      {/* Filter and Search Bar */}
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or author..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
        </div>

        {/* Category Pills / Select */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 ml-1 mr-1 hidden sm:block flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Books (3 cards per row on desktop as requested) */}
      {loading ? (
        <LoadingSpinner message="Searching the library catalog..." />
      ) : books.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <p className="text-slate-700 dark:text-slate-300 font-medium">
            {searchTerm || selectedCategory !== "All"
              ? "No books found matching your current filter."
              : "The library is empty right now. Be the first to add a book!"}
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="mt-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <FadeIn key={book._id} className="h-full">
              <BookCard book={book} />
            </FadeIn>
          ))}
        </div>
      )}
    </>
  );
}

export default function AllBooksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Page Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
          <BookOpen className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          All Books Catalog
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Explore our complete collection of literary classics, scientific treatises, and delightful stories.
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner message="Loading catalog..." />}>
        <BooksContent />
      </Suspense>
    </div>
  );
}
