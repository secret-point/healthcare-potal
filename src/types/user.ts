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

export type TExtProvShareType =
  | "Diagnosis"
  | "Prescription"
  | "Consultation"
  | "Laboratory"
  | "Assessment Record"
  | "Discharge Summary";

export interface User {
  _id: string;
  billingAddress: UserAddress;
  email: string;
  emergencyContact: UserContact;
  extProvOne?: any;
  extProvOneShareTypes?: TExtProvShareType;
  extProvTwo?: any;
  extProvTwoShareTypes?: TExtProvShareType;
  firstName: string;
  IDStatus: UserIDVerificationStatus;
  lastName: string;
  memberID: string;
  middleName?: string;
  phone: string;
  profilePicture: Nullable<string>;
  shippingAddress: UserAddress;
  status: "Pending" | "Onboarding" | "Active" | "Cancelled";
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

export interface IInsurance {
  _id: string;
  type: string;
}

export interface ICareMember
  extends Pick<User, "_id" | "email" | "firstName" | "lastName"> {
  profilePic: string;
  primaryContact: string;
  secondaryContact?: string;
  bookingPageLink?: string;
  since?: string;
  status: string;
  userType: "cc" | "psych" | "therapist" | "Care Partner";
  insurance: IInsurance[];
  language: string[];
  specialty: string[];
  state: string[];
  title: string[];
  boardCertification: number;
  experience: number;
  nextAvailableAt: Date;
  bio: string;
  hidden: boolean;
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

export interface ICheckAssessmentLinkForm {
  assessmentId?: string;
  dob?: string;
}

export interface ICareMemberWithAvailability extends ICareMember {
  availableDate?: Date;
  isNotAvailable: boolean;
  isAvailabilityLoading: boolean;
  matchings: string[];
}
