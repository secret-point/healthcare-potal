import { TCareMember } from "../types";

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
