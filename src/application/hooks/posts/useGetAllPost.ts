import { Post } from "@/src/domain/entities/post";
import { UseQueryResult, useQuery } from "react-query";
import { GetAllPostUseCaseImpl } from "../../usecases/posts/getAllPostUseCaseImpl";
import { PostFilter } from "@/src/domain/entities/postFilter";
import { GetAllFilteredPostImpl } from "../../usecases/posts/getAllFilteredPostUseCase";

export const useGetAllPost = (
  pageNumber: number,
): UseQueryResult<Post[] | null> => {
  const getAllPostQuery = useQuery("posts", async () => {
    const getAllPostUseCase = new GetAllPostUseCaseImpl();
    return getAllPostUseCase.execute(pageNumber);
  });

  return getAllPostQuery;
};

export const useGetAllFilteredPost = (
  formData: PostFilter,
): UseQueryResult<Post[] | null> => {
  const getAllFilteredPost = useQuery(["posts", formData], async () => {
    const getAllFilteredPostUseCase = new GetAllFilteredPostImpl();
    return getAllFilteredPostUseCase.execute(formData);
  });

  return getAllFilteredPost;
};
