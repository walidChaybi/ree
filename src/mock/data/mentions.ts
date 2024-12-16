import { IMentionAffichage } from "@model/etatcivil/acte/mention/IMentionAffichage";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";

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
      idTypeMention: "0185f3c8-5f4c-4ea9-89e1-fb65fcb7b17f",
      libelleType: "2 Divorce/Séparation/Annulation mariage",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      typeMentionEnfantList: [
        {
          idTypeMention: "7adaa7f8-6228-4e25-87a1-d99f3b98371a",
          libelleType: "2-1 & 2-2 divorce/séparation de corps en France",
          natureActe: "NAISSANCE",
          affecteAnalyseMarginale: false,
          typeMentionEnfantList: [
            {
              idTypeMention: "b03c54ae-5130-4062-b7e4-34bed2de7989",
              libelleType: "2-1 notarié",
              natureActe: "NAISSANCE",
              affecteAnalyseMarginale: false,
              idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9"
            },
            {
              idTypeMention: "96189dcf-69f9-41d2-8039-26476b82ee01",
              libelleType: "2-2 judiciaire",
              natureActe: "NAISSANCE",
              affecteAnalyseMarginale: false,
              idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9"
            }
          ]
        },
        {
          idTypeMention: "b03ca46d-592e-4e45-a7b0-39f0f3664ffb",
          libelleType: "2-3 divorce/séparation de corps avec exequatur",
          natureActe: "NAISSANCE",
          affecteAnalyseMarginale: false,
          idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9"
        },
        {
          idTypeMention: "5f562b8d-0d26-4c55-8311-040ed70c0e15",
          libelleType: "2-6 & 2-7 divorce/séparation de corps à l'étranger",
          natureActe: "NAISSANCE",
          affecteAnalyseMarginale: false,
          typeMentionEnfantList: [
            {
              idTypeMention: "7adec958-a42a-4fbd-918b-c6892b0b5180",
              libelleType: "2-7 V.O",
              natureActe: "NAISSANCE",
              affecteAnalyseMarginale: false,
              idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9"
            },
            {
              idTypeMention: "b03c0e79-da22-44ef-8256-5276631662b3",
              libelleType: "2-6 dans l'U.E.",
              natureActe: "NAISSANCE",
              affecteAnalyseMarginale: false,
              idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9"
            }
          ]
        },
        {
          idTypeMention: "b03c481e-1cfd-4a3e-8ad5-005975951876",
          libelleType: "2-8 annulation de mariage",
          natureActe: "NAISSANCE",
          affecteAnalyseMarginale: false,
          idNatureMention: "b03cd289-503f-4c98-8d12-0dffd9c51178"
        },
        {
          idTypeMention: "b04835d7-880e-45f2-9947-da18dd3237de",
          libelleType: "2-9 reprise de la vie commune",
          natureActe: "NAISSANCE",
          affecteAnalyseMarginale: false,
          idNatureMention: "b03cd7cf-b9e2-4ddc-b039-87f1ab2fadb7",
          typeMentionEnfantList: [
            {
              idTypeMention: "3d62029f-8c16-48dc-bc25-941e7a5d27ac",
              libelleType: "2-9 OEC",
              natureActe: "NAISSANCE",
              affecteAnalyseMarginale: false,
              idNatureMention: "b03cd7cf-b9e2-4ddc-b039-87f1ab2fadb7"
            },
            {
              idTypeMention: "2e3d768f-2eae-4dba-80fc-5b404c10b589",
              libelleType: "2-9 notaire",
              natureActe: "NAISSANCE",
              affecteAnalyseMarginale: false,
              idNatureMention: "b03cd7cf-b9e2-4ddc-b039-87f1ab2fadb7"
            }
          ]
        },
        {
          idTypeMention: "b048b66e-e0fa-4052-a63d-9111b442c3ee",
          libelleType: " divorce/séparation de corps - autres",
          natureActe: "NAISSANCE",
          affecteAnalyseMarginale: false,
          idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9"
        },
        {
          idTypeMention: "b0481430-4307-4dd9-a9af-d3c21cb6d8f4",
          libelleType: " annulation de mariage - autres",
          natureActe: "NAISSANCE",
          affecteAnalyseMarginale: false,
          idNatureMention: "b03cd289-503f-4c98-8d12-0dffd9c51178"
        }
      ]
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
      idTypeMention: "6cc65fb0-c6ac-43ef-8533-3469e7a88174",
      libelleType: "3-1 enregistrement en France",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "b03cd99d-3422-4d70-98b5-7da12277e179"
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
    estSupprimable: true,
    estModifiable: false
  },
  {
    nature: natureAnnulationmariage,
    texte:
      "Mariée MENTION UNE à Tananarive 1er arr. (Madagascar) le 27 septembre 2001 avec AMINA HAMADI MRIKAOU. Acte transcrit au Consulat Général de France à Tananarive sous le n° 2001/1546. Nantes, le 7 décembre 2001. L'officier de l'état civil, Hanima KAMARIA ABDALLAH#Divorcée de AMINA HAMADI MRIKAOU par arrêt du Tribunal Supérieur d'Appel de Mamoudzou (Mayotte) rendu le 4 novembre 2008. Nantes, le 13 juillet 2010. L'officier de l'état civil, Mkoufoundi AMINA MOHAMED Mariée à Mamoudzou (Mayotte) le 19 mai 2012 avec Ouri ATTUA BOINA. Nantes, le 25 juin 2012",
    estPresent: true,
    id: "1a0aa3be-8311-465d-b750-d4c19834430d",
    numeroOrdre: 2,
    estSupprimable: false,
    estModifiable: false
  },
  {
    nature: natureChangementDeSexe,
    texte: "yiuo",
    estPresent: true,
    id: "e315b68d-f43c-4111-9e67-504762161189",
    numeroOrdre: 3,
    estSupprimable: true,
    estModifiable: false
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
      idTypeMention: "b048c8a8-ac10-4a70-8fa6-36bf8ba7013b",
      libelleType: "18-3 Changement de sexe",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: true,
      idNatureMention: "b03c45b2-74c6-4cc5-9f64-4bad6f343598"
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
      idTypeMention: "b048c8a8-ac10-4a70-8fa6-36bf8ba7013b",
      libelleType: "18-3 Changement de sexe",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: true,
      idNatureMention: "b03c45b2-74c6-4cc5-9f64-4bad6f343598"
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
      idTypeMention: "b04bc836-dc01-4ba9-95cf-ac102a2373af",
      libelleType: "39-1-a Divorce en France",
      natureActe: "MARIAGE",
      affecteAnalyseMarginale: false,
      idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9"
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
      idTypeMention: "b04b9ffb-1114-4fbc-9c3c-156dc36d8ddc",
      libelleType: "39-99 Annulation de mariage - Autres",
      natureActe: "MARIAGE",
      affecteAnalyseMarginale: false,
      idNatureMention: "b03cd289-503f-4c98-8d12-0dffd9c51178"
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

export const mentionsPlurilingues = [
  {
    id: "f6947623-9959-4d07-8963-f55b16a08071",
    numeroOrdre: null,
    numeroOrdreExtrait: 2,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158980650,
    titulaires: null,
    typeMention: {
      idTypeMention: "b04b7ef0-cefe-4db7-9a36-5e752f1419ce",
      libelleType: "39-98 Séparation de corps - Autres",
      natureActe: "MARIAGE",
      affecteAnalyseMarginale: false,
      idNatureMention: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMentionPlurilingue: "Sc 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f692c7f2-d9f8-4ab0-80f2-f63a0c6819de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
        "Marié à Francfort (Allemagne) le 22 janvier 2020 avec Jean-Claude, Popeye Bernard LES BRONZÉES-FONT'DU SKI. Acte transcrit au consulat général de France à Berlin (Allemagne) sous le n° 2020/345. ",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: null
    }
  },
  {
    id: "f692c7f2-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Div 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f692c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Div 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f696c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Div 31-01-92 Paris Jenmi"
    }
  },
  {
    id: "f697c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Div 31-01-92 Angers Jenmi"
    }
  }
];

