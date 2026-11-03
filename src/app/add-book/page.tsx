"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { fetchWithAuth } from "@/lib/api";
import { uploadToImgBB } from "@/lib/imgbb";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import toast from "react-hot-toast";
import { PlusCircle, Book, User, Mail, Tag, Layers, FileText, Upload, Check } from "lucide-react";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookPage() {
  const router = useRouter();
  const { user, isPending } = useAuth();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Fiction");
  const [imageURL, setImageURL] = useState("");
  const [totalCopies, setTotalCopies] = useState(1);
  const [description, setDescription] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "BookNook | Add Book";
    if (!isPending && !user) {
      router.push("/login?callbackUrl=/add-book");
    }
  }, [user, isPending, router]);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploadingImage(true);
    const toastId = toast.loading("Uploading cover image to ImgBB...");
    try {
      const url = await uploadToImgBB(file);
      setImageURL(url);
      toast.success("Image uploaded successfully!", { id: toastId });
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image. You can also paste an image URL directly.", { id: toastId });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !category || !imageURL.trim() || !description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (totalCopies < 1) {
      toast.error("Total copies must be at least 1");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetchWithAuth("/books", {
        method: "POST",
        body: JSON.stringify({
          title: title.trim(),
          author: author.trim(),
          category,
          image: imageURL.trim(),
          description: description.trim(),
          totalCopies: Number(totalCopies),
          userEmail: user?.email,
          userName: user?.name,
        }),
      });

      if (res.success) {
        toast.success("Book successfully added to the catalog!");
        router.push("/my-books");
      } else {
        toast.error(res.message || "Failed to add book");
      }
    } catch (err: any) {
      toast.error(err.message || "Could not add book to library");
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending || !user) {
    return <LoadingSpinner message="Checking authentication session..." />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <PlusCircle className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Add a New Book
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Contribute to the BookNook collection for readers worldwide.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Book Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Book Title *
            </label>
            <div className="relative">
              <Book className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Great Gatsby"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>

          {/* Author Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Author Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. F. Scott Fitzgerald"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Category *
              </label>
              <div className="relative">
                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Total Copies & Image URL */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Total Copies *
              </label>
              <div className="relative">
                <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  min="1"
                  required
                  value={totalCopies}
                  onChange={(e) => setTotalCopies(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Book Image URL (ImgBB / Web) *
              </label>
              <div className="relative">
                <input
                  type="url"
                  required
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                  placeholder="https://i.ibb.co/... or paste image link"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>
            </div>
          </div>

          {/* ImgBB File Upload Widget */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                  Direct Upload via ImgBB
                </p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  Choose a picture from your device and it will upload automatically to ImgBB.
                </p>
              </div>
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all whitespace-nowrap">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingImage ? "Uploading..." : "Upload File"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {imageURL && (
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageURL} alt="Cover preview" className="w-16 h-24 rounded-lg object-cover border border-slate-200 dark:border-slate-700" />
              <span className="text-xs text-slate-500 dark:text-slate-400">Cover preview</span>
            </div>
          )}

          {/* Short Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Short Description *
            </label>
            <div className="relative">
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write an engaging summary of the book..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-none"
              />
            </div>
          </div>

          {/* Contributor Read-Only Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Contributor Name (Read-Only)
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  readOnly
                  value={user.name || ""}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Contributor Email (Read-Only)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="email"
                  readOnly
                  value={user.email || ""}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || uploadingImage}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md transition-all mt-4"
          >
            <Check className="w-4 h-4" />
            <span>{submitting ? "Adding to Library..." : "Add Book"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

