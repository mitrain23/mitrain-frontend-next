'use client'

import { Post } from '@/src/domain/entities/post';
import React, { useState } from 'react'
import FileInputBox from './fileInputBox';
import { useCreatePost } from '@/src/application/hooks/posts/useCreatePost';
import { decodeToken } from '@/src/utils/auth/decodeToken';



interface FormState {
    title: string;
    description: string;
    category: string;
    priceMin: string;
    priceMax: string;
    location: string;
    phoneIntWhatsapp: string;
    phoneIntContact: string;
}

interface ImageData {
    file: File | null;
    imageUrl: string | null;
}

const CreateForm = () => {



    const [formState, setFormState] = useState<FormState>({
        title: '',
        description: '',
        category: '',
        priceMin: '',
        priceMax: '',
        location: '',
        phoneIntWhatsapp: '',
        phoneIntContact: '',
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

    if (createPost.isLoading) {
        return <div className='min-h-screen'>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="w-[150px] h-[100px] flex item-center justify-center rounded-sm bg-white">
                    <span className="loading loading-spinner loading-lg text-info"></span>
                </div>
            </div>
        </div>
    }

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
            const response = await createPost.createPostMutation(formData);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        setCoverImages(Array(5).fill(null));
        setFormState({
            title: '',
            description: '',
            category: '',
            priceMin: '',
            priceMax: '',
            location: '',
            phoneIntWhatsapp: '',
            phoneIntContact: '',
        });

        // console.log([...formData])
        console.log(formState, 'ini formState');
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
                        <h2 className='text-black font-satoshi font-bold text-[22px]'>Kategori Mitra</h2>
                        <div className='font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]'>
                            Pilih kategori yang sesuai dengan produk akan Anda. <br /> Jika pemilihan kategori kurang sesuai, maka kategori <br /> akan diubah oleh pihak MitraIn ID.
                        </div>
                    </div>
                    <select
                        name='category'
                        value={formState.category}
                        onChange={(e) =>
                            setFormState((prevState) => ({
                                ...prevState,
                                [e.target.name]: e.target.value,
                            }))
                        }
                        className="select select-bordered w-[648px]  font-inter text-[#6F7277] font-normal text-[16px]">
                        <option disabled value=''>Pilih Kategori</option>
                        <option>Konveksi</option>
                    </select>
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

                <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
                    <div className='flex flex-col items-start justify-center gap-2 md:w-[550px]'>
                        <h2 className='text-black font-satoshi font-bold text-[22px]'>Harga*</h2>
                        <div className='font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]'>
                            Masukkan harga minimum dan maksimum produk yang <br /> Anda tawarkan agar pembeli paham tentang harga yang <br /> Anda tawarkan.
                        </div>
                    </div>
                    <div className='flex flex-col gap-[24px]'>
                        <div className="form-control w-[648px]">
                            <label className="input-group">
                                <span className='bg-[#F3F4F5]'>Rp</span>
                                <input
                                    name='priceMin'
                                    type="text"
                                    placeholder="Harga Minimum"
                                    className="input input-bordered focus:outline-none w-full"
                                    value={formState.priceMin}
                                    onChange={(e) =>
                                        setFormState((prevState) => ({
                                            ...prevState,
                                            [e.target.name]: e.target.value,
                                        }))
                                    }
                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="input-group w-[648px]">
                                <span className='bg-[#F3F4F5]'>Rp</span>
                                <input
                                    type="text"
                                    name='priceMax'
                                    placeholder="Harga Maksimum"
                                    className="input input-bordered focus:outline-none w-full"
                                    value={formState.priceMax}
                                    onChange={(e) =>
                                        setFormState((prevState) => ({
                                            ...prevState,
                                            [e.target.name]: e.target.value,
                                        }))
                                    } />
                            </label>
                        </div>
                    </div>
                </label>


                <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
                    <div className='flex flex-col items-start justify-center gap-2 md:w-[550px]'>
                        <h2 className='text-black font-satoshi font-bold text-[22px]'>Lokasi*</h2>
                        <div className='font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]'>
                            Pastikan setiap produk yang diiklankan tidak melanggar <br /> Hak Kekayaan Intelektual merek lain.
                        </div>
                    </div>
                    <select
                        name='location'
                        value={formState.location}
                        onChange={(e) =>
                            setFormState((prevState) => ({
                                ...prevState,
                                [e.target.name]: e.target.value,
                            }))
                        }
                        className="select select-bordered w-[648px] font-inter text-[#6F7277] font-normal text-[16px]">
                        <option disabled value=''>Pilih Lokasi</option>
                        <option>Bandung</option>
                    </select>
                </label>


                <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
                    <div className='flex flex-col items-start justify-center gap-2 lg:w-[550px]'>
                        <h2 className='text-black font-satoshi font-bold text-[22px]'>Kontak*</h2>
                        <div className='font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]'>
                            Silahkan isi alamat kontak berikut agar pembeli dapat <br /> menghubungi Anda.
                        </div>

                    </div>
                    <div className='flex flex-col gap-[24px]'>
                        <input
                            type="text"
                            name='phoneIntContact'
                            placeholder='Nomor HP Pribadi*'
                            value={formState.phoneIntContact}
                            onChange={(e) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            className="border border-gray-300 px-[24px] py-[16px] w-[648px] h-[56px] rounded-[8px] outline-none"
                        />
                        <input
                            type="text"
                            name='phoneIntWhatsapp'
                            placeholder='Nomor WhatsApp*'
                            value={formState.phoneIntWhatsapp}
                            onChange={(e) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            className="border border-gray-300 px-[24px] py-[16px] w-[648px] h-[56px] rounded-[8px] outline-none"
                        />
                    </div>

                </label>


                <div className='my-5'></div>

                <button className='btn mb-5' type="submit">Create Post</button>
            </form>

        </>
    )
}

export default CreateForm