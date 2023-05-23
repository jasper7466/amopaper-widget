/** Тип, состоящий из ключей типа string и значений типа T. */
export type Indexed<T> = { [key: string]: T };

/** Тип, состоящий из типов ключей типа T. */
type ValueOf<T> = T[keyof T];

/** Тип, допускающий только один ключ c соответствующим типом из типа T. */
export type ExactlyOneKeyOf<T> = ValueOf<{
    [K in keyof T]: { [Q in K]-?: T[Q] } & {
        [Q in Exclude<keyof T, K>]?: never;
    } extends infer P
        ? { [Q in keyof P]: P[Q] }
        : never;
}>;

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

/** Непустой массив с хотя бы одним элементом типа T. */
export type NonEmptyArray<T> = [T, ...T[]];

export function isNonEmptyArray<T>(array: T[]): array is NonEmptyArray<T> {
    return array.length > 0;
}
