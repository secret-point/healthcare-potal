import { ChangeEvent } from "react";

export type Maybe<T> = T | null | undefined;

export type Nullable<T> = T | null;

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
  title: string;
  dueDate: Date;
  type: TodoItemType;
};

export type TScoreItem = {
  score: number;
  date: Date;
};

export type TScoreHistory = TScoreItem[];
