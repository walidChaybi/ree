import { IRequeteTableauRMCDto } from "@model/rmc/requete/RequeteTableauRMC";
import DateRECE from "../../../utils/DateRECE";

export const MOCK_REQUETE_TABLEAU_RMC_CREATION: IRequeteTableauRMCDto<"CREATION"> = {
  id: "54ddf213-d9b7-4747-8e92-68c220f66de3",
  idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc9e",
  numero: "1234",
  type: "CREATION",
  sousType: "RCEDXR",
  provenance: "SERVICE_PUBLIC",
  nomCompletRequerant: "Banque Générale",
  dateCreation: DateRECE.depuisDateArrayDTO([22, 1, 1991]).versTimestamp(),
  dateDerniereMAJ: DateRECE.depuisDateArrayDTO([22, 1, 1991]).versTimestamp(),
  statut: "A_TRAITER",
  priorite: "HAUTE",
  observations: ["1) Observation"],
  titulaires: [
    {
      nom: "Garcia",
      prenom: "Hugo",
      dateNaissance: {
        jour: 31,
        mois: 12,
        annee: 1981
      }
    },
    {
      nom: "Rossi",
      prenom: "Giulia",
      dateNaissance: {
        jour: 16,
        mois: 8,
        annee: 1983
      }
    }
  ]
};

export const MOCK_REQUETE_TABLEAU_RMC_DELIVRANCE: IRequeteTableauRMCDto<"DELIVRANCE"> = {
  id: "8ef11b8b-652c-4c6a-ad27-a544fce635d0",
  idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc9e",
  numero: "2090860",
  type: "DELIVRANCE",
  sousType: "RDCSD",
  provenance: "SERVICE_PUBLIC",
  nomCompletRequerant: "Mairie de Nantes",
  dateCreation: DateRECE.depuisDateArrayDTO([23, 1, 1992]).versTimestamp(),
  dateDerniereMAJ: DateRECE.depuisDateArrayDTO([23, 2, 1992]).versTimestamp(),
  statut: "TRAITE_A_DELIVRER_DEMAT",
  priorite: "HAUTE",
  observations: [],
  titulaires: []
};

export const MOCK_REQUETE_TABLEAU_RMC_INFORMATION: IRequeteTableauRMCDto<"INFORMATION"> = {
  id: "4578e56c-421c-4e6a-b587-a238a665daf8",
  numero: "9876",
  type: "INFORMATION",
  sousType: "COMPLETION_REQUETE_EN_COURS",
  provenance: "INTERNET",
  nomCompletRequerant: "DUBOIS Léo",
  dateCreation: DateRECE.depuisDateArrayDTO([24, 1, 1990]).versTimestamp(),
  dateDerniereMAJ: DateRECE.depuisDateArrayDTO([24, 2, 1990]).versTimestamp(),
  statut: "BROUILLON",
  priorite: "BASSE",
  observations: [],
  titulaires: []
};

export const MOCK_REQUETE_TABLEAU_RMC_MISE_A_JOUR: IRequeteTableauRMCDto<"MISE_A_JOUR"> = {
  id: "532a8a9d-91c0-4405-9f5f-503629405422",
  idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc7b",
  numero: "9012",
  type: "MISE_A_JOUR",
  sousType: "RMAC",
  provenance: "COURRIER",
  nomCompletRequerant: "Miccotton Mylene",
  dateCreation: DateRECE.depuisDateArrayDTO([10, 1, 1990]).versTimestamp(),
  dateDerniereMAJ: DateRECE.depuisDateArrayDTO([10, 2, 1990]).versTimestamp(),
  statut: "A_SIGNER",
  priorite: "MOYENNE",
  observations: [],
  titulaires: []
};
