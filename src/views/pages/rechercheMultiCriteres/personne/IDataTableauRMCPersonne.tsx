import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";

export interface IDataTableauRMCPersonne {
  idPersonneOuActeInscription: string;
  estDataPersonne: boolean;
  nom: string;
  autresNoms: string;
  prenoms: string;
  dateNaissance: string;
  lieuNaissance: string;
  sexe: string;
  nature: string;
  statut: string;
  reference: string;
  typeFiche?: ETypeFiche;
  statutOuType: string;
}

export const DataTableauRMCPersonne = {
  estStatutAnnuleOuInactif(data: IDataTableauRMCPersonne): boolean {
    return data.statut === "ANNULE" || data.statut === "INACTIF";
  },

  estActe(data: IDataTableauRMCPersonne): boolean {
    let estActe = false;
    if (data.typeFiche) {
      estActe = data.typeFiche === ETypeFiche.ACTE;
    }
    return estActe;
  }
};
