"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetAllPost } from "@/src/application/hooks/posts/useGetAllPost";
import Pagination from "@/src/infrastructure/ui/results/pagination";
import { PostFilter } from "@/src/domain/entities/postFilter";
import Card from "@/src/infrastructure/ui/results/card";
import LayoutTemplate from "@/src/utils/layout";
import Filter from "@/src/infrastructure/ui/results/filter";
import CardSlider from "@/src/infrastructure/ui/results/cardSlider";
import LoadingState from "@/src/infrastructure/ui/global/state/loading";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import EmptyState from "@/src/infrastructure/ui/global/state/empty";

const CardLoading = () => {
  return (
    <div className="w-full flex flex-col">
      <Skeleton className="w-full h-[160px] rounded-[12px] mb-[18px]" />
      <div>
        <div className="flex flex-col gap-[6px] mb-[12px]">
          <Skeleton className="font-satoshi text-[22px] font-bold text-[#020831]">
            &nbsp;
          </Skeleton>
          <Skeleton className="font-inter text-[#425379] text-[16px]">
            &nbsp;
          </Skeleton>
        </div>
        <Skeleton className="mitra-premium flex flex-row gap-1 mb-[12px] w-6/12">
          &nbsp;
        </Skeleton>
        <Skeleton className="font-bold lg:text-[22px] font-satoshi text-[#020831]">
          &nbsp;
        </Skeleton>
      </div>
    </div>
  );
};

const Results = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const lokasi = searchParams.get("lokasi");

  const [pageNumber, setPageNumber] = useState(1);

  const [formData, setFormData] = useState<PostFilter>({
    search: search || "",
    price_min: "",
    price_max: "",
    lokasi: lokasi || "",
    page: pageNumber,
  });

  const getAllPostByFilterQuery = useGetAllPost(pageNumber);

  useEffect(() => {
    getAllPostByFilterQuery.refetch();
  }, [pageNumber]);

  const handlePageChange = (data: number) => {
    setPageNumber(data);
    setFormData((prev) => ({
      ...prev,
      page: data,
    }));
  };

  return (
    <LayoutTemplate>
      <Filter />
      <div className="Heading-Konveksi-Baju font-inter text-[30px] font-semibold text-[#020831]">
        <h1>Konveksi Baju</h1>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center md:place-items-start max-lg:gap-10 gap-[32px] my-4">
        <LoadingState
          loadingFallback={<CardLoading />}
          loadingCount={4}
          isLoading={getAllPostByFilterQuery.isLoading}
        >
          <EmptyState data={getAllPostByFilterQuery.data}>
            {getAllPostByFilterQuery.data?.map((item) => {
              return (
                <div className="w-full" key={item.id}>
                  <Card data={item} />
                </div>
              );
            })}
          </EmptyState>
        </LoadingState>
      </div>
      <Pagination handlePageChange={handlePageChange} />
      <div className="mb-[48px]"></div>
      <div
        className={
          getAllPostByFilterQuery.isLoading
            ? "flex md:flex-row flex-col gap-4"
            : ""
        }
      >
        <LoadingState
          loadingFallback={<CardLoading />}
          loadingCount={4}
          isLoading={getAllPostByFilterQuery.isLoading}
        >
          {!getAllPostByFilterQuery.data?.length ? (
            <Alert>
              <AlertTitle>Maaf</AlertTitle>
              <AlertDescription>
                Data yang dicari tidak ditemukan / Kosong
              </AlertDescription>
            </Alert>
          ) : (
            <CardSlider data={getAllPostByFilterQuery.data} />
          )}
        </LoadingState>
      </div>
    </LayoutTemplate>
  );
};

export default Results;
