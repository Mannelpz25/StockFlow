import { useEffect } from "react";
import { useUser, User } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";

import { login as loginApi} from "../api/jsonRPC"

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const login = async({ username, password }: { username: string; password: string }) => {
    console.log(username, password);
    const uid = await loginApi(username, password);
    if (!uid) {
      return;
    }
    const user: User = {
      uid,
      name: "John Doe",
      email: "",
    };
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout };
};