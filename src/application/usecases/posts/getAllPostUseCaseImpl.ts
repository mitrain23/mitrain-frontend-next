import { Post } from "@/src/domain/entities/post";
import { GetAllPostUseCase } from "@/src/domain/usecases/getAllPost_usecase";
import { PostsRepository } from "@/src/infrastructure/services/posts/postsRepository";

export class GetAllPostUseCaseImpl implements GetAllPostUseCase {
    execute(pageNumber: number): Promise<Post[] | null> {
        return PostsRepository.getAllPost(pageNumber);
    }
}