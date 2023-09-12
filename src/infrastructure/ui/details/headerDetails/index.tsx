import React from 'react'
import Image from 'next/image'
import image1 from '../../../../../public/images/bingungcarisupplier.png'


const HeaderDetails = ({ data }: { data: any }) => {

    console.log(data)
    const API_BASE_URL = process.env.BASE_URL;

    const Image1 = `${API_BASE_URL}/images/${data?.images?.[0]?.url}`;
    const Image2 = `${API_BASE_URL}/images/${data?.images?.[1]?.url}`;

    console.log(Image1)


    return (
        <div className='flex flex-col md:flex-row gap-[28px] mb-[41px]'>
            <div className="left flex flex-col gap-[40px] md:w-[720px] w-full">
                <div className='md:h-[405px]'>
                    <Image src={Image1} width={0} height={0} sizes='100vw' alt='' className='w-full h-full' />
                </div>
                <div className='flex flex-row gap-[24px]'>
                    {/* <Image src={image1} alt='' className='w-[224px] h-[120px] object-cover bg-no-repeat' />
                    <Image src={image1} alt='' className='w-[224px] h-[120px] object-cover bg-no-repeat' />
                    <Image src={image1} alt='' className='w-[224px] h-[120px] object-cover bg-no-repeat' /> */}

                    <div className="card">
                        <Image src={Image2} width={0} height={0} sizes='100vw' alt='' className='w-full h-[120px] object-cover' />
                    </div>
                    <div className="card">
                        <Image src={Image2} width={0} height={0} sizes='100vw' alt='' className='w-full h-[120px] object-cover' />

                    </div>
                    <div className="card">
                        <Image src={Image2} width={0} height={0} sizes='100vw' alt='' className='w-full h-[120px] object-cover' />

                    </div>

                </div>
            </div>



            <div className="right">
                <h1 className='title text-[#020831] text-3xl md:text-[36px] font-satoshi font-bold mb-[16px]'>{data.title}</h1>
                <div className='flex flex-wrap md:flex-row md:items-center mb-[28px] gap-[10px] font-inter text-[#425379] font-medium'>
                    <p>{data.location}</p>
                    <p>Diperbarui pada: 18 Agustus 2023</p>
                    <p>Pengalaman lebih dari 10 tahun</p>
                </div>
                <h1 className='text-[#020831] font-satoshi text-2xl md:text-[32px] font-bold mb-[28px]'>Rp {data.priceMin} - Rp {data.priceMax}</h1>
                <div className='flex flex-row gap-[18px] mb-[22px]'>
                    <button className='flex flex-row items-center justify-center gap-[10px] bg-[#26C53A] rounded-[27px] text-white font-inter text-[16px] py-[12px] px-[32px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 10C9 10.1326 9.05268 10.2598 9.14645 10.3536C9.24021 10.4473 9.36739 10.5 9.5 10.5C9.63261 10.5 9.75979 10.4473 9.85355 10.3536C9.94732 10.2598 10 10.1326 10 10V9C10 8.86739 9.94732 8.74021 9.85355 8.64645C9.75979 8.55268 9.63261 8.5 9.5 8.5C9.36739 8.5 9.24021 8.55268 9.14645 8.64645C9.05268 8.74021 9 8.86739 9 9V10ZM9 10C9 11.3261 9.52678 12.5979 10.4645 13.5355C11.4021 14.4732 12.6739 15 14 15M14 15H15C15.1326 15 15.2598 14.9473 15.3536 14.8536C15.4473 14.7598 15.5 14.6326 15.5 14.5C15.5 14.3674 15.4473 14.2402 15.3536 14.1464C15.2598 14.0527 15.1326 14 15 14H14C13.8674 14 13.7402 14.0527 13.6464 14.1464C13.5527 14.2402 13.5 14.3674 13.5 14.5C13.5 14.6326 13.5527 14.7598 13.6464 14.8536C13.7402 14.9473 13.8674 15 14 15ZM3 21L4.65 17.2C3.38766 15.408 2.82267 13.217 3.06104 11.0381C3.29942 8.85915 4.32479 6.84211 5.94471 5.36549C7.56463 3.88887 9.66775 3.05418 11.8594 3.01807C14.051 2.98195 16.1805 3.7469 17.8482 5.16934C19.5159 6.59179 20.6071 8.57395 20.9172 10.7438C21.2272 12.9137 20.7347 15.1222 19.5321 16.9547C18.3295 18.7873 16.4994 20.118 14.3854 20.6971C12.2713 21.2762 10.0186 21.0639 8.05 20.1L3 21Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Whatsapp
                    </button>
                    <button className='rounded-[27px] text-black border-[1px] border-[#F2F2F2] font-inter text-[16px] py-[12px] px-[32px]'>Contact Merchant</button>
                </div>
                <div className='flex gap-[22px] mb-[25px]'>
                    <div className='flex gap-[8px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <mask id="mask0_30_2531" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                <rect width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_30_2531)">
                                <path d="M12 20.675C11.7667 20.675 11.5292 20.6333 11.2875 20.55C11.0458 20.4667 10.8333 20.3333 10.65 20.15L8.925 18.575C7.15833 16.9583 5.5625 15.3542 4.1375 13.7625C2.7125 12.1708 2 10.4167 2 8.5C2 6.93333 2.525 5.625 3.575 4.575C4.625 3.525 5.93333 3 7.5 3C8.38333 3 9.21667 3.1875 10 3.5625C10.7833 3.9375 11.45 4.45 12 5.1C12.55 4.45 13.2167 3.9375 14 3.5625C14.7833 3.1875 15.6167 3 16.5 3C18.0667 3 19.375 3.525 20.425 4.575C21.475 5.625 22 6.93333 22 8.5C22 10.4167 21.2917 12.175 19.875 13.775C18.4583 15.375 16.85 16.9833 15.05 18.6L13.35 20.15C13.1667 20.3333 12.9542 20.4667 12.7125 20.55C12.4708 20.6333 12.2333 20.675 12 20.675ZM11.05 7.1C10.5667 6.41667 10.05 5.89583 9.5 5.5375C8.95 5.17917 8.28333 5 7.5 5C6.5 5 5.66667 5.33333 5 6C4.33333 6.66667 4 7.5 4 8.5C4 9.36667 4.30833 10.2875 4.925 11.2625C5.54167 12.2375 6.27917 13.1833 7.1375 14.1C7.99583 15.0167 8.87917 15.875 9.7875 16.675C10.6958 17.475 11.4333 18.1333 12 18.65C12.5667 18.1333 13.3042 17.475 14.2125 16.675C15.1208 15.875 16.0042 15.0167 16.8625 14.1C17.7208 13.1833 18.4583 12.2375 19.075 11.2625C19.6917 10.2875 20 9.36667 20 8.5C20 7.5 19.6667 6.66667 19 6C18.3333 5.33333 17.5 5 16.5 5C15.7167 5 15.05 5.17917 14.5 5.5375C13.95 5.89583 13.4333 6.41667 12.95 7.1C12.8333 7.26667 12.6917 7.39167 12.525 7.475C12.3583 7.55833 12.1833 7.6 12 7.6C11.8167 7.6 11.6417 7.55833 11.475 7.475C11.3083 7.39167 11.1667 7.26667 11.05 7.1Z" fill="#020831" />
                            </g>
                        </svg>
                        <p>Like Product</p>
                    </div>
                    <div className='flex gap-[8px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <mask id="mask0_30_2545" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                <rect width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_30_2545)">
                                <path d="M12 18L7.8 19.8C7.13333 20.0833 6.5 20.0292 5.9 19.6375C5.3 19.2458 5 18.6917 5 17.975V5C5 4.45 5.19583 3.97917 5.5875 3.5875C5.97917 3.19583 6.45 3 7 3H17C17.55 3 18.0208 3.19583 18.4125 3.5875C18.8042 3.97917 19 4.45 19 5V17.975C19 18.6917 18.7 19.2458 18.1 19.6375C17.5 20.0292 16.8667 20.0833 16.2 19.8L12 18ZM12 15.8L17 17.95V5H7V17.95L12 15.8Z" fill="#020831" />
                            </g>
                        </svg>
                        <p>Add to Bookmark</p>
                    </div>
                </div>
                <div className='w-[520px] h-[2px] bg-[#F8F8F8] mb-[25px]'></div>
                <div className='flex gap-[20px]'>
                    <div className='w-[42px] h-[42px] object-cover'>
                        <Image src={image1} alt='' className='w-full h-full rounded-full object-cover' />
                    </div>
                    <div className='flex flex-col mb-[25px]'>
                        <h1 className='text-[#020831] font-satoshi text-[22px] font-bold'>{data.mitra.name}</h1>
                        <div className='flex gap-[8px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <mask id="mask0_22_1043" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_22_1043)">
                                    <path d="M8.14995 21.75L6.69995 19.3L3.94995 18.7C3.69995 18.65 3.49995 18.5208 3.34995 18.3125C3.19995 18.1042 3.14162 17.875 3.17495 17.625L3.44995 14.8L1.57495 12.65C1.40828 12.4667 1.32495 12.25 1.32495 12C1.32495 11.75 1.40828 11.5333 1.57495 11.35L3.44995 9.2L3.17495 6.375C3.14162 6.125 3.19995 5.89583 3.34995 5.6875C3.49995 5.47916 3.69995 5.35 3.94995 5.3L6.69995 4.7L8.14995 2.25C8.28328 2.03333 8.46662 1.8875 8.69995 1.8125C8.93328 1.7375 9.16662 1.75 9.39995 1.85L12 2.95L14.6 1.85C14.8333 1.75 15.0666 1.7375 15.3 1.8125C15.5333 1.8875 15.7166 2.03333 15.85 2.25L17.3 4.7L20.05 5.3C20.3 5.35 20.5 5.47916 20.65 5.6875C20.8 5.89583 20.8583 6.125 20.825 6.375L20.55 9.2L22.425 11.35C22.5916 11.5333 22.675 11.75 22.675 12C22.675 12.25 22.5916 12.4667 22.425 12.65L20.55 14.8L20.825 17.625C20.8583 17.875 20.8 18.1042 20.65 18.3125C20.5 18.5208 20.3 18.65 20.05 18.7L17.3 19.3L15.85 21.75C15.7166 21.9667 15.5333 22.1125 15.3 22.1875C15.0666 22.2625 14.8333 22.25 14.6 22.15L12 21.05L9.39995 22.15C9.16662 22.25 8.93328 22.2625 8.69995 22.1875C8.46662 22.1125 8.28328 21.9667 8.14995 21.75ZM10.95 12.7L9.49995 11.275C9.31662 11.0917 9.08745 11 8.81245 11C8.53745 11 8.29995 11.1 8.09995 11.3C7.91662 11.4833 7.82495 11.7167 7.82495 12C7.82495 12.2833 7.91662 12.5167 8.09995 12.7L10.25 14.85C10.45 15.05 10.6833 15.15 10.95 15.15C11.2166 15.15 11.45 15.05 11.65 14.85L15.9 10.6C16.1 10.4 16.1958 10.1667 16.1875 9.9C16.1791 9.63333 16.0833 9.4 15.9 9.2C15.7 9 15.4625 8.89583 15.1875 8.8875C14.9125 8.87916 14.675 8.975 14.475 9.175L10.95 12.7Z" fill="#0075FF" />
                                </g>
                            </svg>
                            <p>Mitra Premium</p>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-[520px] h-fit md:h-[74px] rounded-tl-[12px] rounded-tr-[12px] border-[1px] border-[#E7E7E7] px-[18px] py-[14px] flex gap-[12px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <mask id="mask0_30_2555" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <rect width="24" height="24" fill="#0f2e4a" />
                        </mask>
                        <g mask="url(#mask0_30_2555)">
                            <path d="M6 20C5.16667 20 4.45833 19.7083 3.875 19.125C3.29167 18.5417 3 17.8333 3 17H1V6C1 5.45 1.19583 4.97917 1.5875 4.5875C1.97917 4.19583 2.45 4 3 4H17V8H20L23 12V17H21C21 17.8333 20.7083 18.5417 20.125 19.125C19.5417 19.7083 18.8333 20 18 20C17.1667 20 16.4583 19.7083 15.875 19.125C15.2917 18.5417 15 17.8333 15 17H9C9 17.8333 8.70833 18.5417 8.125 19.125C7.54167 19.7083 6.83333 20 6 20ZM6 18C6.28333 18 6.52083 17.9042 6.7125 17.7125C6.90417 17.5208 7 17.2833 7 17C7 16.7167 6.90417 16.4792 6.7125 16.2875C6.52083 16.0958 6.28333 16 6 16C5.71667 16 5.47917 16.0958 5.2875 16.2875C5.09583 16.4792 5 16.7167 5 17C5 17.2833 5.09583 17.5208 5.2875 17.7125C5.47917 17.9042 5.71667 18 6 18ZM3 15H3.8C4.08333 14.7 4.40833 14.4583 4.775 14.275C5.14167 14.0917 5.55 14 6 14C6.45 14 6.85833 14.0917 7.225 14.275C7.59167 14.4583 7.91667 14.7 8.2 15H15V6H3V15ZM18 18C18.2833 18 18.5208 17.9042 18.7125 17.7125C18.9042 17.5208 19 17.2833 19 17C19 16.7167 18.9042 16.4792 18.7125 16.2875C18.5208 16.0958 18.2833 16 18 16C17.7167 16 17.4792 16.0958 17.2875 16.2875C17.0958 16.4792 17 16.7167 17 17C17 17.2833 17.0958 17.5208 17.2875 17.7125C17.4792 17.9042 17.7167 18 18 18ZM17 13H21.25L19 10H17V13Z" fill="#060a29" />
                        </g>
                    </svg>
                    <div className='flex flex-col'>
                        <h1>Free Delivery</h1>
                        <p>Enter your postal code for delivery availability</p>
                    </div>
                </div>
                <div className='w-full md:w-[520px] h-fit md:h-[74px] rounded-bl-[12px] rounded-br-[12px] border-[1px] border-[#E7E7E7] px-[18px] py-[14px] flex gap-[12px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <mask id="mask0_30_2555" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <rect width="24" height="24" fill="#0f2e4a" />
                        </mask>
                        <g mask="url(#mask0_30_2555)">
                            <path d="M6 20C5.16667 20 4.45833 19.7083 3.875 19.125C3.29167 18.5417 3 17.8333 3 17H1V6C1 5.45 1.19583 4.97917 1.5875 4.5875C1.97917 4.19583 2.45 4 3 4H17V8H20L23 12V17H21C21 17.8333 20.7083 18.5417 20.125 19.125C19.5417 19.7083 18.8333 20 18 20C17.1667 20 16.4583 19.7083 15.875 19.125C15.2917 18.5417 15 17.8333 15 17H9C9 17.8333 8.70833 18.5417 8.125 19.125C7.54167 19.7083 6.83333 20 6 20ZM6 18C6.28333 18 6.52083 17.9042 6.7125 17.7125C6.90417 17.5208 7 17.2833 7 17C7 16.7167 6.90417 16.4792 6.7125 16.2875C6.52083 16.0958 6.28333 16 6 16C5.71667 16 5.47917 16.0958 5.2875 16.2875C5.09583 16.4792 5 16.7167 5 17C5 17.2833 5.09583 17.5208 5.2875 17.7125C5.47917 17.9042 5.71667 18 6 18ZM3 15H3.8C4.08333 14.7 4.40833 14.4583 4.775 14.275C5.14167 14.0917 5.55 14 6 14C6.45 14 6.85833 14.0917 7.225 14.275C7.59167 14.4583 7.91667 14.7 8.2 15H15V6H3V15ZM18 18C18.2833 18 18.5208 17.9042 18.7125 17.7125C18.9042 17.5208 19 17.2833 19 17C19 16.7167 18.9042 16.4792 18.7125 16.2875C18.5208 16.0958 18.2833 16 18 16C17.7167 16 17.4792 16.0958 17.2875 16.2875C17.0958 16.4792 17 16.7167 17 17C17 17.2833 17.0958 17.5208 17.2875 17.7125C17.4792 17.9042 17.7167 18 18 18ZM17 13H21.25L19 10H17V13Z" fill="#060a29" />
                        </g>
                    </svg>
                    <div className='flex flex-col'>
                        <h1>Free Delivery</h1>
                        <p>Enter your postal code for delivery availability</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderDetails