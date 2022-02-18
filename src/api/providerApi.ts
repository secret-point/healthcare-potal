import { useQuery } from "react-query";

import { ICareMember } from "src/types";

import { QUERY_KEYS } from "./constants";
import { useApiFetch } from "./useApiFetch";

export const useAllCareProviderList = (enabled?: boolean) => {
  const apiFetch = useApiFetch();

  return useQuery(
    [QUERY_KEYS.FETCH_CARE_PROVIDER_LIST],
    async (): Promise<ICareMember[]> => {
      const {
        data: { users },
      } = await apiFetch(`/mp/providers/all`);
      return users;
    },
    {
      enabled,
    }
  );
};
