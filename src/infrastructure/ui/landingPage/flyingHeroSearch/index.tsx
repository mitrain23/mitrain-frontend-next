"use client";

import React, { useEffect, useState } from "react";
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
import { ChevronDownIcon } from "@radix-ui/react-icons";
import LocationIcon from "@/public/svg/location.svg";
import { Province } from "@/src/domain/entities/province";
import { City } from "@/src/domain/entities/city";
import { Separator } from "@/src/components/ui/separator";

type TProps = {
  provinces: Province[];
};

const FlyingHeroSearch: React.FC<TProps> = ({ provinces }) => {
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("");

  const [cities, setCities] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string>("");

  useEffect(() => {
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinceId}.json`,
    )
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => {
        console.log(err);
      });
  }, [selectedProvinceId]);

  return (
    <div
      className="bg-white font-inter shadow-md rounded-[16px] mx-auto max-w-[980px] h-fit absolute z-10 bottom-[-150px] sm:bottom-[-90px] right-0 left-0 px-[42px] py-[36px] flex flex-col items-center sm:items-stretch"
      style={{ zIndex: 1 }}
    >
      <div className="flex space-x-1 items-center text-[16px] mb-[24px] cursor-pointer">
        <h1>Vendor</h1>
        <ChevronDownIcon className="w-[24px] aspect-square fill-[#020831] stroke-[#020831]" />
      </div>

      {/* dropdown lokasi */}
      <div>
        <form className="flex flex-col gap-[16px]">
          <div className="flex flex-row gap-[32px]">
            <Select
              onValueChange={(selectedProvinceId) => {
                const selectedProvince = provinces.find(
                  (province) => province.id === selectedProvinceId,
                );

                setSelectedProvinceId(selectedProvince?.id || "");
                setCities([]);
              }}
            >
              <SelectTrigger className="w-1/2 h-[56px] leading-[24px] text-[#757575] text-[16px] bg-[#fbfbfb] rounded-[8px] border-none">
                <div className="flex items-center space-x-2">
                  <LocationIcon />
                  <SelectValue placeholder="Semua Lokasi" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {provinces.map((province, idx) => (
                    <SelectItem
                      className="h-[56px] cursor-pointer"
                      value={province.id}
                      key={idx}
                    >
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-1/2 h-[56px] leading-[24px] text-[#757575] text-[16px] bg-[#fbfbfb] rounded-[8px] border-none">
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
                    value="lainnya"
                    className="h-[56px] cursor-pointer"
                  >
                    Lainnya
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {selectedProvinceId && (
            <Select
              value={selectedCityId}
              onValueChange={(selectedCityId) => {
                setSelectedCityId(selectedCityId);
              }}
            >
              <SelectTrigger className="w-full h-[56px] leading-[24px] text-[#757575] text-[16px] bg-[#fbfbfb] rounded-[8px] border-none">
                <SelectValue placeholder="Pilih Kota/Kabupaten" />
              </SelectTrigger>
              <SelectGroup>
                <SelectContent>
                  {cities.map((city, idx) => (
                    <SelectItem className="h-[56px]" value={city.id} key={idx}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectGroup>
            </Select>
          )}

          <Separator className="my-2" />

          <div className="grid grid-cols-12 gap-[16px]">
            <Input
              type="text"
              placeholder="Apa yang sedang anda cari?"
              className="col-span-8 h-[56px] bg-[#FBFBFB] border-none rounded-[8px] placeholder:text-[#757575] text-[16px]"
            />
            <Link href={"/results"} className="col-span-4">
              <Button className="w-full h-[56px] text-white border-none rounded-[8px] text-[16px] bg-[#0066c9] hover:bg-[#0054A5] text-lg">
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
