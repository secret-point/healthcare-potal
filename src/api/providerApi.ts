import { useQuery } from "react-query";

import { ICareMember, ICareMemberAvailability } from "src/types";

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
    { enabled }
  );
};

export const useGetCareProvider = (providerId: string) => {
  const apiFetch = useApiFetch();

  return useQuery(
    [QUERY_KEYS.FETCH_CARE_PROVIDER, providerId],
    async (): Promise<ICareMember> => {
      const { data } = await apiFetch(`/mp/providers/${providerId}`);
      return data;
    }
  );
};

export const useCareMemberAvailabilitiesByEmail = (email: Maybe<string>) => {
  const apiFetch = useApiFetch();

  return useQuery(
    [QUERY_KEYS.FETCH_PROVIDER_AVAILABILITIES, email],
    async (): Promise<ICareMemberAvailability> => {
      if (!email) {
        return {
          appointmentTypeID: "",
          calendarID: "",
          availableDates: [],
        };
      }

      const { data } = await apiFetch(`/acuity/available-times?email=${email}`);
      return data;
    }
  );
};