export const mentionsPlurilinguesMariageNombre10 = [
  {
    id: "f6947623-9959-4d07-8963-f55b16a01071",
    numeroOrdre: null,
    numeroOrdreExtrait: 2,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158980650,
    titulaires: null,
    typeMention: {
      idTypeMention: "b04b7ef0-cefe-4db7-9a36-5e752f1419ce",
      libelleType: "39-98 Séparation de corps - Autres",
      natureActe: "MARIAGE",
      affecteAnalyseMarginale: false,
      idNatureMention: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMentionPlurilingue: "Sc 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f692c7f2-d9f8-4ab0-80f2-f63a026819de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Sc 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f692c7f2-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Div 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f692c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Div 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f696c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Div 31-01-92 Paris Jenmi"
    }
  },
  {
    id: "f697c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Div 31-01-92 Angers Jenmi"
    }
  },
  {
    id: "f697c742-y9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Div 31-01-92 Angers Jenmi"
    }
  },
  {
    id: "f696c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Div 31-01-92 Paris Jenmi"
    }
  },
  {
    id: "f697c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Div 31-01-92 Angers Jenmi"
    }
  },
  {
    id: "f697c742-y9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Div 31-01-92 Angers Jenmi"
    }
  }
];

export const mentionsPlurilinguesMariageAvec6 = [
  {
    id: "f6947623-9959-4d07-8963-f55b16a01071",
    numeroOrdre: null,
    numeroOrdreExtrait: 2,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158980650,
    titulaires: null,
    typeMention: {
      idTypeMention: "b04b7ef0-cefe-4db7-9a36-5e752f1419ce",
      libelleType: "39-98 Séparation de corps - Autres",
      natureActe: "MARIAGE",
      affecteAnalyseMarginale: false,
      idNatureMention: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMentionPlurilingue: "Sc 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f692c7f2-d9f8-4ab0-80f2-f63a026819de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Sc 31-12-98 Nantes Jenmi"
    }
  },
  {
    id: "f692c7f2-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Div 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f692c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Div 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f696c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Div 31-01-92 Paris Jenmi"
    }
  },
  {
    id: "f697c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: null,
    numeroOrdreExtrait: 3,
    villeApposition: null,
    regionApposition: null,
    dateApposition: null,
    dateCreation: null,
    statut: "BROUILLON",
    dateStatut: 1663158896811,
    titulaires: null,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
      libelleType: " autres",
      natureActe: "NAISSANCE",
      affecteAnalyseMarginale: false,
      idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b"
    },
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: "Officier de l'état civil",
      nomOEC: null,
      prenomOEC: null
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
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteApposition: null,
      texteOEC: null,
      texteMentionDelivrance: null,
      texteMentionPlurilingue: "Div 31-01-92 Angers Jenmi"
    }
  }
];

