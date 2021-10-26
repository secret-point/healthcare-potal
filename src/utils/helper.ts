import { SeverityTypes, TCareMember, TProgress } from "../types";

export const formatUserType = (userType: TCareMember["userType"]) => {
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
