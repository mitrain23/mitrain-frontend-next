import React from 'react'

const LayoutTemplate = ({ children, background = 'bg-white' }: {
    children: React.ReactNode
    background?: string
}, ) => {
    return (
        <div className={`md:px-10 md:py-8 ${background}`} >
            {children}
        </div>
    )
}

export default LayoutTemplate