"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import ListingCard from "../listing/ListingCard";
import { ListingCardData } from "@/types/listing";

interface ListingSectionProps {
  listingCards: ListingCardData[];
}
const ListingSection = ({ listingCards }: ListingSectionProps) => {
  return (
    <section
      id="property-section"
      className="bg-[#eff2f5] border-none py-24 relative"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="uppercase text-[0.6875rem] font-bold tracking-[0.1875rem] text-[#4b5563] mb-2">
            Stay With Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-oldStandard text-[#2c3e50] mb-6 leading-tight">
            Our Properties
          </h2>
          <p className="text-[#5b626b] text-base md:text-lg max-w-2xl mx-auto leading-relaxed"></p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="swiper-button-prev !text-black !left-0"></div>
          <div className="swiper-button-next !text-black !right-0"></div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {listingCards.map((card) => (
              <SwiperSlide key={card.id}>
                <ListingCard listingCardData={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: #2c3e50 !important;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          background: white;
          border-radius: 9999px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: #8d703b;
          color: white !important;
        }

        .swiper-button-prev {
          left: -24px !important;
        }

        .swiper-button-next {
          right: -24px !important;
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 16px !important;
          font-weight: bold;
        }

        .swiper-pagination {
          bottom: -6px !important;
        }

        .swiper-pagination-bullet {
          background: #2c3e50 !important;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          background: #8d703b !important;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default ListingSection;
