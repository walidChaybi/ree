import { IRequeteInformationTableauDto } from "@model/requete/IRequeteTableauInformation";

export const requetesInformationTableauDto: IRequeteInformationTableauDto[] = [
  {
    id: "idRequete1",
    numero: "noRequete1",
    sousType: "INFORMATION",
    dateCreation: [2025, 10, 2],
    statut: "PRISE_EN_CHARGE",
    nomCompletRequerant: "John Cena",
    qualiteRequerant: "MANDATAIRE_HABILITE",
    typeMandataire: "GENEALOGISTE",
    titulaires: ["Steve Cena", "Sandrine Cena"],
    idService: "idService",
    objet: "DEMANDE_COPIE_ACTE",
    idUtilisateur: "idUtilisateur"
  },
  {
    id: "idRequete2",
    numero: "noRequete2",
    sousType: "COMPLETION_REQUETE_EN_COURS",
    dateCreation: [2025, 11, 1],
    statut: "A_TRAITER",
    nomCompletRequerant: "Buffalo Bill",
    qualiteRequerant: "PARTICULIER",
    titulaires: ["Buffalo Bill"],
    idService: "idService",
    objet: "COMPLETION_REQUETE_EN_COURS",
    idUtilisateur: "idUtilisateur"
  }
];
