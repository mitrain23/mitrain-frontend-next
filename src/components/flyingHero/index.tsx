'use client'

import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const FlyingHero = () => {
    const [vendor, setVendor] = useState('Konveksi');
    const [jenis, setJenis] = useState('Baju');
    const [lokasi, setLokasi] = useState('Bandung');
    const [harga, setHarga] = useState('');
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setTimeout(() => {
            router.push(
                `/results?vendor=${vendor}&jenis=${jenis}&lokasi=${lokasi}&harga=${harga}&search=${searchText}`
            );
        }, 500);
    };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case 'vendor':
                setVendor(value);
                break;
            case 'jenis':
                setJenis(value);
                break;
            case 'lokasi':
                setLokasi(value);
                break;
            case 'harga':
                setHarga(value);
                break;
            case 'search':
                setSearchText(value);
                break;
            default:
                break;
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="w-[150px] h-[100px] flex item-center justify-center rounded-sm bg-white">
                    <span className="loading loading-spinner loading-lg text-info"></span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md rounded-md mx-auto w-[85%] h-fit absolute z-10 bottom-[-150px] sm:bottom-[-90px] right-0 left-0 px-16 py-8 flex flex-col items-center sm:items-stretch" style={{ zIndex: 1 }}>
            <div className="flex flex-row mb-5">
                <h1 className="text-md md:text-2xl font-bold text-black">Cari Mitra Bisnis Terbaik</h1>
            </div>
            <div className="dropdown-input">
                <form action="" onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row gap-5 mb-2">
                        <select
                            name="vendor"
                            className="select select-xs md:select-md select-bordered w-full max-w-xs"
                            value={vendor}
                            onChange={handleChange}
                        >
                            <option value="" selected hidden>
                                Vendor
                            </option>
                            <option>Vendor</option>
                        
                        </select>

                        <select
                            name="jenis"
                            className="select select-xs md:select-md  select-bordered w-full max-w-xs"
                            value={jenis}
                            onChange={handleChange}
                        >
                            <option value="" selected hidden>
                                Jenis
                            </option>
                            <option>Konveksi</option>
                        </select>
                        <select
                            name="lokasi"
                            className="select select-xs md:select-md select-bordered w-full max-w-xs"
                            value={lokasi}
                            onChange={handleChange}
                        >
                            <option value="" disabled hidden>
                                Lokasi
                            </option>
                            <option>Bandung</option>
                        </select>
                        {/* <select
                            name="harga"
                            className="select select-xs md:select-md  select-bordered w-full max-w-xs"
                            // value={harga}
                            // onChange={handleChange}
                        >
                           
                        </select> */}
                        <input
                            defaultValue='300000'
                            type="number"
                            name="search"
                            placeholder="harga"
                            className="input input-xs md:input-md w-full input-bordered mb-2 placeholder-black"
                        />
                    </div>
                    <input
                        type="text"
                        name="search"
                        placeholder="Apa yang sedang anda cari?"
                        className="input input-xs md:input-md w-full input-bordered mb-2"
                        value={searchText}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn btn-sm md:btn-md w-full bg-blue-300 text-white">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FlyingHero;
