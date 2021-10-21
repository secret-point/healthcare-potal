import { useApiFetch } from "./useApiFetch";
import {
  AuthorizedUser,
  ChangePasswordCodeForm,
  RegisterForm,
  ResetPasswordLinkForm,
  VerifyResetPasswordCodeForm,
} from "../types/user";

export const useFetchCurrentUser = () => {
  const apiFetch = useApiFetch();

  return async () => {
    const {
      data: { member },
    } = await apiFetch("/mp/current", {
      method: "GET",
    });
    return member;
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
    const { data } = await apiFetch("/mp/login", {
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

  return async (form: RegisterForm): Promise<AuthorizedUser> => {
    const { data } = await apiFetch("/mp/register", {
      method: "POST",
      data: form,
    });
    return data;
  };
};

export const useSendResetPasswordLink = () => {
  const apiFetch = useApiFetch();

  return async (form: ResetPasswordLinkForm): Promise<unknown> => {
    const { data } = await apiFetch("/send-reset-password-link", {
      method: "POST",
      data: form,
    });
    return data;
  };
};

export const useVerifyResetPasswordCode = () => {
  const apiFetch = useApiFetch();

  return async (form: VerifyResetPasswordCodeForm): Promise<unknown> => {
    const { data } = await apiFetch("/verify-reset-password-code", {
      method: "POST",
      data: form,
    });
    return data;
  };
};

export const useChangePasswordCode = () => {
  const apiFetch = useApiFetch();

  return async (form: ChangePasswordCodeForm): Promise<unknown> => {
    const { data } = await apiFetch("/verify-reset-password-code", {
      method: "POST",
      data: form,
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
