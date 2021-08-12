import { TProgress } from "../types/progress";

import { useApiFetch } from "./useApiFetch";

export const useGenerateProgress = () => {
  const apiFetch = useApiFetch();

  return async (progress: TProgress): Promise<any> => {
    const { data } = await apiFetch("/progress", {
      method: "POST",
      data: progress,
    });
    return data;
  };
};
