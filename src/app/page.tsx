import React from "react";
import { BannerSlider } from "@/components/home/BannerSlider";
import { NewArrivals } from "@/components/home/NewArrivals";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TopCategories } from "@/components/home/TopCategories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNook | A Small Online Library",
  description: "Browse curated books, borrow titles for free, and contribute to our community library collection.",
};

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <BannerSlider />
      <NewArrivals />
      <HowItWorks />
      <TopCategories />
    </div>
  );
}

