import { IPersonne } from "@model/etatcivil/commun/Personne";
import { ETypeRedactionActe } from "../../enum/ETypeRedactionActe";
import { ICorpsExtraitRectification } from "../ICorpsExtraitRectification";
import { ICorpsTexte } from "../ICorpsTexte";
import { IDeclarant } from "../IDeclarant";
import { IEvenement } from "../IEvenement";
import { Registre } from "../Registre";
import { Mention } from "../mention/Mention";
import { IProjetAnalyseMarginale } from "./IAnalyseMarginaleProjetActe";
import { ITitulaireProjetActe } from "./ITitulaireProjetActe";

export interface IProjetActe {
  id: string;
  titulaires: ITitulaireProjetActe[];
  evenement?: IEvenement;
  nature: string;
  numero: string;
  numeroBisTer: string;
  personnes: IPersonne[];
  estReecrit?: boolean;
  registre: Registre | null;
  dateDerniereMaj?: Date;
  dateDerniereDelivrance?: Date;
  dateCreation?: Date;
  visibiliteArchiviste: string;
  analyseMarginales?: IProjetAnalyseMarginale[];
  corpsTexte?: ICorpsTexte;
  type: string;
  corpsExtraitRectifications: ICorpsExtraitRectification[];
  mentions: Mention[];
  declarant?: IDeclarant | null;
  numeroDossierNational?: string;
  statut: string;
  dateStatut: Date;
  dateInitialisation: Date;
  modeCreation?: ETypeRedactionActe;
}
