import React from 'react'
import RecommendationCard from './recommendationCard'

const Recommendation = () => {
  return (
    <div className='font-satoshi'>
      <div className='heading text-center text-[32px] font-bold mb-[32px]'>
        Rekomendasi untuk anda
      </div>
      <div className='flex flex-col md:flex-row flex-wrap gap-[32px] justify-center'>
        <RecommendationCard />
        <RecommendationCard />
        <RecommendationCard />
        <RecommendationCard />
      </div>

    </div>
  )
}

export default Recommendation