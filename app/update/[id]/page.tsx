"use client";

import { useGetPostById } from "@/src/application/hooks/posts/useGetPostById";
import UpdateForm from "@/src/infrastructure/ui/updateForm";
import LayoutTemplate from "@/src/utils/layout";
import React from "react";

type TProps = {
  params: {
    id: string;
  };
};

const Update: React.FC<TProps> = ({ params }) => {
  const getPostByIdQuery = useGetPostById(params.id);

  return (
    <LayoutTemplate>
      <UpdateForm data={getPostByIdQuery.data} />
    </LayoutTemplate>
  );
};

export default Update;
