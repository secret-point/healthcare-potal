import { useMutation, useQuery } from "react-query";

import { useApiFetch } from "./useApiFetch";
import { QUERY_KEYS } from "./constants";
import { TProgress } from "../types";

export type CheckTriggerBody = {
  memberID: string;
  progressID: string;
};

export const useGetMemberTodos = (memberId: string) => {
  const apiFetch = useApiFetch();

  return useQuery([QUERY_KEYS.FETCH_MEMBER_TODOS, memberId], async () => {
    await apiFetch(`/cp/memberTodo/${memberId}`);
  });
};

export const useGetMember = (memberId: string) => {
  const apiFetch = useApiFetch();

  return useQuery([QUERY_KEYS.FETCH_MEMBER, memberId], async () => {
    await apiFetch(`/cp/member/${memberId}`);
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

export const useUploadMemberAvatar = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: FormData) => apiFetch("/uploadAvatar", { method: "POST", data }),
    { mutationKey: QUERY_KEYS.UPLOAD_MEMBER_AVATAR }
  );
};

export const useCreateProgress = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: TProgress) => apiFetch("/progress", { method: "POST", data }),
    { mutationKey: QUERY_KEYS.UPLOAD_MEMBER_AVATAR }
  );
};
