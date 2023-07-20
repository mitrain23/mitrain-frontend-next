'use client'

import { useGetPostById } from "@/src/application/hooks/posts/useGetPostById";
import DeskripsiDetails from "@/src/components/deskripsiDetails";
import HeaderDetails from "@/src/components/headerDetails";
import ProfileDetailsCard from "@/src/components/profileDetailsCard";
import { Post } from "@/src/domain/entities/post";
import LayoutTemplate from "@/src/utils/layout";
import Image from "next/image";
import { useState } from "react";


export default function Page({ params }: { params: { slug: number } }) {
  console.log(params)
  const getPostByIdQuery = useGetPostById(params.slug);
  if (getPostByIdQuery.isLoading) {
    return <div>Loading</div>
  }

  return (
    <>
      {/* images grid */}
      <HeaderDetails image={getPostByIdQuery.data?.image} data={getPostByIdQuery.data} />
      {/* deskripsi */}
      <DeskripsiDetails data={getPostByIdQuery.data} />
    </>
  )
}