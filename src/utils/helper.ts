import { SeverityTypes, ICareMember, TPosition, TProgress } from "src/types";

export const formatUserType = (userType: ICareMember["userType"]) => {
  switch (userType) {
    case "cc":
      return "Care Coordinator";
    case "psych":
      return "Psychiatrist";
    case "Care Partner":
      return "Care Partner";
    default:
      return userType;
  }
};

export const getSeverityBasedOnScore = (score: TProgress): SeverityTypes => {
  if (score.totalGAD >= 15 || score.totalPHQ >= 20) {
    return SeverityTypes.SEVERE;
  }
  if (score.totalGAD >= 10 || score.totalPHQ >= 15) {
    return SeverityTypes.MODERATE_SEVERE;
  }
  if (score.totalGAD >= 5 || score.totalPHQ >= 10) {
    return SeverityTypes.MODERATE;
  }
  return SeverityTypes.MINIMAL;
};

export const getUniqueGraphValues = (positions: TPosition[]) =>
  positions.filter(
    (position, index) => index <= 0 || position.x !== positions[index - 1].x
  );

export const getFormErrorMessages = (errors: any): string[] => {
  if (!errors) return [];

  let messages: string[] = [];
  Object.values(errors).forEach((error: any) => {
    if (error.message) {
      messages.push(error.message);
    } else if (typeof error === "string") {
      messages.push(error);
    } else if (typeof error !== "function") {
      messages = [...messages, ...getFormErrorMessages(error)];
    }
  });
  return messages;
};
