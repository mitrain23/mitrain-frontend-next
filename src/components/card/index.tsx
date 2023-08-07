'use client'

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { Post } from '@/src/domain/entities/post';
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic';
import { useDeletePost } from '@/src/application/hooks/posts/useDeletePost';
const Image = dynamic(() => import('next/image'), { loading: () => <div>Loading...</div> });

// Inside the component
const Card = ({ data, deletePost }: { data: Post, deletePost?: boolean }) => {
    console.log(data.title)
    const [imageLoaded, setImageLoaded] = useState(false);
    const Image1 = `http://62.72.0.207:2000/images/${data.image?.[0]?.name}`;
    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
    }, []);

    const deletePostQuery = data.id ? useDeletePost(data.id) : null;

    const handleDelete = (e: any) => {
        if (deletePostQuery) {
            deletePostQuery.mutate();
        }
        window.location.reload();
    }

    return (
        <>
            <div>
                <Link href={`details/${data.id}`}>
                    <div className="card card-compact bg-base-100 shadow-xl w-full mb-8">
                        <div className={`image-container ${!imageLoaded ? 'skeleton' : ''}`}>
                            {!imageLoaded && <div className="skeleton-placeholder animate-pulse bg-gray-200 rounded-md dark:bg-gray-400 w-[250px] h-[150px]"></div>}
                            <div className={`card-image max-sm:w-[350px] w-full h-[200px] flex items-center justify-center ${imageLoaded ? '' : ''} overflow-hidden`}>
                                <Image
                                    className='bg-cover bg-no-repeat bg-center w-[80%]'
                                    sizes="100vw"
                                    src={Image1}
                                    width={0}
                                    height={0}
                                    alt=""
                                    onLoad={handleImageLoad}
                                />
                            </div>



                        </div>
                        <div className="card-body max-sm:w-[350px] w-full h-[200px]">
                            {!imageLoaded && <div className="skeleton-placeholder animate-pulse bg-gray-200 rounded-md dark:bg-gray-400 w-[250px] h-[80px]"></div>}
                            <div className={`card-image ${imageLoaded ? 'loaded' : 'hidden'}`}>
                                <h3 className="card-title text-17px font-semibold">{data?.title}</h3>
                                <p className="text-[#5B5B5B]">Pengalaman {'>'} 10 tahun</p>
                            </div>
                            {/* <div className="tags-container px-2 py-1 rounded-md w-fit text-12px font-semibold text-[#898989] border-2 border-[#C7C7C7]">
                            <p>konveksi baju</p>
                        </div> */}
                            {!imageLoaded && <div className="skeleton-placeholder bg-gray-200 rounded-md dark:bg-gray-400 w-[250px] h-[10px]"></div>}
                            <p className={`font-semibold text-red-500 text-lg md:text-[14px] ${imageLoaded ? 'loaded' : 'hidden'}`}>
                                Rp {data.price_min} - {data.price_max}
                            </p>
                        </div>
                    </div>
                </Link>
                {deletePost && (<button onClick={(e) => handleDelete(e)} className='text-center text-white bg-red-500 py-1'>
                    Delete
                </button>)}
            </div>
        </>
    );
};

export default Card;
