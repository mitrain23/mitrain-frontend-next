import { Post } from "@/src/domain/entities/post";
import { PostFilter } from "@/src/domain/entities/postFilter";
import { getAllPostByFilter } from "@/src/domain/usecases/getAllPostByFilter_usecase";
import { PostsRepository } from "@/src/infrastructure/services/posts/postsRepository";





export class GetAllPostByFilterImpl implements getAllPostByFilter {
    execute(postFilter: PostFilter): Promise<Post[] | null> {
        return PostsRepository.getAllPostByFilter(postFilter)
    }
}