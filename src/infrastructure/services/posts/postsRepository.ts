import { Post } from "@/src/domain/entities/post";
import { PostFilter } from "@/src/domain/entities/postFilter";
import axios from "axios";
import Cookies from "js-cookie";
import { GetPostByAuthorResponse } from "../../models/getPostByAuthorResponse";
import { PostDetailResponse } from "../../models/getPostDetailResponse";

const API_BASE_URL = process.env.BASE_URL;

console.log(process.env.BASE_URL);

export interface responseDelete {
  data: string;
}

export class PostsRepository {
  static getAllPost = async (pageNumber: number): Promise<Post[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/post?page=${pageNumber}&pageSize=10`,
    );
    const data = await response.json();
    return data.data;
  };

  static getPostById = async (id: string): Promise<PostDetailResponse> => {
    console.log(id);
    const response = await fetch(`${API_BASE_URL}/api/post/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    const data = await response.json();
    console.log(data.data);
    return data.data;
  };

  static createPost = async (data: FormData) => {
    // const token = localStorage.getItem('token');
    const token = Cookies.get("token");
    const response = await axios.post(`${API_BASE_URL}/api/post`, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "multipart/form-data",
        "ngrok-skip-browser-warning": "69420",
      },
    });
    console.log(response.data);
    return response.data;
  };

  static deletePost = async (id: string): Promise<responseDelete> => {
    // const token = localStorage.getItem('token');
    const token = Cookies.get("token");
    const response = await axios.delete(`${API_BASE_URL}/api/delete/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "ngrok-skip-browser-warning": "69420",
      },
    });
    console.log(response.data);
    return response.data;
  };

  static getPostByAuthor = async (
    id: string | null,
  ): Promise<GetPostByAuthorResponse> => {
    const token = Cookies.get("token");
    console.log(token);
    console.log(id);
    const response = await fetch(`${API_BASE_URL}/api/post/postAuthor/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "ngrok-skip-browser-warning": "69420",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  };

  static getAllPostByFilter = async (
    postFilter: PostFilter,
  ): Promise<Post[]> => {
    // console.log(postFilter);
    const { page, search, price_max, price_min, lokasi } = postFilter;
    const token = Cookies.get("token");
    const response = await fetch(`${API_BASE_URL}/api/allPosts`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    const data = await response.json();
    console.log(data);
    return data.results;
  };
}
