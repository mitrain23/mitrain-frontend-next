import { Post } from "@/src/domain/entities/post";
import axios from "axios";


export interface responseDelete {
    data: string;
}



export class PostsRepository {
    static getAllPost = async (): Promise<Post[]> => {
        const response = await fetch('http://localhost:8080/api/allPosts');
        const data = await response.json();
        return data;
    }

    static getPostById = async (id: number): Promise<Post> => {
        const response = await fetch(`http://localhost:8080/api/post/${id}`);
        const data = await response.json();
        return data;
    }

    static createPost = async (data: FormData) => {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8080/api/create', data, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'multipart/form-data',
            }
        })
        return response.data
    }

    static deletePost = async (id: number): Promise<responseDelete> => {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:8080/api/delete/${id}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            }
        });
        return response.data
    }

    static getPostByAuthor = async (id: number): Promise<Post[]> => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/postAuthor/${id}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            }
        });
        const data = await response.json();
        return data.getPostByAuthor;
    }
}