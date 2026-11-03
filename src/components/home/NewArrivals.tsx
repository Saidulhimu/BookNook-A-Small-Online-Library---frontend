"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BookCard, Book } from "../books/BookCard";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { API_BASE } from "@/lib/api";
import { ArrowRight, Sparkles } from "lucide-react";

export function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNewArrivals() {
      try {
        setLoading(true);
        // Call backend API with sort=newest and limit=6
        const res = await fetch(`${API_BASE}/books?sort=newest&limit=6`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setBooks(json.data);
        } else {
          // Curated initial books if DB is fresh
          setBooks(sampleBooks);
        }
      } catch (err) {
        console.warn("Could not reach backend, displaying curated sample arrivals:", err);
        setBooks(sampleBooks);
      } finally {
        setLoading(false);
      }
    }

    fetchNewArrivals();
  }, []);

  return (
    <section className="my-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fresh Off The Press</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            New Arrivals
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Explore the latest editions recently added to the BookNook collection.
          </p>
        </div>

        <Link
          href="/books"
          className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
        >
          <span>See All Books</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of Books */}
      {loading ? (
        <LoadingSpinner message="Fetching newest arrivals..." />
      ) : books.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-300">No books found in the collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      {/* Mobile See All Button */}
      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-colors"
        >
          <span>See All Books</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

// Fallback curated books when database is first created
const sampleBooks: Book[] = [
  {
    _id: "sample-1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
    description: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
    totalCopies: 4,
  },
  {
    _id: "sample-2",
    title: "Cosmos",
    author: "Carl Sagan",
    category: "Science",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    description: "A personal voyage exploring the fifteen billion years of cosmic evolution transforming matter into consciousness.",
    totalCopies: 3,
  },
  {
    _id: "sample-3",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "History",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80",
    description: "Explores how an insignificant ape became the ruler of planet Earth, capable of splitting the atom and journeying into space.",
    totalCopies: 5,
  },
  {
    _id: "sample-4",
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    category: "Kids",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    description: "A poetical tale, with watercolour illustrations by the author, in which a pilot stranded in the desert meets a young prince.",
    totalCopies: 2,
  },
  {
    _id: "sample-5",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Others",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
    description: "An easy and proven way to build good habits and break bad ones using small behavioral changes that compound over time.",
    totalCopies: 6,
  },
  {
    _id: "sample-6",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    image: "https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=600&q=80",
    description: "From the big bang to black holes, one of the greatest minds of our time introduces modern astrophysics to everyday readers.",
    totalCopies: 3,
  },
];

