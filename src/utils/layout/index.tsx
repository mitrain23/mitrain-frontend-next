import React from 'react'

const LayoutTemplate = ({ children, background = 'bg-[#FDFDFF]' }: {
    children: React.ReactNode
    background?: string
}, ) => {
    return (
        <div className={`px-[24px] py-[24px] xl:px-[240px] md:px-[100px] md:py-[42px] ${background} min-h-screen`} >
            {children}
        </div>
    )
}

export default LayoutTemplate