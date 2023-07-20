import { UseQueryResult, useQuery } from "react-query"
import { GetPostByAuthorImpl } from "../../usecases/posts/getPostByAuthorUseCaseImpl"
import { Post } from "@/src/domain/entities/post";



export const useGetPostByAuthor = (id: number): UseQueryResult<Post[] | null> => {
    const getPostByAuthorQuery = useQuery('postByAuthor', async () => {
        const getPostByAuthor = new GetPostByAuthorImpl();
        return getPostByAuthor.execute(id);
    })

    return getPostByAuthorQuery
}