import { Post } from "@/src/domain/entities/post";
import { IUpdatePostRequest } from "@/src/domain/entities/updatePostRequest";
import { IUpdatePost } from "@/src/domain/usecases/updatePost_usecase";
import { PostsRepository } from "@/src/infrastructure/services/posts/postsRepository";

export class UpdatePostUseCaseImpl implements IUpdatePost {
  execute(data: IUpdatePostRequest, postId: string): Promise<Post> {
    return PostsRepository.updatePost(data, postId);
  }
}
