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

export enum VerificationStatus {
  VERIFIED = "Verified",
  SKIPPED = "Skipped",
  EXPIRED = "Expired",
  UNVERIFIED = "Unverified",
  PENDING = "Pending",
}

export type TCareTeamMember = {
  id: string | number;
  name: string;
  job: string;
  contact: string;
};
