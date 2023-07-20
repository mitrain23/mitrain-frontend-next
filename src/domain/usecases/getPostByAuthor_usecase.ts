import { Post } from "../entities/post";


export interface getPostByAuthor {
    execute(id: number): Promise<Post[] | null>
}