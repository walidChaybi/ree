import { IMentionDto } from "@model/etatcivil/acte/mention/Mention";
import { ETypeChamp, IMetaModeleTypeMentionDto } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import { EOperateurCondition } from "@model/form/commun/ConditionChamp";

export const mentions: IMentionDto[] = [
  {
    id: "1a0aa3be-8311-465d-b750-d4c19834430e",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "0185f3c8-5f4c-4ea9-89e1-fb65fcb7b17f"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "Première mention"
    }
  },
  {
    id: "1a0aa3be-8311-465d-b750-d4c19834430d",
    numeroOrdre: 1,
    numeroOrdreExtrait: 2,
    typeMention: {
      idTypeMention: "6cc65fb0-c6ac-43ef-8533-3469e7a88174"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "Deuxième mention",
      texteApposition: "Nantes, le 25 juin 2012",
      texteOEC: "L'officier de l'état civil, Zahabia ANTOY MOHAMED"
    }
  }
];

export const mentionsPlurilingues: IMentionDto[] = [
  {
    id: "f6947623-9959-4d07-8963-f55b16a08071",
    numeroOrdre: 1,
    numeroOrdreExtrait: 2,
    typeMention: {
      idTypeMention: "b04b7ef0-cefe-4db7-9a36-5e752f1419ce"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMentionPlurilingue: "Sc 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f692c7f2-d9f8-4ab0-80f2-f63a0c6819de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention:
        "Marié à Francfort (Allemagne) le 22 janvier 2020 avec Jean-Claude, Popeye Bernard LES BRONZÉES-FONT'DU SKI. Acte transcrit au consulat général de France à Berlin (Allemagne) sous le n° 2020/345. "
    }
  },
  {
    id: "f692c7f2-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Div 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f692c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Div 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f696c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Div 31-01-92 Paris Jenmi"
    }
  },
  {
    id: "f697c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Div 31-01-92 Angers Jenmi"
    }
  }
];

export const mentionsPlurilinguesMariageNombre10: IMentionDto[] = [
  {
    id: "f6947623-9959-4d07-8963-f55b16a01071",
    numeroOrdre: 1,
    numeroOrdreExtrait: 2,
    typeMention: {
      idTypeMention: "b04b7ef0-cefe-4db7-9a36-5e752f1419ce"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMentionPlurilingue: "Sc 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f692c7f2-d9f8-4ab0-80f2-f63a026819de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Sc 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f692c7f2-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Div 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f692c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Div 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f696c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Div 31-01-92 Paris Jenmi"
    }
  },
  {
    id: "f697c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Div 31-01-92 Angers Jenmi"
    }
  },
  {
    id: "f697c742-y9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Div 31-01-92 Angers Jenmi"
    }
  },
  {
    id: "f696c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Div 31-01-92 Paris Jenmi"
    }
  },
  {
    id: "f697c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Div 31-01-92 Angers Jenmi"
    }
  },
  {
    id: "f697c742-y9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Div 31-01-92 Angers Jenmi"
    }
  }
];

export const mentionsPlurilinguesMariageAvec6: IMentionDto[] = [
  {
    id: "f6947623-9959-4d07-8963-f55b16a01071",
    numeroOrdre: 1,
    numeroOrdreExtrait: 2,
    typeMention: {
      idTypeMention: "b04b7ef0-cefe-4db7-9a36-5e752f1419ce"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMentionPlurilingue: "Sc 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f692c7f2-d9f8-4ab0-80f2-f63a026819de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Sc 31-12-98 Nantes Jenmi"
    }
  },
  {
    id: "f692c7f2-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Div 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f692c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Div 31-01-92 Nantes Jenmi"
    }
  },
  {
    id: "f696c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Div 31-01-92 Paris Jenmi"
    }
  },
  {
    id: "f697c742-d9f8-4ab0-80f2-f63a026815de",
    numeroOrdre: 1,
    numeroOrdreExtrait: 3,
    typeMention: {
      idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58"
    },
    evenement: {
      jour: 15,
      mois: 6,
      annee: 2021,
      ville: "nantes",
      region: "Pays de Loire",
      pays: "FRANCE"
    },
    textes: {
      texteMention: "je suis marié avec Jean-Claude,Marie DUSS.",
      texteMentionPlurilingue: "Div 31-01-92 Angers Jenmi"
    }
  }
];

