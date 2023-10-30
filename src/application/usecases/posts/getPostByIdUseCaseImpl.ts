import { Post } from "@/src/domain/entities/post";
import { GetPostById } from "@/src/domain/usecases/getPostById_usecase";
import { PostsRepository } from "@/src/infrastructure/services/posts/postsRepository";

export class GetPostByIdImpl implements GetPostById {
  execute(id: string): Promise<Post | null> {
    return PostsRepository.getPostById(id);
  }
}
