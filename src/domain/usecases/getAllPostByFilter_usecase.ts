import { Post } from "../entities/post";
import { PostFilter } from "../entities/postFilter";

export interface getAllPostByFilter {
    execute(filterPost: PostFilter): Promise<Post[] | null>
}