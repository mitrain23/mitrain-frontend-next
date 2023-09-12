'use client'

import { useDeletePost } from '@/src/application/hooks/posts/useDeletePost';
import { Datum, GetPostByAuthorResponse } from '@/src/infrastructure/models/getPostByAuthorResponse';
import Link from 'next/link';
import React, { useState } from 'react'

const IklanSayaCard = ({ data, index }: { data: Datum, index: number }) => {

    const [showDelete, setShowDelete] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleShowDelete = () => {
        setShowDelete(!showDelete);
    }
    const handleShowDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    }




    const DeleteModal = () => {

        const deletePostQuery = data.id ? useDeletePost(data.id) : null;

        const handleDelete = async (e: any) => {
            e.preventDefault();
            console.log(data.id);
            try {
                await deletePostQuery?.mutate();
                setShowDeleteModal(!showDeleteModal);
            } catch (err) {
                console.log(err);
            }
        }


        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <p className="text-lg font-semibold mb-2">Confirm Deletion</p>
                    <p className="text-gray-600">Are you sure you want to delete this item?</p>
                    <div className="mt-4 flex justify-end">
                        <button
                            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                            onClick={handleShowDeleteModal}
                        >
                            Cancel
                        </button>
                        <button className="ml-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600" onClick={handleDelete} >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className='w-full h-[112px] border-[1px] border-[#DFDFDF] rounded-[8px] flex flex-row items-center justify-between px-[36px] py-[42px]'>
            <div className='left flex flex-row gap-[64px]'>
                <div className='self-center font-inter text-[#425379]'>
                    {index}
                </div>
                <div className='flex flex-col md:w-[400px]'>
                    <h1 className='font-satoshi text-[#020831] text-[20px] font-bold truncate'>{data.title}</h1>
                    <p className='text-[#6F7277] font-satoshi text-[16px] font-medium'>{data.location}</p>
                </div>
                <div className='self-center font-satoshi text-[18px] text-[#020831]'>
                    <h1>Rp {data.priceMin} - Rp {data.priceMax}</h1>
                </div>
            </div>
            <div className='right flex flex-row gap-[20px]'>
                <Link href={'/maintenance'}>
                    <div className='edit-button cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <mask id="mask0_304_886" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                <rect width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_304_886)">
                                <path d="M4 24C3.45 24 2.97917 23.8042 2.5875 23.4125C2.19583 23.0208 2 22.55 2 22C2 21.45 2.19583 20.9792 2.5875 20.5875C2.97917 20.1958 3.45 20 4 20H20C20.55 20 21.0208 20.1958 21.4125 20.5875C21.8042 20.9792 22 21.45 22 22C22 22.55 21.8042 23.0208 21.4125 23.4125C21.0208 23.8042 20.55 24 20 24H4ZM5 18C4.71667 18 4.47917 17.9042 4.2875 17.7125C4.09583 17.5208 4 17.2833 4 17V14.675C4 14.5417 4.025 14.4125 4.075 14.2875C4.125 14.1625 4.2 14.05 4.3 13.95L13.05 5.19999L16.8 8.94999L8.05 17.7C7.95 17.8 7.8375 17.875 7.7125 17.925C7.5875 17.975 7.45833 18 7.325 18H5ZM17.925 7.84999L14.175 4.09999L15.975 2.29999C16.1583 2.09999 16.3917 2.00416 16.675 2.01249C16.9583 2.02083 17.1917 2.11666 17.375 2.29999L19.725 4.64999C19.9083 4.83333 20 5.06249 20 5.33749C20 5.61249 19.9083 5.84999 19.725 6.04999L17.925 7.84999Z" fill="#020831" />
                            </g>
                        </svg>
                    </div>
                </Link>

                <div className='cursor-pointer relative' onClick={handleShowDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <mask id="mask0_304_892" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <rect width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_304_892)">
                            <path d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z" fill="#020831" />
                        </g>
                    </svg>

                    {showDelete &&
                        (
                            <>
                                <div className='bg-white w-[146px] px-[48px] py-[12px] flex items-center justify-center rounded-[7px] z-10 absolute top-[35px] right-0 shadow-md cursor-pointer' onClick={handleShowDeleteModal}>
                                    Delete
                                </div>
                            </>
                        )
                    }
                    {showDeleteModal && <DeleteModal />}


                </div>

            </div>
        </div>
    )
}

export default IklanSayaCard