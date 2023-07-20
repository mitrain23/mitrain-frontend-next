import { useMutation } from "react-query"
import { DeletePostImpl } from "../../usecases/posts/deletePostUseCaseImpl"



export const useDeletePost = (id: number) => {
    const deletePostQuery = useMutation(async () => {
        const deletePost = new DeletePostImpl()
        return deletePost.execute(id);
    })

    return deletePostQuery;

}