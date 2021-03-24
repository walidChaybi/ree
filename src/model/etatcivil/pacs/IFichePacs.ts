import { StatutPacs } from "../enum/StatutPacs";
import { IPartenaire } from "./IPartenaire";
import { IStatutFiche } from "../fiche/IStatutFiche";
import { IAnnulation } from "./IAnnulation";
import { IModification } from "./IModification";
import { IDissolution } from "./IDissolution";
import { IAutorite } from "../commun/IAutorite";
import { IPersonne } from "../commun/IPersonne";

export interface IFichePacs {
  id: string;
  numero: string;
  annee: string;
  dateDerniereMaj: Date;
  dateDerniereDelivrance: Date;
  statut: StatutPacs;
  dateEnregistrementParAutorite: Date;
  dateInscription: Date;
  autorite: IAutorite;
  annulation?: IAnnulation;
  dissolution?: IDissolution;
  modifications?: IModification[];
  partenaires?: IPartenaire[];
  statutsFiche: IStatutFiche[];
  personnes: IPersonne[];
}
