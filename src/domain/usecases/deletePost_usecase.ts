import { responseDelete } from "@/src/infrastructure/services/posts/postsRepository";
import { Post } from "../entities/post";

export interface deletePost {
    execute(id: number): Promise<responseDelete>;
}