'use client';

import React from 'react'
import RecommendationCard from './recommendationCard'
import { useGetAllPost } from '@/src/application/hooks/posts/useGetAllPost';

const Recommendation = () => {

  const getAllPostByFilterQuery = useGetAllPost(1);

  if (getAllPostByFilterQuery.data) {
    console.log(getAllPostByFilterQuery.data)
    // const data = getAllPostByFilterQuery.data.data
  }

  if (getAllPostByFilterQuery.isLoading) {
    return <div className='min-h-screen'>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="w-[150px] h-[100px] flex item-center justify-center rounded-sm bg-white">
          <span className="loading loading-spinner loading-lg text-info"></span>
        </div>
      </div>
    </div>
  } 



  return (
    <div className='font-satoshi'>
      <div className='heading text-center text-[32px] font-bold mb-[32px]'>
        Rekomendasi untuk anda
      </div>
      <div className='flex flex-col md:flex-row flex-wrap gap-[32px] justify-center'>
        {getAllPostByFilterQuery.data?.slice(0, 4).map((item, index) => {
          return (
            <RecommendationCard data={item}/>
          )
        })}
      </div>

    </div>
  )
}

export default Recommendation