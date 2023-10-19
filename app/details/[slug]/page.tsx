'use client'

import { useGetPostById } from "@/src/application/hooks/posts/useGetPostById";
import ProfileDetailsCard from "@/src/components/profileDetailsCard";
import { Post } from "@/src/domain/entities/post";
import DescriptionDetails from "@/src/infrastructure/ui/details/descriptionDetails";
import DescripstionDetails from "@/src/infrastructure/ui/details/descriptionDetails";
import HeaderDetails from "@/src/infrastructure/ui/details/headerDetails";
import LayoutTemplate from "@/src/utils/layout";
import Image from "next/image";
import { useState } from "react";


export default function Page({ params }: { params: { slug: number } }) {
  // console.log(params.slug.toString().split('-'))
  const paramsSlug = params.slug.toString().split('-')
  console.log(paramsSlug)
  const paramsForApi = paramsSlug.slice(0, 5).join('-');
  console.log(paramsForApi);

  const getPostByIdQuery = useGetPostById(`${paramsForApi}`);
  if (getPostByIdQuery.isLoading) {
    return <div className='min-h-screen'>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="w-[150px] h-[100px] flex item-center justify-center rounded-sm bg-white">
          <span className="loading loading-spinner loading-lg text-info"></span>
        </div>
      </div>
    </div>
  }

  if (getPostByIdQuery.data) {
    console.log(getPostByIdQuery.data);
  }

  return (

    <LayoutTemplate>
      <HeaderDetails data={getPostByIdQuery.data} />
      <DescriptionDetails data={getPostByIdQuery.data} />
    </LayoutTemplate>
  )
}