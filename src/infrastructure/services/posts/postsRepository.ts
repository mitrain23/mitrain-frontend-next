import { Post } from "@/src/domain/entities/post";
import { PostFilter } from "@/src/domain/entities/postFilter";
import axios from "axios";
import Cookies from 'js-cookie';

export interface responseDelete {
    data: string;
}


export class PostsRepository {
    static getAllPost = async (): Promise<Post[]> => {
        const response = await fetch('http://https://2af1-2a02-4780-10-d402-00-1.ngrok-free.app/api/allPosts');
        const data = await response.json();
        return data;
    }

    static getPostById = async (id: number): Promise<Post> => {
        const response = await fetch(`http://https://2af1-2a02-4780-10-d402-00-1.ngrok-free.app/api/post/${id}`);
        const data = await response.json();
        return data;
    }

    static createPost = async (data: FormData) => {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://https://2af1-2a02-4780-10-d402-00-1.ngrok-free.app/api/create', data, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'multipart/form-data',
            }
        })
        return response.data
    }

    static deletePost = async (id: number): Promise<responseDelete> => {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://https://2af1-2a02-4780-10-d402-00-1.ngrok-free.app/api/delete/${id}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            }
        });
        return response.data
    }

    static getPostByAuthor = async (id: number): Promise<Post[]> => {
        const token = Cookies.get('token');
        // const token = localStorage.getItem('token');
        const response = await fetch(`http://https://2af1-2a02-4780-10-d402-00-1.ngrok-free.app/api/postAuthor/${id}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            }
        });
        const data = await response.json();
        return data.getPostByAuthor;
    }

    static getAllPostByFilter = async (postFilter: PostFilter): Promise<Post[]> => {
        console.log(postFilter)
        const { page, search, price_max, price_min, lokasi } = postFilter
        // console.log(page)
        const token = Cookies.get('token');
        const response = await fetch(`https://2af1-2a02-4780-10-d402-00-1.ngrok-free.app/api/search`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': '69420',
            },
        });
        const data = await response.json();
        return data.results

    }








}