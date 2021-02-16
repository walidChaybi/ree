import { IEvenement } from "./IEvenement";
import { ITitulaireActe } from "./ITitulaireActe";
import { NatureActe } from "../enum/NatureActe";
import { IPersonne } from "../../../views/pages/fiche/contenu/personne/Personne";

export interface IFicheActe {
  titulaires: ITitulaireActe[];
  evenement?: IEvenement;
  nature: NatureActe;
  personnes: IPersonne[];
}

export const FicheActe = {
  getNature(acte?: IFicheActe): string {
    return acte && acte.nature ? acte.nature.libelle : "";
  }
};
