import IAllMessageById from "@/src/domain/entities/allMessageByIdResponse";
import IChatResponse from "@/src/domain/entities/chatResponse";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.BASE_URL;

export class ChatRepository {
  static getChats = async () => {
    const token = Cookies.get("token");

    const response = await axios.get(`${API_BASE_URL}/api/chat`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response.data;
  };

  static createOrEnterChat = async (userId: string): Promise<IChatResponse> => {
    const token = Cookies.get("token");

    const response = await axios.post(
      `${API_BASE_URL}/api/chat`,
      { Id: userId }, // kenapa gk userId key nya ? ada alasannya di BE. btw itu huruf I nya kapital sengaja ya bre
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.data;
  };

  static getAllMessageById = async (
    chatId: string,
  ): Promise<IAllMessageById[]> => {
    const token = Cookies.get("token");

    const response = await axios.get(`${API_BASE_URL}/api/message/${chatId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response.data.data;
  };

  static sendMessage = async (chatId: string, content: string) => {
    const token = Cookies.get("token");

    const response = await axios.post(
      `${API_BASE_URL}/api/message`,
      {
        content,
        chatId,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  };
}
