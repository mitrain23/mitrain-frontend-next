import React from 'react'
import Image from 'next/image'
import image1 from '../../../../../public/images/heroimage.jpg'
import Link from 'next/link';
import { Post } from '@/src/domain/entities/post';


interface CardProps {
  data?: any;
}


const Card = ({ data }: CardProps) => {

  const API_BASE_URL = process.env.BASE_URL;

  const Image1 = `${API_BASE_URL}/images/${data?.images?.[0]?.url}`;



  return (
    <Link href={`details/${data?.id}`}>
      <div className='mb-[38px]'>
        <div className=''>
          <Image src={Image1} alt='' width={0} height={0} sizes="100vw" className='w-full h-[160px] object-cover bg-cover rounded-[12px] mb-[18px]' />
        </div>
        <div className='content'>
          <div className='flex flex-col gap-[6px] mb-[12px]'>

            <h1 className='font-satoshi text-[22px] font-bold text-[#020831]'>{data?.title}</h1>
            <p className='font-inter text-[#425379] text-[16px]'>Pengalaman lebih dari 10 tahun</p>
          </div>
          <div className='mitra-premium flex flex-row gap-1 mb-[12px]'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <mask id="mask0_22_1043" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_22_1043)">
                <path d="M8.14995 21.75L6.69995 19.3L3.94995 18.7C3.69995 18.65 3.49995 18.5208 3.34995 18.3125C3.19995 18.1042 3.14162 17.875 3.17495 17.625L3.44995 14.8L1.57495 12.65C1.40828 12.4667 1.32495 12.25 1.32495 12C1.32495 11.75 1.40828 11.5333 1.57495 11.35L3.44995 9.2L3.17495 6.375C3.14162 6.125 3.19995 5.89583 3.34995 5.6875C3.49995 5.47916 3.69995 5.35 3.94995 5.3L6.69995 4.7L8.14995 2.25C8.28328 2.03333 8.46662 1.8875 8.69995 1.8125C8.93328 1.7375 9.16662 1.75 9.39995 1.85L12 2.95L14.6 1.85C14.8333 1.75 15.0666 1.7375 15.3 1.8125C15.5333 1.8875 15.7166 2.03333 15.85 2.25L17.3 4.7L20.05 5.3C20.3 5.35 20.5 5.47916 20.65 5.6875C20.8 5.89583 20.8583 6.125 20.825 6.375L20.55 9.2L22.425 11.35C22.5916 11.5333 22.675 11.75 22.675 12C22.675 12.25 22.5916 12.4667 22.425 12.65L20.55 14.8L20.825 17.625C20.8583 17.875 20.8 18.1042 20.65 18.3125C20.5 18.5208 20.3 18.65 20.05 18.7L17.3 19.3L15.85 21.75C15.7166 21.9667 15.5333 22.1125 15.3 22.1875C15.0666 22.2625 14.8333 22.25 14.6 22.15L12 21.05L9.39995 22.15C9.16662 22.25 8.93328 22.2625 8.69995 22.1875C8.46662 22.1125 8.28328 21.9667 8.14995 21.75ZM10.95 12.7L9.49995 11.275C9.31662 11.0917 9.08745 11 8.81245 11C8.53745 11 8.29995 11.1 8.09995 11.3C7.91662 11.4833 7.82495 11.7167 7.82495 12C7.82495 12.2833 7.91662 12.5167 8.09995 12.7L10.25 14.85C10.45 15.05 10.6833 15.15 10.95 15.15C11.2166 15.15 11.45 15.05 11.65 14.85L15.9 10.6C16.1 10.4 16.1958 10.1667 16.1875 9.9C16.1791 9.63333 16.0833 9.4 15.9 9.2C15.7 9 15.4625 8.89583 15.1875 8.8875C14.9125 8.87916 14.675 8.975 14.475 9.175L10.95 12.7Z" fill="#0075FF" />
              </g>
            </svg>
            <p>Mitra Premium</p>
          </div>
          <h1 className='font-bold lg:text-[22px] font-satoshi text-[#020831]'>Rp {data?.priceMin} - Rp {data?.priceMax}</h1>
        </div>
      </div>
    </Link>
  )
}

export default Card