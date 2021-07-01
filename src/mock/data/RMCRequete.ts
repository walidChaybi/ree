import { Sexe } from "../../model/etatcivil/enum/Sexe";
import { IRequeteTableau } from "../../model/requete/v2/IRequeteTableau";

export const DataTableauRequete = {
  previousDataLinkState: "previousDataLinkState",
  nextDataLinkState:
    "http://localhost:8089/rece-requete-api/v2/requetes/rmc?range=1-105",
  rowsNumberState: 12,
  minRangeState: 0,
  maxRangeState: 105
};

export const DataTableauRequeteVide = {};

export const ReponseAppelRMCRequete = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 201,
  url: "/rece/rece-requete-api/v2/requetes/rmc",
  data: {
    resultatsRecherche: [
      {
        id: "54ddf213-d9b7-4747-8e92-68c220f66de3",
        numero: "1234",
        idSagaDila: 987,
        type: "Création",
        sousType: "RCEDXR",
        provenance: "SIANF",
        document: undefined,
        nature: undefined,
        requerant: "Banque Générale",
        attribueA: "PROVISTE Alain",
        dateCreation: 1639307533,
        dateDernierMAJ: 1556694302,
        statut: "A traiter",
        priorite: "HAUTE",
        observations: ["1) Observation"],
        titulaires: [
          {
            nom: "Garcia",
            prenoms: ["1) Hugo"],
            jourNaissance: 31,
            moisNaissance: 12,
            anneeNaissance: 1981,
            sexe: Sexe.MASCULIN
          },
          {
            nom: "Rossi",
            prenoms: ["1) Giulia", "2) clara", "3) Maria"],
            jourNaissance: 16,
            moisNaissance: 8,
            anneeNaissance: 1983,
            sexe: Sexe.FEMININ
          }
        ]
      },
      {
        id: "8ef11b8b-652c-4c6a-ad27-a544fce635d0",
        numero: "2090860",
        idSagaDila: 860,
        type: "Délivrance",
        sousType: "RDCSD",
        provenance: "Service Public",
        document: "Extrait avec filiation",
        nature: "Naissance",
        requerant: "Mairie de Nantes",
        attribueA: "LAMY Mélina",
        dateCreation: 1626158495,
        dateDernierMAJ: 1544677504,
        statut: "Traitée - A délivrer Démat",
        priorite: "HAUTE",
        observations: [],
        titulaires: []
      },
      {
        id: "4578e56c-421c-4e6a-b587-a238a665daf8",
        numero: "9876",
        idSagaDila: 890,
        type: "Information",
        sousType: "Complétion requête en cours",
        provenance: "Internet",
        document: undefined,
        nature: undefined,
        requerant: "DUBOIS Léo",
        attribueA: "Bureau des Affaires Juridiques",
        dateCreation: 1619242914,
        dateDernierMAJ: 1619064304,
        statut: "Brouillon",
        priorite: "BASSE",
        observations: [],
        titulaires: []
      },
      {
        id: "532a8a9d-91c0-4405-9f5f-503629405422",
        numero: "9012",
        idSagaDila: 109,
        type: "Mise à jour",
        sousType: "RMAC",
        provenance: "Courrier",
        document: undefined,
        nature: undefined,
        requerant: "Miccotton Mylene",
        attribueA: "Bureau des Affaires",
        dateCreation: 1615395083,
        dateDernierMAJ: 1614531151,
        statut: "A signer",
        priorite: "HAUTE",
        observations: [],
        titulaires: []
      }
    ]
  }
};

