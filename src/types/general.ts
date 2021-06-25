import { ChangeEvent } from "react";

export type Maybe<T> = T | null | undefined;

export type Dictionary<V> = {
  [key: string]: V;
};

export type EnumDictionary<T extends string, U> = {
  [K in T]?: U;
};

export type KeyPair = {
  id: number;
  label: string;
  value: string;
};

export type HTMLTextInputChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type HTMLInputChangeEvent = ChangeEvent<HTMLInputElement>;
