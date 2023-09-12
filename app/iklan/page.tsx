'use client';

import FilterBar from '@/src/infrastructure/ui/iklan/filterBar'
import IklanSayaCard from '@/src/infrastructure/ui/iklan/iklanSayaCard'
import IklanSayaContainer from '@/src/infrastructure/ui/iklan/iklanSayaContainer'
import LayoutTemplate from '@/src/utils/layout'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { cookies } from 'next/headers'
import { useGetPostByAuthor } from '@/src/application/hooks/posts/useGetPostByAuthor';
import { GetPostByAuthorResponse } from '@/src/infrastructure/models/getPostByAuthorResponse';

interface parsedUser {
  id: string;
  email: string;
  name: string;
  isMitra: boolean;
}


const Page = () => {

  const [mitraId, setMitraId] = useState<string | null>(null);
  // const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Retrieve user data from cookies
    const storedUser = Cookies.get('user');

    if (storedUser) {
      const parsedUser: parsedUser = JSON.parse(storedUser);
      setMitraId(parsedUser.id);
      console.log(parsedUser.id);
    }

  }, []);


  const id = 'someId'; // Replace with your actual ID or a variable that holds it
  const { data, isLoading, isError } = useGetPostByAuthor(mitraId);

  if (isLoading) {
    return <div className='min-h-screen'>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-[150px] h-[100px] flex item-center justify-center rounded-sm bg-white">
        <span className="loading loading-spinner loading-lg text-info"></span>
      </div>
    </div>
  </div>
  }





  return (
    <LayoutTemplate>
      <div>
        <h1 className='font-inter font-semibold text-[30px] mb-[32px]'>Iklan Saya</h1>
        <FilterBar />
        <IklanSayaContainer data={data} />

      </div>
    </LayoutTemplate>
  )
}

export default Page