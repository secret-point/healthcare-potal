import dayjs from "dayjs";

export const convertUserToInTakeForm = (user: any) => ({
  ...user,
  dob: dayjs(user.dob).format("YYYY-MM-DD"),
  height: {
    feet: Math.floor(user.height / 12),
    inches: user.height % 12,
  },
  weapon: {
    ...user.weapon,
    hasAccess: user.weapon.hasAccess ? "Yes" : "No",
  },
  dangerToSelf: {
    ...user.dangerToSelf,
    danger: user.dangerToSelf.danger ? "Yes" : "No",
  },
  dangerToOthers: {
    ...user.dangerToOthers,
    danger: user.dangerToOthers.danger ? "Yes" : "No",
  },
  psychHospitalizationHistory: user.psychHospitalizationHistory.map(
    (history: any) => ({
      ...history,
      date: dayjs(history.date).format("YYYY-MM-DD"),
    })
  ),
  medicalDiagnosisHistory: user.medicalDiagnosisHistory.map((history: any) => ({
    ...history,
    date: dayjs(history.date).format("YYYY-MM-DD"),
  })),
  medicalHospitalizationHistory: user.medicalHospitalizationHistory.map(
    (history: any) => ({
      ...history,
      date: dayjs(history.date).format("YYYY-MM-DD"),
    })
  ),
  medicalSurgeryHistory: user.medicalSurgeryHistory.map((history: any) => ({
    ...history,
    date: dayjs(history.date).format("YYYY-MM-DD"),
  })),
});

export const convertInTakeFormToUser = (form: any) => ({
  ...form,
  height:
    form.height && typeof form.height === "object"
      ? form.height.feet * 12 + form.height.inches
      : 0,
  weapon: {
    ...(form.weapon || {}),
    hasAccess: form.weapon?.hasAccess === "Yes",
  },
  dangerToSelf: {
    ...(form.dangerToSelf || {}),
    danger: form.dangerToSelf?.danger === "Yes",
  },
  dangerToOthers: {
    ...(form.dangerToOthers || {}),
    danger: form.dangerToOthers?.danger === "Yes",
  },
});
