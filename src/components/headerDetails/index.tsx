'use client'

import React, { useEffect, useState } from 'react'
import ProfileDetailsCard from '../profileDetailsCard'
import Image from 'next/image'
import LayoutTemplate from '@/src/utils/layout'
import { Image as ImageType, Post } from '@/src/domain/entities/post'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'


const HeaderDetails = ({ image, data }: { image: ImageType[] | undefined, data: Post | null | undefined }) => {

  const [dateState, setDateState] = useState<String>()
  const [loading, setLoading] = useState(true);


  const Image1 = `https://2af1-2a02-4780-10-d402-00-1.ngrok-free.app/images/${image?.[0]?.name}`;
  const Image2 = `https://2af1-2a02-4780-10-d402-00-1.ngrok-free.app/images/${image?.[1]?.name}`;


  console.log(data);

  // date format 
  useEffect(() => {
    const dateValue = data?.createdAt;
    const date = dateValue ? new Date(dateValue) : null;
    if (date) {
      const formattedDate = format(date, 'd MMM yyyy', { locale: id });
      setDateState(formattedDate);
    } else {
      console.log('Invalid date');
    }
    setLoading(false);
  }, [data?.createdAt]);

  if (loading) {
    // Render skeleton loading state
    return (
      <LayoutTemplate background="white-100">
        {/* Skeleton loading state */}
        <div className="skeleton-loading"></div>
      </LayoutTemplate>
    );
  }

  return (

    <LayoutTemplate background='white-100'>
      <div className="relative">
        <div className="hidden md:grid grid-cols-5 grid-rows-2 h-80 gap-2 relative">
          <div className="col-span-3 row-span-2 relative">
            <Image src={Image1} fill style={{ objectFit: 'cover' }} alt="" />
            {/* <img className="object-cover w-full h-full" src="/images/imagedummykonveksi.svg" alt="" /> */}
          </div>
          <div className="col-span-2 row-span-1 relative">
            <Image src={Image2} fill style={{ objectFit: 'cover' }} alt="" />
            <div className="absolute inset-0 bg-black bg-opacity-50 hover:bg-opacity-0 transition-all duration-300"></div>
          </div>
          <div className="bg-green-400 col-span-2 row-span-1 relative">
            <Image src={Image2} fill style={{ objectFit: 'cover' }} alt="" />
            <div className="absolute inset-0 bg-black bg-opacity-50 hover:bg-opacity-0 transition-all duration-300"></div>
          </div>
          <button className="bg-slate-100 px-3 py-1 w-fit font-semibold absolute bottom-2 right-2 text-sm rounded-sm">Lihat Semua Foto</button>
        </div>
        <div className="heading pt-5 flex flex-col gap-1">
          <h1 className="text-slate-400">Diperbarui pada {dateState} </h1>
          <h1 className="font-bold text-2xl">{data?.title}</h1>
          <h1 className="text-red-400 font-bold text-lg">{data?.price_min} - {data?.price_max}</h1>
        </div>
        {/* PROFILE DETAILS FLYING CARD */}
        <ProfileDetailsCard data={data} />
      </div>
    </LayoutTemplate>
  )
}

export default HeaderDetails