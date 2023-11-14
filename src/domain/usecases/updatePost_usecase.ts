import { Post } from "../entities/post";

export interface IUpdatePost {
  execute(data: any, postId: string): Promise<Post>;
}
