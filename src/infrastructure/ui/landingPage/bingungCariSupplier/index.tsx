import React from 'react'
import Image from 'next/image'
import imageDummy from '../../../../../public/images/bingungcarisupplier.png'


const BingungCariSupplier = () => {


    const dot = () => {
        return <div className='bg-[#1659E6] w-[8px] h-[8px] rounded-full'></div>
    }

    const advantagePoint = () => {
        return <div className='advantage-point-container flex flex-row gap-[36px] mb-[12px]'>
            <div className='advantage-point flex flex-row items-center gap-[12px]'>
                {dot()}
                <h1 className='font-inter text-[18px]'>Kualitas Premium</h1>
            </div>
            <div className='advantage-point flex flex-row items-center gap-[12px]'>
                {dot()}
                <h1 className='font-inter text-[18px]'>Lulus QC Mitra</h1>
            </div>
        </div>
    }


    return (
        <div className='flex flex-col md:flex-row md:gap-[52px] md:items-center '>
            <div className='w-[704px] bg-slate-300 h-[360px] rounded-[36px]'>
                <Image src={imageDummy} className='rounded-[36px] h-full' alt='' />
            </div>
            <div>
                <h1 className='font-satoshi text-[48px] font-bold text-black mb-[32px]'>Bingung Cari Supplier?</h1>
                <p className='font-inter text-[#425379] text-[16px] mb-[20px]'>Dengan MitraIn ID, kebutuhan bisnis konveksi kamu dapat terpenuhi <br /> dengan terjamin kualitas dan dengan harga yang terjangkau.</p>
                {advantagePoint()}
                {advantagePoint()}
            </div>

        </div>
    )
}

export default BingungCariSupplier