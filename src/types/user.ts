export interface User {
  _id: string;
  email: string;
  memberID: string;
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface AuthorizedUser extends User {
  token: string;
}

export interface RegisterForm {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipcode: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordLinkForm {
  email: string;
  verificationUrl: string;
}

export interface VerifyResetPasswordCodeForm {
  code: string;
  email: string;
}

export interface ChangePasswordCodeForm {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

export enum VerificationStatus {
  VERIFIED = "Verified",
  SKIPPED = "Skipped",
  EXPIRED = "Expired",
  UNVERIFIED = "Unverified",
  PENDING = "Pending",
}

export interface TCareMember
  extends Pick<User, "_id" | "firstName" | "lastName"> {
  profilePic: string;
  primaryContact: string;
  secondaryContact?: string;
  since?: string;
  status: string;
  userType: "cc" | "psych" | "Care Partner";
}

export interface UpdateProfileFormRequest {}
