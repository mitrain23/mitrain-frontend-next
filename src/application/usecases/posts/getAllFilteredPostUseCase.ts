import { Post } from "@/src/domain/entities/post";
import { PostFilter } from "@/src/domain/entities/postFilter";
import { GetAllFilteredPostUseCase } from "@/src/domain/usecases/getAllFilteredPost_usecase";
import { PostsRepository } from "@/src/infrastructure/services/posts/postsRepository";

export class GetAllFilteredPostImpl implements GetAllFilteredPostUseCase {
  execute(formData: PostFilter): Promise<Post[] | null> {
    return PostsRepository.getAllPostByFilter(formData);
  }
}
