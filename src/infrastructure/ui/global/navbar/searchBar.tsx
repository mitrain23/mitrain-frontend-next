"use client";

import { cn } from "@/lib/utils";
import { useDebounce } from "@/src/application/hooks/global/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type TProps = {
  className?: string;
};

const SearchBar = ({ className }: TProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchText, setSearchText] = useState("");
  const [searchInputFocus, setSearchInputFocus] = useState(false);

  const searchTextDebounce = useDebounce(searchText);

  useEffect(() => {
    if (pathname === "/results" && !searchParams.get("searchText")) {
      router.replace(`/results?searchText=${searchTextDebounce}`);
    } else if (searchInputFocus) {
      router.replace(`/results?searchText=${searchTextDebounce}`);
    }
  }, [searchTextDebounce, pathname, searchInputFocus]);

  return (
    <div
      className={cn(
        "flex items-center gap-[16px] w-full lg:w-[400px] h-[56px] rounded-[32px] bg-[#F6F6F6] px-[24px] py-[16px]",
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <mask
          id="mask0_22_152"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <rect width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_22_152)">
          <path
            d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
            fill="#757575"
          />
        </g>
      </svg>
      <input
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setSearchInputFocus(true)}
        onBlur={() => setSearchInputFocus(false)}
        type="text"
        placeholder="Cari Konveksi Baju Termurah..."
        className="w-full bg-transparent focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
