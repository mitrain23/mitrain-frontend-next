import { Post } from "../entities/post";

export interface GetPostById {
    execute(id: number): Promise<Post | null>;
}