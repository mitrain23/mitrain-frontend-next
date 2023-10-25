import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import LocationIcon from "@/public/svg/location_mobile.svg";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

const MobileHero = () => {
  return (
    <div className="w-full px-[24px]">
      <div className="flex space-x-1 items-center text-[16px] mb-[24px] cursor-pointer">
        <h1>Vendor</h1>
        <ChevronDownIcon className="w-[24px] aspect-square fill-[#020831] stroke-[#020831]" />
      </div>
      <form action="" className="flex flex-col gap-[16px]">
        <div className="flex gap-0">
          <Select>
            <SelectTrigger className="w-1/2 h-[56px] leading-[24px] text-[#757575] bg-[#fff] rounded-[8px] rounded-r-none border border-[#d9d9d9] focus:ring-[#d9d9d9]">
              <div className="flex items-center space-x-2">
                <LocationIcon />
                <SelectValue placeholder="Semua Lokasi" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* TODO: Ngambil dari API kayak /create */}
                <SelectItem className="h-[56px] cursor-pointer" value="bandung">
                  Bandung
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-1/2 h-[56px] leading-[24px] text-[#757575] bg-[#fff] rounded-[8px] rounded-l-none border border-[#d9d9d9] focus:ring-[#d9d9d9]">
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
                <SelectItem value="lainnya" className="h-[56px] cursor-pointer">
                  Lainnya
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-[16px]">
          <Input
            type="text"
            placeholder="Temukan Yang Anda Cari"
            className="bg-white border border-[#d9d9d9] w-full h-[56px] placeholder:text-[#757575] focus-visible:ring-[#d9d9d9]"
          />
          <Link href={"/results"}>
            <Button className="bg-[#0066C9] w-full h-[44px] text-white rounded-[8px] font-medium">
              Cari
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default MobileHero;
