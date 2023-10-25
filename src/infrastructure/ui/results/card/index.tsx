import React from "react";
import Image from "next/image";
import Link from "next/link";
import MitraPermiumIcon from "@/public/svg/mitra_permium_check.svg";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";

interface CardProps {
  data?: any;
}

const Card = ({ data }: CardProps) => {
  const API_BASE_URL = process.env.BASE_URL;

  const Image1 = `${API_BASE_URL}/images/${data?.images?.[0]?.url}`;

  return (
    <Link href={`details/${data?.id}-${encodeURIComponent(data?.title)}`}>
      <div className="mb-[38px]">
        <div className="">
          <Image
            src={Image1}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-[160px] object-cover bg-cover rounded-[12px] mb-[18px] bg-primary"
          />
        </div>
        <div className="content">
          <div className="flex flex-col gap-[6px] mb-[12px]">
            <h1 className="font-satoshi text-[22px] font-bold text-[#020831]">
              {data?.title}
            </h1>
            <p className="font-inter text-[#425379] text-[16px]">
              Pengalaman lebih dari 10 tahun
            </p>
          </div>
          <div className="mitra-premium flex flex-row gap-1 mb-[12px]">
            <MitraPermiumIcon />
            <p>Mitra Premium</p>
          </div>
          <h1 className="font-bold lg:text-[22px] font-satoshi text-[#020831]">
            Rp {data?.priceMin} - Rp {data?.priceMax}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default Card;
