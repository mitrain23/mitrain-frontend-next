import { Post } from "@/src/domain/entities/post";
import { UseQueryResult, useQuery } from "react-query";
import { GetAllPostUseCaseImpl } from "../../usecases/posts/getAllPostUseCaseImpl";

export const useGetAllPost = (): UseQueryResult<Post[] | null> => {
    const getAllPostQuery = useQuery('posts', async () => {
        const getAllPostUseCase = new GetAllPostUseCaseImpl();
        return getAllPostUseCase.execute();
    });

    return getAllPostQuery;
};