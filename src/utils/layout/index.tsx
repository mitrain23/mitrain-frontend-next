import React from 'react'

const LayoutTemplate = ({ children, background = 'red-200' }: {
    children: React.ReactNode
    background?: string
}, ) => {
    return (
        <div className={`px-10 py-8 ${background}`}>
            {children}
        </div>
    )
}

export default LayoutTemplate