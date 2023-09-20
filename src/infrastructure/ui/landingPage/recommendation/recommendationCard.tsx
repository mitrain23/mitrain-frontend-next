import React from 'react'
import Image from 'next/image'
import image1 from '../../../../../public/images/dummyfullhd.png'
import { Post } from '@/src/domain/entities/post'

const RecommendationCard = ({ data }: { data: any }) => {
    const API_BASE_URL = process.env.BASE_URL;

    const Image1 = `${API_BASE_URL}/images/${data?.images?.[0]?.url}`;

    return (
        <div className='w-[100%] md:w-[318px] font-satoshi flex flex-col'>
            <Image src={Image1} alt='' width={0} height={0} sizes="100vw" className='w-full h-[160px] object-cover bg-cover rounded-[12px] mb-[18px]' />
            <div className='flex flex-col mt-[18px]'>
                <div>
                    <h1 className='overflow-hidden text-ellipsis text-[22px] font-bold truncate'>{data.title}</h1>
                    <p className='text-[16px] font-inter font-medium text-[#425379]'>More than 10 years experience</p>
                </div>
            </div>

            <div className='flex flex-col mt-[14px] gap-[18px]'>
                <h1 className='overflow-hidden text-ellipsis text-[22px] font-bold truncate'>Rp {data.priceMin} - Rp {data.priceMax}</h1>
                <button className='w-fit py-[12px] px-[36px] rounded-[27px] hover:bg-color5 hover:text-white border-[1px] border-slate-200'>
                    Contact Seller
                </button>
            </div>
        </div>
    )
}

export default RecommendationCard