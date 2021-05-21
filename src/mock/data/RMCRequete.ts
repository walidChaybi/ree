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
        type: "CREATION",
        sousType: "RCEDXR",
        provenance: "SIANF",
        document: undefined,
        nature: undefined,
        requerant: "Banque Générale",
        attribueA: "PROVISTE Alain",
        dateCreation: 1639307533,
        dateDernierMAJ: 1556694302,
        statut: "A_TRAITER",
        priorite: "HAUTE",
        observations: ["1) Observation"],
        titulaires: [
          {
            nom: "Garcia",
            prenoms: ["1) Hugo"],
            jourNaissance: 31,
            moisNaissance: 12,
            anneeNaissance: 1981
          },
          {
            nom: "Rossi",
            prenoms: ["1) Giulia", "2) clara", "3) Maria"],
            jourNaissance: 16,
            moisNaissance: 8,
            anneeNaissance: 1983
          }
        ]
      },
      {
        id: "8ef11b8b-652c-4c6a-ad27-a544fce635d0",
        numero: "2090860",
        idSagaDila: 860,
        type: "DELIVRANCE",
        sousType: "RDCSD",
        provenance: "SERVICE_PUBLIC",
        document: "Extrait avec filiation",
        nature: "NAISSANCE",
        requerant: "Mairie de Nantes",
        attribueA: "LAMY Mélina",
        dateCreation: 1626158495,
        dateDernierMAJ: 1544677504,
        statut: "TRAITE_A_DELIVRER_DEMAT",
        priorite: "HAUTE",
        observations: [],
        titulaires: []
      },
      {
        id: "4578e56c-421c-4e6a-b587-a238a665daf8",
        numero: "9876",
        idSagaDila: 890,
        type: "INFORMATION",
        sousType: "COMPLETION_REQUETE_EN_COURS",
        provenance: "INTERNET",
        document: undefined,
        nature: undefined,
        requerant: "DUBOIS Léo",
        attribueA: "Bureau des Affaires Juridiques",
        dateCreation: 1619242914,
        dateDernierMAJ: 1619064304,
        statut: "BROUILLON",
        priorite: "BASSE",
        observations: [],
        titulaires: []
      },
      {
        id: "532a8a9d-91c0-4405-9f5f-503629405422",
        numero: "9012",
        idSagaDila: 109,
        type: "MISE_A_JOUR",
        sousType: "RMAC",
        provenance: "COURRIER",
        document: undefined,
        nature: undefined,
        requerant: "Miccotton Mylene",
        attribueA: "Bureau des Affaires",
        dateCreation: 1615395083,
        dateDernierMAJ: 1614531151,
        statut: "A_SIGNER",
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
    numero: "1234",
    idSagaDila: "987",
    type: "CREATION",
    sousType: "RCEDXR",
    provenance: "SIANF",
    document: undefined,
    nature: undefined,
    requerant: "Banque Générale",
    attribueA: "PROVISTE Alain",
    dateCreation: "22/01/1991",
    dateDerniereMaj: "22/02/1991",
    statut: "A_TRAITER",
    priorite: "HAUTE",
    observations: ["1) Observation"],
    titulaires: [
      {
        nom: "Garcia",
        prenoms: ["1) Hugo"],
        jourNaissance: 31,
        moisNaissance: 12,
        anneeNaissance: 1981
      },
      {
        nom: "Rossi",
        prenoms: ["1) Giulia", "2) clara", "3) Maria"],
        jourNaissance: 16,
        moisNaissance: 8,
        anneeNaissance: 1983
      }
    ]
  },
  {
    idRequete: "8ef11b8b-652c-4c6a-ad27-a544fce635d0",
    numero: "2090860",
    idSagaDila: "860",
    type: "DELIVRANCE",
    sousType: "RDCSD",
    provenance: "SERVICE_PUBLIC",
    document: "Extrait avec filiation",
    nature: "NAISSANCE",
    requerant: "Mairie de Nantes",
    attribueA: "LAMY Mélina",
    dateCreation: "22/01/1992",
    dateDerniereMaj: "22/02/1992",
    statut: "TRAITE_A_DELIVRER_DEMAT",
    priorite: "HAUTE",
    observations: [],
    titulaires: []
  },
  {
    idRequete: "4578e56c-421c-4e6a-b587-a238a665daf8",
    numero: "9876",
    idSagaDila: "890",
    type: "INFORMATION",
    sousType: "COMPLETION_REQUETE_EN_COURS",
    provenance: "INTERNET",
    document: undefined,
    nature: undefined,
    requerant: "DUBOIS Léo",
    attribueA: "Bureau des Affaires Extra",
    dateCreation: "22/01/1990",
    dateDerniereMaj: "22/02/1990",
    statut: "BROUILLON",
    priorite: "BASSE",
    observations: [],
    titulaires: []
  },
  {
    idRequete: "532a8a9d-91c0-4405-9f5f-503629405422",
    numero: "9012",
    idSagaDila: "109",
    type: "MISE_A_JOUR",
    sousType: "RMAC",
    provenance: "COURRIER",
    document: undefined,
    nature: undefined,
    requerant: "Miccotton Mylene",
    attribueA: "Bureau des Affaires Juridiques",
    dateCreation: "22/01/1990",
    dateDerniereMaj: "22/02/1990",
    statut: "A_SIGNER",
    priorite: "MOYENNE",
    observations: [],
    titulaires: []
  },
  {
    idRequete: "54ddf213-d9b7-4747-8e92-68c220f66de4",
    numero: "1235",
    idSagaDila: "988",
    type: "CREATION",
    sousType: "RCEDXR",
    provenance: "SIANF",
    document: undefined,
    nature: undefined,
    requerant: "Banque Générale",
    attribueA: "PROVISTE Alain",
    dateCreation: "22/01/1991",
    dateDerniereMaj: "22/02/1991",
    statut: "A_TRAITER",
    priorite: "HAUTE",
    observations: ["1) Observation"],
    titulaires: [
      {
        nom: "Garcia",
        prenoms: ["1) Hugo"],
        jourNaissance: 31,
        moisNaissance: 12,
        anneeNaissance: 1981
      },
      {
        nom: "Rossi",
        prenoms: ["1) Giulia", "2) clara", "3) Maria"],
        jourNaissance: 16,
        moisNaissance: 8,
        anneeNaissance: 1983
      }
    ]
  },
  {
    idRequete: "8ef11b8b-652c-4c6a-ad27-a544fce635d1",
    numero: "2090861",
    idSagaDila: "861",
    type: "DELIVRANCE",
    sousType: "RDCSD",
    provenance: "SERVICE_PUBLIC",
    document: "Extrait avec filiation",
    nature: "NAISSANCE",
    requerant: "Mairie de Nantes",
    attribueA: "LAMY Mélina",
    dateCreation: "22/01/1992",
    dateDerniereMaj: "22/02/1992",
    statut: "TRAITE_A_DELIVRER_DEMAT",
    priorite: "HAUTE",
    observations: [],
    titulaires: []
  },
  {
    idRequete: "4578e56c-421c-4e6a-b587-a238a665daf9",
    numero: "9877",
    idSagaDila: "891",
    type: "INFORMATION",
    sousType: "COMPLETION_REQUETE_EN_COURS",
    provenance: "INTERNET",
    document: undefined,
    nature: undefined,
    requerant: "DUBOIS Léo",
    attribueA: "Bureau des Affaires Extra",
    dateCreation: "22/01/1990",
    dateDerniereMaj: "22/02/1990",
    statut: "BROUILLON",
    priorite: "BASSE",
    observations: [],
    titulaires: []
  },
  {
    idRequete: "532a8a9d-91c0-4405-9f5f-503629405423",
    numero: "9013",
    idSagaDila: "108",
    type: "MISE_A_JOUR",
    sousType: "RMAC",
    provenance: "COURRIER",
    document: undefined,
    nature: undefined,
    requerant: "Miccotton Mylene",
    attribueA: "Bureau des Affaires Juridiques",
    dateCreation: "22/01/1990",
    dateDerniereMaj: "22/02/1990",
    statut: "A_SIGNER",
    priorite: "MOYENNE",
    observations: [],
    titulaires: []
  },
  {
    idRequete: "54ddf213-d9b7-4747-8e92-68c220f66de1",
    numero: "1233",
    idSagaDila: "986",
    type: "CREATION",
    sousType: "RCEDXR",
    provenance: "SIANF",
    document: undefined,
    nature: undefined,
    requerant: "Banque Générale",
    attribueA: "PROVISTE Alain",
    dateCreation: "22/01/1991",
    dateDerniereMaj: "22/02/1991",
    statut: "A_TRAITER",
    priorite: "HAUTE",
    observations: ["1) Observation"],
    titulaires: [
      {
        nom: "Garcia",
        prenoms: ["1) Hugo"],
        jourNaissance: 31,
        moisNaissance: 12,
        anneeNaissance: 1981
      },
      {
        nom: "Rossi",
        prenoms: ["1) Giulia", "2) clara", "3) Maria"],
        jourNaissance: 16,
        moisNaissance: 8,
        anneeNaissance: 1983
      }
    ]
  },
  {
    idRequete: "8ef11b8b-652c-4c6a-ad27-a544fce635df",
    numero: "2090869",
    idSagaDila: "869",
    type: "DELIVRANCE",
    sousType: "RDCSD",
    provenance: "SERVICE_PUBLIC",
    document: "Extrait avec filiation",
    nature: "NAISSANCE",
    requerant: "Mairie de Nantes",
    attribueA: "LAMY Mélina",
    dateCreation: "22/01/1992",
    dateDerniereMaj: "22/02/1992",
    statut: "TRAITE_A_DELIVRER_DEMAT",
    priorite: "HAUTE",
    observations: [],
    titulaires: []
  },
  {
    idRequete: "4578e56c-421c-4e6a-b587-a238a665daf7",
    numero: "9875",
    idSagaDila: "899",
    type: "INFORMATION",
    sousType: "COMPLETION_REQUETE_EN_COURS",
    provenance: "INTERNET",
    document: undefined,
    nature: undefined,
    requerant: "DUBOIS Léo",
    attribueA: "Bureau des Affaires Extra",
    dateCreation: "22/01/1990",
    dateDerniereMaj: "22/02/1990",
    statut: "BROUILLON",
    priorite: "BASSE",
    observations: [],
    titulaires: []
  },
  {
    idRequete: "532a8a9d-91c0-4405-9f5f-503629405421",
    numero: "9011",
    idSagaDila: "108",
    type: "MISE_A_JOUR",
    sousType: "RMAC",
    provenance: "COURRIER",
    document: undefined,
    nature: undefined,
    requerant: "Miccotton Mylene",
    attribueA: "Bureau des Affaires Juridiques",
    dateCreation: "22/01/1990",
    dateDerniereMaj: "22/02/1990",
    statut: "A_SIGNER",
    priorite: "MOYENNE",
    observations: [],
    titulaires: []
  }
];
