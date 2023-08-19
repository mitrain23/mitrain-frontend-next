import React from 'react'
import Image from 'next/image'
import Logo from '../logo'


const Footer = () => {
    return (
        <div className='h-[108px] px-[240px] text-white w-full bg-[#020831] flex flex-col md:flex-row justify-between items-center'>
            <div>
                <Logo />
            </div>
            <div>
                <ul className='flex flex-row items-center gap-[16px] font-inter'>
                    <li>index</li>
                    <li>index</li>
                    <li>index</li>
                    <li>index</li>
                </ul>
            </div>
            <div>
                social icon
            </div>
        </div>
    )
}

export default Footer