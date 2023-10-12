import { TypeDeclarationConjointe } from "@model/etatcivil/enum/TypeDeclarationConjointe";
import { IAdresse } from "../IAdresse";
import { IDecretNaturalisation } from "../IDecretNaturalisation";
import { IEvenement } from "../IEvenement";
import { IProjetFiliation } from "./IFiliationProjetActe";
export interface ITitulaireProjetActe {
  nom?: string;
  ordre: number;
  prenoms?: string[];
  sexe: string;
  naissance?: IEvenement;
  age?: number;
  profession?: string;
  domicile?: IAdresse;
  filiations: IProjetFiliation[];
  nomPartie1?: string;
  nomPartie2?: string;
  nomAvantMariage?: string;
  nomApresMariage?: string;
  nomDernierConjoint?: string;
  prenomsDernierConjoint?: string;
  typeDeclarationConjointe?: TypeDeclarationConjointe;
  dateDeclarationConjointe?: Date;
  origineDeclarationConjointeTitulaireActe?: boolean;
  origineNomPartiesTitulaireActe?: boolean;
  identiteAvantDecret?: string;
  decretNaturalisation: IDecretNaturalisation;
  pasDePrenom: boolean;
}
