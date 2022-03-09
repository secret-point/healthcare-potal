import { TCustomField } from "src/types/general";

export enum AccountEditableField {
  PREFERRED_NAME = "preferredName",
  EMAIL = "email",
  PHONE_NUMBER = "phone",
  EMERGENCY_CONTACT = "emergencyContact",
  ADDRESS = "address",
  RESET_PASSWORD = "resetPassword",
}

export interface IFormGroup {
  groupName: string;
  helperText?: string;
  fields: TCustomField[];
}

export interface IInTakeFormStepDef {
  title: string | ((data: any) => string);
  groups: IFormGroup[];
}

export type TInTakeFormDef = Data<IInTakeFormStepDef>;

export interface IProfileSetUpCardForm {
  billingAddress: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
  };
  confirmPassword: string;
  dob: string;
  email: string;
  firstName: string;
  insuranceMemberId: string;
  insurances: string[];
  lastName: string;
  password: string;
  phone: string;
  preferredName: string;
  referral: string;
  paymentId: string;
}

export interface IBookAppointmentForm {
  calendarID: string;
  datetime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  smsOptIn: boolean;
}
