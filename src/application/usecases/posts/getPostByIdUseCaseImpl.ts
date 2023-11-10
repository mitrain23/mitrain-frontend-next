import { Post } from "@/src/domain/entities/post";
import { GetPostById } from "@/src/domain/usecases/getPostById_usecase";
import { PostDetailResponse } from "@/src/infrastructure/models/getPostDetailResponse";
import { PostsRepository } from "@/src/infrastructure/services/posts/postsRepository";

export class GetPostByIdImpl implements GetPostById {
  execute(id: string): Promise<PostDetailResponse | null> {
    return PostsRepository.getPostById(id);
  }
}
