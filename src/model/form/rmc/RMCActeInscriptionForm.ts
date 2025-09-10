import { IRMCActe, IRMCActeDto } from "@model/rmc/acteInscription/rechercheForm/IRMCActe";
import { IRMCEvenement, IRMCEvenementDto } from "@model/rmc/acteInscription/rechercheForm/IRMCEvenement";
import { IRMCInscription, IRMCInscriptionDto } from "@model/rmc/acteInscription/rechercheForm/IRMCInscription";
import { IRMCTitulaire, IRMCTitulaireDto } from "@model/rmc/acteInscription/rechercheForm/IRMCTitulaire";
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
import { numeroRcRcaPacsVersDto } from "../commun/NumeroRcRcaPacsForm";

export interface IRMCActeInscriptionForm {
  titulaire: IRMCTitulaire;
  acte: IRMCActe;
  inscription: IRMCInscription;
  evenement: IRMCEvenement;
}

export interface IRMCActeInscriptionDto {
  titulaire?: IRMCTitulaireDto;
  acte?: IRMCActeDto;
  inscription?: IRMCInscriptionDto;
  evenement?: IRMCEvenementDto;
}

const MESSAGE_CARACTERES_INTERDITS_CHAMP_PAYS = "⚠ Les caractères spéciaux autorisés sont l'espace et les suivants : ' -";

