import { useMutation, useQuery } from "react-query";

import { QUERY_KEYS } from "./constants";
import { useApiFetch } from "./useApiFetch";
import {
  TCareMember,
  TCheckInFormRequest,
  TInTakeFormRequest,
  TFeedbackRequest,
  TProgressRequest,
  TTodoItem,
  UpdateProfileFormRequest,
} from "../types";

export type CheckTriggerBody = {
  memberID: string;
  progressID: string;
};

export const useGetMemberTodos = () => {
  const apiFetch = useApiFetch();

  return useQuery(
    [QUERY_KEYS.FETCH_MEMBER_TODOS],
    async (): Promise<TTodoItem[]> => {
      const { data } = await apiFetch(`/mp/todos`);
      return data;
    }
  );
};

export const useFetchCareProviders = () => {
  const apiFetch = useApiFetch();

  return useQuery(
    [QUERY_KEYS.FETCH_CARE_TEAM_LIST],
    async (): Promise<TCareMember[]> => {
      const { data } = await apiFetch("/mp/care-providers");
      return data;
    }
  );
};

export const useUploadFile = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (file: File) => apiFetch("/mp/file", { method: "POST", data: { file } }),
    { mutationKey: QUERY_KEYS.UPLOAD_FILE }
  );
};

export const useUpdateProfile = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: UpdateProfileFormRequest) =>
      apiFetch("/mp/profile", { method: "PUT", data }),
    { mutationKey: QUERY_KEYS.UPDATE_PROFILE_FORM }
  );
};

export const useCreateProgress = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: TProgressRequest) =>
      apiFetch("/mp/progress", { method: "POST", data }),
    { mutationKey: QUERY_KEYS.UPLOAD_MEMBER_AVATAR }
  );
};

export const useFetchProgressHistory = () => {
  const apiFetch = useApiFetch();

  return useQuery(
    [QUERY_KEYS.FETCH_SCORE_PROGRESS_HISTORY],
    async (): Promise<TCareMember[]> => {
      const { data } = await apiFetch(`/mp/progress`);
      return data;
    }
  );
};

export const useUpdateCheckInForm = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: TCheckInFormRequest) =>
      apiFetch("/mp/checkin-form", { method: "PUT", data }),
    { mutationKey: QUERY_KEYS.UPDATE_CHECKIN_FORM }
  );
};

export const useUpdateInTakeForm = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: TInTakeFormRequest) =>
      apiFetch("/mp/intake-form", { method: "PUT", data }),
    {
      mutationKey: QUERY_KEYS.UPDATE_INTAKE_FORM,
    }
  );
};

export const useSubmitFeedback = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: TFeedbackRequest) =>
      apiFetch("/mp/feedback", { method: "POST", data }),
    {
      mutationKey: QUERY_KEYS.SUBMIT_FEEDBACK,
    }
  );
};

export const useVerifyID = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (fileID: string) =>
      apiFetch("/mp/verify-id", { method: "PUT", data: { fileID } }),
    {
      mutationKey: QUERY_KEYS.SUBMIT_FEEDBACK,
    }
  );
};
