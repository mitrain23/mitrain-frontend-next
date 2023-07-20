import { Post } from "@/src/domain/entities/post";
import { createPost } from "@/src/domain/usecases/createPost_usecase";
import { PostsRepository } from "@/src/infrastructure/services/posts/postsRepository";

export class CreatePostUseCaseImpl implements createPost {
    execute(data: FormData): Promise<Post> {
        return PostsRepository.createPost(data);
    }
}