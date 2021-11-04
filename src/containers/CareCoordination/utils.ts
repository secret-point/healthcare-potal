export const convertUserToCoordinationForm = (user: any) => ({
  extProviders: [
    user.extProvOne || user.extProvOneShareType
      ? {
          ...(user.extProvOne || {}),
          sharedInformationType: user.extProvOneShareType,
        }
      : null,
    user.extProvTwo
      ? {
          ...(user.extProvTwo || {}),
          sharedInformationType: user.extProvTwoShareType,
        }
      : null,
  ].filter((extProv) => extProv),
});

export const convertCoordinationFormToUser = (form: any) => ({
  // extProvOne: form[0] ? { ...form[0], sharedInformationType: undefined } : undefined,
  extProvOneShareType: form[0]?.sharedInformationType,
  // extProvTwo: form[1]
  //   ? { ...form[1], sharedInformationType: undefined }
  //   : undefined,
  extProvTwoShareType: form[1]?.sharedInformationType,
});
