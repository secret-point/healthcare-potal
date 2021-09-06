import { useQuery } from "react-query";

import { TCareTeamMember } from "../types";
import { TProgressRequest } from "../types/progress";

import { QUERY_KEYS } from "./constants";
import { useApiFetch } from "./useApiFetch";

export const useGenerateProgress = () => {
  const apiFetch = useApiFetch();

  return async (progress: TProgressRequest): Promise<any> => {
    const { data } = await apiFetch("/progress", {
      method: "POST",
      data: progress,
    });
    return data;
  };
};

export const useFetchScoreHistory = () => {
  const apiFetch = useApiFetch();

  return useQuery(
    [QUERY_KEYS.FETCH_SCORE_PROGRESS_HISTORY],
    async (): Promise<TCareTeamMember[]> => {
      const { data } = await apiFetch(`/cp/progress`);
      return data;
    }
  );
};
