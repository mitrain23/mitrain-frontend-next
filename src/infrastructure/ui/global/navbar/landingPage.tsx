"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";
import HamburgerIcon from "@/public/svg/hamburger.svg";

const LandingPageNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="drop-shadow-md w-full h-[92px] bg-white flex items-center justify-between px-8 xl:px-[240px] md:px-[100px] py-2 relative z-10">
        <Link href={"/"} className="flex flex-row gap-[16px] items-center">
          <div className="w-[60px] h-[60px]">
            <Image
              src="/images/logoMitrain.svg"
              width={0}
              height={0}
              alt="logo-mitrain"
              className="w-full"
            />
          </div>
          <h1 className="hidden md:block font-satoshi text-[20px] font-bold text-[#0054A5]">
            MitraIn ID
          </h1>
        </Link>

        {/* Desktop Nav Menu */}
        <ul className="hidden md:flex space-x-4 items-center">
          <li>
            <Link
              href="/maintenance"
              className="text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              Cari Konveksi
            </Link>
          </li>
          <li>
            <Link
              href="/registerMitra"
              className="text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              Gabung jadi seller
            </Link>
          </li>

          <li>
            <Link href={"/register"}>
              <Button className="bg-[#020831] text-white px-[42px] py-[12px] h-[48px] rounded-[8px] cursor-pointer">
                Buat Akun
              </Button>
            </Link>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          {isMenuOpen ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
            >
              <Cross1Icon />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(true)}
            >
              <HamburgerIcon />
            </Button>
          )}
        </div>
      </nav>
      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="bg-white fixed inset-0 h-full flex flex-col justify-center items-center">
          <ul className="px-4 text-3xl font-semibold space-y-4">
            <li>
              <Link
                href="/maintenance"
                className="text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                Cari Konveksi
              </Link>
            </li>
            <li>
              <Link
                href="/registerMitra"
                className="text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                Gabung jadi seller
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default LandingPageNavbar;
