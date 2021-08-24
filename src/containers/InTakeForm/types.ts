import { TCustomField } from "../../types/general";

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
