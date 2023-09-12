import React from 'react'

const LayoutTemplate = ({ children, background = 'bg-[#FDFDFF]' }: {
    children: React.ReactNode
    background?: string
}, ) => {
    return (
        <div className={`px-[24px] py-[24px]  lg:px-[240px] md:px-10 md:py-[42px] ${background} min-h-screen`} >
            {children}
        </div>
    )
}

export default LayoutTemplate