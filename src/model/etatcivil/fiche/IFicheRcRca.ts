import { IPersonne } from "../commun/IPersonne";
import { MandataireRc } from "../enum/MandataireRc";
import { NatureRc } from "../enum/NatureRc";
import { NatureRca } from "../enum/NatureRca";
import { TypeFiche } from "../enum/TypeFiche";
import { TypeInscriptionRc } from "../enum/TypeInscriptionRc";
import { IAlerte } from "./IAlerte";
import { IDecisionRc } from "./IDecisionRc";
import { IDureeInscription } from "./IDureeInscription";
import { IInscriptionLiee } from "./IInscriptionLiee";
import { IInscriptionsImpactees } from "./IInscriptionsImpactees";
import { IInteresse } from "./IInteresse";
import { IMariageInteresse } from "./IMariageInteresse";
import { IStatutFiche } from "./IStatutFiche";

export interface IFicheRcRca {
  id: string;
  categorie: TypeFiche;
  annee: string;
  numero: string;
  dateInscription: Date;
  dateDerniereMaj?: Date;
  dateDerniereDelivrance?: Date;
  alertes: IAlerte[];
  decision: IDecisionRc;
  mariageInteresses: IMariageInteresse;
  interesses: IInteresse[];
  statutsFiche: IStatutFiche[];
  nature: NatureRc | NatureRca;
  typeInscription: TypeInscriptionRc;
  mandataires: MandataireRc[];
  duree: IDureeInscription;
  inscriptionsImpactees: IInscriptionsImpactees[];
  inscriptionsLiees: IInscriptionLiee[];
  personnes: IPersonne[];
}
