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
