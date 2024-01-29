import IAllMessageById from "@/src/domain/entities/allMessageByIdResponse";
import IChatResponse from "@/src/domain/entities/chatResponse";
import { IMessageReaded } from "@/src/domain/entities/messageReadedResponse";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.BASE_URL;

export class ChatRepository {
  static getChats = async (): Promise<IChatResponse[] | []> => {
    const token = Cookies.get("token");

    const response = await axios.get(`${API_BASE_URL}/api/chat`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response.data;
  };

  static createOrEnterChat = async (
    productId: string,
  ): Promise<IChatResponse> => {
    const token = Cookies.get("token");

    const response = await axios.post(
      `${API_BASE_URL}/api/chat`,
      { product_id: productId },
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

  static sendMessage = async (
    chatId: string,
    content: string,
  ): Promise<IAllMessageById> => {
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

  static setMessageReaded = async (chatId: string): Promise<IMessageReaded> => {
    const token = Cookies.get("token");

    const response = await axios.put(
      `${API_BASE_URL}/api/message/${chatId}`,
      {
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

  static getNotifications = async (): Promise<IAllMessageById[] | []> => {
    const token = Cookies.get("token");

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/message/getUnread`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      );

      return response.data.data;
    } catch (err) {
      return [];
    }
  };
}
