"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Cookies from "js-cookie";
import NavbarResults from "./navbarResults";
import { Button } from "@/src/components/ui/button";
import HamburgerIcon from "@/public/svg/hamburger.svg";

interface parsedUser {
  id: string;
  email: string;
  name: string;
  isMitra: boolean;
}

const Navbar = ({
  isResults = false,
  token,
}: {
  isResults?: boolean;
  token?: RequestCookie | undefined;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpenResults, setIsMenuOpenResults] = useState(false);

  // TODO: ini buat apa?
  console.log(isMenuOpenResults);

  const [isMitra, setIsMitra] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuToggleResults = () => {
    setIsMenuOpenResults(!isMenuOpenResults);
  };

  const [showProfile, setShowProfile] = useState(false);

  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: parsedUser = JSON.parse(storedUser);
      setIsMitra(parsedUser.isMitra);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    // Add or remove a class to the body to disable scrolling
    if (isMenuOpen || isMenuOpenResults) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up the class when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen || isMenuOpenResults]);

  return (
    <>
      {isResults ? (
        <NavbarResults isResults={isResults} token={token} />
      ) : (
        <div className="drop-shadow-md w-full h-[92px] bg-white flex items-center justify-between px-8 xl:px-[240px] md:px-[100px] py-2 relative">
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
          <div className="hidden md:flex space-x-4 items-center">
            <a
              href="/maintenance"
              className="text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              Cari Konveksi
            </a>
            <a
              href="/registerMitra"
              className="text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              Gabung jadi seller
            </a>
            <Link href={"/register"}>
              <Button className="bg-[#020831] text-white px-[42px] py-[12px] h-[48px] rounded-[8px] cursor-pointer">
                Buat Akun
              </Button>
            </Link>
          </div>

          <div className="md:hidden hamburger">
            {isMenuOpen ? (
              <button
                className="text-gray-700 hover:text-gray-900"
                onClick={handleMenuToggle}
              >
                &#10006; {/* Display "X" when isMenuOpen is true */}
              </button>
            ) : (
              <button
                className="text-gray-700 hover:text-gray-900 font-bold"
                onClick={handleMenuToggle}
              >
                <div className="cursor-pointer md:hidden">
                  <HamburgerIcon />
                </div>
              </button>
            )}
          </div>
        </div>
      )}
      {isMenuOpen && (
        <div className="bg-white fixed w-full h-full ">
          <div className="container mx-auto px-4 py-2 flex flex-col items-center text-3xl font-semibold gap-7">
            <a
              href="/maintenance"
              className="text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              Cari Konveksi
            </a>
            <a
              href="/registerMitra"
              className="text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              Gabung jadi seller
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
