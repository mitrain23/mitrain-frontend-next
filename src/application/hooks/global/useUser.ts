import { useEffect, useState } from "react";
import { TChatUser } from "../../zustand/useChatStore";

export const useUser = () => {
  const [user, setUser] = useState<TChatUser | null>(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);

  return { currentUser: user };
};
