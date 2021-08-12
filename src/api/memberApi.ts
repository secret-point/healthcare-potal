import { useQuery } from "react-query";

import { useApiFetch } from "./useApiFetch";
import { QUERY_KEYS, QUERY_STATUS } from "./constants";

export const useGetMemberTodos = (memberId: string) => {
  const apiFetch = useApiFetch();

  const {
    refetch,
    data: memberTodos,
    status,
  } = useQuery([QUERY_KEYS.FETCH_MEMBER_TODOS, memberId], async () => {
    await apiFetch(`/cp/memberTodo/${memberId}`);
  });

  return { refetch, memberTodos, loading: status === QUERY_STATUS.LOADING };
};

export const useGetMember = (memberId: string) => {
  const apiFetch = useApiFetch();

  const {
    refetch,
    data: member,
    status,
  } = useQuery([QUERY_KEYS.FETCH_MEMBER, memberId], async () => {
    await apiFetch(`/cp/member/${memberId}`);
  });

  return { refetch, member, loading: status === QUERY_STATUS.LOADING };
};

export const useCheckTriggerByRequest = () => {
  const apiFetch = useApiFetch();

  return async ({
    memberID,
    progressID,
  }: {
    memberID: string;
    progressID: string;
  }): Promise<any> => {
    const { data } = await apiFetch("/checkTrigger", {
      method: "POST",
      data: { memberID, progressID },
    });
    return data;
  };
};
