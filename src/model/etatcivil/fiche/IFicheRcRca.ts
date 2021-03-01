import { TypeMandataire } from "../enum/TypeMandataire";
import { TypeInscriptionRc } from "../enum/TypeInscriptionRc";
import { TypeFiche } from "../enum/TypeFiche";
import { IPersonne } from "../commun/IPersonne";
import { IInteresse } from "./IInteresse";
import { IStatutFiche } from "./IStatutFiche";
import { IInscriptionLiee } from "./IInscriptionLiee";
import { IDecisionRc } from "./IDecisionRc";
import { IDureeInscription } from "./IDureeInscription";
import { IAlerte } from "./IAlerte";
import { IMariageInteresse } from "./IMariageInteresse";
import { IInscriptionsImpactees } from "./IInscriptionsImpactees";
import { NatureRc } from "../enum/NatureRc";
import { NatureRca } from "../enum/NatureRca";

export interface IFicheRcRca {
  id: string;
  categorie: TypeFiche;
  annee: string;
  numero: string;
  dateInscription: number;
  dateDerniereMaj: number;
  dateDerniereDelivrance: number;
  alertes: IAlerte[];
  decision: IDecisionRc;
  mariageInteresses: IMariageInteresse;
  interesses: IInteresse[];
  statutsFiche: IStatutFiche[];
  nature: NatureRc | NatureRca;
  typeInscription: TypeInscriptionRc;
  mandataires: TypeMandataire[];
  duree: IDureeInscription;
  inscriptionsImpactees: IInscriptionsImpactees[];
  inscriptionsLiees: IInscriptionLiee[];
  personnes: IPersonne[];
}
