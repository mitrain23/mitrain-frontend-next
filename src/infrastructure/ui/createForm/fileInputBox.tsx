"use client";

import { useState, useRef, useEffect } from "react";

type TProps = {
  boxNumber: number;
  onChange: (
    file: File | null,
    boxNumber: number,
    coverImage: {
      file: File | null;
      imageUrl: string | null;
    },
  ) => void;
  coverImage: {
    file: File | null;
    imageUrl: string | null;
  };
};

const FileInputBox: React.FC<TProps> = ({
  boxNumber,
  onChange,
  coverImage,
}) => {
  // console.log(coverImage.imageUrl);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const [image, setImage] = useState("https://placehold.co/600x400/png");
  const [saveImage, setSaveImage] = useState(
    "https://placehold.co/600x400/png",
  );
  const handleUploadImage = (e: any) => {
    const uploaded = e.target.files[0];
    // setImage(URL.createObjectURL(uploaded))
    const imageUrl = URL.createObjectURL(uploaded);

    onChange(uploaded, boxNumber, {
      file: uploaded,
      imageUrl,
    });
    setSaveImage(uploaded);
  };

  useEffect(() => {
    if (coverImage?.imageUrl) {
      setImage(coverImage?.imageUrl);
    } else {
      setImage("https://placehold.co/600x400/png");
    }
  }, [coverImage?.imageUrl]);

  const handleDeleteImage = () => {
    onChange(null, boxNumber, {
      file: null,
      imageUrl: null,
    });
    setSaveImage("");
  };

  return (
    <div className="relative">
      <div
        onClick={handleImageClick}
        className="w-[164px] h-[164px] bg-gray-200"
      >
        <img src={image} alt="" className="w-full h-full" />
        {/* <input type="file" className="file-input file-input-bordered w-full max-w-xs" /> */}
        <input
          className="hidden"
          type="file"
          onChange={handleUploadImage}
          ref={fileInputRef}
        />
      </div>
      {coverImage?.imageUrl && (
        <button
          onClick={handleDeleteImage}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md z-10"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default FileInputBox;
