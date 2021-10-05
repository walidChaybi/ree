import { IAlerte } from "../../model/etatcivil/fiche/IAlerte";

export const Alertes: IAlerte[] = [
  {
    id: "ee63de49-0a32-4086-9a98-03a846a790e4",
    idActe: "ee63e3c9-3636-4071-a511-e9e599580606",
    type: {
      _libelle: "Extraénité des époux, dossier au parquet en cours",
      _code: "EXTRANEITE_EPOUX_DOSSIER_PARQUET",
      _type: "A ne pas délivrer",
      _sousType: "Nationalité"
    },
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
    type: {
      _libelle: "Acte comportant une mention de désaveu de paternité",
      _code: "ACTE_DESAVEU_PATERNITE",
      _type: "A délivrer sous conditions",
      _sousType: "Extrait à privilégier"
    },
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
