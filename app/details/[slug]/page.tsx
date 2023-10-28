"use client";

import { useGetPostById } from "@/src/application/hooks/posts/useGetPostById";
import { Skeleton } from "@/src/components/ui/skeleton";
import DescriptionDetails from "@/src/infrastructure/ui/details/descriptionDetails";
import HeaderDetails from "@/src/infrastructure/ui/details/headerDetails";
import LoadingState from "@/src/infrastructure/ui/global/state/loading";
import LayoutTemplate from "@/src/utils/layout";
import Link from "next/link";
import WAIcon from "@/public/svg/wa.svg";
import LikeProductIcon from "@/public/svg/like_product.svg";
import AddBookmarkIcon from "@/public/svg/add_bookmark.svg";
import PremiumIcon from "@/public/svg/premium.svg";
import TruckIcon from "@/public/svg/truck.svg";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";

const HeaderDetailsLoading = () => {
  return (
    <div className="flex flex-col md:flex-row gap-[28px] mb-[41px]">
      <div className="flex flex-col gap-[40px] md:w-[720px] w-full">
        <Skeleton className="md:h-[405px] w-full" />
        <div className="flex flex-row gap-[24px]">
          <Skeleton className="w-[120px] h-[120px]" />
          <Skeleton className="w-[120px] h-[120px]" />
          <Skeleton className="w-[120px] h-[120px]" />
        </div>
      </div>
      <div className="w-full">
        <Skeleton className="text-3xl md:text-[36px] font-satoshi font-bold mb-[16px]">
          &nbsp;
        </Skeleton>
        <div className="flex flex-wrap md:flex-row md:items-center mb-[28px] gap-[10px] font-inter font-medium">
          <Skeleton className="lg:w-1/3 w-full">&nbsp;</Skeleton>
        </div>
        <Skeleton className="font-satoshi text-2xl md:text-[32px] font-bold mb-[28px]">
          &nbsp;
        </Skeleton>

        <div className="flex md:flex-row flex-col gap-[18px] mb-[22px]">
          <Button
            disabled
            className="flex flex-row items-center w-full md:w-auto justify-center gap-[10px] bg-[#26C53A] hover:bg-[#26C53A]/80 rounded-[27px] text-white font-inter text-[16px] py-[12px] px-[32px] h-[48px]"
          >
            <WAIcon />
            Whatsapp
          </Button>
          <Button
            variant="outline"
            className="rounded-[27px] h-[48px] text-black border-[1px] border-[#F2F2F2] font-inter text-[16px] py-[12px] px-[32px]"
          >
            Contact Merchant
          </Button>
        </div>
        <div className="flex gap-[22px] mb-[25px]">
          <div className="flex gap-[8px]">
            <LikeProductIcon />
            <p> Like Product</p>
          </div>
          <div className="flex gap-[8px]">
            <AddBookmarkIcon />
            <p>Add to Bookmark</p>
          </div>
        </div>
        <Separator className="mb-[14px]" />
        <div className="flex gap-[20px]">
          <div className="w-[42px] h-[42px] object-cover">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="flex flex-col space-y-2">
            <Skeleton className="font-satoshi text-[22px] font-bold">
              &nbsp;
            </Skeleton>
            <div className="flex gap-[8px]">
              <PremiumIcon />
              <p>Mitra Premium</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[520px] h-fit md:h-[74px] rounded-tl-[12px] rounded-tr-[12px] border-[1px] border-[#E7E7E7] px-[18px] py-[14px] flex gap-[12px] mt-2">
          <TruckIcon />
          <div className="flex flex-col">
            <h1>Free Delivery</h1>
            <p>Enter your postal code for delivery availability</p>
          </div>
        </div>
        <div className="w-full md:w-[520px] h-fit md:h-[74px] rounded-bl-[12px] rounded-br-[12px] border-[1px] border-[#E7E7E7] px-[18px] py-[14px] flex gap-[12px]">
          <TruckIcon />
          <div className="flex flex-col">
            <h1>Free Delivery</h1>
            <p>Enter your postal code for delivery availability</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page({ params }: { params: { slug: number } }) {
  // console.log(params.slug.toString().split('-'))
  const paramsSlug = params.slug.toString().split("-");
  console.log(paramsSlug);
  const paramsForApi = paramsSlug.slice(0, 5).join("-");
  console.log(paramsForApi);

  const getPostByIdQuery = useGetPostById(`${paramsForApi}`);

  if (getPostByIdQuery.data) {
    console.log(getPostByIdQuery.data);
  }

  return (
    <LayoutTemplate>
      <LoadingState
        loadingFallback={<HeaderDetailsLoading />}
        isLoading={getPostByIdQuery.isLoading}
      >
        <HeaderDetails data={getPostByIdQuery.data} />
      </LoadingState>
      <DescriptionDetails data={getPostByIdQuery.data} />
    </LayoutTemplate>
  );
}
