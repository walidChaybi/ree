import { TypeNatureFicheRc } from "../enum/TypeNatureFicheRc";
import { TypeMandataire } from "../enum/TypeMandataire";
import { TypeInscriptionRc } from "../enum/TypeInscriptionRc";
import { TypeFiche } from "../enum/TypeFiche";
import { TypeNatureFicheRca } from "../enum/TypeNatureFicheRca";
import { IPersonne } from "../commun/IPersonne";
import { IInteresse } from "./IInteresse";
import { IStatutFiche } from "./IStatutFiche";
import { IInscriptionLie } from "./IInscriptionLie";
import { IDecisionRc } from "./IDecisionRc";
import { IDureeInscription } from "./IDureeInscription";
import { IAlerte } from "./IAlerte";
import { IMariageInteresse } from "./IMariageInteresse";
import { IInscriptionsImpactees } from "./IInscriptionsImpactees";

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
  nature: TypeNatureFicheRc | TypeNatureFicheRca;
  typeInscription: TypeInscriptionRc;
  mandataires: TypeMandataire[];
  duree: IDureeInscription;
  inscriptionsImpactees: IInscriptionsImpactees[];
  inscriptionsLiees: IInscriptionLie[];
  personnes: IPersonne[];
}
