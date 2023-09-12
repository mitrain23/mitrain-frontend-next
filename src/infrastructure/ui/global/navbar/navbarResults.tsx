import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const NavbarResults = () => {
  return (
    <nav className="drop-shadow-md w-full bg-white flex items-center justify-between px-8 lg:px-[240px] py-2">
      
        <Link href={'/'} className='flex flex-row gap-[16px] items-center'>
          <Image src="/images/logoMitrain.svg" width={60} height={60} alt="logo-mitrain" />
          <h1 className='font-satoshi text-[20px] font-bold text-[#0054A5]'>MitraIn ID</h1>
        </Link>

        <div className="hidden md:flex space-x-4 items-center">
          <a className="text-gray-700 hover:text-gray-900">Cari Konveksi</a>
          <a className="text-gray-700 hover:text-gray-900">Gabung jadi seller</a>
          <button className='bg-[#020831] text-white px-[42px] py-[12px] rounded-[8px]'>Buat Akun</button>
        </div>

        <div className="md:hidden">
          <button className="text-gray-700 hover:text-gray-900">
            &#9776;
          </button>
        </div>
      


    </nav>
  )
}

export default NavbarResults