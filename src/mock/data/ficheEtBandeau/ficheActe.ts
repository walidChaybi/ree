import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { IBandeauFiche } from "@model/etatcivil/fiche/IBandeauFiche";

export const bandeauActe: IBandeauFiche = {
  titreFenetre: "NAISSANCE-DUPE-N°2020-123456",
  categorie: "acte",
  identifiant: "123456",
  registre: "ACQ.DX.2020.123456..01133",
  annee: "20220",
  numero: "123456",
  statutsFiche: [],
  personnes: [{ prenom: "Laurent", nom: "Dupe" }],
  dateDerniereMaj: "07/01/2021",
  dateDerniereDelivrance: "07/01/2021"
};

export const acte: any = {
  id: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
  dateInitialisation: 1405980000,
  dateCreation: 1256943600,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200,
  nature: new NatureActe("Absence"),
  numero: "410",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800,
  dateDerniereMaj: 1536357600,
  visibiliteArchiviste: "ANOM",
  registre: {
    id: "a41079a5-9e8d-478c-b04c-c4c2ac67134f",
    type: {
      id: "a41079a5-9e8d-478c-b14c-c4c2ac67134f"
    },
    famille: "CSL",
    pocopa: "DX",
    support1: "NA",
    support2: "T",
    annee: 1922
  },
  evenement: {
    minute: 54,
    heure: 13,
    jour: 31,
    mois: 3,
    annee: 1921,
    voie: "",
    ville: "Kanpur",
    arrondissement: "",
    region: "Uttar Pradesh",
    pays: "Inde",
    lieuFormate: "Kanpur, Uttar Pradesh (Inde)"
  },
  mentions: [
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834477a",
      numeroOrdre: 1,
      numeroOrdreExtrait: 0,
      villeApposition: "Tananarive",
      regionApposition: "region apposition",
      dateApposition: [2021, 3, 24],
      dateCreation: [2021, 3, 15],
      statut: "BROUILLON",
      dateStatut: 1618480800000,
      titulaires: [
        {
          ordre: 0,
          nom: "nom titulaire",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: ["prenom titulaire"]
        }
      ],
      typeMention: {
        codeType: "1",
        libelleType: "Mariage",
        codeSousType: "1-1",
        libelleSousType: "Mariage célébré en France (mairie)",
        estActif: true,
        modeInformatisation: "OUI",
        nature: {
          id: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
          nom: "NATURE_MENTION",
          code: "27",
          libelle: "Mariage",
          estActif: true,
          opposableAuTiers: false
        },
        natureActe: "NAISSANCE",
        estSousType: false
      },
      autoriteEtatCivil: {
        libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
        nomOEC: "nom OEC",
        prenomOEC: "prenom OEC"
      },
      evenement: {
        minute: null,
        heure: null,
        jour: 1,
        mois: 12,
        annee: 1978,
        voie: null,
        ville: "Rome",
        arrondissement: null,
        region: "Grand Rome",
        pays: "Italie",
        lieuReprise: null
      },
      textes: {
        texteMention: "Mariage",
        texteApposition: null,
        texteOEC: "texte OEC",
        texteMentionDelivrance: null,
        texteMentionPlurilingue: null
      }
    },
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834477b",
      numeroOrdre: 2,
      numeroOrdreExtrait: 0,
      villeApposition: "Tananarive",
      regionApposition: "region apposition",
      dateApposition: [2021, 3, 24],
      dateCreation: [2021, 3, 15],
      statut: "BROUILLON",
      dateStatut: 1618480800000,
      titulaires: [
        {
          ordre: 0,
          nom: "nom titulaire",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: ["prenom titulaire"]
        }
      ],
      typeMention: {
        codeType: "33",
        libelleType: "Répertoire civil ",
        codeSousType: "33-1",
        libelleSousType: "Inscription au répertoire civil ",
        estActif: true,
        modeInformatisation: "OUI",
        nature: {
          id: "b03cdc6e-c77f-47a6-bc51-25b52ad7674e",
          nom: "NATURE_MENTION",
          code: "21",
          libelle: "RC",
          estActif: true,
          opposableAuTiers: true
        },
        natureActe: "NAISSANCE",
        estSousType: true
      },
      autoriteEtatCivil: {
        libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
        nomOEC: "nom OEC",
        prenomOEC: "prenom OEC"
      },
      evenement: {
        minute: null,
        heure: null,
        jour: 27,
        mois: 12,
        annee: 1978,
        voie: null,
        ville: "Rome",
        arrondissement: null,
        region: "Grand Rome",
        pays: "Italie",
        lieuReprise: null
      },
      textes: {
        texteMention: "RC",
        texteApposition: null,
        texteOEC: "texte OEC",
        texteMentionDelivrance: null,
        texteMentionPlurilingue: null
      }
    },
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834477c",
      numeroOrdre: 3,
      numeroOrdreExtrait: 0,
      villeApposition: "Tananarive",
      regionApposition: "region apposition",
      dateApposition: [2021, 3, 24],
      dateCreation: [2021, 3, 15],
      statut: "BROUILLON",
      dateStatut: 1618480800000,
      titulaires: [
        {
          ordre: 0,
          nom: "nom titulaire",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: ["prenom titulaire"]
        }
      ],
      typeMention: {
        codeType: "33",
        libelleType: "Répertoire civil ",
        codeSousType: "33-2",
        libelleSousType: "Radiation d'une inscription au répertoire civil",
        estActif: true,
        modeInformatisation: "OUI",
        nature: {
          id: "b03c5f7f-2ad5-4f55-8599-6192dd6f126e",
          nom: "NATURE_MENTION",
          code: "22",
          libelle: "RC radié",
          estActif: true,
          opposableAuTiers: false
        },
        natureActe: "NAISSANCE",
        estSousType: true
      },
      autoriteEtatCivil: {
        libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
        nomOEC: "nom OEC",
        prenomOEC: "prenom OEC"
      },
      evenement: {
        minute: null,
        heure: null,
        jour: 1,
        mois: 12,
        annee: 1978,
        voie: null,
        ville: "Rome",
        arrondissement: null,
        region: "Grand Rome",
        pays: "Italie",
        lieuReprise: null
      },
      textes: {
        texteMention: "RC Radie",
        texteApposition: null,
        texteOEC: "texte OEC",
        texteMentionDelivrance: null,
        texteMentionPlurilingue: null
      }
    },
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834477d",
      numeroOrdre: 4,
      numeroOrdreExtrait: 0,
      villeApposition: "Tananarive",
      regionApposition: "region apposition",
      dateApposition: [2021, 3, 24],
      dateCreation: [2021, 3, 15],
      statut: "BROUILLON",
      dateStatut: 1618480800000,
      titulaires: [
        {
          ordre: 0,
          nom: "nom titulaire",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: ["prenom titulaire"]
        }
      ],
      typeMention: {
        codeType: "2",
        libelleType:
          "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
        codeSousType: "2-6-a",
        libelleSousType: "Divorce à l'étranger",
        estActif: true,
        modeInformatisation: "OUI",
        nature: {
          id: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
          nom: "NATURE_MENTION",
          code: "5",
          libelle: "Divorce",
          estActif: true,
          opposableAuTiers: true
        },
        natureActe: "NAISSANCE",
        estSousType: false
      },
      autoriteEtatCivil: {
        libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
        nomOEC: "nom OEC",
        prenomOEC: "prenom OEC"
      },
      evenement: {
        minute: null,
        heure: null,
        jour: 27,
        mois: 12,
        annee: 1978,
        voie: null,
        ville: "Rome",
        arrondissement: null,
        region: "Grand Rome",
        pays: "Italie",
        lieuReprise: null,
        lieuFormate: "Rome, Grand Rome (Italie)"
      },
      textes: {
        texteMention: "Divorce",
        texteApposition: null,
        texteOEC: "texte OEC",
        texteMentionDelivrance: null,
        texteMentionPlurilingue: null
      }
    }
  ],
  titulaires: [
    {
      nom: "Greenwald",
      prenoms: ["Paulita", "Zaria"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 1,
      sexe: "FEMININ",
      profession: "DEVELOPPEUR",
      naissance: {
        minute: null,
        heure: null,
        jour: 10,
        mois: 10,
        annee: 1901,
        pays: "France",
        region: "Provence-Alpes-Côte d'Azur",
        ville: "Marseille",
        arrondissement: "10",
        voie: "",
        lieuFormate: "Marseille 10ème arrondissement (Provence-Alpes-Côte d'Azur)"
      },
      domicile: {
        pays: "DJIBOUTI",
        region: "",
        ville: "Djibouti",
        arrondissement: null,
        voie: "Ilot du Héron"
      },
      filiation: {
        domicile: {
          pays: "BELGIQUE",
          region: "Flandre",
          ville: "Bruxelles",
          arrondissement: null,
          voie: "7 Rue du Nyer"
        },
        naissance: null,
        nom: "Washington",
        ordre: 1,
        prenoms: ["Jsandye"],
        profession: "Livreur",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    },
    {
      nom: "DUPe",
      prenoms: ["LaurenT"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 2,
      sexe: "MASCULIN",
      profession: "POMPIER",
      naissance: {
        minute: null,
        heure: null,
        jour: 30,
        mois: 3,
        annee: 1948,
        pays: "France",
        region: "Saint-Pierre-et-Miquelon",
        ville: "Saint-Pierre",
        arrondissement: "",
        voie: "",
        lieuFormate: "Saint-Pierre (Saint-Pierre-et-Miquelon)"
      },
      domicile: {
        pays: "BELGIQUE",
        region: "Flandre",
        ville: "Bruxelles2",
        arrondissement: null,
        voie: "7 Rue du Noyer"
      },
      filiation: {
        domicile: {
          pays: "DJIBOUTI",
          region: "",
          ville: "Djibouti",
          arrondissement: null,
          voie: "16 avenue des Palmiers"
        },
        naissance: null,
        nom: "Sacken",
        ordre: 1,
        prenoms: ["Carmela", "Linzy"],
        profession: "Informaticien",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    }
  ],
  piecesAnnexes: [
    {
      nom: "DOC2",
      type: "pdf"
    }
  ],
  alerteActes: [],
  personnes: [{ prenom: "Laurent", nom: "Dupe" }],
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
      texte: "corps d'acte4",
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

export const acte1: any = {
  id: "d8708d77-a359-4553-be72-1eb5f246d4dc",
  dateInitialisation: 1405980000,
  dateCreation: 1256943600,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200,
  nature: new NatureActe("ABSENCE"),
  numero: "411",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800,
  dateDerniereMaj: 1536357600,
  visibiliteArchiviste: "ANOM",
  registre: {
    id: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
    type: {
      id: "a41079a5-9e8d-478c-b24c-c4c2ac67134f"
    },
    famille: "CSL",
    pocopa: "DX",
    support1: "NA",
    support2: "T"
  },
  evenement: {
    minute: 54,
    heure: 13,
    jour: 31,
    mois: 3,
    annee: 1921,
    voie: "",
    ville: "Kanpur",
    arrondissement: "",
    region: "Uttar Pradesh",
    pays: "Inde"
  },
  mentions: [
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834477a",
      numeroOrdre: 1,
      numeroOrdreExtrait: 0,
      villeApposition: "Tananarive",
      regionApposition: "region apposition",
      dateApposition: [2021, 3, 24],
      dateCreation: [2021, 3, 15],
      statut: "BROUILLON",
      dateStatut: 1618480800000,
      titulaires: [
        {
          ordre: 0,
          nom: "nom titulaire",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: ["prenom titulaire"]
        }
      ],
      typeMention: {
        codeType: "1",
        libelleType: "Mariage",
        codeSousType: "1-1",
        libelleSousType: "Mariage célébré en France (mairie)",
        estActif: true,
        modeInformatisation: "OUI",
        nature: {
          id: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
          nom: "NATURE_MENTION",
          code: "27",
          libelle: "Mariage",
          estActif: true,
          opposableAuTiers: false
        },
        natureActe: "NAISSANCE",
        estSousType: false
      },
      autoriteEtatCivil: {
        libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
        nomOEC: "nom OEC",
        prenomOEC: "prenom OEC"
      },
      evenement: {
        minute: null,
        heure: null,
        jour: 1,
        mois: 12,
        annee: 1978,
        voie: null,
        ville: "Rome",
        arrondissement: null,
        region: "Grand Rome",
        pays: "Italie",
        lieuReprise: null
      },
      textes: {
        texteMention: "Mariage",
        texteApposition: null,
        texteOEC: "texte OEC",
        texteMentionDelivrance: null,
        texteMentionPlurilingue: null
      }
    },
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834477b",
      numeroOrdre: 2,
      numeroOrdreExtrait: 0,
      villeApposition: "Tananarive",
      regionApposition: "region apposition",
      dateApposition: [2021, 3, 24],
      dateCreation: [2021, 3, 15],
      statut: "BROUILLON",
      dateStatut: 1618480800000,
      titulaires: [
        {
          ordre: 0,
          nom: "nom titulaire",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: ["prenom titulaire"]
        }
      ],
      typeMention: {
        codeType: "33",
        libelleType: "Répertoire civil ",
        codeSousType: "33-1",
        libelleSousType: "Inscription au répertoire civil ",
        estActif: true,
        modeInformatisation: "OUI",
        nature: {
          id: "b03cdc6e-c77f-47a6-bc51-25b52ad7674e",
          nom: "NATURE_MENTION",
          code: "21",
          libelle: "RC",
          estActif: true,
          opposableAuTiers: true
        },
        natureActe: "NAISSANCE",
        estSousType: true
      },
      autoriteEtatCivil: {
        libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
        nomOEC: "nom OEC",
        prenomOEC: "prenom OEC"
      },
      evenement: {
        minute: null,
        heure: null,
        jour: 27,
        mois: 12,
        annee: 1978,
        voie: null,
        ville: "Rome",
        arrondissement: null,
        region: "Grand Rome",
        pays: "Italie",
        lieuReprise: null
      },
      textes: {
        texteMention: "RC",
        texteApposition: null,
        texteOEC: "texte OEC",
        texteMentionDelivrance: null,
        texteMentionPlurilingue: null
      }
    },
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834477c",
      numeroOrdre: 3,
      numeroOrdreExtrait: 0,
      villeApposition: "Tananarive",
      regionApposition: "region apposition",
      dateApposition: [2021, 3, 24],
      dateCreation: [2021, 3, 15],
      statut: "BROUILLON",
      dateStatut: 1618480800000,
      titulaires: [
        {
          ordre: 0,
          nom: "nom titulaire",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: ["prenom titulaire"]
        }
      ],
      typeMention: {
        codeType: "33",
        libelleType: "Répertoire civil ",
        codeSousType: "33-2",
        libelleSousType: "Radiation d'une inscription au répertoire civil",
        estActif: true,
        modeInformatisation: "OUI",
        nature: {
          id: "b03c5f7f-2ad5-4f55-8599-6192dd6f126e",
          nom: "NATURE_MENTION",
          code: "22",
          libelle: "RC radié",
          estActif: true,
          opposableAuTiers: false
        },
        natureActe: "NAISSANCE",
        estSousType: true
      },
      autoriteEtatCivil: {
        libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
        nomOEC: "nom OEC",
        prenomOEC: "prenom OEC"
      },
      evenement: {
        minute: null,
        heure: null,
        jour: 1,
        mois: 12,
        annee: 1978,
        voie: null,
        ville: "Rome",
        arrondissement: null,
        region: "Grand Rome",
        pays: "Italie",
        lieuReprise: null
      },
      textes: {
        texteMention: "RC Radie",
        texteApposition: null,
        texteOEC: "texte OEC",
        texteMentionDelivrance: null,
        texteMentionPlurilingue: null
      }
    },
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834477d",
      numeroOrdre: 4,
      numeroOrdreExtrait: 0,
      villeApposition: "Tananarive",
      regionApposition: "region apposition",
      dateApposition: [2021, 3, 24],
      dateCreation: [2021, 3, 15],
      statut: "BROUILLON",
      dateStatut: 1618480800000,
      titulaires: [
        {
          ordre: 0,
          nom: "nom titulaire",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: ["prenom titulaire"]
        }
      ],
      typeMention: {
        codeType: "2",
        libelleType:
          "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
        codeSousType: "2-6-a",
        libelleSousType: "Divorce à l'étranger",
        estActif: true,
        modeInformatisation: "OUI",
        nature: {
          id: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
          nom: "NATURE_MENTION",
          code: "5",
          libelle: "Divorce",
          estActif: true,
          opposableAuTiers: true
        },
        natureActe: "NAISSANCE",
        estSousType: false
      },
      autoriteEtatCivil: {
        libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
        nomOEC: "nom OEC",
        prenomOEC: "prenom OEC"
      },
      evenement: {
        minute: null,
        heure: null,
        jour: 27,
        mois: 12,
        annee: 1978,
        voie: null,
        ville: "Rome",
        arrondissement: null,
        region: "Grand Rome",
        pays: "Italie",
        lieuReprise: null
      },
      textes: {
        texteMention: "Divorce",
        texteApposition: null,
        texteOEC: "texte OEC",
        texteMentionDelivrance: null,
        texteMentionPlurilingue: null
      }
    }
  ],
  titulaires: [
    {
      nom: "Greenwald",
      prenoms: ["Paulita", "Zaria"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 1,
      sexe: "FEMININ",
      profession: "DEVELOPPEUR",
      naissance: {
        minute: null,
        heure: null,
        jour: 10,
        mois: 10,
        annee: 1901,
        pays: "France",
        region: "Provence-Alpes-Côte d’Azur",
        ville: "Marseille",
        arrondissement: "10",
        voie: ""
      },
      domicile: {
        pays: "DJIBOUTI",
        region: "",
        ville: "Djibouti",
        arrondissement: null,
        voie: "Ilot du Héron"
      },
      filiation: {
        domicile: {
          pays: "BELGIQUE",
          region: "Flandre",
          ville: "Bruxelles3",
          arrondissement: null,
          voie: "7 Rue du Nyer"
        },
        naissance: null,
        nom: "Washington",
        ordre: 1,
        prenoms: ["Jsandye"],
        profession: "Livreur",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    },
    {
      nom: "DUPe",
      prenoms: ["LaurenT"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 2,
      sexe: "MASCULIN",
      profession: "POMPIER",
      naissance: {
        minute: null,
        heure: null,
        jour: 30,
        mois: 3,
        annee: 1948,
        pays: "France",
        region: "Saint-Pierre-et-Miquelon2",
        ville: "Saint-Pierre2",
        arrondissement: "",
        voie: ""
      },
      domicile: {
        pays: "BELGIQUE",
        region: "Flandre",
        ville: "Bruxelles4",
        arrondissement: null,
        voie: "17 Rue du Noyer"
      },
      filiation: {
        domicile: {
          pays: "DJIBOUTI",
          region: "",
          ville: "Djibouti",
          arrondissement: null,
          voie: "6 avenue des Palmiers"
        },
        naissance: null,
        nom: "Sacken",
        ordre: 1,
        prenoms: ["Carmela", "Linzy"],
        profession: "Informaticien",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    }
  ],
  piecesAnnexes: [
    {
      nom: "DOC2",
      type: "pdf"
    }
  ],
  alerteActes: [],
  personnes: [],
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
      texte: "corps d'acte2",
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

export const acte2: any = {
  id: "2748bb45-22cd-41ea-90db-0483b8ffc8a8",
  dateInitialisation: 1405980000,
  dateCreation: 1256943600,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200,
  nature: new NatureActe("Absence"),
  numero: "412",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800,
  dateDerniereMaj: 1536357600,
  visibiliteArchiviste: "ANOM",
  registre: {
    id: "c41079a5-9e8d-478c-b04c-c4c2ac67134f",
    type: {
      id: "a41079a5-9e8d-478c-b34c-c4c2ac67134f"
    },
    famille: "CSL",
    pocopa: "DX",
    support1: "NA",
    support2: "T"
  },
  evenement: {
    minute: 54,
    heure: 13,
    jour: 31,
    mois: 3,
    annee: 1922,
    voie: "",
    ville: "Kanpur",
    arrondissement: "",
    region: "Uttar Pradesh",
    pays: "Inde"
  },
  mentions: [
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834477a",
      numeroOrdre: 1,
      numeroOrdreExtrait: 0,
      villeApposition: "Tananarive",
      regionApposition: "region apposition",
      dateApposition: [2021, 3, 24],
      dateCreation: [2021, 3, 15],
      statut: "BROUILLON",
      dateStatut: 1618480800000,
      titulaires: [
        {
          ordre: 0,
          nom: "nom titulaire",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: ["prenom titulaire"]
        }
      ],
      typeMention: {
        codeType: "1",
        libelleType: "Mariage",
        codeSousType: "1-1",
        libelleSousType: "Mariage célébré en France (mairie)",
        estActif: true,
        modeInformatisation: "OUI",
        nature: {
          id: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
          nom: "NATURE_MENTION",
          code: "27",
          libelle: "Mariage",
          estActif: true,
          opposableAuTiers: false
        },
        natureActe: "NAISSANCE",
        estSousType: false
      },
      autoriteEtatCivil: {
        libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
        nomOEC: "nom OEC",
        prenomOEC: "prenom OEC"
      },
      evenement: {
        minute: null,
        heure: null,
        jour: 1,
        mois: 12,
        annee: 1978,
        voie: null,
        ville: "Rome",
        arrondissement: null,
        region: "Grand Rome",
        pays: "Italie",
        lieuReprise: null
      },
      textes: {
        texteMention: "Mariage",
        texteApposition: null,
        texteOEC: "texte OEC",
        texteMentionDelivrance: null,
        texteMentionPlurilingue: null
      }
    }
  ],
  titulaires: [
    {
      nom: "Greenwald",
      prenoms: ["Paulita", "Zaria"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 1,
      sexe: "FEMININ",
      profession: "DEVELOPPEUR",
      naissance: {
        minute: null,
        heure: null,
        jour: 10,
        mois: 10,
        annee: 1901,
        pays: "France",
        region: "Provence-Alpes-Côte d’Azur",
        ville: "Marseille",
        arrondissement: "10",
        voie: ""
      },
      domicile: {
        pays: "DJIBOUTI",
        region: "",
        ville: "Djibouti",
        arrondissement: null,
        voie: "Ilot du Héron"
      },
      filiation: {
        domicile: {
          pays: "BELGIQUE",
          region: "Flandre",
          ville: "Bruxelles5",
          arrondissement: null,
          voie: "7 Rue du Nyer"
        },
        naissance: null,
        nom: "Washington",
        ordre: 1,
        prenoms: ["Jsandye"],
        profession: "Livreur",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    },
    {
      nom: "DUPe",
      prenoms: ["LaurenT"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 2,
      sexe: "MASCULIN",
      profession: "POMPIER",
      naissance: {
        minute: null,
        heure: null,
        jour: 30,
        mois: 3,
        annee: 1948,
        pays: "France",
        region: "Saint-Pierre-et-Miquelon3",
        ville: "Saint-Pierre3",
        arrondissement: "",
        voie: ""
      },
      domicile: {
        pays: "BELGIQUE",
        region: "Flandre",
        ville: "Bruxelles6",
        arrondissement: null,
        voie: "27 Rue du Noyer"
      },
      filiation: {
        domicile: {
          pays: "DJIBOUTI",
          region: "",
          ville: "Djibouti",
          arrondissement: null,
          voie: "26 avenue des Palmiers"
        },
        naissance: null,
        nom: "Sacken",
        ordre: 1,
        prenoms: ["Carmela", "Linzy"],
        profession: "Informaticien",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    }
  ],
  piecesAnnexes: [
    {
      nom: "DOC2",
      type: "pdf"
    }
  ],
  alerteActes: [],
  personnes: [],
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
      texte: "corps d'acte5",
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

export const acte3: any = {
  id: "d8708d77-a359-4553-be72-1eb5f246d4db",
  dateInitialisation: 1405980000,
  dateCreation: 1256943600,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200,
  nature: new NatureActe("Absence"),
  numero: "413",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800,
  dateDerniereMaj: 1536357600,
  visibiliteArchiviste: "ANOM",
  registre: {
    id: "d41079a5-9e8d-478c-b04c-c4c2ac67134f",
    type: {
      id: "a41079a5-9e8d-478c-b44c-c4c2ac67134f"
    },
    famille: "CSL",
    pocopa: "DX",
    support1: "NA",
    support2: "T"
  },
  evenement: {
    minute: 54,
    heure: 13,
    jour: 31,
    mois: 3,
    annee: 1921,
    voie: "",
    ville: "Kanpur",
    arrondissement: "",
    region: "Uttar Pradesh",
    pays: "Inde"
  },
  mentions: [
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834477a",
      numeroOrdre: 1,
      numeroOrdreExtrait: 0,
      villeApposition: "Tananarive",
      regionApposition: "region apposition",
      dateApposition: [2021, 3, 24],
      dateCreation: [2021, 3, 15],
      statut: "BROUILLON",
      dateStatut: 1618480800000,
      titulaires: [
        {
          ordre: 0,
          nom: "nom titulaire",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: ["prenom titulaire"]
        }
      ],
      typeMention: {
        codeType: "1",
        libelleType: "Mariage",
        codeSousType: "1-1",
        libelleSousType: "Mariage célébré en France (mairie)",
        estActif: true,
        modeInformatisation: "OUI",
        nature: {
          id: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
          nom: "NATURE_MENTION",
          code: "27",
          libelle: "Mariage",
          estActif: true,
          opposableAuTiers: false
        },
        natureActe: "NAISSANCE",
        estSousType: false
      },
      autoriteEtatCivil: {
        libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
        nomOEC: "nom OEC",
        prenomOEC: "prenom OEC"
      },
      evenement: {
        minute: null,
        heure: null,
        jour: 1,
        mois: 12,
        annee: 1978,
        voie: null,
        ville: "Rome",
        arrondissement: null,
        region: "Grand Rome",
        pays: "Italie",
        lieuReprise: null
      },
      textes: {
        texteMention: "Mariage",
        texteApposition: null,
        texteOEC: "texte OEC",
        texteMentionDelivrance: null,
        texteMentionPlurilingue: null
      }
    }
  ],
  titulaires: [
    {
      nom: "Greenwald",
      prenoms: ["Paulita", "Zaria"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 1,
      sexe: "FEMININ",
      profession: "DEVELOPPEUR",
      naissance: {
        minute: null,
        heure: null,
        jour: 10,
        mois: 10,
        annee: 1901,
        pays: "France",
        region: "Provence-Alpes-Côte d’Azur",
        ville: "Marseille",
        arrondissement: "10",
        voie: ""
      },
      domicile: {
        pays: "DJIBOUTI",
        region: "",
        ville: "Djibouti",
        arrondissement: null,
        voie: "Ilot du Héron"
      },
      filiation: {
        domicile: {
          pays: "BELGIQUE",
          region: "Flandre",
          ville: "Bruxelles7",
          arrondissement: null,
          voie: "7 Rue du Nyer"
        },
        naissance: null,
        nom: "Washington",
        ordre: 1,
        prenoms: ["Jsandye"],
        profession: "Livreur",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    },
    {
      nom: "DUPe",
      prenoms: ["LaurenT"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 2,
      sexe: "MASCULIN",
      profession: "POMPIER",
      naissance: {
        minute: null,
        heure: null,
        jour: 30,
        mois: 3,
        annee: 1948,
        pays: "France",
        region: "Saint-Pierre-et-Miquelon4",
        ville: "Saint-Pierre4",
        arrondissement: "",
        voie: ""
      },
      domicile: {
        pays: "BELGIQUE",
        region: "Flandre",
        ville: "Bruxelles8",
        arrondissement: null,
        voie: "37 Rue du Noyer"
      },
      filiation: {
        domicile: {
          pays: "DJIBOUTI",
          region: "",
          ville: "Djibouti",
          arrondissement: null,
          voie: "116 avenue des Palmiers"
        },
        naissance: null,
        nom: "Sacken",
        ordre: 1,
        prenoms: ["Carmela", "Linzy"],
        profession: "Informaticien",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    }
  ],
  piecesAnnexes: [
    {
      nom: "DOC2",
      type: "pdf"
    }
  ],
  alerteActes: [],
  personnes: [],
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
      texte: "corps d'acte3",
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

export const acte4: any = {
  id: "2748bb45-22cd-41ea-90db-0483b8ffc8a9",
  dateInitialisation: 1405980000,
  dateCreation: 1256943600,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200,
  nature: new NatureActe("Absence"),
  numero: "414",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800,
  dateDerniereMaj: 1536357600,
  visibiliteArchiviste: "ANOM",
  registre: {
    id: "f41079a5-9e8d-478c-b04c-c4c2ac67134f",
    type: {
      id: "a41079a5-9e8d-478c-b54c-c4c2ac67134f"
    },
    famille: "CSL",
    pocopa: "DX",
    support1: "NA",
    support2: "T"
  },
  evenement: {
    minute: 54,
    heure: 13,
    jour: 31,
    mois: 3,
    annee: 1922,
    voie: "",
    ville: "Kanpur",
    arrondissement: "",
    region: "Uttar Pradesh",
    pays: "Inde"
  },
  mentions: [
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834477a",
      numeroOrdre: 1,
      numeroOrdreExtrait: 0,
      villeApposition: "Tananarive",
      regionApposition: "region apposition",
      dateApposition: [2021, 3, 24],
      dateCreation: [2021, 3, 15],
      statut: "BROUILLON",
      dateStatut: 1618480800000,
      titulaires: [
        {
          ordre: 0,
          nom: "nom titulaire",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: ["prenom titulaire"]
        }
      ],
      typeMention: {
        codeType: "1",
        libelleType: "Mariage",
        codeSousType: "1-1",
        libelleSousType: "Mariage célébré en France (mairie)",
        estActif: true,
        modeInformatisation: "OUI",
        nature: {
          id: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
          nom: "NATURE_MENTION",
          code: "27",
          libelle: "Mariage",
          estActif: true,
          opposableAuTiers: false
        },
        natureActe: "NAISSANCE",
        estSousType: false
      },
      autoriteEtatCivil: {
        libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
        nomOEC: "nom OEC",
        prenomOEC: "prenom OEC"
      },
      evenement: {
        minute: null,
        heure: null,
        jour: 1,
        mois: 12,
        annee: 1978,
        voie: null,
        ville: "Rome",
        arrondissement: null,
        region: "Grand Rome",
        pays: "Italie",
        lieuReprise: null
      },
      textes: {
        texteMention: "Mariage",
        texteApposition: null,
        texteOEC: "texte OEC",
        texteMentionDelivrance: null,
        texteMentionPlurilingue: null
      }
    }
  ],
  titulaires: [
    {
      nom: "Greenwald",
      prenoms: ["Paulita", "Zaria"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 1,
      sexe: "FEMININ",
      profession: "DEVELOPPEUR",
      naissance: {
        minute: null,
        heure: null,
        jour: 10,
        mois: 10,
        annee: 1901,
        pays: "France",
        region: "Provence-Alpes-Côte d’Azur",
        ville: "Marseille",
        arrondissement: "10",
        voie: ""
      },
      domicile: {
        pays: "DJIBOUTI",
        region: "",
        ville: "Djibouti",
        arrondissement: null,
        voie: "Ilot du Héron"
      },
      filiation: {
        domicile: {
          pays: "BELGIQUE",
          region: "Flandre",
          ville: "Bruxelles9",
          arrondissement: null,
          voie: "7 Rue du Nyer"
        },
        naissance: null,
        nom: "Washington",
        ordre: 1,
        prenoms: ["Jsandye"],
        profession: "Livreur",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    },
    {
      nom: "DUPe",
      prenoms: ["LaurenT"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 2,
      sexe: "MASCULIN",
      profession: "POMPIER",
      naissance: {
        minute: null,
        heure: null,
        jour: 30,
        mois: 3,
        annee: 1948,
        pays: "France",
        region: "Saint-Pierre-et-Miquelon5",
        ville: "Saint-Pierre5",
        arrondissement: "",
        voie: ""
      },
      domicile: {
        pays: "BELGIQUE",
        region: "Flandre",
        ville: "Bruxelles10",
        arrondissement: null,
        voie: "47 Rue du Noyer"
      },
      filiation: {
        domicile: {
          pays: "DJIBOUTI",
          region: "",
          ville: "Djibouti",
          arrondissement: null,
          voie: "169 avenue des Palmiers"
        },
        naissance: null,
        nom: "Sacken",
        ordre: 1,
        prenoms: ["Carmela", "Linzy"],
        profession: "Informaticien",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    }
  ],
  piecesAnnexes: [
    {
      nom: "DOC2",
      type: "pdf"
    }
  ],
  alerteActes: [
    {
      complementDescription: "petit test de description",
      typeAlerte: {
        id: "058a436b-330d-4c3c-83e0-d49c27390ab5",
        nom: "TYPE_ALERTE",
        code: "DELIVRANCE_RESERVE_PREUVE",
        libelle:
          "Délivrance sous réserve de la preuve de la nationalité française de l'autre conjoint",
        type: "A délivrer sous conditions",
        sousType: "Divers - délivrer sous conditions "
      },
      dateCreation: 1552863600000,
      idUtilisateur: "MLA"
    },
    {
      complementDescription: "ça c'est pas délivrable",
      typeAlerte: {
        id: "058a436b-330d-4c3c-83e0-d49c27390aaa",
        nom: "TYPE_ALERTE",
        code: "ATTENTE_NUMERISATION",
        libelle: "En attente de nouvelle numérisation",
        type: "A ne pas délivrer",
        sousType: "Divers - ne pas délivrer"
      },
      dateCreation: 1552863600000,
      idUtilisateur: "AHE"
    },
    {
      complementDescription: "description 2 de l'alerte",
      typeAlerte: {
        id: "9e00d7c7-10f8-441a-9f57-8051b24f3a65",
        nom: "TYPE_ALERTE",
        code: "INFORMATION_SAGA",
        libelle: "Information SAGA",
        type: "Description SAGA",
        sousType: "Repris SAGA"
      },
      dateCreation: 1552863600000,
      idUtilisateur: "RECE"
    },
    {
      complementDescription: "description 1 de l'alerte",
      typeAlerte: {
        id: "058a436b-330d-4c3c-83e0-d49c27390ab0",
        nom: "TYPE_ALERTE",
        code: "PROBLEME_FONCTIONNEL",
        libelle: "Problème fonctionnel",
        type: "Problème fonctionnel",
        sousType: "Problème fonctionnel"
      },
      dateCreation: 1552863600000,
      idUtilisateur: "MVI"
    },
    {
      complementDescription:
        "et encore une description avec du blabla et encore du blabla. Qu'est ce qu'elle est longue. Et une autre phrase. Aller une dernière",
      typeAlerte: {
        id: "058a436b-330d-4c3c-83e0-d49c27390ab9",
        nom: "TYPE_ALERTE",
        code: "ACTE_NON_NUMERISE",
        libelle: "Acte pas encore numérisé",
        type: "Acte non exploitable",
        sousType: "Acte non exploitable"
      },
      dateCreation: 1552863600000,
      idUtilisateur: "NSL"
    }
  ],
  personnes: [],
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

export const acte5 = {
  id: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
  dateInitialisation: null,
  dateCreation: 1304330400000,
  modeCreation: "DRESSE",
  statut: "VALIDE",
  dateStatut: 1380362400000,
  nature: "NAISSANCE",
  numero: "100",
  numeroBisTer: "552",
  nomOec: "MENARD",
  prenomOec: "MARC",
  dateDerniereDelivrance: 1390561200000,
  dateDerniereMaj: 1042887600000,
  visibiliteArchiviste: "MEAE",
  evenement: {
    minute: null,
    heure: null,
    jour: 7,
    mois: 12,
    annee: 2000,
    voie: null,
    ville: "Tijuana",
    arrondissement: null,
    region: "Basse-Californie",
    pays: "Mexique",
    lieuReprise: null
  },
  mentions: [
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834430e",
      numeroOrdre: 1,
      numeroOrdreExtrait: 3,
      villeApposition: "Tananarive",
      regionApposition: "region apposition",
      dateApposition: [2021, 3, 24],
      dateCreation: [2021, 3, 15],
      statut: "BROUILLON",
      dateStatut: 1618480800000,
      titulaires: [
        {
          ordre: 0,
          nom: "nom titulaire",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: ["prenom titulaire"]
        }
      ],
      typeMention: {
        codeType: "2",
        libelleType:
          "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
        codeSousType: "2-1-a",
        libelleSousType: "Divorce en France",
        estActif: true,
        modeInformatisation: "OUI",
        nature: {
          id: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
          nom: "NATURE_MENTION",
          code: "5",
          libelle: "Divorce",
          estActif: true,
          opposableAuTiers: true
        }
      },
      autoriteEtatCivil: {
        libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
        nomOEC: "nom OEC",
        prenomOEC: "prenom OEC"
      },
      evenement: {
        minute: null,
        heure: null,
        jour: 15,
        mois: 6,
        annee: 2021,
        voie: null,
        ville: "nantes",
        arrondissement: null,
        region: "Pays de Loire",
        pays: "FRANCE",
        lieuReprise: null
      },
      textes: {
        texteMention:
          "Mariée MENTION UNE à Tananarive 1er arr. (Madagascar) le 27 septembre 2001 avec AMINA HAMADI MRIKAOU. Acte transcrit au Consulat Général de France à Tananarive sous le n° 2001/1546. Nantes, le 7 décembre 2001. L'officier de l'état civil, Hanima KAMARIA ABDALLAH#Divorcée de AMINA HAMADI MRIKAOU par arrêt du Tribunal Supérieur d'Appel de Mamoudzou (Mayotte) rendu le 4 novembre 2008.",
        texteApposition: null,
        texteOEC: null,
        texteMentionDelivrance: null,
        texteMentionPlurilingue: null
      }
    },
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834430d",
      numeroOrdre: 1,
      numeroOrdreExtrait: 2,
      villeApposition: "Tananarive",
      regionApposition: "region apposition",
      dateApposition: [2021, 3, 24],
      dateCreation: [2021, 3, 15],
      statut: "BROUILLON",
      dateStatut: 1618480800000,
      titulaires: [
        {
          ordre: 0,
          nom: "nom titulaire",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: ["prenom titulaire"]
        }
      ],
      typeMention: {
        codeType: "3",
        libelleType:
          "Enregistrement/Modification/Dissolution/Annulation du PACS",
        codeSousType: "3-1",
        libelleSousType: "Enregistrement du PACS",
        estActif: true,
        modeInformatisation: "OUI",
        nature: {
          id: "b03cd99d-3422-4d70-98b5-7da12277e179",
          nom: "NATURE_MENTION",
          code: "2",
          libelle: "PACS, mariage",
          estActif: true,
          opposableAuTiers: true
        }
      },
      autoriteEtatCivil: {
        libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
        nomOEC: "nom OEC",
        prenomOEC: "prenom OEC"
      },
      evenement: {
        minute: null,
        heure: null,
        jour: 15,
        mois: 6,
        annee: 2021,
        voie: null,
        ville: "nantes",
        arrondissement: null,
        region: "Pays de Loire",
        pays: "FRANCE",
        lieuReprise: null
      },
      textes: {
        texteMention:
          "Mariée MENTION UNE à Tananarive 1er arr. (Madagascar) le 27 septembre 2001 avec AMINA HAMADI MRIKAOU. Acte transcrit au Consulat Général de France à Tananarive sous le n° 2001/1546. Nantes, le 7 décembre 2001. L'officier de l'état civil, Hanima KAMARIA ABDALLAH#Divorcée de AMINA HAMADI MRIKAOU par arrêt du Tribunal Supérieur d'Appel de Mamoudzou (Mayotte) rendu le 4 novembre 2008. Nantes, le 13 juillet 2010. L'officier de l'état civil, Mkoufoundi AMINA MOHAMED Mariée à Mamoudzou (Mayotte) le 19 mai 2012 avec Ouri ATTUA BOINA.",
        texteApposition: "Nantes, le 25 juin 2012",
        texteOEC: "L'officier de l'état civil, Zahabia ANTOY MOHAMED",
        texteMentionDelivrance: null,
        texteMentionPlurilingue: null
      }
    }
  ],
  titulaires: [
    {
      nom: "PAPADOPOULOS",
      prenoms: ["Ronna"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 796,
      sexe: "FEMININ",
      naissance: {
        minute: null,
        heure: null,
        jour: 10,
        mois: 7,
        annee: 1965,
        voie: null,
        ville: "Skopje",
        arrondissement: null,
        region: "Skopje",
        pays: "République de Macédoine",
        lieuReprise: null
      },
      profession: "VENDEUR",
      age: null,
      domicile: {
        voie: "7 Rue du Noyer",
        ville: "Bruxelles",
        arrondissement: null,
        region: "Flandre",
        pays: "BELGIQUE"
      },
      filiations: [
        {
          lienParente: "PARENT",
          ordre: 752,
          nom: "De La Vega",
          sexe: "MASCULIN",
          naissance: null,
          profession: "Scrum Master",
          age: null,
          domicile: {
            voie: "La belle Hacienda",
            ville: "Mexico",
            arrondissement: null,
            region: null,
            pays: "Mexique"
          },
          prenoms: ["Diego"]
        },
        {
          lienParente: "PARENT",
          ordre: 752,
          nom: "De La Vega",
          sexe: "FEMININ",
          naissance: null,
          profession: "CHIMISTE",
          age: null,
          domicile: {
            voie: "50 route d'amboli",
            ville: "Djibouti",
            arrondissement: null,
            region: null,
            pays: "DJIBOUTI"
          },
          prenoms: ["Madeleine"]
        }
      ],
      typeDeclarationConjointe: null,
      dateDeclarationConjointe: null,
      nomPartie1: null,
      nomPartie2: null,
      nomAvantMariage: null,
      nomApresMariage: null,
      nomDernierConjoint: null,
      prenomsDernierConjoint: null
    }
  ],
  piecesAnnexes: [],
  alerteActes: [],
  personnes: [
    {
      id: "e7114c51-d00d-48ad-bbee-af2b01e2da74",
      nom: "DUPOIRE",
      sexe: "MASCULIN",
      nationalite: "FRANCAISE",
      naissance: {
        minute: null,
        heure: null,
        jour: 13,
        mois: 8,
        annee: 1975,
        voie: null,
        ville: "Calais",
        arrondissement: null,
        region: "Pas-de-Calais",
        pays: "France",
        lieuReprise: null
      },
      autresNoms: [
        {
          nom: "Duris",
          type: "ANCIEN_NOM"
        }
      ],
      prenoms: ["Michel-Paul"],
      autresPrenoms: [],
      parents: [],
      enfants: [],
      rcs: [],
      rcas: [],
      pacss: [],
      actes: [
        {
          id: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
          numero: "100",
          statut: null,
          nature: "NAISSANCE"
        },
        {
          id: "b41079a0-9e8d-478c-b04c-c4c2ac17134f",
          numero: "413",
          statut: null,
          nature: "NAISSANCE"
        }
      ]
    }
  ],
  estReecrit: null,
  detailMariage: null,
  registre: {
    id: "7a777e9b-ecc3-4c62-b80d-a017bfa335b5",
    famille: "PAC",
    pocopa: "ORAN",
    annee: 2010,
    support1: "support 1",
    support2: "support 2",
    numeroDernierActe: "4564",
    pvOuverture: "pv_ouverture",
    dateOuverture: [1950, 11, 21],
    pvFermeture: "pv_fermeture",
    dateFermeture: [1981, 9, 21],
    decret2017: false,
    type: {
      id: "658d9694-1e12-486c-a36d-da1aeb2a29b3",
      famille: "MAR",
      pocopa: "pocopa",
      paysPocopa: "ARGENTINE",
      dateRattachement: [1999, 9, 23],
      dateTransfertScec: [1974, 2, 14],
      gereScec: false,
      estOuvert: false,
      description: ""
    }
  },
  motifAnnulation: "",
  dateInitialisationprojet: null,
  numeroProjet: "c3",
  corpsExtraitRectifications: [],
  corpsImage: null,
  analyseMarginales: [
    {
      dateDebut: 1608980400000,
      dateFin: 1734649200000,
      nomOec: "Lens",
      prenomOec: "Alexis",
      motifModification: "CHANGEMENT_PRENOM",
      titulaires: [
        {
          nom: "Barros",
          prenoms: ["Renan1", "Araujo", "Goncalves"],
          autresNoms: null,
          autresPrenoms: null,
          ordre: 1,
          sexe: null,
          naissance: null,
          profession: null,
          age: null,
          domicile: null,
          filiations: null,
          typeDeclarationConjointe: null,
          dateDeclarationConjointe: null,
          nomPartie1: null,
          nomPartie2: null,
          nomAvantMariage: null,
          nomApresMariage: null,
          nomDernierConjoint: null,
          prenomsDernierConjoint: null
        },
        {
          nom: "Sousa",
          prenoms: ["Rodrigo3", "Melo"],
          autresNoms: null,
          autresPrenoms: null,
          ordre: 3,
          sexe: null,
          naissance: null,
          profession: null,
          age: null,
          domicile: null,
          filiations: null,
          typeDeclarationConjointe: null,
          dateDeclarationConjointe: null,
          nomPartie1: null,
          nomPartie2: null,
          nomAvantMariage: null,
          nomApresMariage: null,
          nomDernierConjoint: null,
          prenomsDernierConjoint: null
        },
        {
          nom: "Schlosser",
          prenoms: ["Cassandra2", "Clara", "Angela"],
          autresNoms: null,
          autresPrenoms: null,
          ordre: 2,
          sexe: null,
          naissance: null,
          profession: null,
          age: null,
          domicile: null,
          filiations: null,
          typeDeclarationConjointe: null,
          dateDeclarationConjointe: null,
          nomPartie1: null,
          nomPartie2: null,
          nomAvantMariage: null,
          nomApresMariage: null,
          nomDernierConjoint: null,
          prenomsDernierConjoint: null
        }
      ]
    },
    {
      dateDebut: 1574766000000,
      dateFin: 1608850800000,
      nomOec: "Lens",
      prenomOec: "Alexis",
      motifModification: "CHANGEMENT_PRENOM",
      titulaires: [
        {
          nom: "Javel",
          prenoms: ["Aude", "Adèle"],
          autresNoms: null,
          autresPrenoms: null,
          ordre: 1,
          sexe: null,
          naissance: null,
          profession: null,
          age: null,
          domicile: null,
          filiations: null,
          typeDeclarationConjointe: null,
          dateDeclarationConjointe: null,
          nomPartie1: null,
          nomPartie2: null,
          nomAvantMariage: null,
          nomApresMariage: null,
          nomDernierConjoint: null,
          prenomsDernierConjoint: null
        }
      ]
    }
  ],
  type: "TEXTE"
};

export const acteNaissance: any = {
  id: "19c0d767-64e5-4376-aa1f-6d781a2a235e",
  dateInitialisation: 1405980000,
  dateCreation: 1256943600,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200,
  nature: "NAISSANCE",
  numero: "410",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800,
  dateDerniereMaj: 1536357600,
  visibiliteArchiviste: "ANOM",
  registre: {
    id: "a41079a5-9e8d-478c-b04c-c4c2ac67134f",
    type: {
      id: "a41079a5-9e8d-478c-b14c-c4c2ac67134f"
    },
    famille: "CSL",
    pocopa: "DX",
    support1: "NA",
    support2: "T"
  },
  evenement: {
    minute: 54,
    heure: 13,
    jour: 31,
    mois: 3,
    annee: 1921,
    voie: "",
    ville: "Kanpur",
    arrondissement: "",
    region: "Uttar Pradesh",
    pays: "Inde"
  },
  mentions: [],
  titulaires: [
    {
      nom: "Greenwald",
      prenoms: ["Paulita", "Zaria"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 1,
      sexe: "FEMININ",
      profession: "DEVELOPPEUR",
      naissance: {
        minute: null,
        heure: null,
        jour: 10,
        mois: 10,
        annee: 1901,
        pays: "France",
        region: "Provence-Alpes-Côte d’Azur",
        ville: "Marseille",
        arrondissement: "10",
        voie: ""
      },
      domicile: {
        pays: "DJIBOUTI",
        region: "",
        ville: "Djibouti",
        arrondissement: null,
        voie: "Ilot du Héron"
      },
      filiation: {
        domicile: {
          pays: "BELGIQUE",
          region: "Flandre",
          ville: "Bruxelles",
          arrondissement: null,
          voie: "7 Rue du Nyer"
        },
        naissance: null,
        nom: "Washington",
        ordre: 1,
        prenoms: ["Jsandye"],
        profession: "Livreur",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    },
    {
      nom: "DUPe",
      prenoms: ["LaurenT"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 2,
      sexe: "MASCULIN",
      profession: "POMPIER",
      naissance: {
        minute: null,
        heure: null,
        jour: 30,
        mois: 3,
        annee: 1948,
        pays: "France",
        region: "Saint-Pierre-et-Miquelon",
        ville: "Saint-Pierre",
        arrondissement: "",
        voie: ""
      },
      domicile: {
        pays: "BELGIQUE",
        region: "Flandre",
        ville: "Bruxelles2",
        arrondissement: null,
        voie: "7 Rue du Noyer"
      },
      filiation: {
        domicile: {
          pays: "DJIBOUTI",
          region: "",
          ville: "Djibouti",
          arrondissement: null,
          voie: "16 avenue des Palmiers"
        },
        naissance: null,
        nom: "Sacken",
        ordre: 1,
        prenoms: ["Carmela", "Linzy"],
        profession: "Informaticien",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    }
  ],
  piecesAnnexes: [
    {
      nom: "DOC2",
      type: "pdf"
    }
  ],
  alerteActes: [],
  personnes: [{ prenom: "Laurent", nom: "Dupe" }],
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
      texte: "corps d'acte4",
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

export const acteMariage: any = {
  id: "b41079a5-9e8d-478c-b04c-c4c2ac671348",
  dateInitialisation: 1405980000,
  dateCreation: 1256943600,
  modeCreation: "DRESSE",
  statut: "ANNULE",
  dateStatut: 1045609200,
  nature: new NatureActe("Mariage"),
  numero: "410",
  numeroBisTer: "681",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413928800,
  dateDerniereMaj: 1536357600,
  visibiliteArchiviste: "ANOM",
  registre: {
    id: "a41079a5-9e8d-478c-b04c-c4c2ac67134f",
    type: {
      id: "a41079a5-9e8d-478c-b14c-c4c2ac67134f"
    },
    famille: "CSL",
    pocopa: "DX",
    support1: "NA",
    support2: "T"
  },
  evenement: {
    minute: 54,
    heure: 13,
    jour: 31,
    mois: 3,
    annee: 1921,
    voie: "",
    ville: "Kanpur",
    arrondissement: "",
    region: "Uttar Pradesh",
    pays: "Inde"
  },
  mentions: [
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834477a",
      numeroOrdre: 1,
      numeroOrdreExtrait: 0,
      villeApposition: "Tananarive",
      regionApposition: "region apposition",
      dateApposition: [2021, 3, 24],
      dateCreation: [2021, 3, 15],
      statut: "BROUILLON",
      dateStatut: 1618480800000,
      titulaires: [
        {
          ordre: 0,
          nom: "nom titulaire",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: ["prenom titulaire"]
        }
      ],
      typeMention: {
        codeType: "1",
        libelleType: "Mariage",
        codeSousType: "1-1",
        libelleSousType: "Mariage célébré en France (mairie)",
        estActif: true,
        modeInformatisation: "OUI",
        nature: {
          id: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
          nom: "NATURE_MENTION",
          code: "27",
          libelle: "Mariage",
          estActif: true,
          opposableAuTiers: false
        },
        natureActe: "NAISSANCE",
        estSousType: false
      },
      autoriteEtatCivil: {
        libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
        nomOEC: "nom OEC",
        prenomOEC: "prenom OEC"
      },
      evenement: {
        minute: null,
        heure: null,
        jour: 1,
        mois: 12,
        annee: 1978,
        voie: null,
        ville: "Rome",
        arrondissement: null,
        region: "Grand Rome",
        pays: "Italie",
        lieuReprise: null
      },
      textes: {
        texteMention: "Mariage",
        texteApposition: null,
        texteOEC: "texte OEC",
        texteMentionDelivrance: null,
        texteMentionPlurilingue: null
      }
    },
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834477b",
      numeroOrdre: 2,
      numeroOrdreExtrait: 0,
      villeApposition: "Tananarive",
      regionApposition: "region apposition",
      dateApposition: [2021, 3, 24],
      dateCreation: [2021, 3, 15],
      statut: "BROUILLON",
      dateStatut: 1618480800000,
      titulaires: [
        {
          ordre: 0,
          nom: "nom titulaire",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: ["prenom titulaire"]
        }
      ],
      typeMention: {
        codeType: "33",
        libelleType: "Répertoire civil ",
        codeSousType: "33-1",
        libelleSousType: "Inscription au répertoire civil ",
        estActif: true,
        modeInformatisation: "OUI",
        nature: {
          id: "b03cdc6e-c77f-47a6-bc51-25b52ad7674e",
          nom: "NATURE_MENTION",
          code: "21",
          libelle: "RC",
          estActif: true,
          opposableAuTiers: true
        },
        natureActe: "NAISSANCE",
        estSousType: true
      },
      autoriteEtatCivil: {
        libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
        nomOEC: "nom OEC",
        prenomOEC: "prenom OEC"
      },
      evenement: {
        minute: null,
        heure: null,
        jour: 27,
        mois: 12,
        annee: 1978,
        voie: null,
        ville: "Rome",
        arrondissement: null,
        region: "Grand Rome",
        pays: "Italie",
        lieuReprise: null
      },
      textes: {
        texteMention: "RC",
        texteApposition: null,
        texteOEC: "texte OEC",
        texteMentionDelivrance: null,
        texteMentionPlurilingue: null
      }
    },
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834477c",
      numeroOrdre: 3,
      numeroOrdreExtrait: 0,
      villeApposition: "Tananarive",
      regionApposition: "region apposition",
      dateApposition: [2021, 3, 24],
      dateCreation: [2021, 3, 15],
      statut: "BROUILLON",
      dateStatut: 1618480800000,
      titulaires: [
        {
          ordre: 0,
          nom: "nom titulaire",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: ["prenom titulaire"]
        }
      ],
      typeMention: {
        codeType: "33",
        libelleType: "Répertoire civil ",
        codeSousType: "33-2",
        libelleSousType: "Radiation d'une inscription au répertoire civil",
        estActif: true,
        modeInformatisation: "OUI",
        nature: {
          id: "b03c5f7f-2ad5-4f55-8599-6192dd6f126e",
          nom: "NATURE_MENTION",
          code: "22",
          libelle: "RC radié",
          estActif: true,
          opposableAuTiers: false
        },
        natureActe: "NAISSANCE",
        estSousType: true
      },
      autoriteEtatCivil: {
        libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
        nomOEC: "nom OEC",
        prenomOEC: "prenom OEC"
      },
      evenement: {
        minute: null,
        heure: null,
        jour: 1,
        mois: 12,
        annee: 1978,
        voie: null,
        ville: "Rome",
        arrondissement: null,
        region: "Grand Rome",
        pays: "Italie",
        lieuReprise: null
      },
      textes: {
        texteMention: "RC Radie",
        texteApposition: null,
        texteOEC: "texte OEC",
        texteMentionDelivrance: null,
        texteMentionPlurilingue: null
      }
    },
    {
      id: "1a0aa3be-8311-465d-b750-d4c19834477d",
      numeroOrdre: 4,
      numeroOrdreExtrait: 0,
      villeApposition: "Tananarive",
      regionApposition: "region apposition",
      dateApposition: [2021, 3, 24],
      dateCreation: [2021, 3, 15],
      statut: "BROUILLON",
      dateStatut: 1618480800000,
      titulaires: [
        {
          ordre: 0,
          nom: "nom titulaire",
          sexe: "MASCULIN",
          nationalite: "FRANCAISE",
          prenoms: ["prenom titulaire"]
        }
      ],
      typeMention: {
        codeType: "2",
        libelleType:
          "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
        codeSousType: "2-6-a",
        libelleSousType: "Divorce à l'étranger",
        estActif: true,
        modeInformatisation: "OUI",
        nature: {
          id: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
          nom: "NATURE_MENTION",
          code: "5",
          libelle: "Divorce",
          estActif: true,
          opposableAuTiers: true
        },
        natureActe: "NAISSANCE",
        estSousType: false
      },
      autoriteEtatCivil: {
        libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
        nomOEC: "nom OEC",
        prenomOEC: "prenom OEC"
      },
      evenement: {
        minute: null,
        heure: null,
        jour: 27,
        mois: 12,
        annee: 1978,
        voie: null,
        ville: "Rome",
        arrondissement: null,
        region: "Grand Rome",
        pays: "Italie",
        lieuReprise: null
      },
      textes: {
        texteMention: "Divorce",
        texteApposition: null,
        texteOEC: "texte OEC",
        texteMentionDelivrance: null,
        texteMentionPlurilingue: null
      }
    }
  ],
  titulaires: [
    {
      nom: "Greenwald",
      prenoms: ["Paulita", "Zaria"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 1,
      sexe: "FEMININ",
      profession: "DEVELOPPEUR",
      naissance: {
        minute: null,
        heure: null,
        jour: 10,
        mois: 10,
        annee: 1901,
        pays: "France",
        region: "Provence-Alpes-Côte d’Azur",
        ville: "Marseille",
        arrondissement: "10",
        voie: ""
      },
      domicile: {
        pays: "DJIBOUTI",
        region: "",
        ville: "Djibouti",
        arrondissement: null,
        voie: "Ilot du Héron"
      },
      filiation: {
        domicile: {
          pays: "BELGIQUE",
          region: "Flandre",
          ville: "Bruxelles",
          arrondissement: null,
          voie: "7 Rue du Nyer"
        },
        naissance: null,
        nom: "Washington",
        ordre: 1,
        prenoms: ["Jsandye"],
        profession: "Livreur",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    },
    {
      nom: "DUPe",
      prenoms: ["LaurenT"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 2,
      sexe: "MASCULIN",
      profession: "POMPIER",
      naissance: {
        minute: null,
        heure: null,
        jour: 30,
        mois: 3,
        annee: 1948,
        pays: "France",
        region: "Saint-Pierre-et-Miquelon",
        ville: "Saint-Pierre",
        arrondissement: "",
        voie: ""
      },
      domicile: {
        pays: "BELGIQUE",
        region: "Flandre",
        ville: "Bruxelles2",
        arrondissement: null,
        voie: "7 Rue du Noyer"
      },
      filiation: {
        domicile: {
          pays: "DJIBOUTI",
          region: "",
          ville: "Djibouti",
          arrondissement: null,
          voie: "16 avenue des Palmiers"
        },
        naissance: null,
        nom: "Sacken",
        ordre: 1,
        prenoms: ["Carmela", "Linzy"],
        profession: "Informaticien",
        sexe: "MASCULIN",
        type: "PARENT"
      }
    }
  ],
  piecesAnnexes: [
    {
      nom: "DOC2",
      type: "pdf"
    }
  ],
  alerteActes: [],
  personnes: [{ prenom: "Laurent", nom: "Dupe" }],
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
      texte: "corps d'acte4",
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

export const acteNationalite = {
  id: "b41079a5-9e8d-478c-b04c-c4c2ac67134a",
  dateInitialisation: null,
  dateCreation: 1256986800000,
  modeCreation: "DRESSE",
  statut: "VALIDE",
  dateStatut: 1045652400000,
  nature: "NAISSANCE",
  numero: "8011",
  numeroBisTer: "681ABC",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413972000000,
  dateDerniereMaj: 1536400800000,
  visibiliteArchiviste: "NON",
  evenement: {
    minute: null,
    heure: null,
    jour: 25,
    mois: 6,
    annee: 1990,
    voie: null,
    ville: "Barcelone",
    arrondissement: null,
    region: "Catalogne",
    pays: "Espagne",
    lieuReprise: null
  },
  mentions: [],
  titulaires: [
    {
      nom: "PHILIPS",
      prenoms: ["Yann"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 729,
      sexe: "FEMININ",
      naissance: {
        minute: null,
        heure: null,
        jour: 13,
        mois: 4,
        annee: 1980,
        voie: null,
        ville: "Barcelone",
        arrondissement: null,
        region: "Catalogne",
        pays: "Espagne",
        lieuReprise: null
      },
      profession: "POMPIER",
      age: null,
      domicile: {
        voie: "7 Rue du Noyer",
        ville: "Bruxelles",
        arrondissement: null,
        region: "Flandre",
        pays: "BELGIQUE"
      },
      filiations: [
        {
          lienParente: "PARENT",
          ordre: 752,
          nom: "Sacken",
          sexe: "MASCULIN",
          naissance: null,
          profession: "Informaticien",
          age: null,
          domicile: {
            voie: "16 avenue des Palmiers",
            ville: "Djibouti",
            arrondissement: null,
            region: null,
            pays: "DJIBOUTI"
          },
          prenoms: ["Carmela", "Linzy"]
        }
      ],
      typeDeclarationConjointe: null,
      dateDeclarationConjointe: null,
      nomPartie1: null,
      nomPartie2: null,
      nomAvantMariage: null,
      nomApresMariage: null,
      nomDernierConjoint: null,
      prenomsDernierConjoint: null
    }
  ],
  piecesAnnexes: [],
  alerteActes: [],
  personnes: [
    {
      id: "e7114c50-d00d-48ad-bbee-af2b01e2da8a",
      nom: "Philips",
      sexe: "MASCULIN",
      nationalite: "ETRANGERE",
      naissance: {
        minute: null,
        heure: null,
        jour: 13,
        mois: 4,
        annee: 1980,
        voie: null,
        ville: "Barcelone",
        arrondissement: null,
        region: "Catalogne",
        pays: "Espagne",
        lieuReprise: null
      },
      autresNoms: [],
      prenoms: ["Yann"],
      autresPrenoms: [],
      parents: [],
      enfants: [],
      rcs: [],
      rcas: [],
      pacss: [],
      actes: [
        {
          id: "b41079a5-9e8d-478c-b04c-c4c2ac67134a",
          numero: "8011",
          statut: null,
          nature: "NAISSANCE"
        }
      ]
    }
  ],
  estReecrit: true,
  detailMariage: null,
  registre: {
    id: "e60432a7-7fb1-41d9-b6ad-a01fffbd223b",
    famille: "ACQ",
    pocopa: "X",
    annee: 1951,
    support1: "1",
    support2: null,
    numeroDernierActe: "4564",
    pvOuverture: "pv_ouverture",
    dateOuverture: [1995, 12, 25],
    pvFermeture: "pv_fermeture",
    dateFermeture: [1990, 1, 20],
    decret2017: null,
    type: {
      id: "d5f36d96-f1f8-437e-8371-86dba9837339",
      famille: "ACQ",
      pocopa: "TUNIS",
      paysPocopa: "TUNISIE",
      dateRattachement: [1993, 6, 6],
      dateTransfertScec: [1969, 2, 16],
      gereScec: true,
      estOuvert: true,
      description: ""
    }
  },
  motifAnnulation: "motif annulation",
  dateInitialisationprojet: null,
  numeroProjet: "a10",
  corpsExtraitRectifications: [],
  corpsImage: {
    id: "c41b59e3-a5bf-45dd-aeec-34d0eed12dda",
    idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134a",
    dateCreationActe: 1256986800000,
    numeroActe: "8011",
    images: [
      {
        idActeImage: "6bd6dd86-1b40-4af1-b885-67163dceae1a",
        pathFichier: "actes\\L2_I00009_2.tif",
        conteneur: "actes_image",
        fichier: "L2_I00009_2.tif",
        noPage: 1,
        statutRepriseImageActe: "A_REPRENDRE",
        dateDerniereTentative: null,
        messageErreurDerniereTentative: null,
        contenu: null
      }
    ],
    natureActe: "NAISSANCE"
  },
  corpsTexte: {
    id: "923a10fb-0b15-452d-83c0-d24c76d1d19e",
    texte:
      "ACTE DE NAISSANCE\nDe Hung AGANGNI\nNom : AGANGNI\nPrénom : Hung\nSexe : féminin\nnée le : vingt cinq février mil neuf cent soixante six\nà : Khang-Hung (Vietnam)\nNom du père : AGANGNI\nPrénoms : Giai, Pierre\nné le : 20 septembre 1932\nà : Bienne (Suisse)\nNom de la mère : CHANG\nPrénoms : Thach, Anh\nnée le : 26 aôut 1934\nà : Le Landeron (Suisse)\nson épouse\nAdresse : Ouri - 69380 CHASSELAY\nFrançaise par      : \nEffet de la déclaration souscrite par son père\nle 10 février 1967 sous l'identité de Salah BELLAGHA (dossier n° 62009 DR 67)\n\nActe établi par le Service Central de l'Etat Civil\n- Ministère des Affaires Etrangères - (Loi n°78-731 du 12 juillet 1978).\nPar Nous, Manh TSAN, Officier de l'Etat Civil.\nNantes, le 23 février 1993 "
  },
  analyseMarginales: [
    {
      id: "1ec56ede-ab6f-468a-afa7-61e64147b891",
      dateDebut: 1605006000000,
      dateFin: null,
      nomOec: "Lens",
      prenomOec: "Alexis",
      motifModification: "FRANCISATION_NOM_PRENOM",
      titulaires: [
        {
          nom: "PRODESK",
          prenoms: ["Elodie", "Margaux", "Sara"],
          autresNoms: null,
          autresPrenoms: null,
          ordre: 1,
          sexe: null,
          naissance: null,
          profession: null,
          age: null,
          domicile: null,
          filiations: null,
          typeDeclarationConjointe: null,
          dateDeclarationConjointe: null,
          nomPartie1: null,
          nomPartie2: null,
          nomAvantMariage: null,
          nomApresMariage: null,
          nomDernierConjoint: null,
          prenomsDernierConjoint: null
        }
      ]
    }
  ],
  type: "TEXTE"
};

export const acteDeces = {
  id: "b41079a5-9e8d-478c-b04c-c4c2ac67134a",
  dateInitialisation: null,
  dateCreation: 1256986800000,
  modeCreation: "DRESSE",
  statut: "VALIDE",
  dateStatut: 1045652400000,
  nature: NatureActe.DECES,
  numero: "8011",
  numeroBisTer: "681ABC",
  nomOec: "MARTIN",
  prenomOec: "JULIE",
  dateDerniereDelivrance: 1413972000000,
  dateDerniereMaj: 1536400800000,
  visibiliteArchiviste: "NON",
  evenement: {
    minute: null,
    heure: null,
    jour: 25,
    mois: 6,
    annee: 1990,
    voie: null,
    ville: "Barcelone",
    arrondissement: null,
    region: "Catalogne",
    pays: "Espagne",
    lieuReprise: null
  },
  mentions: [],
  titulaires: [
    {
      nom: "PHILIPS",
      prenoms: ["Yann"],
      autresNoms: null,
      autresPrenoms: null,
      ordre: 729,
      sexe: "FEMININ",
      naissance: {
        minute: null,
        heure: null,
        jour: 13,
        mois: 4,
        annee: 1980,
        voie: null,
        ville: "Barcelone",
        arrondissement: null,
        region: "Catalogne",
        pays: "Espagne",
        lieuReprise: null
      },
      profession: "POMPIER",
      age: null,
      domicile: {
        voie: "7 Rue du Noyer",
        ville: "Bruxelles",
        arrondissement: null,
        region: "Flandre",
        pays: "BELGIQUE"
      },
      filiations: [
        {
          lienParente: "PARENT",
          ordre: 752,
          nom: "Sacken",
          sexe: "MASCULIN",
          naissance: null,
          profession: "Informaticien",
          age: null,
          domicile: {
            voie: "16 avenue des Palmiers",
            ville: "Djibouti",
            arrondissement: null,
            region: null,
            pays: "DJIBOUTI"
          },
          prenoms: ["Carmela", "Linzy"]
        }
      ],
      typeDeclarationConjointe: null,
      dateDeclarationConjointe: null,
      nomPartie1: null,
      nomPartie2: null,
      nomAvantMariage: null,
      nomApresMariage: null,
      nomDernierConjoint: null,
      prenomsDernierConjoint: null
    }
  ],
  piecesAnnexes: [],
  alerteActes: [],
  personnes: [
    {
      id: "e7114c50-d00d-48ad-bbee-af2b01e2da8a",
      nom: "Philips",
      sexe: "MASCULIN",
      nationalite: "ETRANGERE",
      naissance: {
        minute: null,
        heure: null,
        jour: 13,
        mois: 4,
        annee: 1980,
        voie: null,
        ville: "Barcelone",
        arrondissement: null,
        region: "Catalogne",
        pays: "Espagne",
        lieuReprise: null
      },
      autresNoms: [],
      prenoms: ["Yann"],
      autresPrenoms: [],
      parents: [],
      enfants: [],
      rcs: [],
      rcas: [],
      pacss: [],
      actes: [
        {
          id: "b41079a5-9e8d-478c-b04c-c4c2ac67134a",
          numero: "8011",
          statut: null,
          nature: "NAISSANCE"
        }
      ]
    }
  ],
  estReecrit: true,
  detailMariage: null,
  registre: {
    id: "e60432a7-7fb1-41d9-b6ad-a01fffbd223b",
    famille: "ACQ",
    pocopa: "X",
    annee: 1951,
    support1: "1",
    support2: null,
    numeroDernierActe: "4564",
    pvOuverture: "pv_ouverture",
    dateOuverture: [1995, 12, 25],
    pvFermeture: "pv_fermeture",
    dateFermeture: [1990, 1, 20],
    decret2017: null,
    type: {
      id: "d5f36d96-f1f8-437e-8371-86dba9837339",
      famille: "ACQ",
      pocopa: "TUNIS",
      paysPocopa: "TUNISIE",
      dateRattachement: [1993, 6, 6],
      dateTransfertScec: [1969, 2, 16],
      gereScec: true,
      estOuvert: true,
      description: ""
    }
  },
  motifAnnulation: "motif annulation",
  dateInitialisationprojet: null,
  numeroProjet: "a10",
  corpsExtraitRectifications: [],
  corpsImage: {
    id: "c41b59e3-a5bf-45dd-aeec-34d0eed12dda",
    idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134a",
    dateCreationActe: 1256986800000,
    numeroActe: "8011",
    images: [
      {
        idActeImage: "6bd6dd86-1b40-4af1-b885-67163dceae1a",
        pathFichier: "actes\\L2_I00009_2.tif",
        conteneur: "actes_image",
        fichier: "L2_I00009_2.tif",
        noPage: 1,
        statutRepriseImageActe: "A_REPRENDRE",
        dateDerniereTentative: null,
        messageErreurDerniereTentative: null,
        contenu: null
      }
    ],
    natureActe: "NAISSANCE"
  },
  corpsTexte: {
    id: "923a10fb-0b15-452d-83c0-d24c76d1d19e",
    texte:
      "ACTE DE NAISSANCE\nDe Hung AGANGNI\nNom : AGANGNI\nPrénom : Hung\nSexe : féminin\nnée le : vingt cinq février mil neuf cent soixante six\nà : Khang-Hung (Vietnam)\nNom du père : AGANGNI\nPrénoms : Giai, Pierre\nné le : 20 septembre 1932\nà : Bienne (Suisse)\nNom de la mère : CHANG\nPrénoms : Thach, Anh\nnée le : 26 aôut 1934\nà : Le Landeron (Suisse)\nson épouse\nAdresse : Ouri - 69380 CHASSELAY\nFrançaise par      : \nEffet de la déclaration souscrite par son père\nle 10 février 1967 sous l'identité de Salah BELLAGHA (dossier n° 62009 DR 67)\n\nActe établi par le Service Central de l'Etat Civil\n- Ministère des Affaires Etrangères - (Loi n°78-731 du 12 juillet 1978).\nPar Nous, Manh TSAN, Officier de l'Etat Civil.\nNantes, le 23 février 1993 "
  },
  analyseMarginales: [],
  type: "TEXTE"
};
