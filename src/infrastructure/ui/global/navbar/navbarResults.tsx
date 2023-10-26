"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import SearchBar from "./searchBar";
import Cookies from "js-cookie";
import { ChevronDownIcon, Cross1Icon, PersonIcon } from "@radix-ui/react-icons";
import HamburgerIcon from "@/public/svg/hamburger.svg";
import UserAvatarIcon from "@/public/svg/user_avatar.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";

interface parsedUser {
  id: string;
  email: string;
  name: string;
  isMitra: boolean;
}

/** TODO:
 * - Mobile nav item menu
 */
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
            <h1 className="font-satoshi text-[20px] font-bold text-[#0054A5]">
              MitraIn ID
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-[16px]">
            <div className="hidden lg:flex items-center gap-[6px]">
              <h1>Kategori</h1>
              <ChevronDownIcon className="w-[24px] h-[24px] fill-[#020831] stroke-[#020831] p-1" />
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
              <Cross1Icon className="w-[20px] h-[20px] fill-[#1C1B1F] stroke-[#1C1B1F]" />
            </button>
          ) : (
            <button
              className="text-gray-700 hover:text-gray-900 font-bold"
              onClick={handleMenuToggleResults}
            >
              <div className="cursor-pointer md:hidden">
                <HamburgerIcon className="fill-[#1C1B1F] stroke-[#1C1B1F]" />
              </div>
            </button>
          )}
        </div>

        {/* Profile Desktop */}
        <div className="hidden md:flex items-center gap-[32px]">
          <SearchBar />
          <div className="flex items-center gap-[16px]">
            {token == null ? (
              <>
                <UserAvatarIcon />
                <Link href={"/login"}>
                  <h1 className="cursor-pointer">Sign In</h1>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <UserAvatarIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem className="pr-[48px] py-[12px]">
                    <Link href={"/maintenance"}>Profil Saya</Link>
                  </DropdownMenuItem>
                  {isMitra && (
                    <DropdownMenuItem className="pr-[48px] py-[12px]">
                      <Link href={"/iklan"}>Iklan Saya</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="pr-[48px] py-[12px] focus:bg-destructive focus:text-white cursor-pointer"
                  >
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        {/* <SignInModal isOpen={isSignInModalOpen} onClose={closeSignInModal} /> */}
      </div>

      {/* Profile Mobile */}
      {isMenuOpenResults && (
        <div className="bg-white fixed w-full h-full z-40">
          <div className="flex flex-col items-start justify-center gap-8 px-[24px] pt-[18px]">
            <SearchBar className="rounded-[8px]" />
            <div className="mt-[32px] space-y-4 text-[#020831] w-full">
              <div className="flex items-center justify-between gap-[6px] w-full">
                <h1 className="text-[16px]">Kategori</h1>
                <ChevronDownIcon className="w-[24px] h-[24px] fill-[#020831] stroke-[#020831] p-1" />
              </div>
              <Link href={"/registerMitra"} className="inline-block">
                <h1 className="text-[16px]">Gabung Jadi Mitra</h1>
              </Link>
            </div>

            {token == null ? (
              <Button className="space-x-2 w-full">
                <PersonIcon />
                <Link href={"/login"} className="cursor-pointer">
                  Sign In
                </Link>
              </Button>
            ) : (
              <div className="space-y-4 flex flex-col w-full">
                <Link href="/maintenance">Profil Saya</Link>
                {isMitra && <Link href="/iklan">Iklan Saya</Link>}
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Keluar
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarResults;
