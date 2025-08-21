import { ETypePacsRcRca } from "@model/etatcivil/enum/ETypePacsRcRca";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { EFamilleRegistre } from "@model/etatcivil/enum/TypeFamille";
import { EBlocsRMC } from "../../../contexts/RMCContextProvider";
import { nettoyerAttributsDto } from "../../../dto/commun/dtoUtils";
import {
  ASTERISQUE_PRECEDE_DEUX,
  ASTERISQUE_PRECEDE_ESPACE,
  ASTERISQUE_PRECEDE_UN,
  CARACTERES_POST_ASTERISQUE,
  CaracteresAutorisesRechercheNomPrenom,
  CaracteresAutorisesRecherchePays
} from "../../../ressources/Regex";
import SchemaValidation, { messagesErreur } from "../../../utils/SchemaValidation";
import { ConditionChamp, EOperateurCondition } from "../commun/ConditionChamp";
import { IDateHeureForm } from "../commun/DateForm";
import { INumeroRcRcaPacs, numeroRcRcaPacsVersDto } from "../commun/NumeroRcRcaPacsForm";
import { IReferenceRECE } from "../commun/referenceRECE";

export interface IRMCActeInscriptionForm {
  titulaire: {
    nom: string;
    prenom: string;
    paysNaissance: string;
    dateNaissance: {
      jour: string;
      mois: string;
      annee: string;
    };
  };
  registreRepertoire: {
    registre: {
      typeReference: keyof typeof ETypeReference;
      referenceRECE: IReferenceRECE;
      natureActe: keyof typeof ENatureActe | "";
      familleRegistre: keyof typeof EFamilleRegistre | "";
      pocopa: string;
      anneeRegistre: string;
      registreSupport: {
        supportUn: string;
        supportDeux: string;
      };
      numeroActe: {
        numeroActeOuOrdre: string;
        numeroBisTer: string;
        etActesSuivants: boolean;
      };
    };
    repertoire: {
      numeroInscription: INumeroRcRcaPacs;
      typeRepertoire: keyof typeof ETypePacsRcRca | "";
      natureInscription: string;
      etInscriptionsSuivantes: boolean;
    };
    evenement: {
      dateEvenement: IDateHeureForm;
      paysEvenement: string;
    };
  };
}

