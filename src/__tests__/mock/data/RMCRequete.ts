import { Sexe } from "@model/etatcivil/enum/Sexe";
import { TagPriorisation } from "@model/requete/enum/TagPriorisation";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";

export const DataTableauRequete = {
  previousDataLinkState: "previousDataLinkState",
  nextDataLinkState:
    "http://localhost:8089/rece-requete-api/v2/requetes/rmc?range=1-5",
  rowsNumberState: 5,
  minRangeState: 0,
  maxRangeState: 5
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
        statut: "À traiter",
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
        statut: "À signer",
        priorite: "HAUTE",
        observations: [],
        titulaires: []
      }
    ]
  }
};

export const DataRMCRequeteAvecResultat: IRequeteTableauDelivrance[] = [
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
    statut: "À traiter",
    priorite: "HAUTE",
    observations: ["1) Observation"],
    titulaires: [
      {
        nom: "Garcia",
        prenoms: ["1) Hugo"],
        jourNaissance: 31,
        moisNaissance: 12,
        anneeNaissance: 1981,
        sexe: Sexe.MASCULIN,
        position: 1
      },
      {
        nom: "Rossi",
        prenoms: ["1) Giulia", "2) clara", "3) Maria"],
        jourNaissance: 16,
        moisNaissance: 8,
        anneeNaissance: 1983,
        sexe: Sexe.FEMININ,
        position: 2
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
    dateCreation: "23/01/1992",
    dateDerniereMaj: "23/02/1992",
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
    dateCreation: "24/01/1990",
    dateDerniereMaj: "24/02/1990",
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
    dateCreation: "10/01/1990",
    dateDerniereMaj: "10/02/1990",
    statut: "À signer",
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
    dateCreation: "20/01/1991",
    dateDerniereMaj: "20/02/1991",
    statut: "À traiter",
    priorite: "HAUTE",
    observations: ["1) Observation"],
    titulaires: [
      {
        nom: "Garcia",
        prenoms: ["1) Hugo"],
        jourNaissance: 31,
        moisNaissance: 12,
        anneeNaissance: 1981,
        sexe: Sexe.MASCULIN,
        position: 1
      },
      {
        nom: "Rossi",
        prenoms: ["1) Giulia", "2) clara", "3) Maria"],
        jourNaissance: 16,
        moisNaissance: 8,
        anneeNaissance: 1983,
        sexe: Sexe.FEMININ,
        position: 2
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
    dateCreation: "28/01/1998",
    dateDerniereMaj: "27/02/1998",
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
        sexe: Sexe.MASCULIN,
        position: 1
      },
      {
        nom: "Rossi",
        prenoms: ["1) Giulia", "2) Clara", "3) Maria"],
        jourNaissance: 16,
        moisNaissance: 8,
        anneeNaissance: 1983,
        sexe: Sexe.FEMININ,
        position: 2
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
    dateCreation: "02/01/1990",
    dateDerniereMaj: "02/02/1990",
    statut: "À signer",
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
    dateCreation: "12/01/1991",
    dateDerniereMaj: "12/02/1991",
    statut: "À traiter",
    priorite: "HAUTE",
    observations: ["1) Observation"],
    titulaires: [
      {
        nom: "Garcia",
        prenoms: ["1) Hugo"],
        jourNaissance: 31,
        moisNaissance: 12,
        anneeNaissance: 1981,
        sexe: Sexe.MASCULIN,
        position: 1
      },
      {
        nom: "Rossi",
        prenoms: ["1) Giulia", "2) clara", "3) Maria"],
        jourNaissance: 16,
        moisNaissance: 8,
        anneeNaissance: 1983,
        sexe: Sexe.FEMININ,
        position: 2
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
    statut: "À signer",
    priorite: "MOYENNE",
    observations: [],
    titulaires: []
  }
];

export const DataRMCRequeteRechercheViaNumeroDossierNational = {
  resultatsRecherche: [
    {
      id: "a19132f4-cab9-4d56-a630-428208cc16ac",
      numero: "4ZPUSX",
      numeroDossierNational: "2022X 200156",
      type: "CREATION",
      sousType: "RCEXR",
      tagPriorisation: TagPriorisation.SDANF,
      provenance: "NATALI",
      nomCompletRequerant: "",
      idCorbeilleAgent: "6ddd44a2-71a2-40bf-9a90-bc6fd7519ac3",
      idUtilisateur: "b67f9d14-cc5e-4002-aa06-e54029ffa073",
      idService: "6737dca8-2f96-4086-8288-fd1a136a61df",
      dateCreation: 1669717505000,
      dateDernierMAJ: 1670494807000,
      statut: "PROJET_VALIDE",
      priorite: "HAUTE",
      observations: [],
      titulaires: [
        {
          nom: "ILLIAT",
          prenoms: ["Dave", "Jacques", "Noma", "Tom", "Tommy"],
          jourNaissance: 5,
          moisNaissance: 10,
          anneeNaissance: 1958
        },
        {
          nom: "SYPO",
          prenoms: ["Alexis", "Jiju"],
          jourNaissance: 10,
          moisNaissance: 9,
          anneeNaissance: 1968
        },
        {
          nom: "ILLIAT",
          prenoms: ["Isabelle", "Bella"],
          jourNaissance: 14,
          moisNaissance: 10,
          anneeNaissance: 2019
        }
      ]
    }
  ]
};