import { Post } from "../entities/post";

export interface createPost {
  execute(data: FormData): Promise<Post>;
}
