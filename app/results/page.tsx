'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'
import Card from '@/src/components/card'
import Search from '@/src/components/search'
import { useGetAllPost } from '@/src/application/hooks/posts/useGetAllPost'


const Results = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const getAllPostQuery = useGetAllPost();

  if (getAllPostQuery.isLoading) {
    return <div>Loading</div>
  }

  if (getAllPostQuery.isError) {
    return <div>Error</div>
  }

  if (getAllPostQuery.data) {
    console.log(getAllPostQuery.data)
  }

  

  
  return (

    <div className='px-10 py-5'>
      <Search />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center md:place-items-start max-lg:gap-10 gap-20 my-4">
        {getAllPostQuery.data?.map((item, index) => {
          return (
            <div className='w-full' key={item.id}>
              <Card data={item} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Results