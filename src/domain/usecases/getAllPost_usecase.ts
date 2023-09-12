import { Post } from "../entities/post";

export interface GetAllPostUseCase {
  execute(pageNumber: number): Promise<Post[] | null>;
}

