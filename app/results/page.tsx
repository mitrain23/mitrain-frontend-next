'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'
import Card from '@/src/components/card'
import Search from '@/src/components/search'
import { useGetAllPost } from '@/src/application/hooks/posts/useGetAllPost'
import Pagination from '@/src/infrastructure/ui/results/pagination'
import axios from 'axios'
import { useGetAllPostByFilter } from '@/src/application/hooks/posts/useGetAllPostByFilter'
import { PostFilter } from '@/src/domain/entities/postFilter'


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

  

  const getAllPostByFilterQuery = useGetAllPostByFilter(formData);

 
  useEffect(() => {
    getAllPostByFilterQuery.refetch();
  }, [pageNumber]);

  
  if (getAllPostByFilterQuery.isLoading) {
    return <div>Loading</div>
  }

  if (getAllPostByFilterQuery.isError) {
    return <div>Error</div>
  }

  if (getAllPostByFilterQuery.data) {
    console.log(getAllPostByFilterQuery.data)
  }

  const handlePageChange = (data: number) => {
    setPageNumber(data);
    setFormData((prev) => ({
      ...prev,
      page: data
    }))
  }

  return (

    <div className='px-10 py-5'>
      <Search />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center md:place-items-start max-lg:gap-10 gap-20 my-4">
        {getAllPostByFilterQuery.data?.map((item, index) => {
          return (
            <div className='w-full' key={item.id}>
              <Card data={item} />
            </div>
          )
        })}
      </div>
        <Pagination handlePageChange={handlePageChange} />
    </div>
  )
}

export default Results