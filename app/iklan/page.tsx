"use client";

import FilterBar from "@/src/infrastructure/ui/iklan/filterBar";
import IklanSayaContainer from "@/src/infrastructure/ui/iklan/iklanSayaContainer";
import LayoutTemplate from "@/src/utils/layout";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useGetPostByAuthor } from "@/src/application/hooks/posts/useGetPostByAuthor";
import Link from "next/link";
import LoadingState from "@/src/infrastructure/ui/global/state/loading";
import { Skeleton } from "@/src/components/ui/skeleton";
import TambahIcon from "@/public/svg/tambah.svg";

interface parsedUser {
  id: string;
  email: string;
  name: string;
  isMitra: boolean;
}

const Page = () => {
  const [mitraId, setMitraId] = useState<string | null>(null);
  // const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Retrieve user data from cookies
    const storedUser = Cookies.get("user");

    if (storedUser) {
      const parsedUser: parsedUser = JSON.parse(storedUser);
      setMitraId(parsedUser.id);
      console.log(parsedUser.id);
    }
  }, []);

  const id = "someId"; // Replace with your actual ID or a variable that holds it
  const { data, isLoading, isError } = useGetPostByAuthor(mitraId);

  return (
    <LayoutTemplate>
      <div>
        <h1 className="font-inter font-semibold text-[30px] mb-[32px]">
          Iklan Saya
        </h1>
        <FilterBar />
        <div className="flex flex-col gap-[12px]">
          <LoadingState
            loadingFallback={<Skeleton className="h-[112px] w-full" />}
            isLoading={isLoading}
          >
            <IklanSayaContainer data={data} />
          </LoadingState>
          <Link href="/create">
            <div className="w-full h-[112px] flex items-center justify-center gap-[12px] border-dashed border-2 border-[#DFDFDF] hover:border-color2 rounded-[8px] cursor-pointer">
              <TambahIcon />
              <h1 className="font-satoshi text-[#AFAFAF] font-bold text-[18px]">
                Tambahkan Iklan
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </LayoutTemplate>
  );
};

export default Page;
