'use client'

import { useState, useRef } from "react";



const FileInputBox = ({ boxNumber, onChange, coverImage }: any) => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };


    const [image, setImage] = useState('https://placehold.co/600x400/png')
    const [saveImage, setSaveImage] = useState<any>(null)
    const handleUploadImage = (e: any) => {
        let uploaded = e.target.files[0];
        setImage(URL.createObjectURL(uploaded))
        let imageUrl = URL.createObjectURL(uploaded)
        onChange(uploaded, boxNumber, imageUrl);
        setSaveImage(uploaded)
    }


    return (
        <div onClick={handleImageClick}  className="w-[200px] h-[200px] bg-gray-200">
                <img src={image} alt="" className="w-full h-full" />
            {/* <input type="file" className="file-input file-input-bordered w-full max-w-xs" /> */}
            <input className="hidden" type="file" onChange={handleUploadImage} ref={fileInputRef} />
        </div>
    );
};

export default FileInputBox