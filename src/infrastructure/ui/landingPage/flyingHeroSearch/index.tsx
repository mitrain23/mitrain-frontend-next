"use client";

import LocationIcon from "@/public/svg/location.svg";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { City } from "@/src/domain/entities/city";
import { Province } from "@/src/domain/entities/province";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";

type TProps = {
  provinces: Province[];
};

const API_BASE_URL = process.env.BASE_URL;

const FlyingHeroSearch: React.FC<TProps> = ({ provinces }) => {
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("");

  const [cities, setCities] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string>("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [search, setSearch] = useState("");

  const { data: categories } = useQuery("get_categories", async () => {
    const response = await axios.get(API_BASE_URL + "/api/category");

    const categories: string[] = [];

    for (const category of response.data.data) {
      categories.push(category.categoryName);
    }

    return categories;
  });

  const getSearchParams = useCallback(() => {
    const params = [];

    if (search) {
      params.push("searchText=" + search);
    }

    const city = cities.find((city) => city.id === selectedCityId)?.name;
    const province = provinces.find(
      (province) => province.id === selectedProvinceId,
    )?.name;

    if (city && province) {
      params.push("lokasi=" + city + ", " + province);
    }

    if (selectedCategory) {
      params.push("categoryName=" + selectedCategory);
    }

    return params.join("&");
  }, [search, selectedCityId, selectedProvinceId, selectedCategory]);

  useEffect(() => {
    if (selectedProvinceId) {
      axios
        .get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinceId}.json`,
        )
        .then((response) => setCities(response.data));
    }
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

            <Select
              onValueChange={(value) => {
                
                setSelectedCategory(value);
              }}
            >
              <SelectTrigger className="w-1/2 h-[56px] leading-[24px] text-[#757575] text-[16px] bg-[#fbfbfb] rounded-[8px] border-none">
                <SelectValue placeholder="Jenis" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category, idx) => (
                  <SelectItem
                    value={category}
                    className="h-[56px] cursor-pointer"
                    key={idx}
                  >
                    {category}
                  </SelectItem>
                ))}
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

          <div className="grid grid-cols-12 gap-[16px]">
            <Input
              type="text"
              placeholder="Apa yang sedang anda cari?"
              className="col-span-8 h-[56px] bg-[#FBFBFB] border-none rounded-[8px] placeholder:text-[#757575] text-[16px]"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link href={`/results?${getSearchParams()}`} className="col-span-4">
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
