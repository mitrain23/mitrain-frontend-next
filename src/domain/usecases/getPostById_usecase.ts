import { PostDetailResponse } from "@/src/infrastructure/models/getPostDetailResponse";
import { Post } from "../entities/post";

export interface GetPostById {
  execute(id: string): Promise<PostDetailResponse | null>;
}
