import { useQuery, useMutation } from "react-query";

import {
  IBookAppointmentForm,
  ICareMember,
  ICareMemberAvailableDates,
  ICareMemberAvailableDatesAndTimes,
} from "src/types";

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

export const useCareMemberAvailableTimesByEmail = (email: Maybe<string>) => {
  const apiFetch = useApiFetch();

  return useQuery(
    [QUERY_KEYS.FETCH_PROVIDER_AVAILABLE_TIMES, email],
    async (): Promise<ICareMemberAvailableDatesAndTimes> => {
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

export const useCareMemberAvailableDatesByEmail = (email: Maybe<string>) => {
  const apiFetch = useApiFetch();

  return useQuery(
    [QUERY_KEYS.FETCH_PROVIDER_AVAILABLE_DATES, email],
    async (): Promise<ICareMemberAvailableDates> => {
      if (!email) {
        return {
          appointmentTypeID: "",
          calendarID: "",
          availableDates: [],
        };
      }

      const { data } = await apiFetch(`/acuity/available-dates?email=${email}`);
      return data;
    }
  );
};

export const useBookAppointment = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (appointmentForm: IBookAppointmentForm) =>
      apiFetch("/acuity/appointments", {
        method: "POST",
        data: appointmentForm,
      }),
    {
      mutationKey: QUERY_KEYS.BOOK_APPOINTMENT,
    }
  );
};
