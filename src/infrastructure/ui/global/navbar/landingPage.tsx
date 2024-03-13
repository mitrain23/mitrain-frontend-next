"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";
import HamburgerIcon from "@/public/svg/hamburger.svg";
import { Separator } from "@/src/components/ui/separator";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

type TProps = {
  token?: RequestCookie;
};

const LandingPageNavbar: React.FC<TProps> = ({ token }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="drop-shadow-md w-full h-[92px] bg-white flex items-center justify-between px-8 xl:px-[240px] md:px-[100px] py-2 relative z-20">
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

        {/* Desktop Nav Menu */}
        <ul className="hidden md:flex space-x-4 items-center">
          <li>
            <Link href={"/pricing"}>
              <Button className="bg-[#020831] text-white px-[42px] py-[12px] h-[48px] rounded-[8px] cursor-pointer">
                Pasang Iklan
              </Button>
            </Link>
          </li>
          {!token && (
            <>
              <Separator
                orientation="vertical"
                className="h-[40px] w-[1px] bg-[#D3D3D3]"
              />
              <li>
                <Link href={"/login"}>
                  <Button
                    variant="outline"
                    className="px-[42px] py-[12px] h-[48px] rounded-[8px] cursor-pointer"
                  >
                    Masuk
                  </Button>
                </Link>
              </li>
              <li>
                <Link href={"/register"}>
                  <Button className="bg-[#020831] text-white px-[42px] py-[12px] h-[48px] rounded-[8px] cursor-pointer">
                    Daftar
                  </Button>
                </Link>
              </li>
            </>
          )}
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
        <div className="bg-white fixed inset-0 h-full z-10 flex flex-col px-[24px] justify-center">
          <ul className="px-4 font-semibold space-y-2 text-xl">
            <li className="w-full">
              <Link href="/pricing">
                <Button
                  variant="default"
                  className="h-[48px] rounded-[8px] cursor-pointer w-full"
                >
                  Pasang Iklan
                </Button>
              </Link>
            </li>

            <Separator className="bg-[#D3D3D3] my-2" />

            {!token && (
              <>
                <li className="w-full">
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="h-[48px] rounded-[8px] cursor-pointer w-full"
                    >
                      Masuk
                    </Button>
                  </Link>
                </li>

                <li className="w-full">
                  <Link href="/register">
                    <Button className="bg-[#020831] h-[48px] rounded-[8px] cursor-pointer w-full">
                      Daftar
                    </Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default LandingPageNavbar;
