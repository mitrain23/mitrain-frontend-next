'use client'

import { Post } from '@/src/domain/entities/post';
import React, { useState } from 'react'
import FileInputBox from './fileInputBox';
import { useCreatePost } from '@/src/application/hooks/posts/useCreatePost';
import { decodeToken } from '@/src/utils/auth/decodeToken';

const CreateForm = () => {


    const userId = decodeToken()

    const [formState, setFormState] = useState<Post>({
        title: '',
        description: '',
        price_min: '',
        price_max: '',
        location: '',
        phone_number_whatsapp: '',
        phone_number_contact: '',
        authorId: userId,
    });
    const [coverImages, setCoverImages] = useState(Array(5).fill(null));


    // console.log(coverImages[0].file, 'ini cover images');


    // handleFileChange
    interface ImageData {
        file: any;
        imageUrl: string | null;
    }

    const handleFileChange = (file: any, boxNumber: any, coverImage: any) => {
        const updatedImages: ImageData[] = coverImages.map((imageData) => ({
            file: imageData ? imageData.file : null,
            imageUrl: imageData ? imageData.imageUrl : null,
        }));
        const coverImageValues = [...coverImages];
        let imageUrl = URL.createObjectURL(file);

        for (let i = 0; i < updatedImages.length; i++) {
            if (updatedImages[i].file === null) {
                updatedImages[i] = {
                    file: file,
                    imageUrl: imageUrl,
                };
                coverImageValues[i] = coverImage;
                break;
            }
        }

        setCoverImages(updatedImages);
    };



    console.log(coverImages);

    const createPost = useCreatePost()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(formState).forEach(([key, value]) => {
            formData.append(key, value);
        });
        coverImages.forEach((coverImage, index) => {
            formData.append('images', coverImage.file);
        });


        try {
            const response = await createPost(formData);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        setCoverImages(Array(5).fill(null));
        setFormState({
            title: '',
            description: '',
            price_min: '',
            price_max: '',
            location: '',
            phone_number_whatsapp: '',
            phone_number_contact: '',
        });

        // console.log([...formData])
    };


    return (
        <>
            <h1 className='font-inter text-[30px] font-semibold mb-[32px] mt-[42px]'>Tambah Iklan</h1>
            <form onSubmit={handleSubmit} className='flex flex-col max-md:items-center md:gap-[42px]'>
                <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
                    <div className='flex flex-col items-start justify-center gap-2 lg:w-[550px]'>
                        <h2 className='text-black font-satoshi font-bold text-[22px]'>Informasi Produk*</h2>
                        <div className='font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]'>
                            <p>Pastikan setiap produk yang diiklankan tidak melanggar <br /> Hak Kekayaan Intelektual merek lain.</p>
                            <p>Disarankan menggunakan huruf kapital di awal kalimat <br /> dan hindari kapital berlebih.</p>
                        </div>

                    </div>
                    <input
                        type="text"
                        name="title"
                        placeholder='Custom Baju Anak (Jenis/ Kategori Produk) + TokoBaju (Merek)'
                        value={formState.title}
                        onChange={(e) =>
                            setFormState((prevState) => ({
                                ...prevState,
                                [e.target.name]: e.target.value,
                            }))
                        }
                        className="border border-gray-300 px-[24px] py-[16px] w-[648px] h-[56px] rounded-[8px] outline-none"
                    />
                </label>

                <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
                    <div className='flex flex-col items-start justify-center gap-2 md:w-[550px]'>
                        <h2 className='text-black font-satoshi font-bold text-[22px]'>Deskripsi Produk*</h2>
                        <div className='font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]'>
                            <p>Pastikan setiap produk yang diiklankan tidak melanggar <br /> Hak Kekayaan Intelektual merek lain.</p>
                            <p>Disarankan menggunakan huruf kapital di awal kalimat <br /> dan hindari kapital berlebih.</p>
                        </div>
                    </div>
                    <textarea
                        value={formState.description}
                        name='description'
                        onChange={(e) =>
                            setFormState((prevState) => ({
                                ...prevState,
                                [e.target.name]: e.target.value,
                            }))
                        }
                        className="border border-gray-300 px-[24px] py-[16px] w-[648px] h-[200px] rounded-[8px] outline-none"

                    />
                </label>

                <div className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
                    <div className='flex flex-col items-start justify-center gap-2 md:w-[550px]'>
                        <h2 className='text-black font-satoshi font-bold text-[22px]'>Foto Produk*</h2>
                        <div className='font-inter w-[420px] text-[#425379] text-[16px] flex flex-col gap-[12px]'>
                            <p>Format gambar berupa .jpg .jpeg .png dengan ukuran minimum adalah 300x300px (untuk gambar dengan kualitas optimal disarankan menggunakan 700x700px).</p>
                            <p>Pilih foto produk dengan cara mengklik gambar atau tarik dan letakkan hingga 5 foto sekaligus. Upload minimal 2 foto yang menarik dan berbeda-beda untuk menarik perhatian pembeli.</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-center md:items-start gap-5'>
                        {coverImages.map((coverImage, index) => (
                            <FileInputBox
                                key={index}
                                boxNumber={index + 1}
                                onChange={handleFileChange}
                                coverImage={coverImage}
                            />

                        ))}
                    </div>
                </div>

                <div className='border-2 border-grey-200 px-10 py-5 mb-10'>
                    <label className="flex flex-col items-start justify-start">
                        Price (Min):
                        <input
                            type="text"
                            name='price_min'
                            value={formState.price_min}
                            onChange={(e) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            className="border border-gray-300 px-2 py-1"
                        />
                    </label>
                    <label className="flex flex-col items-start justify-start">
                        Price (Max):
                        <input
                            type="text"
                            name='price_max'
                            value={formState.price_max}
                            onChange={(e) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            className="border border-gray-300 px-2 py-1"
                        />
                    </label>
                    <label className="flex flex-col items-start justify-start">
                        Location:
                        <input
                            type="text"
                            name='location'
                            value={formState.location}
                            onChange={(e) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            className="border border-gray-300 px-2 py-1"
                        />
                    </label>
                    <label className="flex flex-col items-start justify-start">
                        WhatsApp Phone Number:
                        <input
                            type="number"
                            name='phone_number_whatsapp'
                            value={formState.phone_number_whatsapp}
                            onChange={(e) => {
                                const value = e.target.value;
                                // Validate phone number length (12 digits)
                                if (e.target.name === 'phone_number_whatsapp' && value.length == 12) {
                                    return; // Do not update the state for phone numbers with other than 12 digits
                                }
                                setFormState((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: value,
                                }));
                            }}
                            className="border border-gray-300 px-2 py-1"
                        />
                    </label>
                    <label className="flex flex-col items-start justify-start">
                        Contact Phone Number:
                        <input
                            type="number"
                            name='phone_number_contact'
                            value={formState.phone_number_contact}
                            onChange={(e) => {
                                const value = e.target.value;
                                // Validate phone number length (12 digits)
                                if (e.target.name === 'phone_number_contact' && value.length == 12) {
                                    return; // Do not update the state for phone numbers with other than 12 digits
                                }
                                setFormState((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: value,
                                }));
                            }}
                            className="border border-gray-300 px-2 py-1"
                        />
                    </label>
                    <div className='my-5'></div>

                </div>
                <button className='btn mb-5' type="submit">Create Post</button>
            </form>

        </>
    )
}

export default CreateForm