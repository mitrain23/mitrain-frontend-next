'use client'

import React, { useState } from 'react'
import Accordion from './accordion';

const DescriptionDetails = ({data}: {data: any}) => {

    const [expanded, setExpanded] = useState(false);

    const toggleAccordion = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <h1 className='font-inter text-[30px] text-[#031C32] font-semibold mb-[18px]'>Description</h1>
            <div className={`${expanded ? 'h-[396px]' : 'h-[76px]'} expandable-card w-full border-[1px] border-[#E7E7E7] p-[24px] mb-[32px]`} onClick={toggleAccordion}>
                <div className='flex justify-between mb-[12px]'>
                    <h1 className='font-inter text-[18px] font-medium text-[#031C32]'>Product Description</h1>
                    <span className={`transform ${expanded ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}>
                        &#x25BE;
                    </span>
                </div>

                {expanded &&<div dangerouslySetInnerHTML={{ __html: data.description }}
            />}
            </div>
            <h1 className='font-inter text-[30px] text-[#031C32] font-semibold mb-[18px]'>Frequently Asked Questions</h1>
            <Accordion />
            <Accordion />
            <Accordion />




        </div>
    )
}

export default DescriptionDetails