export enum ETypeReference {
  RECE = "RECE",
  REGISTRE = "Registre"
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ICriteresRMCActeInscriptionDto = DeepPartial<{
  registreRepertoire: {
    registre: {
      natureActe: keyof typeof ENatureActe;
      familleRegistre: keyof typeof EFamilleRegistre;
      pocopa: string;
      anneeRegistre: string;
      registreSupport: {
        supportUn: string;
        supportDeux: string;
      };
      numeroActe: {
        numeroActeOuOrdre: string;
        numeroBisTer: string;
        etActesSuivants: boolean;
      };
      referenceRece: IReferenceRECE;
    };
    repertoire: {
      numeroInscription: string;
      typeRepertoire: keyof typeof ETypePacsRcRca;
      natureInscription: string;
      etInscriptionsSuivantes: boolean;
    };
    evenement: {
      dateEvenement: {
        jour: string;
        mois: string;
        annee: string;
      };
      paysEvenement: string;
    };
  };

  titulaire: {
    nom: string;
    prenom: string;
    paysNaissance: string;
    dateNaissance: {
      jour: string;
      mois: string;
      annee: string;
    };
  };
}>;

const MESSAGE_CARACTERES_INTERDITS_CHAMP_PAYS = "⚠ Les caractères spéciaux autorisés sont l'espace et les suivants : ' -";

export const RMCActeInscriptionForm = {
  valeursInitiales: (): IRMCActeInscriptionForm => {
    return {
      registreRepertoire: {
        registre: {
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
            supportUn: "",
            supportDeux: ""
          },
          numeroActe: {
            numeroActeOuOrdre: "",
            numeroBisTer: "",
            etActesSuivants: false
          }
        },
        repertoire: {
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
        }
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

  versDto: (valeurs: IRMCActeInscriptionForm): ICriteresRMCActeInscriptionDto =>
    nettoyerAttributsDto<ICriteresRMCActeInscriptionDto>({
      registreRepertoire: {
        registre: {
          natureActe: valeurs.registreRepertoire.registre.natureActe || undefined,
          familleRegistre: valeurs.registreRepertoire.registre.familleRegistre || undefined,
          pocopa: valeurs.registreRepertoire.registre.pocopa,
          anneeRegistre: valeurs.registreRepertoire.registre.anneeRegistre,
          registreSupport: {
            supportUn: valeurs.registreRepertoire.registre.registreSupport.supportUn,
            supportDeux: valeurs.registreRepertoire.registre.registreSupport.supportDeux
          },
          numeroActe: {
            numeroActeOuOrdre: valeurs.registreRepertoire.registre.numeroActe.numeroActeOuOrdre,
            numeroBisTer: valeurs.registreRepertoire.registre.numeroActe.numeroBisTer,
            etActesSuivants: valeurs.registreRepertoire.registre.numeroActe.etActesSuivants
          },
          referenceRece: valeurs.registreRepertoire.registre.referenceRECE
        },
        repertoire: {
          numeroInscription: numeroRcRcaPacsVersDto(valeurs.registreRepertoire.repertoire.numeroInscription),
          typeRepertoire: valeurs.registreRepertoire.repertoire.typeRepertoire || undefined,
          natureInscription: valeurs.registreRepertoire.repertoire.natureInscription,
          etInscriptionsSuivantes: valeurs.registreRepertoire.repertoire.etInscriptionsSuivantes
        },
        evenement: {
          dateEvenement: {
            jour: valeurs.registreRepertoire.evenement.dateEvenement.jour,
            mois: valeurs.registreRepertoire.evenement.dateEvenement.mois,
            annee: valeurs.registreRepertoire.evenement.dateEvenement.annee
          },
          paysEvenement: valeurs.registreRepertoire.evenement.paysEvenement
        }
      },

      titulaire: {
        nom: valeurs.titulaire.nom,
        prenom: valeurs.titulaire.prenom,
        paysNaissance: valeurs.titulaire.paysNaissance,
        dateNaissance: {
          jour: valeurs.titulaire.dateNaissance.jour,
          mois: valeurs.titulaire.dateNaissance.mois,
          annee: valeurs.titulaire.dateNaissance.annee
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
      registreRepertoire: SchemaValidation.objet({
        registre: SchemaValidation.objet({
          natureActe: SchemaValidation.texte({
            obligatoire: appliquerValidationSousCondition(
              ConditionChamp.depuisTableau([
                {
                  idChampReference: "registreRepertoire.registre.anneeRegistre",
                  operateur: EOperateurCondition.DIFF,
                  valeurs: [""]
                },
                {
                  idChampReference: "registreRepertoire.registre.familleRegistre",
                  operateur: EOperateurCondition.DIFF,
                  valeurs: ["CPN"]
                },
                {
                  idChampReference: "registreRepertoire.registre.pocopa",
                  operateur: EOperateurCondition.EGAL,
                  valeurs: [""]
                },
                {
                  idChampReference: "registreRepertoire.registre.registreSupport.supportUn",
                  operateur: EOperateurCondition.EGAL,
                  valeurs: [""]
                },
                {
                  idChampReference: "registreRepertoire.registre.numeroActe.numeroActeOuOrdre",
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
                { idChampReference: "registreRepertoire.registre.typeReference", operateur: EOperateurCondition.EGAL, valeurs: ["RECE"] },
                { idChampReference: "registreRepertoire.registre.natureActe", operateur: EOperateurCondition.DIFF, valeurs: [""] }
              ]),
              { blocsRetirantValidation: ["TITULAIRE", "EVENEMENT"] }
            )
          }),
          pocopa: SchemaValidation.listeDeroulante({
            obligatoire: ConditionChamp.depuisTableauConditionComplexe([
              {
                idChampReference: "registreRepertoire.registre.familleRegistre",
                operateur: EOperateurCondition.EGAL,
                valeurs: ["CSL", "ACQ"]
              },
              [
                {
                  idChampReference: "registreRepertoire.registre.numeroActe.numeroActeOuOrdre",
                  operateur: EOperateurCondition.DIFF,
                  valeurs: [""]
                },
                {
                  idChampReference: "registreRepertoire.registre.familleRegistre",
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
                    idChampReference: "registreRepertoire.registre.familleRegistre",
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
                { idChampReference: "registreRepertoire.registre.typeReference", operateur: EOperateurCondition.DIFF, valeurs: ["RECE"] },
                [
                  { idChampReference: "registreRepertoire.registre.anneeRegistre", operateur: EOperateurCondition.DIFF, valeurs: [""] },
                  { idChampReference: "registreRepertoire.registre.natureActe", operateur: EOperateurCondition.DIFF, valeurs: [""] },
                  { idChampReference: "registreRepertoire.registre.pocopa", operateur: EOperateurCondition.DIFF, valeurs: [""] },
                  {
                    idChampReference: "registreRepertoire.registre.registreSupport.supportUn",
                    operateur: EOperateurCondition.DIFF,
                    valeurs: [""]
                  },
                  {
                    idChampReference: "registreRepertoire.registre.numeroActe.numeroActeOuOrdre",
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
                { idChampReference: "registreRepertoire.registre.typeReference", operateur: EOperateurCondition.DIFF, valeurs: ["RECE"] },

                [
                  {
                    idChampReference: "registreRepertoire.registre.natureActe",
                    operateur: EOperateurCondition.DIFF,
                    valeurs: [""]
                  },
                  {
                    idChampReference: "registreRepertoire.registre.familleRegistre",
                    operateur: EOperateurCondition.DIFF,
                    valeurs: ["OP2", "OP3"]
                  },
                  {
                    idChampReference: "registreRepertoire.registre.pocopa",
                    operateur: EOperateurCondition.EGAL,
                    valeurs: [""]
                  },
                  {
                    idChampReference: "registreRepertoire.registre.registreSupport.supportUn",
                    operateur: EOperateurCondition.EGAL,
                    valeurs: [""]
                  },
                  {
                    idChampReference: "registreRepertoire.registre.numeroActe.numeroActeOuOrdre",
                    operateur: EOperateurCondition.EGAL,
                    valeurs: [""]
                  }
                ]
              ]),
              { blocsRetirantValidation: ["TITULAIRE", "EVENEMENT"] }
            )
          }),
          registreSupport: SchemaValidation.objet({
            supportUn: SchemaValidation.texte({
              obligatoire: ConditionChamp.depuisTableauConditionComplexe([
                {
                  idChampReference: "registreRepertoire.registre.registreSupport.supportDeux",
                  operateur: EOperateurCondition.DIFF,
                  valeurs: [""]
                },
                [
                  {
                    idChampReference: "registreRepertoire.registre.numeroActe.etActesSuivants",
                    operateur: EOperateurCondition.EGAL,
                    valeurs: ["true"]
                  },
                  {
                    idChampReference: "registreRepertoire.registre.familleRegistre",
                    operateur: EOperateurCondition.DIFF,
                    valeurs: ["CPN"]
                  }
                ]
              ]),
              operateurConditionsOu: true,
              dansTableauOperateurConditionsOu: false
            }),
            supportDeux: SchemaValidation.texte({ obligatoire: false })
          }),
          numeroActe: SchemaValidation.objet({
            numeroActeOuOrdre: SchemaValidation.texte({
              obligatoire: ConditionChamp.depuisTableau([
                {
                  idChampReference: "registreRepertoire.registre.numeroActe.numeroBisTer",
                  operateur: EOperateurCondition.DIFF,
                  valeurs: [""]
                },
                {
                  idChampReference: "registreRepertoire.registre.numeroActe.etActesSuivants",
                  operateur: EOperateurCondition.EGAL,
                  valeurs: ["true"]
                }
              ]),
              operateurConditionsOu: true
            }),
            numeroBisTer: SchemaValidation.texte({ obligatoire: false }),
            etActesSuivants: SchemaValidation.booleen({ obligatoire: false })
          })
        }),
        repertoire: SchemaValidation.objet({
          numeroInscription: SchemaValidation.numeroRcRcaPacs({
            interditSeul: {
              champsEnErreur: ["annee", "numero"],
              champsAIgnorer: ["typeReference"]
            },
            comparaisonValeurAutreChamp: {
              cheminChampCompare: "registreRepertoire.evenement.dateEvenement.annee",
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
              cheminChampCompare: "registreRepertoire.repertoire.numeroInscription.annee",
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
                champExclusif: "registreRepertoire.repertoire.typeRepertoire",
                valeursExclusives: ["RC", "RCA"],
                messageErreurSpecifique: "⚠ Incompatible avec une recherche RC/RCA"
              }
            ]
          })
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