export const DataRMCRequeteAvecResultat: IRequeteTableau[] = [
  {
    idRequete: "54ddf213-d9b7-4747-8e92-68c220f66de3",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc9e",
    numero: "1234",
    idSagaDila: "987",
    type: "Création",
    sousType: "RCEDXR",
    provenance: "SIANF",
    document: undefined,
    nature: undefined,
    nomCompletRequerant: "Banque Générale",
    attribueA: "PROVISTE Alain",
    dateCreation: "22/01/1991",
    dateDerniereMaj: "22/02/1991",
    statut: "A traiter",
    priorite: "HAUTE",
    observations: ["1) Observation"],
    titulaires: [
      {
        nom: "Garcia",
        prenoms: ["1) Hugo"],
        jourNaissance: 31,
        moisNaissance: 12,
        anneeNaissance: 1981,
        sexe: Sexe.MASCULIN
      },
      {
        nom: "Rossi",
        prenoms: ["1) Giulia", "2) clara", "3) Maria"],
        jourNaissance: 16,
        moisNaissance: 8,
        anneeNaissance: 1983,
        sexe: Sexe.FEMININ
      }
    ]
  },
  {
    idRequete: "8ef11b8b-652c-4c6a-ad27-a544fce635d0",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc9e",
    numero: "2090860",
    idSagaDila: "860",
    type: "Délivrance",
    sousType: "RDCSD",
    provenance: "Service Public",
    document: "Extrait avec filiation",
    nature: "Naissance",
    nomCompletRequerant: "Mairie de Nantes",
    attribueA: "LAMY Mélina",
    dateCreation: "22/01/1992",
    dateDerniereMaj: "22/02/1992",
    statut: "Traitée - A délivrer Démat",
    priorite: "HAUTE",
    observations: [],
    titulaires: []
  },
  {
    idRequete: "4578e56c-421c-4e6a-b587-a238a665daf8",
    numero: "9876",
    idSagaDila: "890",
    type: "Information",
    sousType: "Complétion requête en cours",
    provenance: "Internet",
    document: undefined,
    nature: undefined,
    nomCompletRequerant: "DUBOIS Léo",
    attribueA: "Bureau des Affaires Extra",
    dateCreation: "22/01/1990",
    dateDerniereMaj: "22/02/1990",
    statut: "Brouillon",
    priorite: "BASSE",
    observations: [],
    titulaires: []
  },
  {
    idRequete: "532a8a9d-91c0-4405-9f5f-503629405422",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc7b",
    numero: "9012",
    idSagaDila: "109",
    type: "Mise à jour",
    sousType: "RMAC",
    provenance: "Courrier",
    document: undefined,
    nature: undefined,
    nomCompletRequerant: "Miccotton Mylene",
    attribueA: "Bureau des Affaires Juridiques",
    dateCreation: "22/01/1990",
    dateDerniereMaj: "22/02/1990",
    statut: "A signer",
    priorite: "MOYENNE",
    observations: [],
    titulaires: []
  },
  {
    idRequete: "54ddf213-d9b7-4747-8e92-68c220f66de4",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc7b",
    numero: "1235",
    idSagaDila: "988",
    type: "Création",
    sousType: "RCEDXR",
    provenance: "SIANF",
    document: undefined,
    nature: undefined,
    nomCompletRequerant: "Banque Générale",
    attribueA: "PROVISTE Alain",
    dateCreation: "22/01/1991",
    dateDerniereMaj: "22/02/1991",
    statut: "A traiter",
    priorite: "HAUTE",
    observations: ["1) Observation"],
    titulaires: [
      {
        nom: "Garcia",
        prenoms: ["1) Hugo"],
        jourNaissance: 31,
        moisNaissance: 12,
        anneeNaissance: 1981,
        sexe: Sexe.MASCULIN
      },
      {
        nom: "Rossi",
        prenoms: ["1) Giulia", "2) clara", "3) Maria"],
        jourNaissance: 16,
        moisNaissance: 8,
        anneeNaissance: 1983,
        sexe: Sexe.FEMININ
      }
    ]
  },
  {
    idRequete: "8ef11b8b-652c-4c6a-ad27-a544fce635d1",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc7a",
    numero: "2090861",
    idSagaDila: "861",
    type: "Délivrance",
    sousType: "RDCSD",
    provenance: "Service Public",
    document: "Extrait avec filiation",
    nature: "Naissance",
    nomCompletRequerant: "Mairie de Nantes",
    attribueA: "LAMY Mélina",
    dateCreation: "22/01/1992",
    dateDerniereMaj: "22/02/1992",
    statut: "Prise en charge",
    priorite: "HAUTE",
    observations: [],
    titulaires: []
  },
  {
    idRequete: "4578e56c-421c-4e6a-b587-a238a665daf9",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc7a",
    numero: "9877",
    idSagaDila: "891",
    type: "Délivrance",
    sousType: "RDCSD",
    provenance: "Service Public",
    document: "Extrait avec filiation",
    nature: "Naissance",
    nomCompletRequerant: "Mairie de Nantes",
    attribueA: "LAMY Mélina",
    dateCreation: "22/01/1992",
    dateDerniereMaj: "22/02/1992",
    statut: "Prise en charge",
    priorite: "HAUTE",
    observations: [],
    titulaires: [
      {
        nom: "Garcia",
        prenoms: ["1) Hugo"],
        jourNaissance: 31,
        moisNaissance: 12,
        anneeNaissance: 1981,
        sexe: Sexe.MASCULIN
      },
      {
        nom: "Rossi",
        prenoms: ["1) Giulia", "2) Clara", "3) Maria"],
        jourNaissance: 16,
        moisNaissance: 8,
        anneeNaissance: 1983,
        sexe: Sexe.FEMININ
      }
    ]
  },
  {
    idRequete: "532a8a9d-91c0-4405-9f5f-503629405423",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc8f",
    numero: "9013",
    idSagaDila: "108",
    type: "Mise à jour",
    sousType: "RMAC",
    provenance: "Courrier",
    document: undefined,
    nature: undefined,
    nomCompletRequerant: "Miccotton Mylene",
    attribueA: "Bureau des Affaires Juridiques",
    dateCreation: "22/01/1990",
    dateDerniereMaj: "22/02/1990",
    statut: "A signer",
    priorite: "MOYENNE",
    observations: [],
    titulaires: []
  },
  {
    idRequete: "54ddf213-d9b7-4747-8e92-68c220f66de1",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc5c",
    numero: "1233",
    idSagaDila: "986",
    type: "Création",
    sousType: "RCEDXR",
    provenance: "SIANF",
    document: undefined,
    nature: undefined,
    nomCompletRequerant: "Banque Générale",
    attribueA: "PROVISTE Alain",
    dateCreation: "22/01/1991",
    dateDerniereMaj: "22/02/1991",
    statut: "A traiter",
    priorite: "HAUTE",
    observations: ["1) Observation"],
    titulaires: [
      {
        nom: "Garcia",
        prenoms: ["1) Hugo"],
        jourNaissance: 31,
        moisNaissance: 12,
        anneeNaissance: 1981,
        sexe: Sexe.MASCULIN
      },
      {
        nom: "Rossi",
        prenoms: ["1) Giulia", "2) clara", "3) Maria"],
        jourNaissance: 16,
        moisNaissance: 8,
        anneeNaissance: 1983,
        sexe: Sexe.FEMININ
      }
    ]
  },
  {
    idRequete: "8ef11b8b-652c-4c6a-ad27-a544fce635df",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc5c",
    numero: "2090869",
    idSagaDila: "869",
    type: "Délivrance",
    sousType: "RDCSD",
    provenance: "Service Public",
    document: "Extrait avec filiation",
    nature: "Naissance",
    nomCompletRequerant: "Mairie de Nantes",
    attribueA: "LAMY Mélina",
    dateCreation: "22/01/1992",
    dateDerniereMaj: "22/02/1992",
    statut: "Traitée - A délivrer Démat",
    priorite: "HAUTE",
    observations: [],
    titulaires: []
  },
  {
    idRequete: "4578e56c-421c-4e6a-b587-a238a665daf7",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc4d",
    numero: "9875",
    idSagaDila: "899",
    type: "Information",
    sousType: "Complétion requête en cours",
    provenance: "Internet",
    document: undefined,
    nature: undefined,
    nomCompletRequerant: "DUBOIS Léo",
    attribueA: "Bureau des Affaires Extra",
    dateCreation: "22/01/1990",
    dateDerniereMaj: "22/02/1990",
    statut: "Brouillon",
    priorite: "BASSE",
    observations: [],
    titulaires: []
  },
  {
    idRequete: "532a8a9d-91c0-4405-9f5f-503629405421",
    idUtilisateur: "d49e7b2d-7cec-4f6a-854c-3cbd6148dc4d",
    numero: "9011",
    idSagaDila: "108",
    type: "Mise à jour",
    sousType: "RMAC",
    provenance: "Courrier",
    document: undefined,
    nature: undefined,
    nomCompletRequerant: "Miccotton Mylene",
    attribueA: "Bureau des Affaires Juridiques",
    dateCreation: "22/01/1990",
    dateDerniereMaj: "22/02/1990",
    statut: "A signer",
    priorite: "MOYENNE",
    observations: [],
    titulaires: []
  }
];
