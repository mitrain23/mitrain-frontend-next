'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'
// import Card from '@/src/components/card'
import Search from '@/src/components/search'
import { useGetAllPost } from '@/src/application/hooks/posts/useGetAllPost'
import Pagination from '@/src/infrastructure/ui/results/pagination'
import axios from 'axios'
import { useGetAllPostByFilter } from '@/src/application/hooks/posts/useGetAllPostByFilter'
import { PostFilter } from '@/src/domain/entities/postFilter'
import Card from '@/src/infrastructure/ui/results/card'
import LayoutTemplate from '@/src/utils/layout'
import Filter from '@/src/infrastructure/ui/results/filter'
import CardSlider from '@/src/infrastructure/ui/results/cardSlider'
import { Post } from '@/src/domain/entities/post'


const Results = () => {



  const searchParams = useSearchParams()
  const search = searchParams.get('search');
  const lokasi = searchParams.get('lokasi');



  const [pageNumber, setPageNumber] = useState(1);



  const [formData, setFormData] = useState<PostFilter>({
    search: search || '',
    price_min: '',
    price_max: '',
    lokasi: lokasi || '',
    page: pageNumber,
  });



  const getAllPostByFilterQuery = useGetAllPost(pageNumber);


  useEffect(() => {
    getAllPostByFilterQuery.refetch();
  }, [pageNumber]);


  if (getAllPostByFilterQuery.isLoading) {
    return <div className='min-h-screen'>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="w-[150px] h-[100px] flex item-center justify-center rounded-sm bg-white">
          <span className="loading loading-spinner loading-lg text-info"></span>
        </div>
      </div>
    </div>
  }

  if (getAllPostByFilterQuery.isError) {
    return <div>Error</div>
  }

  if (getAllPostByFilterQuery.data) {
    console.log(getAllPostByFilterQuery.data)
    // const data = getAllPostByFilterQuery.data.data
  }

  const handlePageChange = (data: number) => {
    setPageNumber(data);
    setFormData((prev) => ({
      ...prev,
      page: data
    }))
  }




  return (

    <LayoutTemplate>
      <Filter />
      <div className='Heading-Konveksi-Baju font-inter text-[30px] font-semibold text-[#020831]'>
        <h1>Konveksi Baju</h1>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center md:place-items-start max-lg:gap-10 gap-[32px] my-4">
        {getAllPostByFilterQuery.data?.map((item, index) => {
          return (
            <div className='w-full' key={item.id}>
              <Card data={item} />
            </div>
          )
        })}

      </div>
      <Pagination handlePageChange={handlePageChange} />
      <div className='mb-[48px]'></div>
      <CardSlider data={getAllPostByFilterQuery.data} />
    </LayoutTemplate>
  )
}

export default Results