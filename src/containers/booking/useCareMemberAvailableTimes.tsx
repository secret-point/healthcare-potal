import { useCallback, useState } from "react";

import { useApiFetch } from "src/api/useApiFetch";
import { ICareMemberAvailabilityRecord } from "src/types";

const useCareMemberAvailableTimes = () => {
  const apiFetch = useApiFetch();

  const [recordsByEmail, setRecordsByEmail] = useState<
    Record<string, ICareMemberAvailabilityRecord>
  >({});

  const fetchNewRecords = useCallback(
    async (email: string) => {
      if (recordsByEmail[email]) return;

      try {
        setRecordsByEmail((recordsByEmail) => ({
          ...recordsByEmail,
          [email]: {
            isLoading: true,
            data: null,
          },
        }));

        const { data } = await apiFetch(
          `/acuity/available-dates?email=${email}`
        );

        setRecordsByEmail((recordsByEmail) => ({
          ...recordsByEmail,
          [email]: {
            isLoading: false,
            data,
          },
        }));
      } catch (error) {
        setRecordsByEmail((recordsByEmail) => ({
          ...recordsByEmail,
          [email]: {
            isLoading: false,
            error: true,
            data: null,
          },
        }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recordsByEmail]
  );

  return { recordsByEmail, fetchNewRecords };
};

export default useCareMemberAvailableTimes;
