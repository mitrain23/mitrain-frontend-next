import React from 'react'
import Image from 'next/image'
import image1 from '../../../../../public/images/dummyfullhd.png'

const RecommendationCard = () => {
    return (
        <div className='w-[100%] md:w-[318px] font-satoshi flex flex-col'>
            <Image src={image1} alt='' />
            <div className='flex flex-col mt-[18px]'>
                <div>
                    <h1 className='overflow-hidden text-ellipsis text-[22px] font-bold truncate'>Custom Jahit Baju / Hoodie Murah</h1>
                    <p className='text-[16px] font-inter font-medium text-[#425379]'>More than 10 years experience</p>
                </div>
            </div>

            <div className='flex flex-col mt-[14px] gap-[18px]'>
                    <h1 className='overflow-hidden text-ellipsis text-[22px] font-bold truncate'>Rp 3.899.000 - Rp 7.899.999</h1>
                    <button className='w-fit py-[12px] px-[36px] rounded-[27px] hover:bg-color5 hover:text-white border-[1px] border-slate-200'>
                        Contact Seller
                    </button>
            </div>
        </div>
    )
}

export default RecommendationCard