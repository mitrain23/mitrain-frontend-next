import { Post } from "@/src/domain/entities/post";
import { getPostByAuthor } from "@/src/domain/usecases/getPostByAuthor_usecase";
import { PostsRepository } from "@/src/infrastructure/services/posts/postsRepository";

export class GetPostByAuthorImpl implements getPostByAuthor {
    execute(id: number): Promise<Post[] | null> {
        return PostsRepository.getPostByAuthor(id);
    }
}