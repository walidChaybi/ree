import { EBlocsRMC } from "../../../contexts/RMCContextProvider";
import {
  ASTERISQUE_PRECEDE_DEUX,
  ASTERISQUE_PRECEDE_ESPACE,
  ASTERISQUE_PRECEDE_UN,
  CARACTERES_POST_ASTERISQUE,
  CaracteresAutorisesRechercheNomPrenom,
  CaracteresAutorisesRecherchePays
} from "../../../ressources/Regex";
import SchemaValidation, { messagesErreur } from "../../../utils/SchemaValidation";
import { nettoyerAttributsDto } from "../../commun/dtoUtils";
import { ConditionChamp, EOperateurCondition } from "../commun/ConditionChamp";

import { ICriteresRMC, ICriteresRMCDto } from "@model/rmc/commun/IRMCFormulaire";

const MESSAGE_CARACTERES_INTERDITS_CHAMP_PAYS = "⚠ Les caractères spéciaux autorisés sont l'espace et les suivants : ' -";

export const RMCArchiveForm = {
  valeursInitiales: (): ICriteresRMC => {
    return {
      acte: {
        natureActe: "",
        typeReference: "REGISTRE",
        referenceRECE: {
          annee: "",
          numero: ""
        },
        familleRegistre: "",
        pocopa: "",
        anneeRegistre: "",
        registreSupport: {
          support1: "",
          support2: ""
        },
        numeroActe: {
          numeroActe: "",
          numeroBisTer: ""
        },
        etActesSuivants: false
      },
      evenement: {
        paysEvenement: "",
        dateEvenement: {
          annee: "",
          mois: "",
          jour: ""
        }
      },
      titulaire: {
        prenom: "",
        nom: "",
        paysNaissance: "",
        dateNaissance: {
          annee: "",
          mois: "",
          jour: ""
        }
      }
    };
  },

  versDto: (valeurs: ICriteresRMC): ICriteresRMCDto =>
    nettoyerAttributsDto<ICriteresRMCDto>({
      acte: {
        referenceRECE: valeurs.acte?.referenceRECE,
        natureActe: valeurs.acte?.natureActe,
        referenceRegistre: {
          pocopa: valeurs.acte?.pocopa,
          anneeRegistre: valeurs.acte?.anneeRegistre,
          etActesSuivants: valeurs.acte?.etActesSuivants,
          familleRegistre: valeurs.acte?.familleRegistre,
          numeroBisTer: valeurs.acte?.numeroActe?.numeroBisTer,
          numeroActe: valeurs.acte?.numeroActe?.numeroActe,
          support1: valeurs.acte?.registreSupport?.support1,
          support2: valeurs.acte?.registreSupport?.support2
        }
      },
      titulaire: {
        prenom: valeurs.titulaire?.prenom,
        nom: valeurs.titulaire?.nom,
        paysNaissance: valeurs.titulaire?.paysNaissance,
        dateNaissance: {
          annee: valeurs.titulaire?.dateNaissance?.annee,
          mois: valeurs.titulaire?.dateNaissance?.mois,
          jour: valeurs.titulaire?.dateNaissance?.jour
        }
      },
      evenement: {
        dateEvenement: {
          annee: valeurs.evenement?.dateEvenement?.annee,
          mois: valeurs.evenement?.dateEvenement?.mois,
          jour: valeurs.evenement?.dateEvenement?.jour
        },
        paysEvenement: valeurs.evenement?.paysEvenement
      }
    }),

  schemaValidation: (blocsRenseignes?: (keyof typeof EBlocsRMC)[]) => {
    const ENSEMBLE_REGEX_CHAMP_ASTERISQUE = [
      { valeur: CARACTERES_POST_ASTERISQUE, message: messagesErreur.CARACTERES_POST_ASTERISQUE },
      { valeur: CaracteresAutorisesRechercheNomPrenom, message: messagesErreur.CARACTERES_INTERDITS },
      { valeur: ASTERISQUE_PRECEDE_ESPACE, message: messagesErreur.ASTERISQUE_PRECEDE_ESPACE }
    ];

    const appliquerValidationSousCondition = <T>(validation: T, conditions: { blocsRetirantValidation: (keyof typeof EBlocsRMC)[] }) => {
      if (!blocsRenseignes?.length) return validation;

      return blocsRenseignes.filter(blocRenseigne => conditions.blocsRetirantValidation.includes(blocRenseigne)).length
        ? undefined
        : validation;
    };

    return SchemaValidation.objet({
      registre: SchemaValidation.objet({
        natureActe: SchemaValidation.texte({
          obligatoire: appliquerValidationSousCondition(
            ConditionChamp.depuisTableau([
              {
                idChampReference: "registre.pocopa",
                operateur: EOperateurCondition.EGAL,
                valeurs: [""]
              },
              {
                idChampReference: "registre.familleRegistre",
                operateur: EOperateurCondition.DIFF,
                valeurs: ["CPN"]
              },
              {
                idChampReference: "registre.numeroActe.numeroActe",
                operateur: EOperateurCondition.EGAL,
                valeurs: [""]
              },
              {
                idChampReference: "registre.registreSupport.support1",
                operateur: EOperateurCondition.EGAL,
                valeurs: [""]
              },
              {
                idChampReference: "registre.anneeRegistre",
                operateur: EOperateurCondition.DIFF,
                valeurs: [""]
              }
            ]),
            { blocsRetirantValidation: ["TITULAIRE", "EVENEMENT"] }
          )
        }),
        referenceRECE: SchemaValidation.referenceRECE({
          obligatoire: appliquerValidationSousCondition(
            ConditionChamp.depuisTableau([
              { idChampReference: "registre.natureActe", operateur: EOperateurCondition.DIFF, valeurs: [""] },
              { idChampReference: "registre.typeReference", operateur: EOperateurCondition.EGAL, valeurs: ["RECE"] }
            ]),
            { blocsRetirantValidation: ["TITULAIRE", "EVENEMENT"] }
          )
        }),
        pocopa: SchemaValidation.listeDeroulante({
          valeursPossibles: [
            {
              valeurs: ["TR-ACTES"],
              conditions: ConditionChamp.depuisTableau([
                {
                  idChampReference: "registre.familleRegistre",
                  operateur: EOperateurCondition.EGAL,
                  valeurs: ["MAR"]
                }
              ]),
              sontUtilisables: () => true
            }
          ],
          obligatoire: ConditionChamp.depuisTableauConditionComplexe([
            {
              idChampReference: "registre.familleRegistre",
              operateur: EOperateurCondition.EGAL,
              valeurs: ["CSL", "ACQ"]
            },
            [
              {
                idChampReference: "registre.numeroActe.numeroActe",
                operateur: EOperateurCondition.DIFF,
                valeurs: [""]
              },
              {
                idChampReference: "registre.familleRegistre",
                operateur: EOperateurCondition.DIFF,
                valeurs: ["CPN", "OP2", "OP3"]
              }
            ]
          ]),
          dansTableauOperateurConditionsOu: false,
          operateurConditionsOu: true
        }),
        familleRegistre: SchemaValidation.texte({
          dansTableauOperateurConditionsOu: true,
          interditSeul: {
            champsAIgnorer: ["typeReference"],
            messageErreurSpecifique: "⚠ Le champ ne peut pas être utilisé seul"
          },
          obligatoire: appliquerValidationSousCondition(
            ConditionChamp.depuisTableauConditionComplexe([
              { idChampReference: "registre.typeReference", operateur: EOperateurCondition.DIFF, valeurs: ["RECE"] },
              [
                { idChampReference: "registre.natureActe", operateur: EOperateurCondition.DIFF, valeurs: [""] },
                { idChampReference: "registre.anneeRegistre", operateur: EOperateurCondition.DIFF, valeurs: [""] },
                {
                  idChampReference: "registre.registreSupport.support1",
                  operateur: EOperateurCondition.DIFF,
                  valeurs: [""]
                },
                { idChampReference: "registre.pocopa", operateur: EOperateurCondition.DIFF, valeurs: [""] },
                {
                  idChampReference: "registre.numeroActe.numeroActe",
                  operateur: EOperateurCondition.DIFF,
                  valeurs: [""]
                }
              ]
            ]),
            { blocsRetirantValidation: ["TITULAIRE", "EVENEMENT"] }
          )
        }),
        anneeRegistre: SchemaValidation.annee({
          obligatoire: appliquerValidationSousCondition(
            ConditionChamp.depuisTableauConditionComplexe([
              { idChampReference: "registre.typeReference", operateur: EOperateurCondition.DIFF, valeurs: ["RECE"] },

              [
                {
                  idChampReference: "registre.numeroActe.numeroActe",
                  operateur: EOperateurCondition.EGAL,
                  valeurs: [""]
                },
                {
                  idChampReference: "registre.pocopa",
                  operateur: EOperateurCondition.EGAL,
                  valeurs: [""]
                },
                {
                  idChampReference: "registre.registreSupport.support1",
                  operateur: EOperateurCondition.EGAL,
                  valeurs: [""]
                },
                {
                  idChampReference: "registre.natureActe",
                  operateur: EOperateurCondition.DIFF,
                  valeurs: [""]
                },
                {
                  idChampReference: "registre.familleRegistre",
                  operateur: EOperateurCondition.DIFF,
                  valeurs: ["OP2", "OP3"]
                }
              ]
            ]),
            { blocsRetirantValidation: ["TITULAIRE", "EVENEMENT"] }
          )
        }),
        registreSupport: SchemaValidation.objet({
          support1: SchemaValidation.texte({
            obligatoire: ConditionChamp.depuisTableauConditionComplexe([
              {
                idChampReference: "registre.registreSupport.support2",
                operateur: EOperateurCondition.DIFF,
                valeurs: [""]
              },
              [
                {
                  idChampReference: "registre.familleRegistre",
                  operateur: EOperateurCondition.DIFF,
                  valeurs: ["CPN"]
                },
                {
                  idChampReference: "registre.etActesSuivants",
                  operateur: EOperateurCondition.EGAL,
                  valeurs: ["true"]
                }
              ]
            ]),
            operateurConditionsOu: true,
            dansTableauOperateurConditionsOu: false
          }),
          support2: SchemaValidation.texte({ obligatoire: false })
        }),
        numeroActe: SchemaValidation.objet({
          numeroActe: SchemaValidation.texte({
            obligatoire: ConditionChamp.depuisTableau([
              {
                idChampReference: "registre.etActesSuivants",
                operateur: EOperateurCondition.EGAL,
                valeurs: ["true"]
              },
              {
                idChampReference: "registre.numeroActe.numeroBisTer",
                operateur: EOperateurCondition.DIFF,
                valeurs: [""]
              }
            ]),
            operateurConditionsOu: true
          }),
          numeroBisTer: SchemaValidation.texte({ obligatoire: false })
        }),
        etActesSuivants: SchemaValidation.booleen({ obligatoire: false })
      }),
      evenement: SchemaValidation.objet({
        dateEvenement: SchemaValidation.dateIncomplete({
          obligatoire: false,
          bloquerDateFuture: true,
          interditSeul: appliquerValidationSousCondition(
            {
              champsEnErreur: ["annee"],
              champsAIgnorer: ["typeReference"]
            },
            { blocsRetirantValidation: ["TITULAIRE", "INSCRIPTION", "ACTE"] }
          )
        }),
        paysEvenement: SchemaValidation.texte({
          listeRegexp: [{ valeur: CaracteresAutorisesRecherchePays, message: MESSAGE_CARACTERES_INTERDITS_CHAMP_PAYS }],
          obligatoire: false,
          interditSeul: appliquerValidationSousCondition(
            {
              champsAIgnorer: ["typeReference"]
            },
            { blocsRetirantValidation: ["TITULAIRE", "INSCRIPTION", "ACTE"] }
          )
        })
      }),

      titulaire: SchemaValidation.objet({
        prenom: SchemaValidation.texte({
          obligatoire: false,
          listeRegexp: [
            { valeur: ASTERISQUE_PRECEDE_UN, message: messagesErreur.ASTERISQUE_PRECEDE_DE_UN },
            ...ENSEMBLE_REGEX_CHAMP_ASTERISQUE
          ]
        }),
        nom: SchemaValidation.texte({
          listeRegexp: [
            { valeur: ASTERISQUE_PRECEDE_DEUX, message: messagesErreur.ASTERISQUE_PRECEDE_DE_DEUX },
            ...ENSEMBLE_REGEX_CHAMP_ASTERISQUE
          ],
          obligatoire: ConditionChamp.depuisTableau([
            {
              idChampReference: "titulaire.prenom",
              operateur: EOperateurCondition.DIFF,
              valeurs: [""]
            }
          ])
        }),

        dateNaissance: SchemaValidation.dateIncomplete({
          obligatoire: false,
          interditSeul: {
            champsEnErreur: ["annee"],
            messageErreurSpecifique: "⚠ Le champ ne peut être utilisé sans au moins un autre critère du titulaire",
            limiterAuBloc: true
          },
          bloquerDateFuture: true
        }),
        paysNaissance: SchemaValidation.texte({
          obligatoire: false,
          listeRegexp: [{ valeur: CaracteresAutorisesRecherchePays, message: MESSAGE_CARACTERES_INTERDITS_CHAMP_PAYS }],
          interditSeul: {
            messageErreurSpecifique: "⚠ Le champ ne peut être utilisé sans au moins un autre critère du titulaire",
            limiterAuBloc: true
          }
        })
      })
    });
  }
};
