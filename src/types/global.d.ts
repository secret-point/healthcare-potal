declare type Maybe<T> = T | null | undefined;

declare type Nullable<T> = T | null;

declare type Data<T> = Record<string, T>;

type U<T> = { [K in keyof T]: Pick<T, K> };

declare type AtLeastOne<T> = Partial<T> & U<Required<T>>[keyof U<T>];
