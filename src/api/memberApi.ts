import { useMutation, useQuery } from "react-query";

import { QUERY_KEYS } from "./constants";
import { useApiFetch } from "./useApiFetch";
import {
  TCareTeamMember,
  TProgress,
  TTodoItem,
  UpdateProfileForm,
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

export const useUploadMemberAvatar = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: FormData) => apiFetch("/uploadAvatar", { method: "POST", data }),
    { mutationKey: QUERY_KEYS.UPLOAD_MEMBER_AVATAR }
  );
};

export const useUpdateProfile = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: UpdateProfileForm) =>
      apiFetch("/user/profile", { method: "PUT", data }),
    { mutationKey: QUERY_KEYS.UPDATE_PROFILE_FORM }
  );
};

export const useCreateProgress = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: TProgress) => apiFetch("/progress", { method: "POST", data }),
    { mutationKey: QUERY_KEYS.UPLOAD_MEMBER_AVATAR }
  );
};
