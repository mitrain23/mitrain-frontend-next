'use client'
import React, { MutableRefObject, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/grid';
import 'swiper/css/pagination';
import Card from '../card';
import SwiperCore, { Grid, Pagination } from "swiper";

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
                rows: 1
            }

        },
        800: {
            slidesPerView: 2,
            spaceBetween: 30,
            grid: {
                rows: 1
            }

        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 30,
            grid: {
                rows: 1
            }

        },
        1500: {
            slidesPerView: 4,
            spaceBetween: 30,
            grid: {
                rows: 1
            }

        },
    };


    return (
        <div className='furniture-slider'>
            <div className='header-pick-of-the-week flex flex-row justify-between my-8'>
                <div className='flex flex-col gap-1 '>
                    <h1 className='text-[#031C32] font-inter font-semibold text-3xl max-md:text-[18px] '>Trending Mitra</h1>
                </div>
                <div className='navigation-arrow flex flex-row-reverse gap-2 items-end max-lg:hidden'>

                    <div onClick={() => swiperRef.current?.slideNext()}>
                        <svg className='bg-slate-300 hover:bg-[#1659E6] rounded-full' xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                            <circle cx="18" cy="18" r="18" />
                            <mask id="mask0_165_713" maskUnits="userSpaceOnUse" x="6" y="6" width="24" height="24">
                                <rect x="6" y="6" width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_165_713)">
                                <path d="M20 24L18.6 22.55L22.15 19H10V17H22.15L18.6 13.45L20 12L26 18L20 24Z" fill="white" />
                            </g>
                        </svg>
                    </div>
                    <div onClick={() => swiperRef.current?.slidePrev()} className="bg-slate-300 hover:bg-[#1659E6] rounded-full">
                        <svg className='' xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                            <circle cx="18" cy="18" r="18" />
                            <mask id="mask0_165_708" maskUnits="userSpaceOnUse" x="6" y="6" width="24" height="24">
                                <rect width="24" height="24" transform="matrix(-1 0 0 1 30 6)" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_165_708)">
                                <path d="M16 24L17.4 22.55L13.85 19H26V17H13.85L17.4 13.45L16 12L10 18L16 24Z" fill="#F2F2F2" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>


            <div>
                <Swiper
                    modules={[Grid]}
                    slidesPerView={4}
                    grid={{ rows: 1, fill: 'row' }}
                    breakpoints={sliderSettings}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}

                    spaceBetween={32}
                    className="mySwiper"
                >

                    {data.map((item: any, index: number) => {
                        return (
                            <SwiperSlide>
                                <Card data={item} />
                            </SwiperSlide>
                        )
                    })}


                </Swiper>
            </div>


        </div>
    )
}


export default CardSlider