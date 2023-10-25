"use client";
import React, { MutableRefObject, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import Card from "../card";
import SwiperCore, { Grid, Pagination } from "swiper";
import ArrowRightIcon from "@/public/svg/arrow_right.svg";
import ArrowLeftIcon from "@/public/svg/arrow_left.svg";

// install Swiper modules
SwiperCore.use([Pagination]);

const CardSlider = ({ data }: any) => {
  console.log(data);

  // const swiperRef = useRef();
  const swiperRef = useRef<any | null>(null);
  const sliderSettings = {
    150: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    550: {
      slidesPerView: 1,
      spaceBetween: 30,
      grid: {
        rows: 1,
      },
    },
    800: {
      slidesPerView: 2,
      spaceBetween: 30,
      grid: {
        rows: 1,
      },
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
      grid: {
        rows: 1,
      },
    },
    1500: {
      slidesPerView: 4,
      spaceBetween: 30,
      grid: {
        rows: 1,
      },
    },
  };

  return (
    <div className="furniture-slider">
      <div className="header-pick-of-the-week flex flex-row justify-between my-8">
        <div className="flex flex-col gap-1 ">
          <h1 className="text-[#031C32] font-inter font-semibold text-3xl max-md:text-[18px] ">
            Trending Mitra
          </h1>
        </div>
        <div className="navigation-arrow flex flex-row-reverse gap-2 items-end max-lg:hidden">
          <div
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-slate-300 hover:bg-[#1659E6] rounded-full"
          >
            <ArrowRightIcon />
          </div>
          <div
            onClick={() => swiperRef.current?.slidePrev()}
            className="bg-slate-300 hover:bg-[#1659E6] rounded-full"
          >
            <ArrowLeftIcon />
          </div>
        </div>
      </div>

      <div>
        <Swiper
          modules={[Grid]}
          slidesPerView={4}
          grid={{ rows: 1, fill: "row" }}
          breakpoints={sliderSettings}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={32}
          className="mySwiper"
        >
          {data.map((item: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <Card data={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default CardSlider;
