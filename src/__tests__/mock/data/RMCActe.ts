import { IResultatRMCActeDto } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";

export const ReponseAppelRMCActe = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 201,
  url: "/rece/rece-etatcivil-api/v1/acte/rmc",
  data: [
    {
      id: "d8708d77-a359-4553-be72-1eb5f246d4da",
      nom: "Rose",
      autresNoms: ["DUPE"],
      prenoms: [
        { prenom: "Jean-pierre", numeroOrdre: 1 },
        { prenom: "Michel", numeroOrdre: 2 }
      ],
      dateNaissance: { jour: 8, mois: 6, annee: 1960 },
      dateEvenement: { jour: 8, mois: 6, annee: 1963 },
      paysNaissance: "Tunisie",
      nature: "RECONNAISSANCE",
      referenceRece: "RECE.999",
      referenceRegistre: "4568",
      familleRegistre: "ACQ",
      type: "TEXTE"
    }
  ] as IResultatRMCActeDto[]
};

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
  data: [
    {
      id: "923a10fb-0b15-452d-83c0-d24c76d1d18d",
      nom: "DUBOIS",
      autresNoms: null,
      prenoms: [{ prenom: "Juliette", numeroOrdre: 1 }],
      dateNaissance: { jour: 5, mois: 5, annee: 1995 },
      paysNaissance: "Italie",
      nature: "NAISSANCE",
      referenceRece: "RECE.999",
      referenceRegistre: "DEP.IRAN.1987.13",
      familleRegistre: "DEP"
    },
    {
      id: "b41079a0-9e8d-478c-b04c-c4c2ac17134f",
      nom: "DUPOIRE",
      autresNoms: ["Duris"],
      prenoms: [{ prenom: "Michel-Paul", numeroOrdre: 1 }],
      dateNaissance: { jour: 13, mois: 8, annee: 1975 },
      paysNaissance: "France",
      nature: "NAISSANCE",
      referenceRece: "RECE.999",
      referenceRegistre: "ACQ.X.1951.1.413",
      familleRegistre: "ACQ"
    },
    {
      id: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
      nom: "DUPOIRE",
      autresNoms: ["Duris"],
      prenoms: [{ prenom: "Michel-Paul", numeroOrdre: 1 }],
      dateNaissance: { jour: 13, mois: 8, annee: 1975 },
      paysNaissance: "France",
      nature: "NAISSANCE",
      referenceRece: "RECE.999",
      referenceRegistre: "PAC.ORAN.2010.support 1.support 2.100.552",
      familleRegistre: "PAC"
    },
    {
      id: "923a10fb-0b15-452d-83c0-d24c76d1de8d",
      nom: "Durant",
      autresNoms: ["O"],
      prenoms: [
        { prenom: "Julie", numeroOrdre: 1 },
        { prenom: "Sarah", numeroOrdre: 2 }
      ],
      dateNaissance: { jour: 1, mois: 10, annee: 1960 },
      paysNaissance: "France",
      nature: "NAISSANCE",
      referenceRece: "RECE.999",
      referenceRegistre: "DEP.IRAN.1987.254.35",
      familleRegistre: "DEP"
    }
  ] as IResultatRMCActeDto[]
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
  data: [
    {
      id: "b41079a3-9e8d-478c-b04c-c4c2ac47134f",
      nom: "HU",
      autresNoms: null,
      prenoms: [{ prenom: "Jean-Louis", numeroOrdre: 1 }],
      dateNaissance: { jour: 6, mois: 8, annee: 1975 },
      paysNaissance: "France",
      nature: "NAISSANCE",
      referenceRece: "RECE.999",
      referenceRegistre: "ACQ.X.1951.1.483",
      familleRegistre: "ACQ"
    },
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834430d",
      nom: "HUBERT",
      autresNoms: ["Williams"],
      prenoms: [{ prenom: "Jean-Paul", numeroOrdre: 1 }],
      dateNaissance: { jour: 4, mois: 8, annee: 1975 },
      paysNaissance: "Tunisie",
      nature: "NAISSANCE",
      referenceRece: "RECE.999",
      referenceRegistre: "PAC.ORAN.2010.support 1.support 2.691.552",
      familleRegistre: "PAC"
    },
    {
      id: "6e89c1c1-16c4-4e40-9b72-7b567270b26f",
      nom: "Meagan",
      autresNoms: null,
      prenoms: [{ prenom: "Emerson", numeroOrdre: 1 }],
      dateNaissance: { mois: 3, annee: 1993 },
      paysNaissance: "Japon",
      nature: "NAISSANCE",
      referenceRece: "RECE.999",
      referenceRegistre: "PAC.ORAN.2010.support 1.support 2.101.552",
      familleRegistre: "PAC"
    },
    {
      id: "a053f47f-7f62-4fda-8d6c-f745a7648b1c",
      nom: "ŒUF",
      autresNoms: null,
      prenoms: [
        { prenom: "jules", numeroOrdre: 1 },
        { prenom: "Jean-Pierre", numeroOrdre: 1 }
      ],
      dateNaissance: { jour: 13, mois: 9, annee: 1975 },
      paysNaissance: "Tunisie",
      nature: "NAISSANCE",
      referenceRece: "RECE.999",
      referenceRegistre: "PAC.ORAN.2010.support 1.support 2.102.552",
      familleRegistre: "PAC"
    }
  ] as IResultatRMCActeDto[]
};