export const EnregistrerMentionsResultat = JSON.stringify({
  reference_acte: "RECE.2022.000001",
  nature_acte: "ACTE DE NAISSANCE",
  titulaires: "de Cassandra, Clara, Angela SCHLOSSER",
  texte_corps_acte:
    "Nom                : GREENWALD\nPrénoms            : marie-paulita, zaria, léna\nsexe               : féminin\ndate de naissance  : cinq mars mille huit cent trente-huit\nlieu de naissance  : Milan, Lombardie (Italie)\n\nNom du père        : Sacken\nPrénoms            : Carmela, Linzy\nâgé de             : 55 ans\nlieu de naissance  : Milan, Lombardie (Italie)\nqui déclare la reconnaître\n\nNom de la mère     : Sacken\nPrénoms            : Carmela, Linzy\nâgée de            : 55 ans\nlieu de naissance  : Milan, Lombardie (Italie)\n                     son épouse\n\nDéclarant          : le père\n\nAdresse            : Bruxelles (Flandre)\nFrançaise par      : décret de naturalisation du 23 septembre 3515\n\nActe établi par Nous, Antoine EVAIN, officier de l'état civil du service central d'état civil du ministère des affaires étrangères (loi n°78-731 du 12 juillet 1978 modifiée).\n\n                     Nantes, le 8 février 2024",
  mentions: "texteMention"
});

