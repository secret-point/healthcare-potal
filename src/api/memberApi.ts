import { useMutation, useQuery } from "react-query";
import { orderBy } from "lodash";
import dayjs from "dayjs";

import { QUERY_KEYS } from "./constants";
import { useApiFetch, serializeQueryParameters } from "./useApiFetch";
import {
  ICareMember,
  ICheckAssessmentLinkForm,
  TAsssessmentFormRequest,
  TOneTimeAsssessmentFormRequest,
  TCoordinationFormRequest,
  TInTakeFormRequest,
  TFeedbackRequest,
  TProgressRequest,
  TProgress,
  TTodoItem,
  UpdateProfileFormRequest,
} from "src/types";

export type CheckTriggerBody = {
  memberID: string;
  progressID: string;
};

export const useGetMemberTodos = () => {
  const apiFetch = useApiFetch();

  return useQuery(
    [QUERY_KEYS.FETCH_MEMBER_TODOS],
    async (): Promise<TTodoItem[]> => {
      const { data } = await apiFetch(`/mp/todos`);
      return data;
    }
  );
};

export const useFetchCareProviders = () => {
  const apiFetch = useApiFetch();

  return useQuery(
    [QUERY_KEYS.FETCH_CARE_TEAM_LIST],
    async (): Promise<ICareMember[]> => {
      const { data } = await apiFetch("/mp/providers");
      return data;
    }
  );
};

export const useUpdateProfile = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: UpdateProfileFormRequest) =>
      apiFetch("/mp/profile", { method: "PUT", data }),
    { mutationKey: QUERY_KEYS.UPDATE_PROFILE_FORM }
  );
};

export const useCreateProgress = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: TProgressRequest) =>
      apiFetch("/mp/progresses", { method: "POST", data }),
    { mutationKey: QUERY_KEYS.UPLOAD_MEMBER_AVATAR }
  );
};

export const useFetchProgressList = (enabled?: boolean) => {
  const apiFetch = useApiFetch();

  return useQuery(
    [QUERY_KEYS.FETCH_SCORE_PROGRESS_HISTORY],
    async (): Promise<TProgress[]> => {
      const { data } = await apiFetch(`/mp/progresses`);
      const orderedProgresses = orderBy(data, "updatedAt");
      return orderedProgresses.filter(
        (progress, index) =>
          index === orderedProgresses.length - 1 ||
          dayjs(progress.updatedAt).diff(
            orderedProgresses[index + 1].updatedAt,
            "days"
          ) !== 0
      );
    },
    {
      enabled,
    }
  );
};

export const useCreateNewAssessment = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: TAsssessmentFormRequest) =>
      apiFetch("/mp/assessment", { method: "POST", data }),
    { mutationKey: QUERY_KEYS.UPDATE_ASSESSMENT_FORM }
  );
};

export const useCreateOneTimeNewAssessment = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: TOneTimeAsssessmentFormRequest) =>
      apiFetch("/mp/one-time-assessment/submit", { method: "POST", data }),
    { mutationKey: QUERY_KEYS.UPDATE_ASSESSMENT_FORM }
  );
};

export const useUpdateInTakeForm = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: TInTakeFormRequest) =>
      apiFetch("/mp/intake", { method: "PUT", data }),
    {
      mutationKey: QUERY_KEYS.UPDATE_INTAKE_FORM,
    }
  );
};

export const useUpdateCoordinationForm = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: TCoordinationFormRequest) =>
      apiFetch("/mp/coordination", { method: "PUT", data }),
    {
      mutationKey: QUERY_KEYS.UPDATE_COORDINATION_FORM,
    }
  );
};

export const useSubmitFeedback = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (data: TFeedbackRequest) =>
      apiFetch("/mp/feedback", { method: "POST", data }),
    {
      mutationKey: QUERY_KEYS.SUBMIT_FEEDBACK,
    }
  );
};

export const useVerifyID = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (documentURL: string) =>
      apiFetch("/mp/id/verify", { method: "PUT", data: { documentURL } }),
    {
      mutationKey: QUERY_KEYS.SUBMIT_FEEDBACK,
    }
  );
};

export const useCheckAssessmentLink = () => {
  const apiFetch = useApiFetch();

  return (form: ICheckAssessmentLinkForm) => {
    if (!form.assessmentId) {
      return null;
    }

    return apiFetch(
      `/mp/one-time-assessment/check${serializeQueryParameters(form)}`,
      {
        method: "GET",
      }
    );
  };
};

export const useUploadFile = () => {
  const apiFetch = useApiFetch();

  return useMutation(
    (formData: FormData) =>
      apiFetch("/files/upload", {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    {
      mutationKey: QUERY_KEYS.UPLOAD_FILE,
    }
  );
};
