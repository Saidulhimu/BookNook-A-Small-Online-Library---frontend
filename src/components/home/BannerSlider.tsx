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
    <section className="relative w-full rounded-3xl overflow-hidden shadow-2xl mb-12">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="w-full h-[420px] sm:h-[480px] lg:h-[520px]"
      >
        {slides.map((slide, idx) => {
          const Icon = slide.icon;
          return (
            <SwiperSlide key={idx}>
              <div
                className="relative w-full h-full bg-cover bg-center flex items-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Overlay gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />

                {/* Slide content */}
                <div className="relative z-10 max-w-2xl px-8 sm:px-14 lg:px-20 text-white space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-sm">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{slide.badge}</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                    {slide.title}
                  </h1>

                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {slide.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/books"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-900/40 hover:shadow-emerald-600/50 transition-all hover:scale-105 active:scale-95"
                    >
                      <span>{slide.cta}</span>
                      <ArrowRight className="w-4 h-4" />
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

