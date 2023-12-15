import { Post } from "@/src/domain/entities/post";
import { PostFilter } from "@/src/domain/entities/postFilter";
import axios from "axios";
import Cookies from "js-cookie";
import { GetPostByAuthorResponse } from "../../models/getPostByAuthorResponse";
import { PostDetailResponse } from "../../models/getPostDetailResponse";
import { IUpdatePostRequest } from "@/src/domain/entities/updatePostRequest";
import IAllPostResponse from "@/src/domain/entities/allPostResponse";

const API_BASE_URL = process.env.BASE_URL;

console.log(process.env.BASE_URL);

export interface responseDelete {
  data: string;
}

export const formatPrice = (input: string) => {
  return input.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export class PostsRepository {
  static getAllPost = async (
    pageNumber: number,
  ): Promise<IAllPostResponse[]> => {
    const response = await axios.get(
      `${API_BASE_URL}/api/post?page=${pageNumber}&pageSize=10`,
    );
    const { data } = await response.data;

    return data;
  };

  static getPostById = async (id: string): Promise<PostDetailResponse> => {
    console.log(id);
    const response = await fetch(`${API_BASE_URL}/api/post/${id}`, {
      headers: {
        // "ngrok-skip-browser-warning": "69420",
      },
    });
    const { data } = await response.json();

    return data;
  };

  static createPost = async (data: FormData) => {
    const token = Cookies.get("token");

    const response = await axios.post(`${API_BASE_URL}/api/post`, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "multipart/form-data",
        // "ngrok-skip-browser-warning": "69420",
      },
    });
    console.log(response.data);
    return response.data;
  };

  static deletePost = async (id: string): Promise<responseDelete> => {
    // const token = localStorage.getItem('token');
    const token = Cookies.get("token");
    const response = await axios.delete(`${API_BASE_URL}/api/post/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        // "ngrok-skip-browser-warning": "69420",
      },
    });

    console.log(response.data);
    return response.data;
  };

  static updatePost = async (
    data: IUpdatePostRequest,
    postId: string,
  ): Promise<Post> => {
    const token = Cookies.get("token");
    const response = await axios.put(
      `${API_BASE_URL}/api/post/${postId}`,
      data,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          // "ngrok-skip-browser-warning": "69420",
          // "Access-Control-Allow-Origin": `${API_BASE_URL}`,
        },
      },
    );

    console.log(response);

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
        // "ngrok-skip-browser-warning": "69420",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  };

  static getAllPostByFilter = async (
    postFilter: PostFilter,
  ): Promise<Post[]> => {
    const getParams = () => {
      const params = [];

      for (const [key, value] of Object.entries(postFilter)) {
        params.push(`${key}=${value}`);
      }

      return params.join("&");
    };

    const response = await fetch(
      `${API_BASE_URL}/api/post/search?${getParams()}`,
      {
        method: "GET",
        headers: {
          // "ngrok-skip-browser-warning": "69420",
        },
      },
    );
    const data = await response.json();

    return data;
  };
}
