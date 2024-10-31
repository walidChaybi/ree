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
// TOREFACTO: Décallage entre le type reçu du back et celui du front. (optionAPuce->optionATiret)
export interface OptionCourrierDto {
  acteDeces: boolean;
  acteMariage: boolean;
  acteNaissance: boolean;
  code: string;
  documentDelivrance: string;
  estActif: boolean;
  id: string;
  libelle: string;
  optionAPuce: boolean;
  optionExclusive: boolean;
  optionLibre: boolean;
  optionParDefaut: boolean;
  ordreEdition: number;
  presenceVariables: boolean;
  texteOptionCourrier: string;
}

export const depuisOptionCourrierDtoVersOptionCourrier = (dto: OptionCourrierDto): OptionCourrier => ({
  acteDeces: dto.acteDeces,
  acteMariage: dto.acteMariage,
  acteNaissance: dto.acteNaissance,
  code: dto.code,
  documentDelivrance: dto.documentDelivrance,
  estActif: dto.estActif,
  id: dto.id,
  libelle: dto.libelle,
  optionATiret: dto.optionAPuce,
  optionExclusive: dto.optionExclusive,
  optionLibre: dto.optionLibre,
  optionParDefaut: dto.optionParDefaut,
  ordreEdition: dto.ordreEdition,
  presenceVariables: dto.presenceVariables,
  texteOptionCourrier: dto.texteOptionCourrier
});
