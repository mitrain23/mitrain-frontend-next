import React from 'react'
import Image from 'next/image'
import { Post } from '@/src/domain/entities/post'
import Link from 'next/link'


const ProfileDetailsCard = ({ data }: { data: Post | null | undefined }) => {

    console.log(data);




    return (
        <div className="bg-white shadow-md w-[300px] h-fit px-5 py-5 absolute top-96 right-0 ">
            <div className='flex flex-row items-center justify-center gap-4'>
                <Image src="/images/dummyIconProfle.svg" width={50} height={50} style={{ objectFit: 'cover' }} alt='user-profile' />
                <div className='flex flex-col'>
                    <h1 className='font-bold'>{data?.author?.name}</h1>
                    <div className='flex flex-row'>
                        <div>
                            {data?.location}
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-center gap-2 mt-5'>
                <Link href={`https://wa.me/${data?.phone_number_whatsapp}`}>
                    <button className='btn w-full bg-green-400 text-white'>Whatsapp</button>
                </Link>
                <Link href={`https://wa.me/${data?.phone_number_whatsapp}`}>
                    <button className='btn w-full bg-blue-400 text-white'>Contact</button>
                </Link>
            </div>







        </div>
    )
}

export default ProfileDetailsCard