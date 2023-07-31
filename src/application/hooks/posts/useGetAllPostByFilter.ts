import { useQuery } from "react-query"
import { GetAllPostUseCaseImpl } from "../../usecases/posts/getAllPostUseCaseImpl";
import { PostFilter } from "@/src/domain/entities/postFilter";
import { GetAllPostByFilterImpl } from "../../usecases/posts/getAllPostByFilterUseCaseImpl";





export const useGetAllPostByFilter = (postFilter: PostFilter) => {
    const getAllPostByFilterQuery = useQuery('getAllPostByFilter', async () => {
        const getAllPostByFilter = new GetAllPostByFilterImpl();
        return getAllPostByFilter.execute(postFilter);
    });

    return getAllPostByFilterQuery


}