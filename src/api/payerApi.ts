import { useQuery } from "react-query";

import { IInsurance } from "src/types";

import { QUERY_KEYS } from "./constants";
import { useApiFetch } from "./useApiFetch";

export const useAllPayerList = (enabled?: boolean) => {
  const apiFetch = useApiFetch();

  return useQuery(
    [QUERY_KEYS.FETCH_PAYER_LIST],
    async (): Promise<IInsurance[]> => {
      const { data } = await apiFetch("/mp/payers/all");
      return data || [];
    },
    {
      enabled,
    }
  );
};
