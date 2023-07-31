'use client'



import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'

const Pagination = ({ handlePageChange }: any) => {

    const [pageNumber, setPageNumber] = useState(0);
    // console.log(pageNumber);


    return (
        <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={3}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={(data) => {
            handlePageChange(data.selected + 1);
        }}
        containerClassName={"flex gap-2 mt-2 lg:mt-12 justify-center items-center bg-red-500 w-fit mx-auto"}
        activeClassName={"underline bg-main-orange "}
        pageClassName={
            "w-7 h-7 bg-very-light-orange rounded-lg hover:bg-main-orange"
        }
        pageLinkClassName={
            "text-white font-ptserif w-full h-full flex justify-center items-center"
        }
        previousClassName={
            "w-7 h-7 bg-very-light-orange rounded-lg hover:bg-main-orange"
        }
        previousLinkClassName={
            "text-white font-ptserif w-full h-full flex justify-center items-center"
        }
        nextClassName={
            "w-7 h-7 bg-very-light-orange rounded-lg hover:bg-main-orange"
        }
        nextLinkClassName={
            "text-white font-ptserif w-full h-full flex justify-center items-center"
        }
        breakClassName={"w-7 h-7"}
        breakLinkClassName={
            "text-very-light-orange font-ptserif w-full h-full flex justify-center items-center cursor-default"
        }
    />
    )
}

export default Pagination