import { TCustomField } from "src/types/general";

export enum AccountEditableField {
  PREFERRED_NAME = "preferredName",
  EMAIL = "email",
  PHONE_NUMBER = "phone",
  EMERGENCY_CONTACT = "emergencyContact",
  ADDRESS = "address",
  RESET_PASSWORD = "resetPassword",
}

export interface FormGroup {
  groupName: string;
  helperText?: string;
  fields: TCustomField[];
}

export interface InTakeFormStepDef {
  title: string | ((data: any) => string);
  groups: FormGroup[];
}

export type TInTakeFormDef = Data<InTakeFormStepDef>;
