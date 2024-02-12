"use client";

import LocationIcon from "@/public/svg/location_mobile.svg";
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

const MobileHero: React.FC<TProps> = ({ provinces }) => {
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

    const location =
      cities.find((city) => city.id === selectedCityId)?.name +
      ", " +
      provinces.find((province) => province.id === selectedProvinceId)?.name;

    if (location) {
      params.push("lokasi=" + location);
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
    <div className="w-full px-[24px]">
      <div className="flex space-x-1 items-center text-[16px] mb-[24px] cursor-pointer">
        <h1>Vendor</h1>
        <ChevronDownIcon className="w-[24px] aspect-square fill-[#020831] stroke-[#020831]" />
      </div>
      <form action="" className="flex flex-col gap-[16px]">
        <div className="flex gap-0">
          <Select
            onValueChange={(selectedProvinceId) => {
              const selectedProvince = provinces.find(
                (province) => province.id === selectedProvinceId,
              );

              setSelectedProvinceId(selectedProvince?.id || "");
              setCities([]);
              setSelectedCityId("");
            }}
          >
            <SelectTrigger className="w-1/2 h-[56px] leading-[24px] text-[#757575] bg-[#fff] rounded-[8px] rounded-r-none border border-[#d9d9d9] focus:ring-[#d9d9d9]">
              <div className="flex items-center space-x-2 truncate">
                <LocationIcon />
                <SelectValue placeholder="Semua Lokasi" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {provinces.map((province, idx) => (
                  <SelectItem
                    key={idx}
                    className="h-[56px] cursor-pointer"
                    value={province.id}
                  >
                    {province.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger className="w-1/2 h-[56px] leading-[24px] text-[#757575] bg-[#fff] rounded-[8px] rounded-l-none border border-[#d9d9d9] focus:ring-[#d9d9d9]">
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
              <SelectItem value="lainnya" className="h-[56px] cursor-pointer">
                Lainnya
              </SelectItem>
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
            <SelectTrigger className="w-full h-[56px] leading-[24px] text-[#757575] bg-[#fff] rounded-[8px] border border-[#d9d9d9] focus:ring-[#d9d9d9]">
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
        <div className="flex flex-col gap-[16px]">
          <Input
            type="text"
            placeholder="Temukan Yang Anda Cari"
            className="bg-white border border-[#d9d9d9] w-full h-[56px] placeholder:text-[#757575] focus-visible:ring-[#d9d9d9]"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link href={`/results?${getSearchParams()}`}>
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
