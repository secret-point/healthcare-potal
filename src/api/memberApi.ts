import { useMutation, useQuery } from "react-query";

import { QUERY_KEYS } from "./constants";
import { useApiFetch } from "./useApiFetch";
import {
  TCareTeamMember,
  TCheckInFormRequest,
  TInTakeFormRequest,
  TFeedbackRequest,
  TProgressRequest,
  TTodoItem,
  TUploadFileRequest,
  UpdateProfileFormRequest,
} from "../types";

export type CheckTriggerBody = {
  memberID: string;
  progressID: string;
};

export const useGetMemberTodos = (memberId: string) => {
  const apiFetch = useApiFetch();

  return useQuery(
    [QUERY_KEYS.FETCH_MEMBER_TODOS, memberId],
    async (): Promise<TTodoItem[]> => {
      const { data } = await apiFetch(`/cp/memberTodo/${memberId}`);
      return data;
    }
  );
};

export const useGetMember = (memberId: string) => {
  const apiFetch = useApiFetch();

  return useQuery([QUERY_KEYS.FETCH_MEMBER, memberId], async () => {
    const { data } = await apiFetch(`/cp/member/${memberId}`);
    return data;
  });
};

export const useCheckTriggerByRequest = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    ({ memberID, progressID }: CheckTriggerBody) =>
      apiFetch("/uploadAvatar", {
        method: "POST",
        data: { memberID, progressID },
      }),
    { mutationKey: QUERY_KEYS.CHECK_TRIGGER_REQUEST }
  );
};

export const useFetchCareTeamList = () => {
  const apiFetch = useApiFetch();

  return useQuery(
    [QUERY_KEYS.FETCH_CARE_TEAM_LIST],
    async (): Promise<TCareTeamMember[]> => {
      const { data } = await apiFetch(`/cp/careTeamList`);
      return data;
    }
  );
};

export const useUploadFile = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: TUploadFileRequest) =>
      apiFetch("/files/upload", { method: "POST", data }),
    { mutationKey: QUERY_KEYS.UPLOAD_FILE }
  );
};

export const useUpdateProfile = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: UpdateProfileFormRequest) =>
      apiFetch("/user/profile", { method: "PUT", data }),
    { mutationKey: QUERY_KEYS.UPDATE_PROFILE_FORM }
  );
};

export const useCreateProgress = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: TProgressRequest) => apiFetch("/progress", { method: "POST", data }),
    { mutationKey: QUERY_KEYS.UPLOAD_MEMBER_AVATAR }
  );
};

export const useUpdateCheckIn = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: TCheckInFormRequest) =>
      apiFetch("/check-in", { method: "PUT", data }),
    { mutationKey: QUERY_KEYS.UPDATE_CHECKIN_FORM }
  );
};

export const useUpdateInTakeForm = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: TInTakeFormRequest) =>
      apiFetch("/in-take-form", { method: "PUT", data }),
    {
      mutationKey: QUERY_KEYS.UPDATE_INTAKE_FORM,
    }
  );
};

export const useSubmitFeedback = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: TFeedbackRequest) =>
      apiFetch("/mp/user/feedback", { method: "POST", data }),
    {
      mutationKey: QUERY_KEYS.SUBMIT_FEEDBACK,
    }
  );
};
