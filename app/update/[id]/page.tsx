"use client";

import { PostsRepository } from "@/src/infrastructure/services/posts/postsRepository";
import UpdateForm from "@/src/infrastructure/ui/updateForm";
import LayoutTemplate from "@/src/utils/layout";
import React from "react";
import { useQuery } from "react-query";

type TProps = {
  params: {
    id: string;
  };
};

const Update: React.FC<TProps> = ({ params }) => {
  const getPostByIdQuery = useQuery(["get_post_by_id", params.id], () =>
    PostsRepository.getPostById(params.id),
  );

  return (
    <LayoutTemplate>
      <UpdateForm data={getPostByIdQuery.data} />
    </LayoutTemplate>
  );
};

export default Update;
