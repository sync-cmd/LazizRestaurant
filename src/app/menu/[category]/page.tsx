import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types/types";

const getData = async (category: string) => {
  const res = await fetch(
    `http://localhost:3000/api/products?cat=${category}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

type Props = {
  params: Promise<{
    category: string;
  }>;
};

const CategoryPage = async ({ params }: Props) => {
  const { category } = await params;

  const products: ProductType[] = await getData(category);

  return (
    <div className="min-h-[calc(100vh-6rem)] w-full px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
      {/* HEADER */}
      <div className="mx-auto mb-7 max-w-7xl text-center">
        <p className="mb-3 inline-flex w-fit items-center rounded-full border border-[#f3c58f] bg-[#fff1d8] px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#9c5a0e] sm:text-sm">
          Our Menu
        </p>

        <h1 className="text-3xl font-bold uppercase tracking-tight text-[#7a2e0e] sm:text-4xl md:text-5xl">
          {category}
        </h1>

        <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-[#f97316]" />
      </div>

      {/* PRODUCTS */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="group flex h-95 w-full flex-col items-center overflow-hidden rounded-3xl border border-[#ead7c3] bg-transparent px-4 py-4 transition-all duration-300 hover:border-[#f3c58f] hover:bg-[#fff1d8] hover:shadow-[0_15px_35px_rgba(122,46,14,0.12)]"
          >
            {/* FOOD IMAGE */}
            <Link
              href={`/product/${item.id}`}
              className="relative h-42.5 w-[82%] shrink-0"
            >
              {item.img ? (
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 639px) 70vw, (max-width: 767px) 35vw, (max-width: 1023px) 25vw, 18vw"
                  className="object-contain drop-shadow-[0_8px_10px_rgba(90,40,10,0.12)] transition-transform duration-500 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-[#8b6b55]">
                  No image
                </div>
              )}
            </Link>

            {/* PRODUCT INFO */}
            <div className="flex w-full flex-1 flex-col items-center text-center">
              <Link href={`/product/${item.id}`} className="w-full">
                <h2 className="line-clamp-1 text-base font-bold uppercase leading-tight tracking-wide text-[#7a2e0e] transition-colors duration-300 group-hover:text-[#9c5a0e] sm:text-lg">
                  {item.title}
                </h2>

                {/* PRICE */}
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="h-px w-4 bg-[#e4c6a5]" />
                  <span className="text-base font-bold text-[#f97316]">
                    ₹{item.price}
                  </span>
                  <span className="h-px w-4 bg-[#e4c6a5]" />
                </div>

                {/* DESCRIPTION */}
                <p className="mt-2 line-clamp-2 px-1 text-xs leading-5 text-[#765f4e] sm:text-sm">
                  {item.desc}
                </p>
              </Link>

              {/* ADD TO CART */}
              <div className="mt-auto w-full pt-3">
                <button
                  type="button"
                  className="rounded-full bg-[#f97316] px-4 py-2.5 text-sm w-fit font-semibold uppercase tracking-wide text-white shadow-sm transition-all duration-300 hover:bg-[#ea580c] hover:shadow-md active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;