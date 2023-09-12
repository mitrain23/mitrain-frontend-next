import React from 'react'

const FilterBar = () => {
    return (
        <div className='flex flex-row items-center justify-between mb-[52px]'>
            <div className='flex flex-row items-center gap-[36px]'>
                <h1 className='font-inter text-[16px] font-semibold text-[#020831]'>Urutkan</h1>
                <div className='flex flex-row items-center gap-[16px]'>
                    <select className="select select-bordered w-full max-w-xs font-inter text-[#6F7277] font-normal text-[16px]">
                        <option disabled selected>Paling Sesuai</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                    <select className="select select-bordered w-full max-w-xs font-inter text-[#6F7277] font-normal text-[16px]">
                        <option disabled selected>Paling Sesuai</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                </div>
            </div>
            <div className='flex flex-row items-center gap-[24px]'>
                <h1 className='font-inter text-[16px] font-semibold text-[#020831]'>Berdasarkan Lokasi</h1>
                <select className="select select-bordered max-w-xs font-inter text-[#6F7277] font-normal text-[16px]">
                    <option disabled selected>Kota Bandung</option>
                    <option>Kota Cirebon</option>
                    <option>Kota Sumedang</option>
                </select>
            </div>
        </div>
    )
}

export default FilterBar