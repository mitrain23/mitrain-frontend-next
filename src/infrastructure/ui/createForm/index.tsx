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



    // handleFileChange
    const handleFileChange = (file: any, boxNumber: any, coverImage: any) => {
        const updatedImages = [...coverImages];
        const coverImageValues = [...coverImages]
        // console.log(updatedImages, 'tes')
        for (let i = 0; i < updatedImages.length; i++) {
            if (updatedImages[i] === null) {
                updatedImages[i] = file;
                coverImageValues[i] = coverImage
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
            formData.append('images', coverImage);
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

            <form onSubmit={handleSubmit}>
                <div className='border-2 border-grey-200 px-10 py-5 mb-10'>
                    <label className="flex flex-row items-start justify-start gap-10 py-2 w-full">
                        <div className='flex flex-col items-start justify-center gap-2 w-[550px]'>
                            <div className='flex flex-row gap-2'>
                                <p>Title</p>
                                <p>wajib</p>
                            </div>
                            <p>Nama produk min. 40 karakter dengan memasukkan merek, jenis produk, warna, bahan, atau tipe.
                            </p>
                        </div>
                        <input
                            type="text"
                            name="title"
                            value={formState.title}
                            onChange={(e) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            className="border border-gray-300 px-2 py-1 w-full"
                        />
                    </label>
                    <label className="flex flex-row items-start justify-start gap-10 py-2 w-full">
                        <div className='flex flex-col items-start justify-center gap-2 w-[550px]'>
                            <div className='flex flex-row gap-2'>
                                <p>Deskripsi</p>
                                <p>wajib</p>
                            </div>
                            <p>Pastikan deskripsi produk memuat penjelasan detail terkait produkmu agar pembeli mudah mengerti dan menemukan produkmu.

                                Disarankan untuk tidak memasukkan info nomor HP, e-mail, dsb. ke dalam deskripsi produk untuk melindungi data pribadimu.</p>
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
                            className="border border-gray-300 px-2 py-1 h-[200px] w-full"

                        />
                    </label>
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
                            type="text"
                            name='phone_number_whatsapp'
                            value={formState.phone_number_whatsapp}
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
                        Contact Phone Number:
                        <input
                            type="text"
                            name='phone_number_contact'
                            value={formState.phone_number_contact}
                            onChange={(e) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            className="border border-gray-300 px-2 py-1"
                        />
                    </label>
                    <div className='flex items-start gap-5'>
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
                <button className='btn' type="submit">Create Post</button>
            </form>

        </>
    )
}

export default CreateForm