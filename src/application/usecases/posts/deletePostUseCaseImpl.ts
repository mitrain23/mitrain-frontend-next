import { Post } from "@/src/domain/entities/post";
import { deletePost } from "@/src/domain/usecases/deletePost_usecase";
import {
  PostsRepository,
  responseDelete,
} from "@/src/infrastructure/services/posts/postsRepository";

export class DeletePostImpl implements deletePost {
  execute(id: string): Promise<responseDelete> {
    return PostsRepository.deletePost(id);
  }
}
