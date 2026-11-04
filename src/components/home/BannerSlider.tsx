"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ArrowRight, BookMarked, Sparkles, Compass } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    badge: "Welcome to BookNook",
    icon: Sparkles,
    title: "Unlock Thousands of Worlds, One Page at a Time",
    description:
      "Join our community of passionate readers. Discover curated classics, modern bestsellers, and rare gems all in one place.",
    cta: "Browse Books",
    image: "https://images.unsplash.com/photo-1507842229451-7f01be7ff60b?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-emerald-900/90 via-slate-900/80 to-slate-950/90",
  },
  {
    badge: "Seamless Borrowing",
    icon: BookMarked,
    title: "Borrow Instantly, Read Freely, Return with Ease",
    description:
      "Pick your favorite titles, read in comfort, and return when you're done. No late fees, just pure joy of reading.",
    cta: "Explore Library",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-teal-950/90 via-slate-900/80 to-slate-950/90",
  },
  {
    badge: "Expand Horizons",
    icon: Compass,
    title: "Feed Your Curiosity Across Diverse Genres",
    description:
      "From mind-bending science to rich historical chronicles and bedtime tales for children — find your next fascination.",
    cta: "View Catalog",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-blue-950/90 via-slate-900/80 to-slate-950/90",
  },
];

export function BannerSlider() {
  return (
    <section className="relative w-full rounded-3xl overflow-hidden shadow-2xl mb-16 border border-slate-200/60 dark:border-slate-800/80">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="w-full h-[460px] sm:h-[500px] lg:h-[540px]"
      >
        {slides.map((slide, idx) => {
          const Icon = slide.icon;
          return (
            <SwiperSlide key={idx}>
              <div
                className="relative w-full h-full bg-cover bg-center flex items-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Overlay gradient with atmospheric depth */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/60 pointer-events-none" />

                {/* Slide content */}
                <div className="relative z-10 max-w-2xl px-8 sm:px-14 lg:px-20 text-white space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-sm">
                    <Icon className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                    <span className="tracking-wide uppercase text-[11px]">{slide.badge}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white drop-shadow-md">
                    {slide.title}
                  </h1>

                  <p className="text-slate-200/90 text-sm sm:text-base leading-relaxed line-clamp-3 max-w-xl font-normal">
                    {slide.description}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Link
                      href="/books"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg shadow-emerald-950/40 hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95 group"
                    >
                      <span>{slide.cta}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/#how-it-works"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105"
                    >
                      How It Works
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

