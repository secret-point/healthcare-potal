export interface User {
  _id: string;
  memberID: string;
  firstName: string;
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

export interface TCareTeamMember extends User {
  type: string;
  contact: string;
  picture?: string;
}

export interface UpdateProfileFormRequest {}
