import { TChatUser } from "../../zustand/useChatStore";

export const useUser = () => {
  return { currentUser: getCurrentUser() };
};

export const getCurrentUser = () => {
  if (typeof window !== "undefined") {
    const userFromStorage = localStorage.getItem("user");

    if (userFromStorage) {
      return JSON.parse(userFromStorage) as TChatUser;
    }

    return null;
  }

  return null;
};
