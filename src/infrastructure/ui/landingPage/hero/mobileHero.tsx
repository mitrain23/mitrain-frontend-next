import Link from 'next/link'
import React from 'react'

const MobileHero = () => {
  return (
    <div className='w-full px-[24px]'>
    <form action="" className='flex flex-col gap-[16px]'>
        <div className='flex flex-row gap-[32px]'>
            <select className="select w-full h-[56px] text-[#757575] font-medium">
                <option disabled selected>Pilih Lokasi</option>
                <option>Bandung</option>
            </select>
            <select className="select w-full h-[56px] text-[#757575] font-medium">
                <option disabled selected>Jenis</option>
                <option>Konveksi</option>
                <option>Others</option>
            </select>
        </div>
        <div className='flex flex-col gap-[16px]'>
            <input type="text" placeholder="Apa yang sedang anda cari?" className="input input-bordered w-full h-[56px] placeholder:text-[#757575]" />
            <Link href={'/results'}>
                <button className='bg-color5 w-full px-[82px] py-[16px] text-white rounded-[8px] font-medium'>Search</button>
            </Link>
        </div>
    </form>
</div>
  )
}

export default MobileHero