"use client";

import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import UserLinks from "./UserLinks";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { MdPhoneInTalk } from "react-icons/md";

const Navbar = () => {
const { data: session, status } = useSession();
const pathname = usePathname();

const navLinks = [
{ name: "Home", href: "/" },
{ name: "Menu", href: "/menu" },
{ name: "Contact", href: "/contact" },
];

return ( <header className="relative z-50 w-full border-b border-[#eadfce] bg-white shadow-sm"> 
<div className="mx-auto flex h-16 w-full items-center gap-8 px-4 md:h-20 md:px-8 lg:gap-12 lg:px-12 xl:gap-16 xl:px-16">


    {/* LOGO */} 
    <Link 
      href="/" 
      className="flex shrink-0 items-center" 
    > 
      <Image 
        src="/laziz.png" 
        alt="Laziz" 
        width={130} 
        height={52} 
        priority 
        className="h-auto w-27.5 object-contain sm:w-30 md:w-32.5" 
      /> 
    </Link> 

    {/* MOBILE MENU */} 
    <div className="ml-auto flex items-center gap-3 md:hidden"> 
      <Menu /> 
    </div> 

    {/* DESKTOP CONTENT */} 
    <div className="hidden min-w-0 flex-1 items-center md:flex"> 

      {/* NAV LINKS */} 
      <nav className="flex shrink-0 items-center gap-6 lg:gap-8 xl:gap-9"> 
        {navLinks.map((link) => { 
          const isActive = 
            link.href === "/" 
              ? pathname === "/" 
              : pathname.startsWith(link.href); 

          return ( 
            <Link 
              key={link.href} 
              href={link.href} 
              className={`relative whitespace-nowrap py-2 text-xs font-semibold uppercase tracking-wide transition-colors lg:text-sm ${ 
                isActive 
                  ? "text-[#f97316]" 
                  : "text-[#7a2e0e] hover:text-[#f97316]" 
              }`} 
            > 
              {link.name} 

              <span 
                className={`absolute bottom-0 left-0 h-0.5 bg-[#f97316] transition-all duration-300 ${ 
                  isActive ? "w-full" : "w-0" 
                }`} 
              /> 
            </Link> 
          ); 
        })} 

        {/* DASHBOARD */} 
        {status === "authenticated" && session?.user?.isAdmin && ( 
          <Link 
            href="/dashboard" 
            className={`relative whitespace-nowrap py-2 text-xs font-semibold uppercase tracking-wide transition-colors lg:text-sm ${ 
              pathname.startsWith("/dashboard") 
                ? "text-[#f97316]" 
                : "text-[#7a2e0e] hover:text-[#f97316]" 
            }`} 
          > 
            Dashboard 

            <span 
              className={`absolute bottom-0 left-0 h-0.5 bg-[#f97316] transition-all duration-300 ${ 
                pathname.startsWith("/dashboard") 
                  ? "w-full" 
                  : "w-0" 
              }`} 
            /> 
          </Link> 
        )} 
      </nav> 

      {/* RIGHT ACTIONS — ONLY THIS PART CHANGED */} 
      <div className="ml-auto flex shrink-0 items-center gap-5 lg:gap-6 xl:gap-7"> 

        {/* PHONE */} 
        <a 
          href="tel:8239112934" 
          className="flex shrink-0 items-center gap-2 rounded-full bg-[#f97316] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#ea6a0f] lg:px-5 lg:text-sm" 
        > 
          <MdPhoneInTalk 
            size={16} 
            className="fill-white" 
          /> 

          <span className="hidden xl:inline"> 
            8239112934 
          </span> 
        </a> 

        {/* CART */} 
        <CartIcon /> 

        {/* USER */} 
        <UserLinks /> 
      </div> 
    </div> 
  </div> 
</header> 


);
};

export default Navbar;
