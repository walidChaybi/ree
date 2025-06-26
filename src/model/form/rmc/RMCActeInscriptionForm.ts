import { CARACTERES_AUTORISES_MESSAGE, NUMERO_INSCRIPTION_MESSAGE } from "@widget/formulaire/FormulaireMessages";
import {
  ASTERISQUE_PRECEDE_DEUX,
  ASTERISQUE_PRECEDE_ESPACE,
  ASTERISQUE_PRECEDE_UN,
  CARACTERES_POST_ASTERISQUE,
  CaracteresAutorises,
  CaracteresAutorisesRecherche,
  NumeroInscription
} from "../../../ressources/Regex";
import SchemaValidation, { messagesErreur } from "../../../utils/SchemaValidation";
import { ConditionChamp, EOperateurCondition } from "../commun/ConditionChamp";
import { ObjetFormulaire } from "../commun/ObjetFormulaire";

export interface IRMCActeInscriptionForm {
  datesDebutFinAnnee: {
    dateDebut: {
      jour: string;
      mois: string;
      annee: string;
    };
    dateFin: {
      jour: string;
      mois: string;
      annee: string;
    };
  };
  registreRepertoire: {
    registre: {
      natureActe: string;
      familleRegistre: string;
      pocopa: { cle: string; libelle: string };
      anneeRegistre: string;
      registreSupport: {
        supportUn: string;
        supportDeux: string;
      };
      numeroActe: {
        numeroActeOuOrdre: string;
        numeroBisTer: string;
        aPartirDe: boolean;
      };
    };
    repertoire: {
      numeroInscription: string;
      typeRepertoire: string;
      natureInscription: {
        id: string;
        nom: string;
        code: string;
        libelle: string;
        article: string;
        type: string;
        categorieRCRCA: string;
        decisionCouple: boolean;
        estActif: boolean;
      };
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
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type IRMCActeInscriptionDto = DeepPartial<IRMCActeInscriptionForm>;

export const RMCActeInscriptionForm = {
  valeursInitiales: (): IRMCActeInscriptionForm => {
    return {
      registreRepertoire: {
        registre: {
          natureActe: "",
          familleRegistre: "",
          pocopa: { cle: "", libelle: "" },
          anneeRegistre: "",
          registreSupport: {
            supportUn: "",
            supportDeux: ""
          },
          numeroActe: {
            numeroActeOuOrdre: "",
            numeroBisTer: "",
            aPartirDe: false
          }
        },
        repertoire: {
          numeroInscription: "",
          typeRepertoire: "",
          natureInscription: {
            id: "",
            nom: "",
            code: "",
            libelle: "",
            article: "",
            type: "",
            categorieRCRCA: "",
            decisionCouple: false,
            estActif: false
          }
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
            aPartirDe: Boolean(valeurs.registreRepertoire.registre.numeroActe.aPartirDe)
          }
        },
        repertoire: {
          numeroInscription: valeurs.registreRepertoire.repertoire.numeroInscription,
          typeRepertoire: valeurs.registreRepertoire.repertoire.typeRepertoire,
          natureInscription: {
            id: valeurs.registreRepertoire.repertoire.natureInscription.id,
            nom: valeurs.registreRepertoire.repertoire.natureInscription.nom,
            code: valeurs.registreRepertoire.repertoire.natureInscription.code,
            libelle: valeurs.registreRepertoire.repertoire.natureInscription.libelle,
            article: valeurs.registreRepertoire.repertoire.natureInscription.article,
            type: valeurs.registreRepertoire.repertoire.natureInscription.type,
            categorieRCRCA: valeurs.registreRepertoire.repertoire.natureInscription.categorieRCRCA,
            decisionCouple: Boolean(valeurs.registreRepertoire.repertoire.natureInscription.decisionCouple),
            estActif: Boolean(valeurs.registreRepertoire.repertoire.natureInscription.estActif)
          }
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

  /* v8 ignore start A RETIRER LORSQUE LE FORMULAIRE RMC SERA SORTI DE VIEWS, A LA FIN DE LA REFONTE DES BLOCS */
  schemaValidation: () => {
    const ENSEMBLE_REGEX_CHAMP_ASTERISQUE = [
      { valeur: CaracteresAutorisesRecherche, message: messagesErreur.CARACTERES_INTERDITS },
      { valeur: CARACTERES_POST_ASTERISQUE, message: messagesErreur.CARACTERES_POST_ASTERISQUE },
      { valeur: ASTERISQUE_PRECEDE_ESPACE, message: messagesErreur.ASTERISQUE_PRECEDE_ESPACE }
    ];
    return SchemaValidation.objet({
      registreRepertoire: SchemaValidation.objet({
        registre: SchemaValidation.objet({
          natureActe: SchemaValidation.texte({ obligatoire: false }),
          familleRegistre: SchemaValidation.texte({ obligatoire: false }),
          anneeRegistre: SchemaValidation.texte({ obligatoire: false }),
          registreSupport: SchemaValidation.objet({
            supportUn: SchemaValidation.texte({ obligatoire: false }),
            supportDeux: SchemaValidation.texte({ obligatoire: false })
          }),
          numeroActe: SchemaValidation.objet({
            numeroActeOuOrdre: SchemaValidation.texte({ obligatoire: false }),
            numeroBisTer: SchemaValidation.texte({ obligatoire: false }),
            aPartirDe: SchemaValidation.booleen({ obligatoire: false })
          })
        }),
        repertoire: SchemaValidation.objet({
          numeroInscription: SchemaValidation.texte({ obligatoire: false })
            .matches(NumeroInscription, NUMERO_INSCRIPTION_MESSAGE)
            .matches(CaracteresAutorises, CARACTERES_AUTORISES_MESSAGE),
          typeRepertoire: SchemaValidation.texte({ obligatoire: false }),
          natureInscription: SchemaValidation.objet({
            //?
            id: SchemaValidation.texte({ obligatoire: false }),
            nom: SchemaValidation.texte({ obligatoire: false }),
            code: SchemaValidation.texte({ obligatoire: false }),
            libelle: SchemaValidation.texte({ obligatoire: false }),
            article: SchemaValidation.texte({ obligatoire: false }),
            type: SchemaValidation.texte({ obligatoire: false }),
            categorieRCRCA: SchemaValidation.texte({ obligatoire: false }),
            decisionCouple: SchemaValidation.booleen({ obligatoire: false }),
            estActif: SchemaValidation.booleen({ obligatoire: false })
          })
        }),
        evenement: SchemaValidation.objet({
          dateEvenement: SchemaValidation.dateComplete({
            obligatoire: false,
            bloquerDateFuture: true,
            interditSeul: {
              estInterditSeul: true,
              cheminErreurSpecifique: "annee"
            }
          }),
          paysEvenement: SchemaValidation.texte({
            obligatoire: false,
            listeRegexp: [{ valeur: CaracteresAutorisesRecherche, message: messagesErreur.CARACTERES_INTERDITS }],
            interditSeul: {
              estInterditSeul: true
            }
          })
        })
      }),
      datesDebutFinAnnee: SchemaValidation.objet({
        dateDebut: SchemaValidation.dateIncomplete({ obligatoire: false }),
        dateFin: SchemaValidation.dateIncomplete({ obligatoire: false })
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
          listeRegexp: [
            { valeur: ASTERISQUE_PRECEDE_DEUX, message: messagesErreur.ASTERISQUE_PRECEDE_DE_DEUX },
            ...ENSEMBLE_REGEX_CHAMP_ASTERISQUE
          ],
          interditSeul: {
            estInterditSeul: true,
            messageErreurSpecifique: "⚠ Le champ ne peut être utilisé sans au moins un autre critère du titulaire",
            limiterAuBloc: true
          }
        }),
        dateNaissance: SchemaValidation.dateIncomplete({
          obligatoire: false,
          interditSeul: {
            estInterditSeul: true,
            cheminErreurSpecifique: "annee",
            messageErreurSpecifique: "⚠ Le champ ne peut être utilisé sans au moins un autre critère du titulaire",
            limiterAuBloc: true
          },
          bloquerDateFuture: true
        })
      })
    });
  } /* v8 ignore stop */
};
