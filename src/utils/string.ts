import { UserIDVerificationStatus } from "src/types";

export const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const phoneNumberPattern =
  /^(\([0-9]{3}\)\s*|[0-9]{3}[-]?)[0-9]{3}[-]?[0-9]{4}$/;

export const usZipcodePattern = /^\d{5}$|^\d{5}-\d{4}$/;

export const feetInchPattern = /^\d{1,2}$/;

export const validateEmail = (email: string): boolean =>
  emailPattern.test(email);

export const validatePhoneNumber = (phoneNumber: string): boolean =>
  phoneNumberPattern.test(phoneNumber);

export const getCapitalizedValue = (value: string) => {
  if (value.length) return value[0].toUpperCase() + value.substr(1);
  return value;
};

export const getCapitalizedFirstLetters = (values: string[]) =>
  values.map((value) => {
    if (value.length) return value[0].toUpperCase();
    return "";
  });

export const shouldVerifyId = (status: UserIDVerificationStatus) =>
  status !== "Verified" && status !== "Pending";

export const formatPhoneNumber = (value: string): string => {
  const tempValue = value.replace(/\D[^.]/g, "");
  if (tempValue.length < 9) return value;
  return [
    tempValue.slice(0, 3),
    tempValue.slice(3, 6),
    tempValue.slice(6),
  ].join("-");
};
