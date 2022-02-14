import { IResultatRMCActe } from "../../model/rmc/acteInscription/resultat/IResultatRMCActe";

export const DataTableauActe = {
  previousDataLinkState: "previousDataLinkState",
  nextDataLinkState:
    "http://localhost:8089/rece-etatcivil-api/v1/acte/rmc?range=1-105",
  rowsNumberState: 5,
  minRangeState: 0,
  maxRangeState: 105
};

export const ReponseAppelRMCActe = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 201,
  url: "/rece/rece-etatcivil-api/v1/acte/rmc",
  data: {
    registres: [
      {
        id: "d8708d77-a359-4553-be72-1eb5f246d4da",
        nom: "Rose",
        autresNoms: ["DUPE"],
        prenoms: ["Jean-pierre", "Michel"],
        jourNaissance: "8",
        moisNaissance: "6",
        anneeNaissance: "1960",
        paysNaissance: "Tunisie",
        nature: "RECONNAISSANCE",
        registre: "4568"
      }
    ]
  }
};

export const DataRMCActeAvecResultat: IResultatRMCActe[] = [
  {
    idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Mick",
    dateNaissance: "08/06/1961",
    paysNaissance: "Tunisie",
    nature: "Reconnaissance",
    registre: "4568",
    type: "TEXTE"
  },
  {
    idActe: "d8708d77-a359-4553-be72-1eb5f246d4dc",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    nature: "Reconnaissance",
    registre: "4569",
    type: "TEXTE"
  },
  {
    idActe: "2748bb45-22cd-41ea-90db-0483b8ffc8a8",
    nom: "ROSE",
    autresNoms: "",
    prenoms: "Catherine, Marlène",
    dateNaissance: "02/11/1991",
    paysNaissance: "Australie",
    nature: "Naissance",
    registre: "8547",
    type: "TEXTE"
  },
  {
    idActe: "d8708d77-a359-4553-be72-1eb5f246d4db",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    nature: "Reconnaissance",
    registre: "4570",
    type: "TEXTE"
  },
  {
    idActe: "2748bb45-22cd-41ea-90db-0483b8ffc8a9",
    nom: "ROSE",
    autresNoms: "",
    prenoms: "Catherine, Marlène",
    dateNaissance: "02/11/1991",
    paysNaissance: "Australie",
    nature: "Naissance",
    registre: "8548",
    type: "TEXTE"
  }
];

export const ReponseAppelRMCActe4PremiersResultats = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 206,
  url: "/rece-etatcivil-api/v1/acte/rmc",
  headers: {
    "content-range": "0-4/8",
    link: '<http://localhost:80/rece/rece-etatcivil-api/acte/rmc?range=1-4>;rel="next"'
  },
  data: {
    registres: [
      {
        id: "923a10fb-0b15-452d-83c0-d24c76d1d18d",
        nom: "DUBOIS",
        autresNoms: null,
        prenoms: ["Juliette"],
        jourNaissance: "5",
        moisNaissance: "5",
        anneeNaissance: "1995",
        paysNaissance: "Italie",
        nature: "NAISSANCE",
        registre: "DEP.IRAN.1987.13"
      },
      {
        id: "b41079a0-9e8d-478c-b04c-c4c2ac17134f",
        nom: "DUPOIRE",
        autresNoms: ["Duris"],
        prenoms: ["Michel-Paul"],
        jourNaissance: "13",
        moisNaissance: "8",
        anneeNaissance: "1975",
        paysNaissance: "France",
        nature: "NAISSANCE",
        registre: "ACQ.X.1951.1.413"
      },
      {
        id: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
        nom: "DUPOIRE",
        autresNoms: ["Duris"],
        prenoms: ["Michel-Paul"],
        jourNaissance: "13",
        moisNaissance: "8",
        anneeNaissance: "1975",
        paysNaissance: "France",
        nature: "NAISSANCE",
        registre: "PAC.ORAN.2010.support 1.support 2.100.552"
      },
      {
        id: "923a10fb-0b15-452d-83c0-d24c76d1de8d",
        nom: "Durant",
        autresNoms: ["O"],
        prenoms: ["Julie", "Sarah"],
        jourNaissance: "1",
        moisNaissance: "10",
        anneeNaissance: "1960",
        paysNaissance: "France",
        nature: "NAISSANCE",
        registre: "DEP.IRAN.1987.254.35"
      }
    ]
  }
};

export const ReponseAppelRMCActe4DernierResultats = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 206,
  url: "/rece-etatcivil-api/v1/acte/rmc",
  headers: {
    "content-range": "4-8/8",
    link: '<http://localhost:80/rece/rece-etatcivil-api/acte/rmc?range=0-4>;rel="prev"'
  },
  data: {
    registres: [
      {
        id: "b41079a3-9e8d-478c-b04c-c4c2ac47134f",
        nom: "HU",
        autresNoms: null,
        prenoms: ["Jean-Louis"],
        jourNaissance: "6",
        moisNaissance: "8",
        anneeNaissance: "1975",
        paysNaissance: "France",
        nature: "NAISSANCE",
        registre: "ACQ.X.1951.1.483"
      },
      {
        id: "1a0aa3be-8311-465d-b750-d4c19834430d",
        nom: "HUBERT",
        autresNoms: ["Williams"],
        prenoms: ["Jean-Paul"],
        jourNaissance: "4",
        moisNaissance: "8",
        anneeNaissance: "1975",
        paysNaissance: "Tunisie",
        nature: "NAISSANCE",
        registre: "PAC.ORAN.2010.support 1.support 2.691.552"
      },
      {
        id: "6e89c1c1-16c4-4e40-9b72-7b567270b26f",
        nom: "Meagan",
        autresNoms: null,
        prenoms: ["Emerson"],
        jourNaissance: null,
        moisNaissance: "3",
        anneeNaissance: "1993",
        paysNaissance: "Japon",
        nature: "NAISSANCE",
        registre: "PAC.ORAN.2010.support 1.support 2.101.552"
      },
      {
        id: "a053f47f-7f62-4fda-8d6c-f745a7648b1c",
        nom: "ŒUF",
        autresNoms: null,
        prenoms: ["jules", "Jean-Pierre"],
        jourNaissance: "13",
        moisNaissance: "9",
        anneeNaissance: "1975",
        paysNaissance: "Tunisie",
        nature: "NAISSANCE",
        registre: "PAC.ORAN.2010.support 1.support 2.102.552"
      }
    ]
  }
};
