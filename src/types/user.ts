export interface UserContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

export interface UserAddress {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string | number;
}

export type UserIDVerificationStatus =
  | "Verified"
  | "Skipped"
  | "Pending"
  | "Expired"
  | "Unverified";

export interface User {
  _id: string;
  email: string;
  memberID: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
  profilePicture: Nullable<string>;
  emergencyContact: UserContact;
  billingAddress: UserAddress;
  shippingAddress: UserAddress;
  IDStatus: UserIDVerificationStatus;
}

export interface AuthorizedUser extends User {
  token: string;
}

export interface RegisterForm {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
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

export interface ICareMember
  extends Pick<User, "_id" | "firstName" | "lastName"> {
  profilePic: string;
  primaryContact: string;
  secondaryContact?: string;
  bookingPageLink?: string;
  since?: string;
  status: string;
  userType: "cc" | "psych" | "Care Partner";
}

export interface IExtProvider {
  _id: string;
  address1: string;
  address2: string;
  city: string;
  email: string;
  fax: string;
  name: string;
  phone: string;
  state: string;
  type: string;
  zip: string;
  sharedInformationTypes: string[];
}

export type UpdateProfileFormRequest = AtLeastOne<User>;
