"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./searchBar";
import SignInModal from "./signInModal";
import { LoginMitraResponse } from "@/src/infrastructure/models/loginMitraResponse";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Cookies from "js-cookie";
import NavbarResults from "./navbarResults";

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
              <button className="bg-[#020831] text-white px-[42px] py-[12px] rounded-[8px] cursor-pointer">
                Buat Akun
              </button>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <mask
                      id="mask0_264_2546"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_264_2546)">
                      <path
                        d="M4 18C3.71667 18 3.47917 17.9042 3.2875 17.7125C3.09583 17.5208 3 17.2833 3 17C3 16.7167 3.09583 16.4792 3.2875 16.2875C3.47917 16.0958 3.71667 16 4 16H20C20.2833 16 20.5208 16.0958 20.7125 16.2875C20.9042 16.4792 21 16.7167 21 17C21 17.2833 20.9042 17.5208 20.7125 17.7125C20.5208 17.9042 20.2833 18 20 18H4ZM4 13C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12C3 11.7167 3.09583 11.4792 3.2875 11.2875C3.47917 11.0958 3.71667 11 4 11H20C20.2833 11 20.5208 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12C21 12.2833 20.9042 12.5208 20.7125 12.7125C20.5208 12.9042 20.2833 13 20 13H4ZM4 8C3.71667 8 3.47917 7.90417 3.2875 7.7125C3.09583 7.52083 3 7.28333 3 7C3 6.71667 3.09583 6.47917 3.2875 6.2875C3.47917 6.09583 3.71667 6 4 6H20C20.2833 6 20.5208 6.09583 20.7125 6.2875C20.9042 6.47917 21 6.71667 21 7C21 7.28333 20.9042 7.52083 20.7125 7.7125C20.5208 7.90417 20.2833 8 20 8H4Z"
                        fill="black"
                      />
                    </g>
                  </svg>
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
