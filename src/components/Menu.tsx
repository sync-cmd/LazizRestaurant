"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import UserLinks from "./UserLinks";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FiHome, FiPhone, FiUser } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";

const RESTAURANT_PHONE = "+918235112934";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Contact", url: "/contact" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (url: string) => {
    return url === "/" ? pathname === "/" : pathname.startsWith(url);
  };

  return (
    <>
      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 z-60 block border-t border-[#ead7c3] bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(122,46,14,0.10)] backdrop-blur-md md:hidden">
        <div className="mx-auto flex h-17 max-w-md items-center justify-around">
          
          {/* HOME */}
          <Link
            href="/"
            className={`flex h-full w-16 flex-col items-center justify-center gap-1 transition ${
              isActive("/")
                ? "text-[#f97316]"
                : "text-[#7a2e0e]/60 hover:text-[#f97316]"
            }`}
          >
            <FiHome className="text-[21px]" />

            <span className="text-[10px] font-semibold">
              Home
            </span>
          </Link>

          {/* CONTACT */}
          <Link
            href="/contact"
            className={`flex h-full w-16 flex-col items-center justify-center gap-1 transition ${
              isActive("/contact")
                ? "text-[#f97316]"
                : "text-[#7a2e0e]/60 hover:text-[#f97316]"
            }`}
          >
            <MdOutlineLocationOn className="text-[20px]" />

            <span className="text-[10px] font-semibold">
              Location
            </span>
          </Link>

          {/* CENTER MENU BUTTON */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className={`relative -mt-7 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white shadow-[0_5px_20px_rgba(122,46,14,0.22)] transition-all duration-300 ${
              open
                ? "bg-[#7a2e0e]"
                : "bg-[#f97316] hover:scale-105 hover:bg-[#ea580c]"
            }`}
          >
            <Image
              src={open ? "/close.png" : "/open.png"}
              alt={open ? "Close menu" : "Open menu"}
              width={24}
              height={24}
              className="brightness-0 invert"
              priority
            />
          </button>
          {/* CONTACT / CALL */}
          <a
            href={`tel:${RESTAURANT_PHONE}`}
            aria-label={`Call ${RESTAURANT_PHONE}`}
            className="flex h-full w-16 flex-col items-center justify-center gap-1 text-[#7a2e0e]/60 transition hover:text-[#f97316]"
          >
            <FiPhone className="text-[21px]" />
            <span className="text-[10px] font-semibold">
              Contact
            </span>
          </a>

          {/* CART */}
          {/* <div
            
            className="flex h-full w-16 flex-col items-center justify-center gap-1 text-[#7a2e0e]/60 transition hover:text-[#f97316]"
          >
            <div className="text-[21px]">
              <CartIcon />
            </div>

            <span className="text-[10px] font-semibold">
              Cart
            </span>
          </div> */}

          {/* PROFILE */}
          <Link
            href={status === "authenticated" ? "/profile" : "/login"}
            className={`flex h-full w-16 flex-col items-center justify-center gap-1 transition ${
              pathname.startsWith("/profile") || pathname.startsWith("/login")
                ? "text-[#f97316]"
                : "text-[#7a2e0e]/60 hover:text-[#f97316]"
            }`}
            aria-label="Profile"
          >
            <FiUser className="text-[21px]" />

            <span className="text-[10px] font-semibold">
              Profile
            </span>
          </Link>
        </div>
      </div>

      {/* MENU OVERLAY */}
      {open && (
        <>
          {/* BACKDROP */}
          <div
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] md:hidden"
          />

          {/* MENU PANEL */}
          <div className="fixed bottom-17 left-2 right-2 z-50 max-h-[70vh] overflow-y-auto rounded-3xl border border-[#ead7c3] bg-white p-5 text-[#7a2e0e] shadow-[0_-15px_50px_rgba(122,46,14,0.18)] md:hidden">
            
            {/* USER */}
          <div className="mb-5 flex w-full items-center  border-b border-[#f0d3ae] pb-5">
            {/* PROFILE */}
            <UserLinks />
            
            {/* CART */}
            <div
              onClick={closeMenu}
              className="flex cursor-pointer border border-[#7a2e0e] items-center text-xl justify-center hover:bg-[#fff7eb] rounded-full  px-3 py-2 ms-2"
            >
              <CartIcon />
              <span className="ml-3 truncate text-sm font-semibold normal-case">
              Cart
            </span>
            </div>
          </div>

            {/* NAVIGATION */}
            <nav className="flex w-full flex-col gap-1">
              <Link
                href="/menu"
                onClick={closeMenu}
                className={`relative w-full rounded-xl px-4 py-3 text-base font-medium transition ${
                  isActive("/menu")
                    ? "bg-[#fff0df] font-semibold text-[#f97316]"
                    : "hover:bg-[#fff0df] hover:text-[#f97316]"
                }`}
              >
                Menu

                <span
                  className={`absolute bottom-2 left-4 h-0.5 bg-[#f97316] transition-all duration-300 ${
                    isActive("/menu") ? "w-8" : "w-0"
                  }`}
                />
              </Link>

              {/* DASHBOARD */}
              {status === "authenticated" && session?.user?.isAdmin && (
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className={`relative w-full rounded-xl px-4 py-3 text-base font-medium transition ${
                    pathname.startsWith("/dashboard")
                      ? "bg-[#fff0df] font-semibold text-[#f97316]"
                      : "hover:bg-[#fff0df] hover:text-[#f97316]"
                  }`}
                >
                  Dashboard

                  <span
                    className={`absolute bottom-2 left-4 h-0.5 bg-[#f97316] transition-all duration-300 ${
                      pathname.startsWith("/dashboard") ? "w-16" : "w-0"
                    }`}
                  />
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Menu;