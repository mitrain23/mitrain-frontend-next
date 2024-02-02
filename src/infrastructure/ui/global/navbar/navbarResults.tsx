"use client";

import ChatIcon from "@/public/svg/chat.svg";
import HamburgerIcon from "@/public/svg/hamburger.svg";
import UserAvatarIcon from "@/public/svg/user_avatar.svg";
import {
  BellIcon,
  ChevronDownIcon,
  Cross1Icon,
  PersonIcon,
} from "@radix-ui/react-icons";
import Cookies from "js-cookie";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "./searchBar";

import { useUser } from "@/src/application/hooks/global/useUser";
import { useChatStore } from "@/src/application/zustand/useChatStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Separator } from "@/src/components/ui/separator";
import { ChatRepository } from "@/src/infrastructure/services/chat/chatRepository";
import axios from "axios";

interface parsedUser {
  id: string;
  email: string;
  name: string;
  isMitra: boolean;
}

const API_BASE_URL = process.env.BASE_URL;

const NavbarResults = ({
  token,
}: {
  isResults?: boolean;
  token?: RequestCookie | undefined;
}) => {
  const [isMenuOpenResults, setIsMenuOpenResults] = useState(false);

  const { notifications, setNotifications } = useChatStore((state) => state);

  const { currentUser } = useUser();

  const [categories, setCategories] = useState<string[]>([]);
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

    const getCategories = async () => {
      const response = await axios.get(API_BASE_URL + "/api/category");

      const categories: string[] = [];

      for (const category of response.data.data) {
        categories.push(category.categoryName);
      }

      setCategories(categories);
    };

    if (token) {
      ChatRepository.getNotifications().then((data) => {
        const notificationForCurrentUser = data.filter(
          (notification) => notification.sender.id !== currentUser?.id,
        );

        setNotifications(notificationForCurrentUser);
      });
    }

    getCategories();
  }, []);

  useEffect(() => {
    // Add or remove a class to the body to disable scrolling
    if (isMenuOpenResults) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up the class when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpenResults]);

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="hidden lg:flex items-center gap-[6px] cursor-pointer">
                  <h1>Kategori</h1>
                  <ChevronDownIcon className="w-[24px] h-[24px] fill-[#020831] stroke-[#020831] p-1" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="center">
                {categories.map((category, idx) => (
                  <DropdownMenuItem
                    className="py-[12px] cursor-pointer"
                    key={idx}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
        <div className="hidden md:flex items-center gap-6">
          <SearchBar />
          <Separator
            orientation="vertical"
            className="h-[40px] w-[2px] bg-[#D3D3D3]"
          />
          <div className="flex items-center gap-[16px]">
            {token == null ? (
              <>
                <UserAvatarIcon />
                <Link href={"/login"}>
                  <h1 className="cursor-pointer">Sign In</h1>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-6">
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer" asChild>
                    <div className="relative">
                      <BellIcon className="w-[30px] h-[30px]" />
                      {notifications.length > 0 && (
                        <p className="absolute text-sm top-0 -right-1 p-1 rounded-full bg-red-600"></p>
                      )}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="center">
                    {notifications.filter(
                      (notification) =>
                        notification.sender.id !== currentUser?.id,
                    ).length ? (
                      <DropdownMenuItem className="py-[12px] cursor-pointer">
                        <Link href="/chat">
                          {notifications.length} pesan belum dibaca
                        </Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem className="py-[12px] cursor-pointer">
                        Tidak ada notifikasi
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/chat">
                  <ChatIcon className="w-[30px] h-[30px]" />
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <UserAvatarIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuItem className="py-[12px]">
                      <Link href={"/maintenance"} className="w-full">
                        Profil Saya
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="py-[12px] focus:bg-destructive focus:text-white cursor-pointer"
                    >
                      Keluar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger>
                    <h1 className="text-[16px]">Kategori</h1>
                  </AccordionTrigger>
                  <AccordionContent className="text-[16px] text-[#425379]">
                    {categories.map((category, idx) => (
                      <p className="py-[12px] cursor-pointer w-full" key={idx}>
                        {category}
                      </p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {token == null ? (
              <Button className="space-x-2 w-full h-[48px]">
                <PersonIcon />
                <Link href={"/login"} className="cursor-pointer">
                  Sign In
                </Link>
              </Button>
            ) : (
              <div className="space-y-4 flex flex-col w-full">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1" className="border-none py-0">
                    <AccordionTrigger className="text-base">
                      <p>
                        Notifikasi{" "}
                        {notifications.length > 0 && (
                          <span className="font-bold text-red-600">
                            &#x2022;
                          </span>
                        )}
                      </p>
                    </AccordionTrigger>
                    {notifications.length ? (
                      <AccordionContent className="text-[16px] text-[#425379]">
                        <Link href="/chat">
                          {notifications.length} Pesan belum dibaca
                        </Link>
                      </AccordionContent>
                    ) : (
                      <AccordionContent className="text-[16px] text-[#425379]">
                        Tidak ada notifikasi
                      </AccordionContent>
                    )}
                  </AccordionItem>
                </Accordion>
                <Link href="/chat">Chat</Link>
                <Link href="/maintenance">Profil Saya</Link>
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
