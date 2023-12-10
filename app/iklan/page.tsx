"use client";

import FilterBar from "@/src/infrastructure/ui/iklan/filterBar";
import IklanSayaContainer from "@/src/infrastructure/ui/iklan/iklanSayaContainer";
import LayoutTemplate from "@/src/utils/layout";
import Cookies from "js-cookie";
import React, { useCallback } from "react";
import Link from "next/link";
import LoadingState from "@/src/infrastructure/ui/global/state/loading";
import { Skeleton } from "@/src/components/ui/skeleton";
import TambahIcon from "@/public/svg/tambah.svg";
import { useQuery } from "react-query";
import { PostsRepository } from "@/src/infrastructure/services/posts/postsRepository";

interface parsedUser {
  id: string;
  email: string;
  name: string;
  isMitra: boolean;
}

const Page = () => {
  const getMitraId = useCallback(() => {
    const storedUser = Cookies.get("user");

    if (storedUser) {
      const parsedUser: parsedUser = JSON.parse(storedUser);
      return parsedUser.id;
    }

    return null;
  }, []);

  const { data, isLoading } = useQuery(
    ["get_posts_by_author", getMitraId()],
    () => PostsRepository.getPostByAuthor(getMitraId()),
  );

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
