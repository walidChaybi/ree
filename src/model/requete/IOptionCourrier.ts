// TOREFACTO : type inutile
export type OptionsCourrier = OptionCourrier[];
export interface OptionCourrier {
  acteDeces: boolean;
  acteMariage: boolean;
  acteNaissance: boolean;
  code: string;
  documentDelivrance: string;
  estActif: boolean;
  id: string;
  libelle: string;
  optionATiret: boolean;
  optionExclusive: boolean;
  optionLibre: boolean;
  optionParDefaut: boolean;
  ordreEdition: number;
  presenceVariables: boolean;
  texteOptionCourrier: string;
  texteOptionCourrierModifie?: string;
}
