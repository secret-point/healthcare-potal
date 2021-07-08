import useApiFetch from "./useApiFetch";
import { AuthorizedUser } from "../types/user";

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

  return async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthorizedUser> => {
    const { data } = await apiFetch("/cp/login", {
      method: "POST",
      data: { email, password },
    });
    return {
      ...data.member,
      token: data.token,
    };
  };
};

export const useRegister = () => {
  const apiFetch = useApiFetch();

  return async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthorizedUser> => {
    const { data } = await apiFetch("/register", {
      method: "POST",
      data: { email, password },
    });
    return data;
  };
};

export const setToken = (token: string) => {
  sessionStorage.setItem("token", token);
};

export const getToken = () => sessionStorage.getItem("token");

export const removeToken = () => {
  sessionStorage.removeItem("token");
};
