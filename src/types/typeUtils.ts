/**
 * Alternative à Required<T> permettant d'ajouter le retrait des types '|null' et '|undefined'
 */
export type TSansNullOuUndefined<T> = {
  [K in keyof T]-?: T[K] extends object ? TSansNullOuUndefined<T[K]> : Exclude<T[K], null | undefined>;
};
/**
 * Alternative à Partial<T> permettant de conserver l'obligation des clés d'un objet
 */
export type TAvecValeursOptionnelles<T> = {
  [K in keyof T]: T[K] extends object ? TAvecValeursOptionnelles<T[K]> : T[K] | null | undefined;
};
