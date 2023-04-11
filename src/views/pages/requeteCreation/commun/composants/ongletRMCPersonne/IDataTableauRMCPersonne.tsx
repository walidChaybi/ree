export interface IDataTableauRMCPersonne {
  idPersonne: string;
  nom: string;
  autresNoms: string;
  prenoms: string;
  dateNaissance: string;
  lieuNaissance: string;
  sexe: string;
  idActeOuInscription: string;
  nature: string;
  statut: string;
  reference: string;
  categorieRepertoire: string;
  statutOuType: string;
}

export const DataTableauRMCPersonne = {
  estStatutAnnuleOuInactif(data: IDataTableauRMCPersonne): boolean {
    return data.statut === "ANNULE" || data.statut === "INACTIF";
  },

  estPersonne(data: IDataTableauRMCPersonne): boolean {
    return data.idPersonne !== "";
  },

  estActe(data: IDataTableauRMCPersonne): boolean {
    return (
      !DataTableauRMCPersonne.estPersonne(data) &&
      data.categorieRepertoire === ""
    );
  }
};
