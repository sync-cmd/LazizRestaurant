"use client";

import { useCartStore } from "@/utils/store";
import Link from "next/link";
import { useEffect } from "react";
import { LuShoppingBag } from "react-icons/lu";

const CartIcon = () => {
  const { totalItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <Link
      href="/cart"
      className="relative flex items-center justify-center transition text-[#7a2e0e] "
    >
      {/* Cart Icon */}
      <LuShoppingBag className="md:text-2xl lg:text-2xl sm:text-xl" />

      {/* Item Count Badge */}
      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full  bg-[#7a2e0e]  px-1 text-xs font-bold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;