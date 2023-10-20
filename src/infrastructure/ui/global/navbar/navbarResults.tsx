"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import SearchBar from "./searchBar";
import Cookies from "js-cookie";

interface parsedUser {
  id: string;
  email: string;
  name: string;
  isMitra: boolean;
}

const NavbarResults = ({
  isResults = false,
  token,
}: {
  isResults?: boolean;
  token?: RequestCookie | undefined;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpenResults, setIsMenuOpenResults] = useState(false);

  console.log(isMenuOpenResults);

  const [isMitra, setIsMitra] = useState(false);

  const handleMenuToggleResults = () => {
    setIsMenuOpenResults(!isMenuOpenResults);
  };

  const [showProfile, setShowProfile] = useState(false);

  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: parsedUser = JSON.parse(storedUser);
      setIsMitra(parsedUser.isMitra);
    }
  }, []);

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
      <div className="drop-shadow-md w-full h-[92px] bg-white flex items-center justify-between xl:px-[240px] md:px-[100px] px-8 py-2">
        <div className="flex items-center gap-[32px] ">
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

          <div className="hidden md:flex items-center gap-[16px]">
            <div className="hidden lg:flex items-center gap-[6px]">
              <h1>Kategori</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <mask
                  id="mask0_22_200"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_22_200)">
                  <path
                    d="M12 15.375L6 9.375L7.4 7.975L12 12.575L16.6 7.975L18 9.375L12 15.375Z"
                    fill="#020831"
                  />
                </g>
              </svg>
            </div>
            <Link href={"/registerMitra"}>
              <h1>Gabung Jadi Mitra</h1>
            </Link>
          </div>
        </div>

        {/* hamburger icon */}
        <div className="md:hidden hamburger">
          {isMenuOpenResults ? (
            <button
              className="text-gray-700 hover:text-gray-900"
              onClick={handleMenuToggleResults}
            >
              &#10006; {/* Display "X" when isMenuOpen is true */}
            </button>
          ) : (
            <button
              className="text-gray-700 hover:text-gray-900 font-bold"
              onClick={handleMenuToggleResults}
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

        <div className="hidden md:flex items-center gap-[32px]">
          <SearchBar />
          <div className="flex items-center gap-[16px]">
            <div
              className="cursor-pointer relative"
              onClick={handleShowProfile}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
              >
                <circle cx="18" cy="18" r="18" fill="#F2F2F2" />
                <mask
                  id="mask0_280_1150"
                  maskUnits="userSpaceOnUse"
                  x="6"
                  y="6"
                  width="24"
                  height="24"
                >
                  <rect x="6" y="6" width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_280_1150)">
                  <path
                    d="M18 18C16.9 18 15.9583 17.6083 15.175 16.825C14.3917 16.0417 14 15.1 14 14C14 12.9 14.3917 11.9583 15.175 11.175C15.9583 10.3917 16.9 10 18 10C19.1 10 20.0417 10.3917 20.825 11.175C21.6083 11.9583 22 12.9 22 14C22 15.1 21.6083 16.0417 20.825 16.825C20.0417 17.6083 19.1 18 18 18ZM10 26V23.2C10 22.6333 10.1458 22.1125 10.4375 21.6375C10.7292 21.1625 11.1167 20.8 11.6 20.55C12.6333 20.0333 13.6833 19.6458 14.75 19.3875C15.8167 19.1292 16.9 19 18 19C19.1 19 20.1833 19.1292 21.25 19.3875C22.3167 19.6458 23.3667 20.0333 24.4 20.55C24.8833 20.8 25.2708 21.1625 25.5625 21.6375C25.8542 22.1125 26 22.6333 26 23.2V26H10ZM12 24H24V23.2C24 23.0167 23.9542 22.85 23.8625 22.7C23.7708 22.55 23.65 22.4333 23.5 22.35C22.6 21.9 21.6917 21.5625 20.775 21.3375C19.8583 21.1125 18.9333 21 18 21C17.0667 21 16.1417 21.1125 15.225 21.3375C14.3083 21.5625 13.4 21.9 12.5 22.35C12.35 22.4333 12.2292 22.55 12.1375 22.7C12.0458 22.85 12 23.0167 12 23.2V24ZM18 16C18.55 16 19.0208 15.8042 19.4125 15.4125C19.8042 15.0208 20 14.55 20 14C20 13.45 19.8042 12.9792 19.4125 12.5875C19.0208 12.1958 18.55 12 18 12C17.45 12 16.9792 12.1958 16.5875 12.5875C16.1958 12.9792 16 13.45 16 14C16 14.55 16.1958 15.0208 16.5875 15.4125C16.9792 15.8042 17.45 16 18 16Z"
                    fill="#020831"
                  />
                </g>
              </svg>
              {showProfile && token != null && (
                <div className="bg-white w-auto flex flex-col gap-[16px] items-center justify-start rounded-[7px] absolute top-[35px] right-0 shadow-md cursor-pointer z-50">
                  <Link href={"/maintenance"}>
                    <div className=" hover:bg-slate-100 px-[48px] py-[12px] w-full">
                      <h1 className="whitespace-nowrap">Profil Saya</h1>
                    </div>
                  </Link>
                  {isMitra && (
                    <Link href={"/iklan"}>
                      <div className=" hover:bg-slate-100 px-[48px] py-[12px] w-full">
                        <h1 className="whitespace-nowrap">Iklan Saya</h1>
                      </div>
                    </Link>
                  )}
                  <div
                    className=" hover:bg-slate-100 px-[48px] py-[12px] w-full "
                    onClick={handleLogout}
                  >
                    <h1 className="whitespace-nowrap">Keluar</h1>
                  </div>
                </div>
              )}
            </div>

            {token == null ? (
              <Link href={"/login"}>
                <h1 className="cursor-pointer">Sign In</h1>
              </Link>
            ) : null}
          </div>
        </div>
        {/* <SignInModal isOpen={isSignInModalOpen} onClose={closeSignInModal} /> */}
      </div>
      {isMenuOpenResults && (
        <div className="bg-white fixed w-full h-full z-40">
          <div className="flex flex-col items-center justify-center gap-8">
            <SearchBar />
            <div className="flex items-center gap-[16px] justify-center">
              <div
                className="cursor-pointer relative"
                onClick={handleShowProfile}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <circle cx="18" cy="18" r="18" fill="#F2F2F2" />
                  <mask
                    id="mask0_280_1150"
                    maskUnits="userSpaceOnUse"
                    x="6"
                    y="6"
                    width="24"
                    height="24"
                  >
                    <rect x="6" y="6" width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_280_1150)">
                    <path
                      d="M18 18C16.9 18 15.9583 17.6083 15.175 16.825C14.3917 16.0417 14 15.1 14 14C14 12.9 14.3917 11.9583 15.175 11.175C15.9583 10.3917 16.9 10 18 10C19.1 10 20.0417 10.3917 20.825 11.175C21.6083 11.9583 22 12.9 22 14C22 15.1 21.6083 16.0417 20.825 16.825C20.0417 17.6083 19.1 18 18 18ZM10 26V23.2C10 22.6333 10.1458 22.1125 10.4375 21.6375C10.7292 21.1625 11.1167 20.8 11.6 20.55C12.6333 20.0333 13.6833 19.6458 14.75 19.3875C15.8167 19.1292 16.9 19 18 19C19.1 19 20.1833 19.1292 21.25 19.3875C22.3167 19.6458 23.3667 20.0333 24.4 20.55C24.8833 20.8 25.2708 21.1625 25.5625 21.6375C25.8542 22.1125 26 22.6333 26 23.2V26H10ZM12 24H24V23.2C24 23.0167 23.9542 22.85 23.8625 22.7C23.7708 22.55 23.65 22.4333 23.5 22.35C22.6 21.9 21.6917 21.5625 20.775 21.3375C19.8583 21.1125 18.9333 21 18 21C17.0667 21 16.1417 21.1125 15.225 21.3375C14.3083 21.5625 13.4 21.9 12.5 22.35C12.35 22.4333 12.2292 22.55 12.1375 22.7C12.0458 22.85 12 23.0167 12 23.2V24ZM18 16C18.55 16 19.0208 15.8042 19.4125 15.4125C19.8042 15.0208 20 14.55 20 14C20 13.45 19.8042 12.9792 19.4125 12.5875C19.0208 12.1958 18.55 12 18 12C17.45 12 16.9792 12.1958 16.5875 12.5875C16.1958 12.9792 16 13.45 16 14C16 14.55 16.1958 15.0208 16.5875 15.4125C16.9792 15.8042 17.45 16 18 16Z"
                      fill="#020831"
                    />
                  </g>
                </svg>
                {showProfile && token != null && (
                  <div className="bg-white w-auto flex flex-col gap-[16px] items-center justify-center rounded-[7px] z-50 absolute top-[36px] md:right-0 left-1/2 transform translate-x-[-50%] shadow-md cursor-pointer">
                    <Link href={"/maintenance"}>
                      <div className=" hover:bg-slate-100 px-[48px] py-[12px] w-full">
                        <h1 className="whitespace-nowrap">Profil Saya</h1>
                      </div>
                    </Link>
                    {isMitra && (
                      <Link href={"/iklan"}>
                        <div className=" hover:bg-slate-100 px-[48px] py-[12px] w-full">
                          <h1 className="whitespace-nowrap">Iklan Saya</h1>
                        </div>
                      </Link>
                    )}
                    <div
                      className=" hover:bg-slate-100 px-[48px] py-[12px] w-full "
                      onClick={handleLogout}
                    >
                      <h1 className="whitespace-nowrap">Keluar</h1>
                    </div>
                  </div>
                )}
              </div>

              {token == null ? (
                <Link href={"/login"}>
                  <h1 className="cursor-pointer">Sign In</h1>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarResults;
