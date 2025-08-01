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
import { ObjetFormulaire } from "../commun/ObjetFormulaire";

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
  datesDebutFinAnnee: {
    dateDebut: IDateHeureForm;
    dateFin: IDateHeureForm;
  };
  registreRepertoire: {
    registre: {
      natureActe: string;
      familleRegistre: string;
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
      typeRepertoire: string;
      natureInscription: string;
      etInscriptionsSuivantes: boolean;
    };
    evenement: {
      dateEvenement: IDateHeureForm;
      paysEvenement: string;
    };
  };
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type IRMCActeInscriptionDto = DeepPartial<
  Omit<IRMCActeInscriptionForm, "registreRepertoire"> & {
    registreRepertoire: Omit<IRMCActeInscriptionForm["registreRepertoire"], "repertoire"> & {
      repertoire: Omit<IRMCActeInscriptionForm["registreRepertoire"]["repertoire"], "numeroInscription"> & {
        numeroInscription: string;
      };
    };
  }
>;

const MESSAGE_CARACTERES_INTERDITS_CHAMP_PAYS = "⚠ Les caractères spéciaux autorisés sont l'espace et les suivants : ' -";

export const RMCActeInscriptionForm = {
  valeursInitiales: (): IRMCActeInscriptionForm => {
    return {
      registreRepertoire: {
        registre: {
          natureActe: "",
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
          numeroInscription: { anneeInscription: "", numero: "" },
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
      datesDebutFinAnnee: {
        dateDebut: {
          jour: "",
          mois: "",
          annee: ""
        },
        dateFin: {
          jour: "",
          mois: "",
          annee: ""
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

  versDto: (valeurs: IRMCActeInscriptionForm): IRMCActeInscriptionDto =>
    ObjetFormulaire.remplacerChaineVideParUndefined({
      registreRepertoire: {
        registre: {
          natureActe: valeurs.registreRepertoire.registre.natureActe,
          familleRegistre: valeurs.registreRepertoire.registre.familleRegistre,
          pocopa: valeurs.registreRepertoire.registre.pocopa,
          anneeRegistre: valeurs.registreRepertoire.registre.anneeRegistre,
          registreSupport: {
            supportUn: valeurs.registreRepertoire.registre.registreSupport.supportUn,
            supportDeux: valeurs.registreRepertoire.registre.registreSupport.supportDeux
          },
          numeroActe: {
            numeroActeOuOrdre: valeurs.registreRepertoire.registre.numeroActe.numeroActeOuOrdre,
            numeroBisTer: valeurs.registreRepertoire.registre.numeroActe.numeroBisTer,
            etActesSuivants: Boolean(valeurs.registreRepertoire.registre.numeroActe.etActesSuivants)
          }
        },
        repertoire: {
          numeroInscription: numeroRcRcaPacsVersDto(valeurs.registreRepertoire.repertoire.numeroInscription),
          typeRepertoire: valeurs.registreRepertoire.repertoire.typeRepertoire,
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
      datesDebutFinAnnee: {
        dateDebut: {
          jour: valeurs.datesDebutFinAnnee.dateDebut.jour,
          mois: valeurs.datesDebutFinAnnee.dateDebut.mois,
          annee: valeurs.datesDebutFinAnnee.dateDebut.annee
        },
        dateFin: {
          jour: valeurs.datesDebutFinAnnee.dateFin.jour,
          mois: valeurs.datesDebutFinAnnee.dateFin.mois,
          annee: valeurs.datesDebutFinAnnee.dateFin.annee
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

  schemaValidation: () => {
    const ENSEMBLE_REGEX_CHAMP_ASTERISQUE = [
      { valeur: CaracteresAutorisesRechercheNomPrenom, message: messagesErreur.CARACTERES_INTERDITS },
      { valeur: CARACTERES_POST_ASTERISQUE, message: messagesErreur.CARACTERES_POST_ASTERISQUE },
      { valeur: ASTERISQUE_PRECEDE_ESPACE, message: messagesErreur.ASTERISQUE_PRECEDE_ESPACE }
    ];

    return SchemaValidation.objet({
      registreRepertoire: SchemaValidation.objet({
        registre: SchemaValidation.objet({
          natureActe: SchemaValidation.texte({
            obligatoire: ConditionChamp.depuisTableau([
              {
                idChampReference: "registreRepertoire.registre.anneeRegistre",
                operateur: EOperateurCondition.DIFF,
                valeurs: [""]
              }
            ])
          }),
          pocopa: SchemaValidation.listeDeroulante({
            obligatoire: ConditionChamp.depuisTableau([
              {
                idChampReference: "registreRepertoire.registre.familleRegistre",
                operateur: EOperateurCondition.EGAL,
                valeurs: ["CSL", "ACQ"]
              },
              {
                idChampReference: "registreRepertoire.registre.numeroActe.numeroActeOuOrdre",
                operateur: EOperateurCondition.DIFF,
                valeurs: [""]
              }
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
            operateurConditionsOu: true
          }),
          familleRegistre: SchemaValidation.texte({
            obligatoire: ConditionChamp.depuisTableau([
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
            ]),
            operateurConditionsOu: true,
            interditSeul: {
              messageErreurSpecifique: "⚠ Le champ ne peut pas être utilisé seul"
            }
          }),
          anneeRegistre: SchemaValidation.texte({
            obligatoire: ConditionChamp.depuisTableau([
              {
                idChampReference: "registreRepertoire.registre.natureActe",
                operateur: EOperateurCondition.DIFF,
                valeurs: [""]
              }
            ])
          }),
          registreSupport: SchemaValidation.objet({
            supportUn: SchemaValidation.texte({
              obligatoire: ConditionChamp.depuisTableau([
                {
                  idChampReference: "registreRepertoire.registre.registreSupport.supportDeux",
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
            obligatoire: false,
            interditSeul: {
              champsEnErreur: ["anneeInscription", "numero"]
            }
          }),
          typeRepertoire: SchemaValidation.texte({
            obligatoire: false,
            interditSeul: {
              champsAIgnorer: ["natureInscription"],
              messageErreurSpecifique: "⚠ Le champ ne peut être utilisé seul, ni être le seul champ renseigné avec Nature de l'inscription"
            }
          }),
          natureInscription: SchemaValidation.texte({
            obligatoire: false,
            interditSeul: {
              champsAIgnorer: ["typeRepertoire"],
              messageErreurSpecifique: "⚠ Le champ ne peut être utilisé seul, ni être le seul champ renseigné avec Type de répertoire"
            }
          })
        }),
        evenement: SchemaValidation.objet({
          dateEvenement: SchemaValidation.dateIncomplete({
            obligatoire: false,
            bloquerDateFuture: true,
            interditSeul: {
              champsEnErreur: ["annee"]
            }
          }),
          paysEvenement: SchemaValidation.texte({
            obligatoire: false,
            listeRegexp: [{ valeur: CaracteresAutorisesRecherchePays, message: MESSAGE_CARACTERES_INTERDITS_CHAMP_PAYS }],
            interditSeul: true
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
