import { StatutPacs } from "../enum/StatutPacs";
import { IPartenaire } from "./IPartenaire";
import { IStatutFiche } from "../FicheInterfaces";
import { IAnnulation } from "./IAnnulation";
import { IModification } from "./IModification";
import { IDissolution } from "./IDissolution";
import { IAutorite } from "../commun/IAutorite";

export interface IFichePacs {
  id: string;
  numero: string;
  annee: string;
  dateDerniereMaj: string;
  dateDerniereDelivrance: string;
  statut: StatutPacs;
  referencePactI: string;
  dateEnregistrementParAutorite: string;
  dateInscription: string;
  autorite: IAutorite;
  annulation?: IAnnulation;
  dissolution?: IDissolution;
  modifications?: IModification[];
  partenaires?: IPartenaire[];
  statutsFiche: IStatutFiche[];
}