export const MetamodeleAideSaisie = {
  errors: [],
  data: {
    idTypeMention: "b03c1503-d452-4751-8bb3-94d082db1e5e",
    estSaisieAssistee: true,
    modeleHandleBars:
      "/e1/Marié{{#if (eq titulaire.sexe 'feminin')}}e{{/if} à /e{{valeur 'evenementEtranger.ville'}}{{#if evenementEtranger.pays}} ({{valeur 'evenementEtranger.pays'}}){{/if}}/e2/ /e{{valeur 'evenementEtranger.date'}}/e3/ avec /e{{valeur 'lienMentionConjoint.prenoms'}}/e4/ /e{{valeur 'lienMentionConjoint.nom'}}/e5.Acte /e{{valeur 'decisionValidationEnregistrement.modeCreation'}}/e6 /e{{valeur 'autoriteValidationRegistre.etablissement'}}/e7/ à /e{{valeur 'autoriteValidationRegistre.ville'}}{{#if (eq decisionValidationEnregistrement.acteRECE 'true')}}/e8/ RECE./e{{valeur 'decisionValidationEnregistrement.annee'}}/e9/./e{{valeur 'decisionValidationEnregistrement.numeroActe'}{{else}}/e10/ CSL./e{{valeur 'decisionValidationEnregistrement.poste'}}/e11/./e{{valeur 'decisionValidationEnregistrement.annee'}}/e12/./e{{valeur 'decisionValidationEnregistrement.Support'}}/e13/./e{{valeur 'decisionValidationEnregistrement.numeroActe'}}{{/if}}/e14/./e",
    metamodelsBlocs: [
      {
        id: "evenementEtranger",
        titre: "EVENEMENT (A L'ETRANGER)",
        typeBloc: "BLOC_EVENEMENT_ETRANGER",
        position: 1,
        champs: [
          { id: "ville", libelle: "Ville", position: 1, type: "text", obligatoire: true, exigencesPourValorisation: [] },
          {
            id: "pays",
            libelle: "Pays",
            position: 2,
            type: "text",
            obligatoire: false,
            exigencesPourValorisation: [{ idChampReference: "ville", operateur: "<>", valeurs: ["Jérusalem"] }]
          },
          { id: "date", libelle: "Date", position: 3, type: "dateIncomplete", obligatoire: true, exigencesPourValorisation: [] }
        ]
      },
      {
        id: "lienMentionConjoint",
        titre: "CONJOINT",
        typeBloc: "BLOC_LIEN_MENTION_CONJOINT",
        position: 2,
        champs: [
          { id: "prenoms", libelle: "Prénom(s)", position: 1, type: "text", obligatoire: false, exigencesPourValorisation: [] },
          { id: "nom", libelle: "Nom", position: 2, type: "text", obligatoire: false, exigencesPourValorisation: [] }
        ]
      },
      {
        id: "decisionValidationEnregistrement",
        titre: "DECISION",
        typeBloc: "BLOC_DECISION_VALIDATION_ENREGISTREMENT",
        position: 3,
        champs: [
          {
            id: "modeCreation",
            libelle: "Mode création",
            position: 1,
            type: "select",
            obligatoire: true,
            exigencesPourValorisation: [],
            options: ["transcrit", "établi"]
          },
          { id: "acteRECE", libelle: "Acte RECE", position: 2, type: "boolean", obligatoire: true, exigencesPourValorisation: [] },
          {
            id: "poste",
            libelle: "Poste",
            position: 3,
            type: "text",
            obligatoire: false,
            exigencesPourValorisation: [{ idChampReference: "acteRECE", operateur: "=", valeurs: ["true"] }]
          },
          { id: "annee", libelle: "Année", position: 4, type: "int", obligatoire: true, exigencesPourValorisation: [] },
          {
            id: "support",
            libelle: "Support",
            position: 5,
            type: "text",
            obligatoire: false,
            exigencesPourValorisation: [{ idChampReference: "acteRECE", operateur: "=", valeurs: ["true"] }]
          },
          { id: "numeroActe", libelle: "N° acte", position: 6, type: "text", obligatoire: true, exigencesPourValorisation: [] }
        ]
      },
      {
        id: "autoriteValidationRegistre",
        titre: "Autorité",
        typeBloc: "BLOC_AUTORITE_VALIDATION_REGISTRE",
        position: 4,
        champs: [
          {
            id: "etablissement",
            libelle: "Etablissement",
            position: 1,
            type: "select",
            obligatoire: true,
            exigencesPourValorisation: [],
            options: [
              "à l'ambassade de France",
              "à la chancellerie détachée de France",
              "au consulat de France",
              "au consulat général de France",
              "au service central d'état civil"
            ]
          },
          { id: "ville", libelle: "Ville", position: 2, type: "text", obligatoire: true, exigencesPourValorisation: [] }
        ]
      }
    ]
  }
};
