'use client'



import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import icon from '../../../../../public/images/Rectangle 3.svg'

const Pagination = ({ handlePageChange }: any) => {

    const [pageNumber, setPageNumber] = useState(0);


    return (
        <ReactPaginate
            previousLabel={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_36_2842" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_36_2842)">
                    <path d="M10.8 12L14.7 15.9C14.8834 16.0834 14.975 16.3167 14.975 16.6C14.975 16.8834 14.8834 17.1167 14.7 17.3C14.5167 17.4834 14.2834 17.575 14 17.575C13.7167 17.575 13.4834 17.4834 13.3 17.3L8.70005 12.7C8.60005 12.6 8.52922 12.4917 8.48755 12.375C8.44588 12.2584 8.42505 12.1334 8.42505 12C8.42505 11.8667 8.44588 11.7417 8.48755 11.625C8.52922 11.5084 8.60005 11.4 8.70005 11.3L13.3 6.70005C13.4834 6.51672 13.7167 6.42505 14 6.42505C14.2834 6.42505 14.5167 6.51672 14.7 6.70005C14.8834 6.88338 14.975 7.11672 14.975 7.40005C14.975 7.68338 14.8834 7.91672 14.7 8.10005L10.8 12Z" fill="#6F7277" />
                </g>
            </svg>}
            nextLabel={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_36_2853" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_36_2853)">
                    <path d="M12.6 12L8.70005 8.10005C8.51672 7.91672 8.42505 7.68338 8.42505 7.40005C8.42505 7.11672 8.51672 6.88338 8.70005 6.70005C8.88338 6.51672 9.11672 6.42505 9.40005 6.42505C9.68338 6.42505 9.91672 6.51672 10.1 6.70005L14.7 11.3C14.8 11.4 14.8709 11.5084 14.9125 11.625C14.9542 11.7417 14.975 11.8667 14.975 12C14.975 12.1334 14.9542 12.2584 14.9125 12.375C14.8709 12.4917 14.8 12.6 14.7 12.7L10.1 17.3C9.91672 17.4834 9.68338 17.575 9.40005 17.575C9.11672 17.575 8.88338 17.4834 8.70005 17.3C8.51672 17.1167 8.42505 16.8834 8.42505 16.6C8.42505 16.3167 8.51672 16.0834 8.70005 15.9L12.6 12Z" fill="#020831" />
                </g>
            </svg>}
            breakLabel={"..."}
            pageCount={5}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(data) => {
                handlePageChange(data.selected + 1);
            }}
            containerClassName={"flex gap-2 mt-2 lg:mt-12 justify-center gap-[14px] items-center w-fit mx-auto text-[#6F7277] font-inter text-[18px]"}
            activeClassName={"bg-[#020831] w-[36px] h-[36px] rounded-full flex items-center justify-center text-white"}
            pageClassName={
                ""
            }
            pageLinkClassName={
                "w-[36px] h-[36px] rounded-full flex items-center justify-center cursor-pointer"
            }
            previousClassName={
                ""
            }
            
            nextClassName={
                ""
            }
            nextLinkClassName={
                ""
            }
            breakClassName={""}
            breakLinkClassName={
                ""
            }
        />
    )
}

export default Pagination