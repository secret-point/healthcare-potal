import useApiFetch from "./useApiFetch";
import { User } from "../types/user";

export const useFetchUser = () => {
  const apiFetch = useApiFetch();

  return async () => {
    const { data } = await apiFetch(`/user`, {
      method: "GET",
    });
    return data;
  };
};

export const useSignIn = () => {
  const apiFetch = useApiFetch();

  return async (email: string, password: string): Promise<User> => {
    const { data } = await apiFetch("/login", {
      method: "POST",
      data: { email, password },
    });
    return data;
  };
};

export const useRegister = () => {
  const apiFetch = useApiFetch();

  return async (email: string, password: string): Promise<User> => {
    const { data } = await apiFetch("/register", {
      method: "POST",
      data: { email, password },
    });
    return data;
  };
};

export const getToken = () => sessionStorage.getItem("token");

export const removeToken = () => {
  sessionStorage.removeItem("token");
};
