"use client";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import React, { useState, useEffect, useRef } from "react";
import FilterIcon from "@/public/svg/filter_mobile.svg";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";

type TProps = {
  setPriceMin: (value: React.SetStateAction<string>) => void;
  setPriceMax: (value: React.SetStateAction<string>) => void;
};

const Filter: React.FC<TProps> = ({ setPriceMax, setPriceMin }) => {
  const [open, setOpen] = useState(false);
  const focusRef = useRef<any>();

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (focusRef.current && !focusRef.current.contains(e.target)) {
        setOpen(!open);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [open]);

  return (
    <div className="">
      <div className="hidden lg:flex flex-row justify-between items-center mb-[36px]">
        <div className="flex flex-row items-center gap-[24px] z-10">
          <p className="font-inter text-[16px] font-semibold text-[#020831]">
            Harga
          </p>
          <div className="flex items-center">
            <p className="h-[56px] bg-[#F3F4F5] text-[#6F7277] w-[56px] border-2 border-[#E5E7E9] leading-[24px] flex items-center justify-center rounded-l-[8px]">
              Rp
            </p>
            <Input
              onChange={(e) => setPriceMin(e.target.value)}
              type="text"
              placeholder="Harga Minimum"
              className="focus:outline-none focus-visible:ring-[#E5E7E9] h-[56px] rounded-l-none rounded-r-[8px] border-[#E5E7E9] border-l-none"
            />
          </div>
          <div className="flex items-center">
            <p className="h-[56px] bg-[#F3F4F5] text-[#6F7277] w-[56px] border-2 border-[#E5E7E9] leading-[24px] flex items-center justify-center rounded-l-[8px]">
              Rp
            </p>
            <Input
              onChange={(e) => setPriceMax(e.target.value)}
              type="text"
              placeholder="Harga Maksimum"
              className="focus:outline-none focus-visible:ring-[#E5E7E9] h-[56px] rounded-l-none rounded-r-[8px] border-[#E5E7E9] border-l-none"
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-[24px]">
          <p className="font-inter text-[16px] font-semibold text-[#020831]">
            Urutkan
          </p>
          <Select>
            <SelectTrigger className="w-[215px] max-w-xs font-inter text-[#6F7277] font-normal text-[16px] h-[56px]">
              <SelectValue placeholder="Paling Sesuai" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  disabled
                  className="h-[56px] cursor-pointer"
                  value="paling_sesuai"
                >
                  Paling Sesuai
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <div
            className="flex flex-row items-center py-[14px] px-[24px] gap-[42px] lg:hidden  w-[151px] h-[48px] rounded-[8px] border-[1px] border-[#D9D9D9] bg-white mb-[32px] mt-[16px]"
            onClick={() => setOpen((open) => !open)}
          >
            <h1>Filter</h1>
            <FilterIcon />
          </div>
        </SheetTrigger>
        <SheetContent side="bottom" className="pt-16">
          <div className="flex justify-between items-center gap-[24px]">
            <p className="font-inter text-[14px] font-semibold text-[#020831]">
              Urutkan
            </p>
            <Select>
              <SelectTrigger className="w-[191px] focus:ring-0 max-w-xs font-inter text-[#6F7277] font-normal text-[16px] h-[48px]">
                <SelectValue
                  placeholder="Paling Sesuai"
                  className="placeholder:text-[16px]"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    disabled
                    className="h-[56px] cursor-pointer"
                    value="paling_sesuai"
                  >
                    Paling Sesuai
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-start justify-between mt-[13px]">
            <p className="font-inter text-[14px] font-semibold text-[#020831]">
              Harga
            </p>
            <div className="space-y-[12px]">
              <div className="flex items-center">
                <p className="h-[44px] bg-[#F3F4F5] text-[#6F7277] w-[44px] border-2 border-[#E5E7E9] leading-[20px] flex items-center justify-center rounded-l-[8px]">
                  Rp
                </p>
                <Input
                  type="text"
                  placeholder="Harga Minimum"
                  className="focus:outline-none focus-visible:ring-[#E5E7E9] h-[44px] rounded-l-none rounded-r-[8px] border-[#E5E7E9] border-l-none"
                />
              </div>

              <div className="flex items-center">
                <p className="h-[44px] bg-[#F3F4F5] text-[#6F7277] w-[44px] border-2 border-[#E5E7E9] leading-[20px] flex items-center justify-center rounded-l-[8px]">
                  Rp
                </p>
                <Input
                  type="text"
                  placeholder="Harga Maksimum"
                  className="focus:outline-none focus-visible:ring-[#E5E7E9] h-[44px] rounded-l-none rounded-r-[8px] border-[#E5E7E9] border-l-none"
                />
              </div>
            </div>
          </div>
          <Button className="bg-[#0066C9] w-full mt-[13px] font-bold mt-10">
            Terapkan Filter
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Filter;