export const RMCActeInscriptionForm = {
  valeursInitiales: (): IRMCActeInscriptionForm => {
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
      inscription: {
        numeroInscription: { annee: "", numero: "" },
        typeRepertoire: "",
        natureInscription: "",
        etInscriptionsSuivantes: false
      },
      evenement: {
        dateEvenement: {
          jour: "",
          mois: "",
          annee: ""
        },
        paysEvenement: ""
      },
      titulaire: {
        nom: "",
        prenom: "",
        paysNaissance: "",
        dateNaissance: {
          jour: "",
          mois: "",
          annee: ""
        }
      }
    };
  },

  versDto: (valeurs: IRMCActeInscriptionForm): IRMCActeInscriptionDto =>
    nettoyerAttributsDto<IRMCActeInscriptionDto>({
      acte: {
        natureActe: valeurs.acte?.natureActe || undefined,
        referenceRECE: valeurs.acte?.referenceRECE,
        referenceRegistre: {
          familleRegistre: valeurs.acte?.familleRegistre || undefined,
          pocopa: valeurs.acte?.pocopa,
          anneeRegistre: valeurs.acte?.anneeRegistre,
          support1: valeurs.acte?.registreSupport?.support1,
          support2: valeurs.acte?.registreSupport?.support2,
          numeroActe: valeurs.acte?.numeroActe?.numeroActe,
          numeroBisTer: valeurs.acte?.numeroActe?.numeroBisTer,
          etActesSuivants: valeurs.acte?.etActesSuivants || undefined
        }
      },
      inscription: {
        numeroInscription: numeroRcRcaPacsVersDto(valeurs.inscription?.numeroInscription),
        typeRepertoire: valeurs.inscription?.typeRepertoire || undefined,
        natureInscription: valeurs.inscription?.natureInscription,
        etInscriptionsSuivantes: valeurs.inscription?.etInscriptionsSuivantes || undefined
      },
      evenement: {
        dateEvenement: {
          jour: valeurs.evenement?.dateEvenement?.jour,
          mois: valeurs.evenement?.dateEvenement?.mois,
          annee: valeurs.evenement?.dateEvenement?.annee
        },
        paysEvenement: valeurs.evenement?.paysEvenement
      },

      titulaire: {
        nom: valeurs.titulaire?.nom,
        prenom: valeurs.titulaire?.prenom,
        paysNaissance: valeurs.titulaire?.paysNaissance,
        dateNaissance: {
          jour: valeurs.titulaire?.dateNaissance?.jour,
          mois: valeurs.titulaire?.dateNaissance?.mois,
          annee: valeurs.titulaire?.dateNaissance?.annee
        }
      }
    }),

  schemaValidation: (blocsRenseignes?: (keyof typeof EBlocsRMC)[]) => {
    const ENSEMBLE_REGEX_CHAMP_ASTERISQUE = [
      { valeur: CaracteresAutorisesRechercheNomPrenom, message: messagesErreur.CARACTERES_INTERDITS },
      { valeur: CARACTERES_POST_ASTERISQUE, message: messagesErreur.CARACTERES_POST_ASTERISQUE },
      { valeur: ASTERISQUE_PRECEDE_ESPACE, message: messagesErreur.ASTERISQUE_PRECEDE_ESPACE }
    ];

    const appliquerValidationSousCondition = <T>(validation: T, conditions: { blocsRetirantValidation: (keyof typeof EBlocsRMC)[] }) => {
      if (!blocsRenseignes?.length) return validation;

      return blocsRenseignes.filter(blocRenseigne => conditions.blocsRetirantValidation.includes(blocRenseigne)).length
        ? undefined
        : validation;
    };

    return SchemaValidation.objet({
      acte: SchemaValidation.objet({
        natureActe: SchemaValidation.texte({
          obligatoire: appliquerValidationSousCondition(
            ConditionChamp.depuisTableau([
              {
                idChampReference: "acte.anneeRegistre",
                operateur: EOperateurCondition.DIFF,
                valeurs: [""]
              },
              {
                idChampReference: "acte.familleRegistre",
                operateur: EOperateurCondition.DIFF,
                valeurs: ["CPN"]
              },
              {
                idChampReference: "acte.pocopa",
                operateur: EOperateurCondition.EGAL,
                valeurs: [""]
              },
              {
                idChampReference: "acte.registreSupport.support1",
                operateur: EOperateurCondition.EGAL,
                valeurs: [""]
              },
              {
                idChampReference: "acte.numeroActe.numeroActe",
                operateur: EOperateurCondition.EGAL,
                valeurs: [""]
              }
            ]),
            { blocsRetirantValidation: ["TITULAIRE", "EVENEMENT"] }
          )
        }),
        referenceRECE: SchemaValidation.referenceRECE({
          obligatoire: appliquerValidationSousCondition(
            ConditionChamp.depuisTableau([
              { idChampReference: "acte.typeReference", operateur: EOperateurCondition.EGAL, valeurs: ["RECE"] },
              { idChampReference: "acte.natureActe", operateur: EOperateurCondition.DIFF, valeurs: [""] }
            ]),
            { blocsRetirantValidation: ["TITULAIRE", "EVENEMENT"] }
          ),
          autoriserAnneeSeulement: blocsRenseignes?.some(blocRenseigne => ["TITULAIRE", "EVENEMENT"].includes(blocRenseigne))
        }),
        pocopa: SchemaValidation.listeDeroulante({
          obligatoire: ConditionChamp.depuisTableauConditionComplexe([
            {
              idChampReference: "acte.familleRegistre",
              operateur: EOperateurCondition.EGAL,
              valeurs: ["CSL", "ACQ"]
            },
            [
              {
                idChampReference: "acte.numeroActe.numeroActe",
                operateur: EOperateurCondition.DIFF,
                valeurs: [""]
              },
              {
                idChampReference: "acte.familleRegistre",
                operateur: EOperateurCondition.DIFF,
                valeurs: ["CPN", "OP2", "OP3"]
              }
            ]
          ]),
          valeursPossibles: [
            {
              valeurs: ["TR-ACTES"],
              conditions: ConditionChamp.depuisTableau([
                {
                  idChampReference: "acte.familleRegistre",
                  operateur: EOperateurCondition.EGAL,
                  valeurs: ["MAR"]
                }
              ]),
              sontUtilisables: () => true
            }
          ],
          operateurConditionsOu: true,
          dansTableauOperateurConditionsOu: false
        }),
        familleRegistre: SchemaValidation.texte({
          obligatoire: appliquerValidationSousCondition(
            ConditionChamp.depuisTableauConditionComplexe([
              { idChampReference: "acte.typeReference", operateur: EOperateurCondition.DIFF, valeurs: ["RECE"] },
              [
                { idChampReference: "acte.anneeRegistre", operateur: EOperateurCondition.DIFF, valeurs: [""] },
                { idChampReference: "acte.natureActe", operateur: EOperateurCondition.DIFF, valeurs: [""] },
                { idChampReference: "acte.pocopa", operateur: EOperateurCondition.DIFF, valeurs: [""] },
                {
                  idChampReference: "acte.registreSupport.support1",
                  operateur: EOperateurCondition.DIFF,
                  valeurs: [""]
                },
                {
                  idChampReference: "acte.numeroActe.numeroActe",
                  operateur: EOperateurCondition.DIFF,
                  valeurs: [""]
                }
              ]
            ]),
            { blocsRetirantValidation: ["TITULAIRE", "EVENEMENT"] }
          ),
          dansTableauOperateurConditionsOu: true,
          interditSeul: {
            champsAIgnorer: ["typeReference"],
            messageErreurSpecifique: "⚠ Le champ ne peut pas être utilisé seul"
          }
        }),
        anneeRegistre: SchemaValidation.annee({
          obligatoire: appliquerValidationSousCondition(
            ConditionChamp.depuisTableauConditionComplexe([
              { idChampReference: "acte.typeReference", operateur: EOperateurCondition.DIFF, valeurs: ["RECE"] },

              [
                {
                  idChampReference: "acte.natureActe",
                  operateur: EOperateurCondition.DIFF,
                  valeurs: [""]
                },
                {
                  idChampReference: "acte.familleRegistre",
                  operateur: EOperateurCondition.DIFF,
                  valeurs: ["OP2", "OP3"]
                },
                {
                  idChampReference: "acte.pocopa",
                  operateur: EOperateurCondition.EGAL,
                  valeurs: [""]
                },
                {
                  idChampReference: "acte.registreSupport.support1",
                  operateur: EOperateurCondition.EGAL,
                  valeurs: [""]
                },
                {
                  idChampReference: "acte.numeroActe.numeroActe",
                  operateur: EOperateurCondition.EGAL,
                  valeurs: [""]
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
                idChampReference: "acte.registreSupport.support2",
                operateur: EOperateurCondition.DIFF,
                valeurs: [""]
              },
              [
                {
                  idChampReference: "acte.etActesSuivants",
                  operateur: EOperateurCondition.EGAL,
                  valeurs: ["true"]
                },
                {
                  idChampReference: "acte.familleRegistre",
                  operateur: EOperateurCondition.DIFF,
                  valeurs: ["CPN"]
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
                idChampReference: "acte.numeroActe.numeroBisTer",
                operateur: EOperateurCondition.DIFF,
                valeurs: [""]
              },
              {
                idChampReference: "acte.etActesSuivants",
                operateur: EOperateurCondition.EGAL,
                valeurs: ["true"]
              }
            ]),
            operateurConditionsOu: true
          }),
          numeroBisTer: SchemaValidation.texte({ obligatoire: false })
        }),
        etActesSuivants: SchemaValidation.booleen({ obligatoire: false })
      }),
      inscription: SchemaValidation.objet({
        numeroInscription: SchemaValidation.numeroRcRcaPacs({
          interditSeul: {
            champsEnErreur: ["annee", "numero"],
            champsAIgnorer: ["typeReference"]
          },
          comparaisonValeurAutreChamp: {
            cheminChampCompare: "evenement.dateEvenement.annee",
            operateur: EOperateurCondition.EGAL,
            champEnfantCompare: "annee",
            messageErreurSpecifique: "⚠ Incohérence avec l'année de l'évènement"
          }
        }),
        typeRepertoire: SchemaValidation.texte({
          obligatoire: false,
          interditSeul: {
            champsAIgnorer: ["natureInscription", "typeReference"],
            messageErreurSpecifique: "⚠ Le champ ne peut être utilisé seul, ni être le seul champ renseigné avec Nature de l'inscription"
          }
        }),
        natureInscription: SchemaValidation.texte({
          obligatoire: false,
          interditSeul: {
            champsAIgnorer: ["typeRepertoire", "typeReference"],
            messageErreurSpecifique: "⚠ Le champ ne peut être utilisé seul, ni être le seul champ renseigné avec Type de répertoire"
          }
        })
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
            { blocsRetirantValidation: ["TITULAIRE", "RCRCAPACS", "ACTE"] }
          ),
          comparaisonValeurAutreChamp: {
            cheminChampCompare: "inscription.numeroInscription.annee",
            operateur: EOperateurCondition.EGAL,
            champEnfantCompare: "annee",
            messageErreurSpecifique: "⚠ Incohérence avec le numéro d'inscription / numéro PACS"
          }
        }),
        paysEvenement: SchemaValidation.texte({
          obligatoire: false,
          listeRegexp: [{ valeur: CaracteresAutorisesRecherchePays, message: MESSAGE_CARACTERES_INTERDITS_CHAMP_PAYS }],
          interditSeul: appliquerValidationSousCondition(
            {
              champsAIgnorer: ["typeReference"]
            },
            { blocsRetirantValidation: ["TITULAIRE", "RCRCAPACS", "ACTE"] }
          ),
          interditAvec: [
            {
              champExclusif: "inscription.typeRepertoire",
              valeursExclusives: ["RC", "RCA"],
              messageErreurSpecifique: "⚠ Incompatible avec une recherche RC/RCA"
            }
          ]
        })
      }),

      titulaire: SchemaValidation.objet({
        nom: SchemaValidation.texte({
          obligatoire: ConditionChamp.depuisTableau([
            {
              idChampReference: "titulaire.prenom",
              operateur: EOperateurCondition.DIFF,
              valeurs: [""]
            }
          ]),
          listeRegexp: [
            { valeur: ASTERISQUE_PRECEDE_DEUX, message: messagesErreur.ASTERISQUE_PRECEDE_DE_DEUX },
            ...ENSEMBLE_REGEX_CHAMP_ASTERISQUE
          ]
        }),
        prenom: SchemaValidation.texte({
          obligatoire: false,
          listeRegexp: [
            { valeur: ASTERISQUE_PRECEDE_UN, message: messagesErreur.ASTERISQUE_PRECEDE_DE_UN },
            ...ENSEMBLE_REGEX_CHAMP_ASTERISQUE
          ]
        }),
        paysNaissance: SchemaValidation.texte({
          obligatoire: false,
          listeRegexp: [{ valeur: CaracteresAutorisesRecherchePays, message: MESSAGE_CARACTERES_INTERDITS_CHAMP_PAYS }],
          interditSeul: {
            messageErreurSpecifique: "⚠ Le champ ne peut être utilisé sans au moins un autre critère du titulaire",
            limiterAuBloc: true
          }
        }),
        dateNaissance: SchemaValidation.dateIncomplete({
          obligatoire: false,
          interditSeul: {
            champsEnErreur: ["annee"],
            messageErreurSpecifique: "⚠ Le champ ne peut être utilisé sans au moins un autre critère du titulaire",
            limiterAuBloc: true
          },
          bloquerDateFuture: true
        })
      })
    });
  }
};
