"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoMdLogIn } from "react-icons/io";
import { FaRegUser, FaUser } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { TbUser } from "react-icons/tb";


const UserLinks = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  return (
    <div>
      {status === "authenticated" ? (
        <Link
          href="/profile"
          aria-label="Profile"
          className="flex h-10 items-center gap-2 rounded-full border  bg-white px-2.5 pr-3 text-[#7a2e0e] shadow-sm transition border-[#7a2e0e] hover:bg-[#fff7ed]"
        >
          {/* Profile Icon */}
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7a2e0e] text-white">
            <TbUser className="text-xl" />
          </div>

          {/* Username */}
          <span className="max-w-32.5 truncate text-sm font-semibold normal-case text-[#7a2e0e]">
            {session.user?.name || "Profile"}
          </span>

         
          
        </Link>
      ) : (
        <Link
          href="/login"
          className="flex items-center gap-2 rounded-full border border-[#7a2e0e] px-3 py-2 text-[#7a2e0e] transition hover:bg-[#fff7ed] hover:text-[#f97316]"
        >
          <TbUser className="text-xl" />
          <span>Login</span>
        </Link>
      )}
    </div>
  );
};

export default UserLinks;