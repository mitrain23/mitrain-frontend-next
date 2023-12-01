import { Post } from "../entities/post";
import { PostFilter } from "../entities/postFilter";

export interface GetAllFilteredPostUseCase {
  execute(formData: PostFilter): Promise<Post[] | null>;
}
