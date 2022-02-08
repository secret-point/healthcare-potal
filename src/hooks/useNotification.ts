import { useSnackbar } from "notistack";
import { useCallback } from "react";

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleError = useCallback(
    (error: any, message?: string) => {
      enqueueSnackbar(
        error?.response?.data?.message || message || error?.message,
        {
          variant: "error",
        }
      );
    },
    [enqueueSnackbar]
  );

  const handleSuccess = useCallback(
    (message: string) => {
      enqueueSnackbar(message, { variant: "success" });
    },
    [enqueueSnackbar]
  );

  return { handleError, handleSuccess };
};
