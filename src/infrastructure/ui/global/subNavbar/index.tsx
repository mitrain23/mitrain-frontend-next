import React from 'react'

const SubNavbar = () => {
    return (
        <div className='w-full h-[52px] hidden md:flex flex-row justify-between items-center px-8 lg:px-[240px] bg-color5 text-white py-[18px]'>
            <div className='left flex flex-row gap-[24px] font-satoshi text-[14px]'>
                <h1>Tentang MitraIn ID</h1>
                <h1>Jadi Mitra</h1>
                <h1>Bantuan</h1>
                <h1>Pusat Edukasi</h1>
            </div>
            <div className='right'>
                EN  |  ID
            </div>
        </div>
    )
}

export default SubNavbar