import { useQuery } from "react-query"
import { GetPostByIdImpl } from "../../usecases/posts/getPostByIdUseCaseImpl"

export const useGetPostById = (id: number) => {
    const getPostByIdQuery = useQuery('postId', async () => {
        const getPostById = new GetPostByIdImpl();
        return getPostById.execute(id);
    })

    return getPostByIdQuery;
}