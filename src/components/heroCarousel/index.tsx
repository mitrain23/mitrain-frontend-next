'use client'

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
      <Swiper navigation loop modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/images/dummyfullhd.png"
            alt=""
            style={{ width: '100vw', height: '70vh' }} // optional
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/images/heroimage.jpg"
            alt=""
            style={{ width: '100vw', height: '70vh' }} // optional
          />
        </SwiperSlide>
      </Swiper>
      {children}
    </div>
  );
};

export default HeroCarousel;