export const MetaModeleAideSaisieMariageEnFrance: IMetaModeleTypeMentionDto = {
  idTypeMention: "b03c0e14-bad0-40a7-a895-8169e2b7f38e",
  estSaisieAssistee: false,
  modeleTexte:
    "[[1@Marié{{#if titulaire.sexe feminin}}e{{/if}} à ]]{{#valeur evenementFrance.ville LIEU <ÉVÉNEMENT>}}{{#if evenementFrance.arrondissement}} {{#valeur evenementFrance.arrondissement}}{{#if evenementFrance.arrondissement centre}}{{else}}{{#if evenementFrance.arrondissement 1}}er{{else}}ème{{/if}} arr.{{/if}}{{/if}}{{#if evenementFrance.departement & !evenementFrance.departement paris}} ({{#valeur evenementFrance.departement}}){{/if}}[[2@ ]]{{#valeur evenementFrance.date DATE <ÉVÉNEMENT>}}[[3@ avec ]]{{#if !conjoint.prenoms & !conjoint.nom}}PRÉNOM <CONJOINT> NOM <CONJOINT>{{else}}{{#valeur conjoint.prenoms}}{{#if conjoint.prenoms & conjoint.nom}} {{/if}}{{#valeur conjoint.nom}}{{/if}}[[4@.]]",
  metamodelsBlocs: [
    {
      id: "evenementFrance",
      titre: "ÉVÉNEMENT (EN FRANCE)",
      typeBloc: "BLOC_EVENEMENT_FRANCE_VARIANTE_A",
      position: 1,
      champs: [
        {
          id: "ville",
          libelle: "Ville",
          position: 1,
          type: ETypeChamp.TEXT,
          estAffiche: [{ idChampReference: null, operateur: EOperateurCondition.TOUJOURS_VRAI, valeurs: null }],
          estObligatoire: [{ idChampReference: null, operateur: EOperateurCondition.TOUJOURS_VRAI, valeurs: null }],
          valeursPossibles: [],
          estLectureSeule: []
        },
        {
          id: "arrondissement",
          libelle: "Arrondissement",
          position: 2,
          type: ETypeChamp.SELECT,
          estLectureSeule: [],
          valeurParDefaut: "",
          estAffiche: [
            { idChampReference: "evenementFrance.ville", operateur: EOperateurCondition.EGAL, valeurs: ["Paris", "Lyon", "Marseille"] }
          ],
          estObligatoire: [{ idChampReference: null, operateur: EOperateurCondition.TOUJOURS_VRAI, valeurs: null }],
          valeursPossibles: [
            {
              valeurs: [
                "",
                "centre",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20"
              ],
              conditions: [{ idChampReference: "evenementFrance.ville", operateur: EOperateurCondition.EGAL, valeurs: ["Paris"] }]
            },
            {
              valeurs: ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"],
              conditions: [{ idChampReference: "evenementFrance.ville", operateur: EOperateurCondition.EGAL, valeurs: ["Marseille"] }]
            },
            {
              valeurs: ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
              conditions: [{ idChampReference: "evenementFrance.ville", operateur: EOperateurCondition.EGAL, valeurs: ["Lyon"] }]
            },
            {
              valeurs: [],
              conditions: [
                { idChampReference: "evenementFrance.ville", operateur: EOperateurCondition.DIFF, valeurs: ["Lyon", "Marseille", "Paris"] }
              ]
            }
          ]
        },
        {
          id: "departement",
          libelle: "Département",
          position: 3,
          type: ETypeChamp.TEXT,
          estLectureSeule: [],
          estAffiche: [{ idChampReference: null, operateur: EOperateurCondition.TOUJOURS_VRAI, valeurs: null }],
          estObligatoire: [{ idChampReference: "evenementFrance.ville", operateur: EOperateurCondition.DIFF, valeurs: ["Paris"] }],
          valeursPossibles: []
        },
        {
          id: "date",
          libelle: "Date",
          position: 4,
          type: ETypeChamp.DATE_COMPLETE,
          estLectureSeule: [],
          estAffiche: [{ idChampReference: null, operateur: EOperateurCondition.TOUJOURS_VRAI, valeurs: null }],
          estObligatoire: [{ idChampReference: null, operateur: EOperateurCondition.TOUJOURS_VRAI, valeurs: null }],
          valeursPossibles: []
        }
      ]
    },
    {
      id: "conjoint",
      titre: "CONJOINT",
      typeBloc: "BLOC_CONJOINT_VARIANTE_A",
      position: 2,
      champs: [
        {
          id: "prenoms",
          libelle: "Prénom(s)",
          position: 1,
          type: ETypeChamp.TEXT,
          estLectureSeule: [],
          estAffiche: [{ idChampReference: null, operateur: EOperateurCondition.TOUJOURS_VRAI, valeurs: null }],
          estObligatoire: [{ idChampReference: "conjoint.nom", operateur: EOperateurCondition.EGAL, valeurs: [""] }],
          valeursPossibles: []
        },
        {
          id: "nom",
          libelle: "Nom",
          position: 2,
          type: ETypeChamp.TEXT,
          estLectureSeule: [],
          estAffiche: [{ idChampReference: null, operateur: EOperateurCondition.TOUJOURS_VRAI, valeurs: null }],
          estObligatoire: [{ idChampReference: "conjoint.prenoms", operateur: EOperateurCondition.EGAL, valeurs: [""] }],
          valeursPossibles: []
        }
      ]
    }
  ]
};
