import { StatutPacs } from "../enum/StatutPacs";
import { TypeAutorite } from "../TypeAutorite";
import { IPartenaire } from "./IPartenaire";
import { IStatutFiche } from "../FicheInterfaces";

export interface IFichePacs {
  id: string;
  numero: string;
  annee: string;
  dateDerniereMaj: number;
  dateDerniereDelivrance: number;
  statut: StatutPacs;
  referencePactI: string;
  dateEnregistrementParAutorite: number;
  dateInscription: number;
  autorite: {
    type: string; // FIXME TypeAutorite => commune_consulaire, tribunal et notaire
    numeroDepartement: string;
    ville: string;
    libelleDepartement: string;
    pays: string;
    arrondissement: string;
    region: string;
  };
  annulation: IAnnulation;
  dissolution: IDissolution;
  modifications: IModification;
  partenaires: IPartenaire[];
  statutsFiche: IStatutFiche[];
}
