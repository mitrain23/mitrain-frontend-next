import { Post } from '@/src/domain/entities/post'
import LayoutTemplate from '@/src/utils/layout'
import React from 'react'

const DeskripsiDetails = ({data}: {data: Post | null | undefined}) => {

    return (
        <LayoutTemplate background="bg-[#F2F9FF]">
            <div className="h-fit bg-white w-full md:w-[70%]  py-2 px-5">
                <div className="border-b-2 border-slate-200 border-opacity-70 font-bold mb-2 pb-2">
                    <h1>Deskripsi</h1>
                </div>
                <h1 className="text-sm text-justify">{data?.description}</h1>
            </div>
        </LayoutTemplate>
    )
}

export default DeskripsiDetails