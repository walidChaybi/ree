import { IRequeteTableauRMCDto, TRequeteTableauRMCDto } from "@model/rmc/requete/RequeteTableauRMC";
import DateRECE from "../../../utils/DateRECE";

export const DataTableauRequete = {
  previousDataLinkState: "previousDataLinkState",
  nextDataLinkState: "http://localhost:8089/rece-requete-api/v2/requetes/rmc?range=1-5",
  rowsNumberState: 5,
  minRangeState: 0,
  maxRangeState: 5
};

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

export const DataRMCRequeteAvecResultat: TRequeteTableauRMCDto[] = [
  MOCK_REQUETE_TABLEAU_RMC_CREATION,
  MOCK_REQUETE_TABLEAU_RMC_DELIVRANCE,
  MOCK_REQUETE_TABLEAU_RMC_INFORMATION,
  MOCK_REQUETE_TABLEAU_RMC_MISE_A_JOUR,
  {
    id: "54ddf213-d9b7-4747-8e92-68c220f66de4",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc7b",
    numero: "1235",
    type: "CREATION",
    sousType: "RCEDXR",
    provenance: "SERVICE_PUBLIC",
    nomCompletRequerant: "Banque Générale",
    dateCreation: DateRECE.depuisDateArrayDTO([20, 1, 1991]).versTimestamp(),
    dateDerniereMAJ: DateRECE.depuisDateArrayDTO([20, 2, 1991]).versTimestamp(),
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
  },
  {
    id: "8ef11b8b-652c-4c6a-ad27-a544fce635d1",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc7a",
    numero: "2090861",
    type: "DELIVRANCE",
    sousType: "RDCSD",
    provenance: "SERVICE_PUBLIC",
    nomCompletRequerant: "Mairie de Nantes",
    dateCreation: DateRECE.depuisDateArrayDTO([28, 1, 1998]).versTimestamp(),
    dateDerniereMAJ: DateRECE.depuisDateArrayDTO([27, 2, 1998]).versTimestamp(),
    statut: "PRISE_EN_CHARGE",
    priorite: "HAUTE",
    observations: [],
    titulaires: []
  },
  {
    id: "4578e56c-421c-4e6a-b587-a238a665daf9",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc7a",
    numero: "9877",
    type: "DELIVRANCE",
    sousType: "RDCSD",
    provenance: "SERVICE_PUBLIC",
    nomCompletRequerant: "Mairie de Nantes",
    dateCreation: DateRECE.depuisDateArrayDTO([22, 1, 1992]).versTimestamp(),
    dateDerniereMAJ: DateRECE.depuisDateArrayDTO([22, 2, 1992]).versTimestamp(),
    statut: "PRISE_EN_CHARGE",
    priorite: "HAUTE",
    observations: [],
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
  },
  {
    id: "532a8a9d-91c0-4405-9f5f-503629405423",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc8f",
    numero: "9013",
    type: "MISE_A_JOUR",
    sousType: "RMAC",
    provenance: "COURRIER",
    nomCompletRequerant: "Miccotton Mylene",
    dateCreation: DateRECE.depuisDateArrayDTO([2, 1, 1990]).versTimestamp(),
    dateDerniereMAJ: DateRECE.depuisDateArrayDTO([2, 2, 1990]).versTimestamp(),
    statut: "A_SIGNER",
    priorite: "MOYENNE",
    observations: [],
    titulaires: []
  },
  {
    id: "54ddf213-d9b7-4747-8e92-68c220f66de1",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc5c",
    numero: "1233",
    type: "CREATION",
    sousType: "RCEDXR",
    provenance: "SERVICE_PUBLIC",
    nomCompletRequerant: "Banque Générale",
    dateCreation: DateRECE.depuisDateArrayDTO([12, 1, 1991]).versTimestamp(),
    dateDerniereMAJ: DateRECE.depuisDateArrayDTO([12, 2, 1991]).versTimestamp(),
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
  },
  {
    id: "8ef11b8b-652c-4c6a-ad27-a544fce635df",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc5c",
    numero: "2090869",
    type: "DELIVRANCE",
    sousType: "RDCSD",
    provenance: "SERVICE_PUBLIC",
    nomCompletRequerant: "Mairie de Nantes",
    dateCreation: DateRECE.depuisDateArrayDTO([22, 1, 1992]).versTimestamp(),
    dateDerniereMAJ: DateRECE.depuisDateArrayDTO([22, 2, 1992]).versTimestamp(),
    statut: "TRAITE_A_DELIVRER_DEMAT",
    priorite: "HAUTE",
    observations: [],
    titulaires: []
  },
  {
    id: "4578e56c-421c-4e6a-b587-a238a665daf7",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc4d",
    numero: "9875",
    type: "INFORMATION",
    sousType: "COMPLETION_REQUETE_EN_COURS",
    provenance: "INTERNET",
    nomCompletRequerant: "DUBOIS Léo",
    dateCreation: DateRECE.depuisDateArrayDTO([22, 1, 1990]).versTimestamp(),
    dateDerniereMAJ: DateRECE.depuisDateArrayDTO([22, 2, 1990]).versTimestamp(),
    statut: "BROUILLON",
    priorite: "BASSE",
    observations: [],
    titulaires: []
  },
  {
    id: "532a8a9d-91c0-4405-9f5f-503629405421",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc4d",
    numero: "9011",
    type: "MISE_A_JOUR",
    sousType: "RMAC",
    provenance: "COURRIER",
    nomCompletRequerant: "Miccotton Mylene",
    dateCreation: DateRECE.depuisDateArrayDTO([22, 1, 1990]).versTimestamp(),
    dateDerniereMAJ: DateRECE.depuisDateArrayDTO([22, 2, 1990]).versTimestamp(),
    statut: "A_SIGNER",
    priorite: "MOYENNE",
    observations: [],
    titulaires: []
  }
];
