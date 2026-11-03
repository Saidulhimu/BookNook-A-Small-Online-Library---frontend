import React from "react";
import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin, Github, Linkedin, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
                Book<span className="text-emerald-600">Nook</span>
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm leading-relaxed">
              BookNook is a community-driven digital library where book lovers discover inspiring stories, share their personal collections, and borrow their next great adventure effortlessly.
            </p>
            {/* Social Links with new X Logo */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-950/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label="X (formerly Twitter)"
              >
                {/* Modern X Logo SVG */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-950/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-950/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-950/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Home Catalog
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/add-book" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Contribute a Book
                </Link>
              </li>
              <li>
                <Link href="/my-borrows" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  My Active Borrows
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>House 42, Library Avenue, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>support@booknook.library.org</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>+880 1712 345678</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© 2026 BookNook. All rights reserved.</p>
          <p>Crafted for readers and thinkers worldwide.</p>
        </div>
      </div>
    </footer>
  );
}

