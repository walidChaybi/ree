import { IAlerte } from "@model/etatcivil/fiche/IAlerte";

export const ReponseAppelGetAlertesActe = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/acte/b41079a5-9e8d-478c-b04c-c4c2ac67134f/alertes",
  data: [
    {
      id: "ee63de49-0a32-4086-9a98-03a846a790e4",
      idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
      numeroActe: "737",
      numeroBisTerActe: "55",
      idTypeAlerte: "058a436b-330d-4c3c-83e0-d49c27390aa7",
      famille: "AR3",
      pocopa: "SEOUL",
      annee: 1986,
      support1: "support 1",
      support2: "support 2",
      complementDescription: "alerte générée par l'utilisateur",
      dateCreation: 1616022000000,
      trigrammeUtilisateur: "MLA"
    },
    {
      id: "ee737531-a7ed-4218-aba9-d8fc54bf5376",
      idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
      numeroActe: "737",
      numeroBisTerActe: "55",
      idTypeAlerte: "058a436b-330d-4c3c-83e0-d49c27390aaf",
      famille: "AR3",
      pocopa: "SEOUL",
      annee: 1986,
      support1: "support 1",
      support2: "support 2",
      complementDescription: "alerte générée automatiquement par l'outil RECE",
      dateCreation: 1552863600000,
      trigrammeUtilisateur: "RECE"
    }
  ],
  errors: []
};

export const ReponseAppelAddAlerteActe = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 201,
  url: "/rece-etatcivil-api/v1/acte/alerte",
  data: {
    id: "a0adc2b2-03b6-4b80-a90d-7f96e780df15",
    idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
    numeroActe: "8013",
    numeroBisTerActe: "681ABC",
    idTypeAlerte: "9e00d7c7-10f8-441a-9f57-8051b24f3a65",
    famille: "ACQ",
    pocopa: "X",
    annee: 1951,
    support1: "1",
    support2: null,
    complementDescription: "TEST",
    dateCreation: 1634314413092,
    trigrammeUtilisateur: "trigrammeConnectedUser"
  },
  errors: []
};

export const Alertes: IAlerte[] = [
  {
    id: "ee63de49-0a32-4086-9a98-03a846a790e4",
    idActe: "ee63e3c9-3636-4071-a511-e9e599580606",
    type: "A ne pas délivrer",
    famille: "AR3",
    pocopa: "SEOUL",
    annee: "1986",
    support1: "support 1",
    support2: "support 2",
    numeroActe: "737",
    numeroBisTerActe: "55",
    description:
      "A ne pas délivrer Extraénité des époux, dossier au parquet en cours",
    complementDescription: "alerte générée par l'utilisateur",
    trigrammeUtilisateur: "trigrammeConnectedUser",
    dateCreationStr: "18/03/2021",
    codeCouleur: "CodeCouleurAlerteRouge"
  },
  {
    id: "ee737531-a7ed-4218-aba9-d8fc54bf5376",
    idActe: "ee63e3c9-3636-4071-a511-e9e599580606",
    type: "A délivrer sous conditions",
    famille: "AR3",
    pocopa: "SEOUL",
    annee: "1986",
    support1: "support 1",
    support2: "support 2",
    numeroActe: "737",
    numeroBisTerActe: "55",
    description:
      "A délivrer sous conditions Acte comportant une mention de désaveu de paternité",
    complementDescription: "alerte générée automatiquement par l'outil RECE",
    trigrammeUtilisateur: "MLA",
    dateCreationStr: "18/03/2019",
    codeCouleur: "CodeCouleurAlerteOrange"
  }
];
