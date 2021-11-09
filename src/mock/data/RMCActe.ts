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
    registre: "4568"
  },
  {
    idActe: "d8708d77-a359-4553-be72-1eb5f246d4dc",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    nature: "Reconnaissance",
    registre: "4568"
  },
  {
    idActe: "2748bb45-22cd-41ea-90db-0483b8ffc8a8",
    nom: "ROSE",
    autresNoms: "",
    prenoms: "Catherine, Marlène",
    dateNaissance: "02/11/1991",
    paysNaissance: "Australie",
    nature: "Naissance",
    registre: "8547"
  },
  {
    idActe: "d8708d77-a359-4553-be72-1eb5f246d4db",
    nom: "ROSE",
    autresNoms: "DUPE",
    prenoms: "Jean-pierre, Michel",
    dateNaissance: "08/06/1960",
    paysNaissance: "Tunisie",
    nature: "Reconnaissance",
    registre: "4568"
  },
  {
    idActe: "2748bb45-22cd-41ea-90db-0483b8ffc8a9",
    nom: "ROSE",
    autresNoms: "",
    prenoms: "Catherine, Marlène",
    dateNaissance: "02/11/1991",
    paysNaissance: "Australie",
    nature: "Naissance",
    registre: "8547"
  }
];
