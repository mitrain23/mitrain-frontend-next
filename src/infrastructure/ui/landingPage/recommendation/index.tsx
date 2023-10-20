"use client";

import React from "react";
import RecommendationCard from "./recommendationCard";
import { useGetAllPost } from "@/src/application/hooks/posts/useGetAllPost";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Button } from "@/src/components/ui/button";
import LoadingState from "@/src/components/reusable/state/LoadingState";

const RecommendationLoading = () => {
  return (
    <div className="w-full">
      <Skeleton className="w-full h-[160px] bg-primary rounded-[12px]" />
      <div className="flex flex-col mt-[18px]">
        <div>
          <Skeleton className="overflow-hidden text-ellipsis text-[22px] bg-primary/80 font-bold truncate">
            &nbsp;
          </Skeleton>
          <Skeleton className="text-[16px] w-8/12 bg-primary/60 font-inter font-medium text-[#425379] mt-1">
            &nbsp;
          </Skeleton>
        </div>
      </div>

      <div className="flex flex-col mt-[14px] gap-[18px]">
        <Skeleton className="overflow-hidden text-ellipsis text-[22px] bg-primary/90 font-bold truncate">
          &nbsp;
        </Skeleton>
        <Button
          variant="outline"
          disabled
          className="rounded-full h-[48px] hover:bg-[#020831] hover:text-white hover:border-[#020831]"
        >
          &nbsp;
        </Button>
      </div>
    </div>
  );
};

const Recommendation = () => {
  const getRecommendedPost = useGetAllPost(1);

  return (
    <div className="font-satoshi">
      <div className="heading text-center text-[32px] font-bold mb-[32px]">
        Rekomendasi untuk anda
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center md:place-items-start max-lg:gap-10 gap-[32px] my-4">
        <LoadingState
          isLoading={getRecommendedPost.isLoading}
          loadingFallback={<RecommendationLoading />}
          loadingCount={4}
        >
          {getRecommendedPost.data
            ?.slice(0, 4)
            .map((post, idx) => <RecommendationCard data={post} key={idx} />)}
        </LoadingState>
      </div>
    </div>
  );
};

export default Recommendation;
