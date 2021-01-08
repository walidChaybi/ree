import { IBandeauFiche } from "../../../../model/etatcivil/FicheInterfaces";

export const bandeauActe: IBandeauFiche = {
  titreFenetre: "NAISSANCE-DUPE-N°2020-123456",
  categorie: "acte",
  identifiant: "123456",
  registre: "ACQ.DX.2020.123456..01133",
  annee: "20220",
  numero: "123456",
  statutsFiche: [],
  prenom1: "Laurent",
  nom1: "Dupe",
  dateDerniereMaj: "07/01/2021",
  dateDerniereDelivrance: "07/01/2021"
};

export const acte: any = {
  id: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
  dateInitialisation: 1405980000000,
  dateCreation: 1256943600000,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200000,
  nature: "ABSENCE",
  numero: "413",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800000,
  dateDerniereMaj: 1536357600000,
  visibiliteArchiviste: "ANOM",
  registre: {
    famille: "CSL",
    pocopa: "DX",
    support1: "NA",
    support2: "T"
  },
  evenement: {
    minute: null,
    heure: null,
    jour: 31,
    mois: 3,
    annee: 1921,
    voie: "",
    ville: "Kanpur",
    arrondissement: "",
    region: "fQcEsLTayh",
    pays: "Chad"
  },
  mentions: [
    {
      appositionNumerique: 1606086000000,
      appositionPapier: 1606086000000,
      statut: "TODO",
      delivrable: false,
      nomOec: "Screens",
      prenomOec: "Gabriellia",
      piecesAnnexes: [
        {
          nom: "DOC1",
          type: "docx"
        }
      ]
    }
  ],
  titulaires: [
    {
      nom: "GREENWALD",
      prenoms: ["Paulita", "Zaria"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 1,
      sexe: "FEMININ"
    },

    {
      nom: "DUPE",
      prenoms: ["Laurent"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 2,
      sexe: "MASCULIN"
    }
  ],
  piecesAnnexes: [
    {
      nom: "DOC2",
      type: "pdf"
    }
  ],
  alerteActes: [],
  personnes: ["55ea5fbc-452a-4682-930c-7b6093bba00b"],
  compositionCorps: [
    {
      texte: null,
      image: null,
      noPage: 1
    },
    {
      texte: null,
      image: null,
      noPage: 3
    },
    {
      texte: "corps d'acte",
      image: null,
      noPage: null
    },
    {
      texte: null,
      image: null,
      noPage: 2
    }
  ]
};
