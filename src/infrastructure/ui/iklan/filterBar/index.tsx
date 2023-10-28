import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import React from "react";

const FilterBar = () => {
  return (
    <div className="hidden md:flex flex-row items-center justify-between mb-[52px]">
      <div className="flex flex-row items-center gap-[36px]">
        <h1 className="font-inter text-[16px] font-semibold text-[#020831]">
          Urutkan
        </h1>
        <div className="flex flex-row items-center gap-[16px]">
          <Select>
            <SelectTrigger className="px-6 max-w-xs font-inter text-[#6F7277] font-normal text-[16px] border border-[#D9D9D9] rounded-full h-[56px]">
              <SelectValue
                placeholder="Semua Iklan "
                className="placeholder:text-[#6F7277]"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="paling-sesuai" className="h-[56px] text-lg">
                  Paling Sesuai
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-row items-center gap-[24px]">
        <h1 className="font-inter text-[16px] font-semibold text-[#020831] whitespace-nowrap">
          Berdasarkan Lokasi
        </h1>
        <Select defaultValue="kota-bandung">
          <SelectTrigger className="px-6 max-w-xs font-inter text-[#6F7277] font-normal text-[16px] border border-[#D9D9D9] rounded-full h-[56px]">
            <SelectValue placeholder="Lokasi" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                value="kota-bandung"
                defaultChecked
                className="h-[56px] text-lg"
              >
                Kota Bandung
              </SelectItem>
              <SelectItem value="kota-cirebon" className="h-[56px] text-lg">
                Kota Cirebon
              </SelectItem>
              <SelectItem value="kota-sumedang" className="h-[56px] text-lg">
                Kota Sumedang
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
