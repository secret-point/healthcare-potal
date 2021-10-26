import { UserIDVerificationStatus } from "../types";

export const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const phoneNumberPattern =
  /^(\([0-9]{3}\)\s*|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;

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
