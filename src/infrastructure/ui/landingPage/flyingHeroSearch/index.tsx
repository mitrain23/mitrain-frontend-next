"use client";

import React from "react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

const FlyingHeroSearch = () => {
  return (
    <div
      className="bg-white font-inter shadow-md rounded-[16px] mx-auto max-w-[980px] h-fit absolute z-10 bottom-[-150px] sm:bottom-[-90px] right-0 left-0 px-[42px] py-[36px] flex flex-col items-center sm:items-stretch"
      style={{ zIndex: 1 }}
    >
      <div className="flex flex-row items-center text-[16px] mb-[24px] cursor-pointer">
        <h1>Vendor</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <mask
            id="mask0_9_245"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_9_245)">
            <path
              d="M12 14.95C11.8667 14.95 11.7417 14.9292 11.625 14.8875C11.5083 14.8458 11.4 14.775 11.3 14.675L6.7 10.075C6.51667 9.89166 6.425 9.65833 6.425 9.37499C6.425 9.09166 6.51667 8.85833 6.7 8.67499C6.88334 8.49166 7.11667 8.39999 7.4 8.39999C7.68334 8.39999 7.91667 8.49166 8.1 8.67499L12 12.575L15.9 8.67499C16.0833 8.49166 16.3167 8.39999 16.6 8.39999C16.8833 8.39999 17.1167 8.49166 17.3 8.67499C17.4833 8.85833 17.575 9.09166 17.575 9.37499C17.575 9.65833 17.4833 9.89166 17.3 10.075L12.7 14.675C12.6 14.775 12.4917 14.8458 12.375 14.8875C12.2583 14.9292 12.1333 14.95 12 14.95Z"
              fill="black"
            />
          </g>
        </svg>
      </div>

      {/* dropdown lokasi */}
      <div>
        <form className="flex flex-col gap-[16px]">
          <div className="flex flex-row gap-[32px]">
            <Select>
              <SelectTrigger className="w-1/2 h-[56px] leading-[24px] text-[#757575] bg-[#fbfbfb] rounded-[8px] border-none">
                <SelectValue placeholder="Pilih Lokasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    className="h-[56px] cursor-pointer"
                    value="bandung"
                  >
                    Bandung
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-1/2 h-[56px] leading-[24px] text-[#757575] bg-[#fbfbfb] rounded-[8px] border-none">
                <SelectValue placeholder="Jenis" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    value="konveksi"
                    className="h-[56px] cursor-pointer"
                  >
                    Konveksi
                  </SelectItem>
                  <SelectItem
                    value="others"
                    className="h-[56px] cursor-pointer"
                  >
                    Others
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-12 gap-[16px]">
            <Input
              type="text"
              placeholder="Apa yang sedang anda cari?"
              className="col-span-8 h-[56px] bg-[#FBFBFB] border-none rounded-[8px] placeholder:text-[#757575]"
            />
            <Link href={"/results"} className="col-span-4">
              <Button className="w-full h-[56px] text-white border-none rounded-[8px] bg-[#0066c9] hover:bg-[#0054A5] text-lg">
                Cari
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlyingHeroSearch;
