"use client";

import React, { useState } from "react";
import Image from "next/image";
import image1 from "../../../../../public/images/bingungcarisupplier.png";
import Link from "next/link";
import WAIcon from "@/public/svg/wa.svg";
import LikeProductIcon from "@/public/svg/like_product.svg";
import AddBookmarkIcon from "@/public/svg/add_bookmark.svg";
import PremiumIcon from "@/public/svg/premium.svg";
import TruckIcon from "@/public/svg/truck.svg";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { formatPrice } from "@/src/infrastructure/services/posts/postsRepository";

const HeaderDetails = ({ data }: { data: any }) => {
  const API_BASE_URL = process.env.BASE_URL;

  const Image1 = `${API_BASE_URL}/images/${data?.images?.[0]?.url}`;
  const Image2 = `${API_BASE_URL}/images/${data?.images?.[1]?.url}`;
  const [images, setImages] = useState({
    img1: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img2: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img3: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img4: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
  });

  const [activeImg, setActiveImage] = useState(Image1);

  const imageUrls = (data?.images || []).map(
    (imageData: any) => `${API_BASE_URL}/images/${imageData?.url}`,
  );

  return (
    <div className="flex flex-col md:flex-row gap-[28px] mb-[41px]">
      <div className="left flex flex-col gap-[40px] md:w-[720px] w-full">
        <div className="md:h-[405px]">
          <Image
            src={activeImg}
            width={0}
            height={0}
            sizes="100vw"
            alt=""
            className="w-full h-full aspect-square object-cover "
          />
        </div>
        <div className="flex flex-row gap-[24px]">
          {imageUrls.map((imageUrl: string, index: number) => (
            <div
              key={index}
              className="card"
              onClick={() => setActiveImage(imageUrl)}
            >
              <Image
                src={imageUrl}
                width={0}
                height={0}
                sizes="100vw"
                alt=""
                className="w-full h-[120px] object-cover bg-primary"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="right">
        <h1 className="title text-[#020831] text-3xl md:text-[36px] font-satoshi font-bold mb-[16px]">
          {data.title}
        </h1>
        <div className="flex flex-wrap md:flex-row md:items-center mb-[28px] gap-[10px] font-inter text-[#425379] font-medium">
          <p>{data.location}</p>
          <p>Diperbarui pada: 18 Agustus 2023</p>
          <p>Pengalaman lebih dari 10 tahun</p>
        </div>
        <h1 className="text-[#020831] font-satoshi text-2xl md:text-[32px] font-bold mb-[28px]">
          Rp {formatPrice(data.priceMin)} - Rp {formatPrice(data.priceMax)}
        </h1>
        <div className="flex md:flex-row flex-col gap-[18px] mb-[22px]">
          <Link
            href={`https://wa.me/${data.phoneIntWhatsapp}`}
            className="w-full md:w-auto"
          >
            <Button className="flex flex-row items-center w-full md:w-auto justify-center gap-[10px] bg-[#26C53A] hover:bg-[#26C53A]/80 rounded-[27px] text-white font-inter text-[16px] py-[12px] px-[32px] h-[48px]">
              <WAIcon />
              Whatsapp
            </Button>
          </Link>
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
        <div className="flex gap-[20px] mb-4">
          <div className="w-[42px] h-[42px] object-cover">
            <Image
              src={image1}
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <h1 className="text-[#020831] font-satoshi text-[22px] font-bold">
              {data.mitra.name}
            </h1>
            <div className="flex gap-[8px]">
              <PremiumIcon />
              <p>Mitra Premium</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[520px] h-fit md:h-[74px] rounded-tl-[12px] rounded-tr-[12px] border-[1px] border-[#E7E7E7] px-[18px] py-[14px] flex gap-[12px]">
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

export default HeaderDetails;
