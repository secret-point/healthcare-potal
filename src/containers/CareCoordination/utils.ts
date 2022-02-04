import { IExtProvider } from "src/types";

export const convertUserToCoordinationForm = (
  user: any
): { extProviders: IExtProvider[] } => ({
  extProviders: [
    user.extProvOne || user.extProvOneShareTypes
      ? {
          ...(user.extProvOne || {}),
          sharedInformationTypes: user.extProvOneShareTypes,
        }
      : null,
    user.extProvTwo
      ? {
          ...(user.extProvTwo || {}),
          sharedInformationTypes: user.extProvTwoShareTypes,
        }
      : null,
  ].filter((extProv) => extProv),
});

export const convertCoordinationFormToUser = (form: any) => ({
  extProvOne: form[0]
    ? { ...form[0], sharedInformationTypes: undefined }
    : undefined,
  extProvOneShareTypes: form[0]?.sharedInformationTypes,
  extProvTwo: form[1]
    ? { ...form[1], sharedInformationTypes: undefined }
    : undefined,
  extProvTwoShareTypes: form[1]?.sharedInformationTypes,
});
