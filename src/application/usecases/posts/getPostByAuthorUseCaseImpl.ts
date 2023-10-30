import { Post } from "@/src/domain/entities/post";
import { getPostByAuthor } from "@/src/domain/usecases/getPostByAuthor_usecase";
import { GetPostByAuthorResponse } from "@/src/infrastructure/models/getPostByAuthorResponse";
import { PostsRepository } from "@/src/infrastructure/services/posts/postsRepository";

export class GetPostByAuthorImpl implements getPostByAuthor {
  execute(id: string | null): Promise<GetPostByAuthorResponse | null> {
    return PostsRepository.getPostByAuthor(id);
  }
}
