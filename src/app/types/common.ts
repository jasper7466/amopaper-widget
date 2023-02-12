export type Nullable<T> = T | null;

/** Тип, состоящий из типов ключей типа T. */
type ValueOf<T> = T[keyof T];

/** Тип, допускающий только один ключ соответствующим типом из типа T. */
export type ExactlyOneKeyOf<T> = ValueOf<{
  [K in keyof T]: { [Q in K]-?: T[Q] } & {
    [Q in Exclude<keyof T, K>]?: never;
  } extends infer P
    ? { [Q in keyof P]: P[Q] }
    : never;
}>;

/** Непустой массив с хотя бы одним элементом типа T. */
export type NonEmptyArray<T> = [T, ...T[]];
