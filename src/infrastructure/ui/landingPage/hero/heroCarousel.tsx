"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const HeroCarousel = ({ children }: any) => {
  return (
    <div className="relative">
      <div className=" w-[100%] h-fit lg:h-[420px] overflow-hidden ">
        <Swiper navigation loop modules={[Navigation]} className="mySwiper">
          <SwiperSlide>
            <Image
              className="w-full h-auto"
              sizes="100vw"
              width={0}
              height={0}
              src="/images/poster 1.png"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
      {children}
    </div>
  );
};

export default HeroCarousel;
