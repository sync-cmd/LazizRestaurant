"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/types/types";

const getData = async (): Promise<ProductType[]> => {
  const res = await fetch("/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

const Featured = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getData();
        setFeaturedProducts(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scroll = (direction: "next" | "prev") => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const card = container.querySelector<HTMLElement>("[data-card]");

    if (!card) return;

    const gap = 16;
    const cardWidth = card.offsetWidth + gap;

    const cardsPerView =
      window.innerWidth < 640
        ? 1
        : window.innerWidth < 768
        ? 2
        : window.innerWidth < 1024
        ? 3
        : 4;

    container.scrollBy({
      left:
        direction === "next"
          ? cardWidth * cardsPerView
          : -(cardWidth * cardsPerView),
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
      {/* HEADER */}
      <div className="mb-8 text-center">
        <p className="mb-2 inline-flex w-fit gap-2 rounded-full border border-[#f3c58f] bg-[#fff1d8] px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#f97316] sm:text-sm">
          Our Signature
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-[#7a2e0e] sm:text-4xl md:text-5xl">
          Featured Dishes
        </h2>

        <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-[#f97316]" />
      </div>

      {/* LOADING */}
      {loading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-67.5 animate-pulse rounded-3xl border border-[#ead7c3] bg-[#fff7ed]"
            />
          ))}
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="flex min-h-48 items-center justify-center text-center">
          <div>
            <p className="font-semibold text-[#7a2e0e]">
              Unable to load featured dishes.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-3 rounded-full bg-[#f97316] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#ea580c] active:scale-95"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* EMPTY */}
      {!loading && !error && featuredProducts.length === 0 && (
        <div className="flex min-h-48 items-center justify-center text-[#7a2e0e]">
          No featured dishes available.
        </div>
      )}

      {/* PRODUCTS */}
      {!loading && !error && featuredProducts.length > 0 && (
        <div className="flex items-center gap-3 sm:gap-5">
          {/* PREVIOUS */}
          <button
            type="button"
            aria-label="Previous dishes"
            onClick={() => scroll("prev")}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e5c49e] bg-white text-xl font-bold text-[#7a2e0e] shadow-sm transition-all hover:border-[#f97316] hover:bg-[#fff1d8] hover:text-[#f97316] active:scale-90 sm:flex"
          >
            ‹
          </button>

          {/* SLIDER */}
          <div
            ref={scrollRef}
            className="hide-scrollbar flex min-w-0 flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {featuredProducts.map((item) => (
              <article
                key={item.id}
                data-card
                className="group flex h-67.5 w-full min-w-full snap-start flex-col items-center overflow-hidden rounded-3xl border border-[#ead7c3] bg-transparent px-4 py-4 transition-all duration-300 hover:scale-[0.99] hover:border-[#f3c58f] hover:bg-[#fff1d8] hover:shadow-[0_12px_30px_rgba(122,46,14,0.12)] sm:w-[calc((100%-16px)/2)] sm:min-w-[calc((100%-16px)/2)] md:w-[calc((100%-32px)/3)] md:min-w-[calc((100%-32px)/3)] lg:w-[calc((100%-48px)/4)] lg:min-w-[calc((100%-48px)/4)]"
              >
                <Link
                  href={`/product/${item.id}`}
                  className="flex h-full w-full flex-col items-center"
                >
                  {/* IMAGE AREA */}
                  <div className="relative flex h-40 w-full shrink-0 items-center justify-center">
                    {item.img ? (
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        sizes="(max-width: 639px) 80vw, (max-width: 767px) 35vw, (max-width: 1023px) 25vw, 18vw"
                        className="object-contain p-4 drop-shadow-[0_8px_10px_rgba(90,40,10,0.12)] transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[#8b6b55]">
                        No image
                      </div>
                    )}
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="flex w-full flex-1 flex-col items-center justify-center">
                    <h3 className="line-clamp-2 max-w-[92%] text-center text-sm font-bold uppercase leading-tight tracking-wide text-[#7a2e0e] transition-colors duration-300 group-hover:text-[#9c5a0e] sm:text-base lg:text-lg">
                      {item.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="h-px w-4 bg-[#e4c6a5]" />

                      <span className="text-base font-bold text-[#f97316]">
                        ₹{item.price}
                      </span>

                      <span className="h-px w-4 bg-[#e4c6a5]" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* NEXT */}
          <button
            type="button"
            aria-label="Next dishes"
            onClick={() => scroll("next")}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e5c49e] bg-white text-xl font-bold text-[#7a2e0e] shadow-sm transition-all hover:border-[#f97316] hover:bg-[#fff1d8] hover:text-[#f97316] active:scale-90 sm:flex"
          >
            ›
          </button>
        </div>
      )}

      {/* MOBILE ARROWS */}
      {!loading && !error && featuredProducts.length > 1 && (
        <div className="mt-4 flex justify-center gap-3 sm:hidden">
          <button
            type="button"
            aria-label="Previous dishes"
            onClick={() => scroll("prev")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5c49e] bg-white text-xl font-bold text-[#7a2e0e] shadow-sm transition hover:border-[#f97316] hover:bg-[#fff1d8] active:scale-90"
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="Next dishes"
            onClick={() => scroll("next")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5c49e] bg-white text-xl font-bold text-[#7a2e0e] shadow-sm transition hover:border-[#f97316] hover:bg-[#fff1d8] active:scale-90"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default Featured;