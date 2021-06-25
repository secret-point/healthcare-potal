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
