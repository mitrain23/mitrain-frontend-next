'use client'


import React, { useEffect, useState } from 'react';
import LoginButton from '../button/login';
import Image from 'next/image';
import Link from 'next/link';
import ProfileButton from './profile';
import Profile from './profile';


const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tokenValue, setTokenValue] = useState<string | null>('');
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };



  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTokenValue(localStorage.getItem('token'));
    }
  }, [])


  return (
    <div className='bg-white-200 w-full shadow-md flex flex-row justify-between px-8 py-2 z-10'>
      <Link href={'/'}>
        <div className='flex items-center justify-center'>
          <Image src='/images/logoMitrain.svg' width={60} height={60} alt='logo-mitrain' />
        </div>
      </Link>
      <div className='hidden md:flex flex-row items-center justify-center gap-5'>
        <h1>Cari Apa?</h1>
        <h1>Konsultasi</h1>
        {tokenValue && (
          <Link href='/create'>
            <button className='btn'>
              Buat Iklan
            </button>
          </Link>
        )}

        {/* <button className='btn btn-outline font-semibold text-xs'>Login</button> */}
        {tokenValue ? <Profile /> : <LoginButton />}
      </div>

      {/* Hamburger Icon */}
      <div className='flex items-center justify-center md:hidden'>
        <button
          className='btn btn-outline font-semibold text-xs'
          onClick={handleSidebarToggle}
        >
          &#9776;
        </button>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className='fixed top-0 left-0 h-screen w-1/2 bg-white p-5 z-20'>
          <div className='flex flex-col gap-2'>
            <h1>Cari Apa?</h1>
            <h1>Konsultasi</h1>
            <button className='btn btn-outline font-semibold text-xs'>Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
