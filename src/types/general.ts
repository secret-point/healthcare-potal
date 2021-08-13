import { ChangeEvent } from "react";

export type Dictionary<V> = {
  [key: string]: V;
};

export type EnumDictionary<T extends string, U> = {
  [K in T]?: U;
};

export type HTMLTextInputChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type HTMLInputChangeEvent = ChangeEvent<HTMLInputElement>;

export enum DEVICE {
  MOBILE = "MOBILE",
  DESKTOP = "DESKTOP",
}

export enum ONBOARDING {
  NAME = "What’s your name?",
  CONTACT = "How can we best contact you?",
  ADDRESS = "What is your address?",
  PASSWORD = "Finally, let’s set up your password.",
  FINAL = "Great! You're all set up.",
}

export type SelectOption = { code: string; display: string };

export enum FieldType {
  SELECT = "SELECT",
  TEXT = "TEXT",
}

export type TCustomField = {
  label: string;
  path: string;
  type?: FieldType;
  options?: SelectOption[];
  xs?: number;
  render?: (value: any) => any;
};

export type TFieldRow = {
  row: string;
  fields: TCustomField[];
};

export enum TodoItemType {
  COMPLETE_INTAKE_FORM = "COMPLETE_INTAKE_FORM",
  VERIFY_ID = "VERIFY_ID",
  CHECK_YOUR_PROGRESS = "CHECK_YOUR_PROGRESS",
}

export type TTodoItem = {
  _id: string;
  todoItemType: TodoItemType;
  CTA: string;
  completed: boolean;
  completedDate: string | Date;
  createdBy: string;
  createdDate: string | Date;
  description: string;
  dueDate: string | Date;
  memberID: string;
};

export enum SeverityTypes {
  SEVERE = "Severe",
  MODERATE_SEVERE = "Moderately Severe",
  MODERATE = "Moderate",
  MILD = "Mild",
  REMISSION = "Remission",
}

export type TScoreItem = {
  score: number;
  date: Date;
  severity: SeverityTypes;
  symptoms: string[];
};

export type TScoreHistory = TScoreItem[];

export type TProgressSummary = {
  title: string;
  summary: string;
};

export type TLabelCode = {
  code: string;
  label: string;
  value?: number;
};

export type TQuestion = {
  code: string;
  type: "GAD" | "PHQ" | "MCQ" | "FRQ";
  header?: string;
  question: string;
  options?: TLabelCode[];
};

export type TMenuItem = {
  title: string;
  link: string;
};

export enum ProgressTypes {
  NO_CASE = "0",
  CASE_1_1_1 = "1-1-1",
  CASE_1_1_2 = "1-1-2",
  CASE_1_2_1 = "1-2-1",
  CASE_1_2_2 = "1-2-2",
  CASE_1_3_1 = "1-3-1",
  CASE_1_3_2 = "1-3-2",
  CASE_2_1 = "2-1",
  CASE_2_2 = "2-2",
  CASE_2_3 = "2-3",
}
