import React from "react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Post } from "@/src/domain/entities/post";

// FIXME: entity desync
// type TProps = {
//   data: Post & {
//     images?: {
//       url: string;
//     }[];
//     priceMax: Post["price_max"];
//     priceMin: Post["price_min"];
//   };
// };

type TProps = {
  data: any;
};

const RecommendationCard: React.FC<TProps> = ({ data }) => {
  const API_BASE_URL = process.env.BASE_URL;
  const Image1 = `${API_BASE_URL}/images/${data?.images?.[0]?.url}`;

  return (
    <div className="font-satoshi flex flex-col w-full">
      <Image
        src={Image1}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-[160px] bg-primary object-cover bg-cover rounded-[12px] mb-[18px]"
      />
      <div className="flex flex-col mt-[18px]">
        <div>
          <h1 className="overflow-hidden text-ellipsis text-[22px] font-bold truncate">
            {data.title}
          </h1>
          <p className="text-[16px] font-inter font-medium text-[#425379]">
            More than 10 years experience
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-[14px] gap-[18px]">
        <h1 className="overflow-hidden text-ellipsis text-[22px] font-bold truncate">
          Rp {data.priceMin} - Rp {data.priceMax}
        </h1>
        <Button
          variant="outline"
          className="rounded-full h-[48px] hover:bg-[#020831] hover:text-white hover:border-[#020831]"
        >
          Hubungi Mitra
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;
