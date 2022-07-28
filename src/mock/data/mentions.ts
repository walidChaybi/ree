import { NatureMention } from "../../model/etatcivil/enum/NatureMention";
import { IMentionAffichage } from "../../views/pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";

export const mentions = [
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
      texteMention: "Première mention",
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
      libelleType: "Enregistrement/Modification/Dissolution/Annulation du PACS",
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
      texteMention: "Deuxième mention",
      texteApposition: "Nantes, le 25 juin 2012",
      texteOEC: "L'officier de l'état civil, Zahabia ANTOY MOHAMED",
      texteMentionDelivrance: null,
      texteMentionPlurilingue: null
    }
  }
];

const natureChangementDeSexe = {
  libelle: "Changement de sexe",
  code: "11",
  categorie: "",
  estActif: true,
  opposableAuTiers: false
} as NatureMention;

const natureAnnulationmariage = {
  libelle: "Annulation de mariage",
  code: "15",
  categorie: "",
  estActif: true,
  opposableAuTiers: false
} as NatureMention;

export const mentionsAffichage: IMentionAffichage[] = [
  {
    nature: natureChangementDeSexe,
    texte: "ytutyu",
    estPresent: true,
    id: "e31a9791-fbf1-4418-8ede-1520bb1d85a5",
    numeroOrdre: 1,
    aPoubelle: true
  },
  {
    nature: natureAnnulationmariage,
    texte:
      "Mariée MENTION UNE à Tananarive 1er arr. (Madagascar) le 27 septembre 2001 avec AMINA HAMADI MRIKAOU. Acte transcrit au Consulat Général de France à Tananarive sous le n° 2001/1546. Nantes, le 7 décembre 2001. L'officier de l'état civil, Hanima KAMARIA ABDALLAH#Divorcée de AMINA HAMADI MRIKAOU par arrêt du Tribunal Supérieur d'Appel de Mamoudzou (Mayotte) rendu le 4 novembre 2008. Nantes, le 13 juillet 2010. L'officier de l'état civil, Mkoufoundi AMINA MOHAMED Mariée à Mamoudzou (Mayotte) le 19 mai 2012 avec Ouri ATTUA BOINA. Nantes, le 25 juin 2012",
    estPresent: true,
    id: "1a0aa3be-8311-465d-b750-d4c19834430d",
    numeroOrdre: 2,
    aPoubelle: false
  },
  {
    nature: natureChangementDeSexe,
    texte: "yiuo",
    estPresent: true,
    id: "e315b68d-f43c-4111-9e67-504762161189",
    numeroOrdre: 3,
    aPoubelle: true
  }
];

export const mentionsApi = [
  {
    id: "e31a9791-fbf1-4418-8ede-1520bb1d85a5",
    numeroOrdre: null,
    numeroOrdreExtrait: 1,
    villeApposition: null,
    regionApposition: null,
    dateApposition: "1970-01-01T00:00:00.000Z",
    dateCreation: "1970-01-01T00:00:00.000Z",
    dateStatut: "2022-07-27T13:14:55.602Z",
    titulaires: [],
    typeMention: {
      codeType: "18",
      codeSousType: "18-3",
      libelleSousType: "Changement de sexe",
      estActif: true,
      modeInformatisation: "OUI",
      nature: natureChangementDeSexe,
      natureActe: {
        libelle: "Naissance"
      }
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
    },
    evenement: null,
    textes: {
      texteMention: null,
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: "ytutyu",
      texteMentionPlurilingue: null
    }
  },
  {
    id: "e315b68d-f43c-4111-9e67-504762161189",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: "1970-01-01T00:00:00.000Z",
    dateCreation: "1970-01-01T00:00:00.000Z",
    dateStatut: "2022-07-27T13:09:16.085Z",
    titulaires: [],
    typeMention: {
      codeType: "18",
      codeSousType: "18-3",
      libelleSousType: "Changement de sexe",
      estActif: true,
      modeInformatisation: "OUI",
      nature: natureChangementDeSexe,
      natureActe: {
        libelle: "Naissance"
      }
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
    },
    evenement: null,
    textes: {
      texteMention: null,
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: "yiuo",
      texteMentionPlurilingue: null
    }
  },
  {
    id: "1a0aa3be-8311-465d-b750-d4c19834430e",
    numeroOrdre: 1,
    numeroOrdreExtrait: 1,
    villeApposition: "Tananarive",
    regionApposition: "region apposition",
    dateApposition: "2021-03-23T23:00:00.000Z",
    dateCreation: "2021-03-14T23:00:00.000Z",
    dateStatut: "2021-04-15T10:00:00.000Z",
    titulaires: [
      {
        sexe: "MASCULIN",
        nationalite: "FRANCAISE"
      }
    ],
    typeMention: {
      codeType: "2",
      codeSousType: "2-1-a",
      libelleSousType: "Divorce en France",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        libelle: "Divorce",
        code: "5",
        categorie: "",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: {
        libelle: "Naissance"
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
      texteMention: null,
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
    dateApposition: "2021-03-23T23:00:00.000Z",
    dateCreation: "2021-03-14T23:00:00.000Z",
    dateStatut: "2021-04-15T10:00:00.000Z",
    titulaires: [
      {
        sexe: "MASCULIN",
        nationalite: "FRANCAISE"
      }
    ],
    typeMention: {
      codeType: "2",
      codeSousType: "2-99",
      libelleSousType: "Annulation de mariage - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: natureAnnulationmariage,
      natureActe: {
        libelle: "Naissance"
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
      texteMentionDelivrance:
        "Mariée MENTION UNE à Tananarive 1er arr. (Madagascar) le 27 septembre 2001 avec AMINA HAMADI MRIKAOU. Acte transcrit au Consulat Général de France à Tananarive sous le n° 2001/1546. Nantes, le 7 décembre 2001. L'officier de l'état civil, Hanima KAMARIA ABDALLAH#Divorcée de AMINA HAMADI MRIKAOU par arrêt du Tribunal Supérieur d'Appel de Mamoudzou (Mayotte) rendu le 4 novembre 2008. Nantes, le 13 juillet 2010. L'officier de l'état civil, Mkoufoundi AMINA MOHAMED Mariée à Mamoudzou (Mayotte) le 19 mai 2012 avec Ouri ATTUA BOINA. Nantes, le 25 juin 2012",
      texteMentionPlurilingue: null
    }
  }
];
