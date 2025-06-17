export type Option = {
  cle: string;
  libelle: string;
  disabled?: boolean;
};

export const OPTION_VIDE: Option = { cle: "", libelle: "" };
export type Options = Option[];
export type OptionAvecOrdre = Option & { ordre: number };
