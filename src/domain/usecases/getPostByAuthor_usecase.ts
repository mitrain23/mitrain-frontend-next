import { GetPostByAuthorResponse } from "@/src/infrastructure/models/getPostByAuthorResponse";
import { Post } from "../entities/post";


export interface getPostByAuthor {
    execute(id: string): Promise<GetPostByAuthorResponse | null>
}