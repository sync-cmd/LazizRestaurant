"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const data = [
  {
    id: 1,
    desc: "Sink your teeth into a juicy, freshly grilled burger layered with crisp lettuce, melted cheese, flavorful sauces, and a perfectly toasted golden bun.",
    title: "Every Bite, Pure Satisfaction.",
    image: "/sl1.png",
    href: "/menu/burgers",
  },
  {
    id: 2,
    desc: "Twirl your fork into delicious pasta tossed with creamy sauces, fresh herbs, flavorful vegetables, and carefully selected ingredients for a warm and comforting experience.",
    title: "Twirl Into a World of Flavor.",
    image: "/sl3.png",
    href: "/menu/pastas",
  },
  {
    id: 3,
    desc: "Enjoy a freshly baked pizza topped with rich tomato sauce, stretchy cheese, vibrant vegetables, and delicious seasonings, all on a perfectly crisp golden crust.",
    title: "Fresh From the Oven, Straight to You.",
    image: "/sl2.png",
    href: "/menu/pizzas",
  },
  {
    id: 4,
    desc: "Indulge in perfectly cooked pasta coated with rich, flavorful sauce and fresh ingredients, creating a comforting dish that is satisfying, delicious, and made with love.",
    title: "Rich, Creamy, Unforgettable.",
    image: "/sl3.png",
    href: "/menu/pastas",
  },
  {
    id: 5,
    desc: "Big, bold, and irresistibly delicious — our handcrafted burgers combine premium ingredients, smoky flavors, and fresh toppings for a satisfying meal every time.",
    title: "The Burger You Have Been Craving.",
    image: "/sl1.png",
    href: "/menu/burgers",
  },
  {
    id: 6,
    desc: "From the first bite to the last slice, experience cheesy goodness, fresh toppings, and an oven-baked crust crafted to bring authentic Italian-inspired flavor to your table.",
    title: "Every Slice Tells a Delicious Story.",
    image: "/sl2.png",
    href: "/menu/pizzas",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === data.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const slide = data[currentSlide];

  return (
    <section
      className="relative flex h-[calc(100vh-6rem)] flex-col overflow-hidden border-b border-[#f0d3ae] bg-cover bg-center bg-no-repeat pb-10 md:h-[calc(100vh-9rem)] lg:flex-row lg:pb-0"
      style={{
        backgroundImage: "url('/bannerBackground.png')",
      }}
    >
      {/* LEFT CONTENT */}
      <div className="relative h-1/2 w-full overflow-hidden lg:h-full lg:w-1/2">
        <div
          key={`text-${slide.id}`}
          className="absolute inset-0 flex flex-col justify-center gap-5 px-6 pt-8 text-[#7a2e0e] sm:ps-10 lg:ps-13 xl:ps-17 animate-slide-left"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#f97316] sm:text-sm inline-flex  gap-2  rounded-full border border-[#f3c58f] bg-[#fff1d8] px-4 py-2  w-fit">
            Freshly Made
          </p>

          <h1 className="text-left text-3xl font-bold uppercase leading-tight sm:text-4xl lg:text-5xl">
            {slide.title}
          </h1>

          <p className="max-w-xl text-base font-light leading-relaxed sm:text-lg lg:text-xl">
            {slide.desc}
          </p>

          <Link href={slide.href} className="w-fit">
            <button className="rounded-full bg-[#f97316] px-5 py-2.5 font-semibold text-white shadow-lg transition hover:scale-105">
              Order Now
            </button>
          </Link>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative h-1/2 w-full sm:pe-10 lg:pe-12 xl:pe-16 overflow-hidden lg:h-full lg:w-[45vw]">
        <div
          key={`image-${slide.id}`}
          className="absolute inset-0 animate-slide-right"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
          />
        </div>
      </div>

      {/* CENTERED BULLETS */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {data.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 rounded-full transition-all duration-500 ${
              currentSlide === index
                ? "w-10 bg-[#f97316]"
                : "w-3 bg-[#7a2e0e]/40 hover:bg-[#7a2e0e]/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Slider;