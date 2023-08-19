import React from 'react'

const TestimoniCard = () => {
    return (
        <div className='w-[435px] h-[340px] rounded-[16px] bg-[#fafafa] py-[32px] px-[28px] flex flex-col items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="50" fill="#E6E6E6" />
                <mask id="mask0_13_1190" maskUnits="userSpaceOnUse" x="26" y="26" width="48" height="48">
                    <rect x="26" y="26" width="48" height="48" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_13_1190)">
                    <path d="M50 50C47.8 50 45.9167 49.2167 44.35 47.65C42.7833 46.0833 42 44.2 42 42C42 39.8 42.7833 37.9167 44.35 36.35C45.9167 34.7833 47.8 34 50 34C52.2 34 54.0833 34.7833 55.65 36.35C57.2167 37.9167 58 39.8 58 42C58 44.2 57.2167 46.0833 55.65 47.65C54.0833 49.2167 52.2 50 50 50ZM38 66C36.9 66 35.9583 65.6083 35.175 64.825C34.3917 64.0417 34 63.1 34 62V60.4C34 59.2667 34.2917 58.225 34.875 57.275C35.4583 56.325 36.2333 55.6 37.2 55.1C39.2667 54.0667 41.3667 53.2917 43.5 52.775C45.6333 52.2583 47.8 52 50 52C52.2 52 54.3667 52.2583 56.5 52.775C58.6333 53.2917 60.7333 54.0667 62.8 55.1C63.7667 55.6 64.5417 56.325 65.125 57.275C65.7083 58.225 66 59.2667 66 60.4V62C66 63.1 65.6083 64.0417 64.825 64.825C64.0417 65.6083 63.1 66 62 66H38Z" fill="#C5C5C5" />
                </g>
            </svg>
            <h1>Justin Doe</h1>
            <h1>bintang</h1>
            <p className='text-center'>Dengan MitraIn ID, kebutuhan bisnis konveksi kamu dapat terpenuhi dengan terjamin kualitas dan dengan harga yang terjangkau.</p>
        </div>
    )
}

export default TestimoniCard