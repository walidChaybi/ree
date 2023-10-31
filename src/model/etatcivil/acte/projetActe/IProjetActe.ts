import { IPersonne } from "@model/etatcivil/commun/IPersonne";
import { TypeRedactionActe } from "../../enum/TypeRedactionActe";
import { ICorpsExtraitRectification } from "../ICorpsExtraitRectification";
import { ICorpsText } from "../ICorpsText";
import { IDeclarant } from "../IDeclarant";
import { IEvenement } from "../IEvenement";
import { IRegistre } from "../IRegistre";
import { IMention } from "../mention/IMention";
import { IProjetAnalyseMarginale } from "./IAnalyseMarginaleProjetActe";
import { ITitulaireProjetActe } from "./ITitulaireProjetActe";

// TODO: Ne devrait-on pas l'appeler IActe ?
// Puisque qu'un projet d'acte est juste un acte au statut BROUILLON
export interface IProjetActe {
  id: string;
  titulaires: ITitulaireProjetActe[];
  evenement?: IEvenement;
  nature: string;
  numero: string;
  numeroBisTer: string;
  personnes: IPersonne[];
  estReecrit?: boolean;
  registre: IRegistre;
  dateDerniereMaj?: Date;
  dateDerniereDelivrance?: Date;
  dateCreation?: Date;
  visibiliteArchiviste: string;
  analyseMarginales?: IProjetAnalyseMarginale[];
  corpsTexte?: ICorpsText;
  type: string;
  corpsExtraitRectifications: ICorpsExtraitRectification[];
  mentions: IMention[];
  declarant?: IDeclarant;
  reconnuPar?: string;
  numeroDossierNational?: string;
  statut: string;
  dateStatut: Date;
  dateInitialisation: Date;
  modeCreation?: TypeRedactionActe;
}
