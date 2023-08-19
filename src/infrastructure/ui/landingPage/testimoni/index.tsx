import React from 'react'
import TestimoniCard from './testimoniCard'

const Testimoni = () => {
  return (
    <div>
         <div className='heading text-center text-[32px] font-bold mb-[32px] font-satoshi'>
            Testimoni
        </div>
        <div className='flex flex-row flex-wrap gap-[32px] justify-center'>
            <TestimoniCard />
            <TestimoniCard />
            <TestimoniCard />
        </div>
    </div>
  )
}

export default Testimoni