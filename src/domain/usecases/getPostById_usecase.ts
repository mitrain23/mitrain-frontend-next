import { Post } from "../entities/post";

export interface GetPostById {
    execute(id: string): Promise<Post | null>;
}