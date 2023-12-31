import { useMutation, useQueryClient } from "react-query"
import { DeletePostImpl } from "../../usecases/posts/deletePostUseCaseImpl"



export const useDeletePost = (id: number) => {
    const queryClient = useQueryClient();
    const deletePostQuery = useMutation(async () => {
        const deletePost = new DeletePostImpl()
        await deletePost.execute(id);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('postByAuthor');
        }
    })  

    return deletePostQuery;
    

}