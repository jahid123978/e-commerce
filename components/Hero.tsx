"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    title: "Tomorrow’s Essentials, Available Now",
    description: "Discover the next generation of innovation — crafted to elevate your every day with style, performance, and ease.",
    image: "/watch for banner.png",
    link: "/shop",
    color: "from-teal-400 to-blue-500"
  },
  {
    title: "Premium Wearables Collection",
    description: "Experience cutting-edge technology with our latest smart devices designed for modern lifestyles.",
    image: "/sony speaker image.png",
    link: "/new-arrivals",
    color: "from-purple-400 to-indigo-500"
  },
  {
    title: "Limited Edition Innovations",
    description: "Explore exclusive products that redefine functionality and aesthetics in personal tech.",
    image: "/smart watch 2.png",
    link: "/limited-edition",
    color: "from-pink-400 to-rose-500"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[500px] max-md:h-[500px] overflow-hidden group">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-gradient-to-br ${slide.color} transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="max-w-screen-2xl mx-auto h-full grid grid-cols-3 items-center gap-10 px-8 py-20 max-lg:grid-cols-1 max-lg:py-16 max-md:py-12">
            {/* Text Column */}
            <div className="col-span-2 flex flex-col gap-y-6 max-lg:order-last max-lg:text-center">
              <h1 className="text-5xl font-extrabold text-white drop-shadow-lg max-xl:text-4xl max-md:text-3xl max-sm:text-2xl animate-fade-in-up">
                {slide.title}
              </h1>
              <p className="text-lg text-white/90 max-sm:text-base max-w-2xl">
                {slide.description}
              </p>
              <div className="flex gap-4 max-lg:justify-center max-lg:flex-col max-lg:gap-y-4">
                <button className="px-8 py-3 font-semibold text-teal-600 bg-white rounded-full hover:bg-white/90 transition-transform hover:scale-105">
                  <Link href={slide.link}>SHOP NOW</Link>
                </button>
                <button className="px-8 py-3 font-semibold text-white border-2 border-white rounded-full hover:bg-white/20 transition-transform hover:scale-105">
                  LEARN MORE
                </button>
              </div>
            </div>

            {/* Image Column */}
            <div className="flex justify-center relative max-lg:mt-8">
              <Image
                src={slide.image}
                width={450}
                height={450}
                alt="smart watch"
                className="w-auto h-[400px] object-contain max-md:h-72 max-sm:h-60 drop-shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors group-hover:opacity-100 opacity-0 duration-300"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors group-hover:opacity-100 opacity-0 duration-300"
        aria-label="Next slide"
      >
        <FiChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;