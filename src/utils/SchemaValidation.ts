import { ValeursConditionneesMetaModele } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import { ConditionChamp, EOperateurCondition } from "@model/form/commun/ConditionChamp";
import { INumeroRcRcaPacs } from "@model/form/commun/NumeroRcRcaPacsForm";
import dayjs from "dayjs";
import { getIn } from "formik";
import * as Yup from "yup";
import { REGEX_ANNEE_QUATRE_CHIFFRES } from "../ressources/Regex";

// MODULE CLE centralisation des validations de formulaire

type TEstTableauCondition<T> = T extends (ConditionChamp | ConditionChamp[])[] ? true : false;

type TSchemaParams<TObligatoire extends boolean | (ConditionChamp | ConditionChamp[])[]> = {
  obligatoire?: TObligatoire;
  operateurConditionsOu?: TEstTableauCondition<TObligatoire> extends true ? boolean : never;
  dansTableauOperateurConditionsOu?: TEstTableauCondition<TObligatoire> extends true ? boolean : never;
  interditSeul?: boolean | TInterditSeul;
  interditAvec?: TInterditAvec[];
  comparaisonValeurAutreChamp?: TComparaisonValeurAutreChamp;
};

type TSchemaValidationFonction<TAutreParams = {}, TRetour = Yup.AnySchema> = <
  TObligatoire extends boolean | (ConditionChamp | ConditionChamp[])[] = false
>(
  params?: TSchemaParams<TObligatoire> & TAutreParams
) => TRetour;

type TValeurChamp = string | boolean | number | undefined;

type TValidation = {
  message?: string;
};

type TValidationEntier = TValidation & {
  valeur: number;
};

type TValidationText = TValidation & {
  valeur: RegExp;
};

type TInterditSeul = {
  champsEnErreur?: string[];
  champsAIgnorer?: string[];
  messageErreurSpecifique?: string;
  limiterAuBloc?: boolean;
};

type TInterditAvec = {
  champExclusif: string;
  valeursExclusives?: string[];
  messageErreurSpecifique?: string;
};

type TComparaisonValeurAutreChamp = {
  cheminChampCompare: string;
  operateur: EOperateurCondition;
  champEnfantCompare?: string;
  messageErreurSpecifique?: string;
};

type TGestionObligationParams<TSchemaChamp extends Yup.AnySchema = Yup.AnySchema> = {
  schema: TSchemaChamp;
  obligatoire: boolean | (ConditionChamp | ConditionChamp[])[];
  actionObligation: () => TSchemaChamp;
  conditionOu?: boolean;
  dansTableauConditionsOu?: boolean;
  interditSeul?: boolean | TInterditSeul;
  interditAvec?: TInterditAvec[];
  comparaisonValeurAutreChamp?: TComparaisonValeurAutreChamp;
};

type TDateChamp = {
  jour: Yup.StringSchema<string | undefined>;
  mois: Yup.StringSchema<string | undefined>;
  annee: Yup.StringSchema<string | undefined>;
  heure: Yup.StringSchema<string | undefined>;
  minute: Yup.StringSchema<string | undefined>;
};

type TNomSecableChamp = {
  nom: Yup.StringSchema<string>;
  secable: Yup.BooleanSchema<boolean>;
  nomPartie1: Yup.StringSchema<string | undefined>;
  nomPartie2: Yup.StringSchema<string | undefined>;
};

interface ISchemaValidation {
  objet: TSchemaValidationFonction<{ [cle: string]: Yup.AnySchema }, Yup.AnyObjectSchema>;
  texte: TSchemaValidationFonction<{ listeRegexp?: TValidationText[] }, Yup.StringSchema>;
  entier: TSchemaValidationFonction<{ min?: TValidationEntier; max?: TValidationEntier }, Yup.NumberSchema>;
  booleen: TSchemaValidationFonction<{}, Yup.BooleanSchema>;
  listeDeroulante: TSchemaValidationFonction<{ options?: string[]; valeursPossibles?: ValeursConditionneesMetaModele[] }, Yup.StringSchema>;
  dateComplete: TSchemaValidationFonction<{ bloquerDateFuture?: boolean }>;
  dateIncomplete: TSchemaValidationFonction<{ bloquerDateFuture?: boolean }>;
  annee: TSchemaValidationFonction<{ min?: TValidationEntier }>;
  nomSecable: TSchemaValidationFonction;
  prenoms: (prefix: string) => Yup.AnySchema;
  champsAnneeEtNumero: TSchemaValidationFonction<{ min?: TValidationEntier }>;
  numeroRcRcaPacs: TSchemaValidationFonction;
  numerosRcRcaPacs: TSchemaValidationFonction<{ prefix: string; tailleMax: number }>;
  referenceRECE: TSchemaValidationFonction;
  inconnu: () => Yup.AnySchema;
}

export const messagesErreur = {
  ANNEE_INVALIDE: "⚠ L'année est invalide",
  ANNEE_SUR_QUATRE_CHIFFRES: "⚠ L'année doit être sur 4 chiffres",
  DATE_INVALIDE: "⚠ La date est invalide",
  DATE_INCOMPLETE: "⚠ La date est incomplète",
  DATE_OBLIGATOIRE: "⚠ La saisie de la date est obligatoire",
  DATE_FUTURE: "⚠ La date ne peut pas être supérieure à la date du jour",
  DOIT_ETRE_ENTIER: "⚠ La valeur doit être un entier",
  CHAMP_OBLIGATOIRE: "⚠ La saisie du champ est obligatoire",
  CHAMP_INVALIDE: "⚠ Le champ est invalide",
  CHAMP_INCOMPLET: "⚠ Le champ est incomplet",
  CHAMPS_INCOHERENTS: "⚠ Ces champs sont incohérents",
  CHAMP_SEUL_INVALIDE: "⚠ Le champ ne peut être utilisé seul",
  CHAMP_VALEUR_IMPOSEE: "⚠ Le champ ne peut pas contenir cette valeur",
  CHAMP_EXCLUSIF: "⚠ Le champ est incompatible avec un autre champ du formulaire",
  PRENOM_OBLIGATOIRE: "⚠ La saisie du prénom est obligatoire",
  CARACTERES_INTERDITS: "⚠ Le champ contient des caractères interdits dans l'état civil",
  CARACTERES_POST_ASTERISQUE: "⚠ L'astérisque ne doit être suivi d'aucun caractère",
  ASTERISQUE_PRECEDE_DE_UN: "⚠ L'astérisque doit être précédé d'au moins un caractère",
  ASTERISQUE_PRECEDE_DE_DEUX: "⚠ L'astérisque doit être précédé d'au moins deux caractères",
  ASTERISQUE_PRECEDE_ESPACE: "⚠ L'astérisque doit être accolé à un vocable"
};

const erreurSurDateEntiere = (message: string, baseChemin: string) =>
  new Yup.ValidationError([
    new Yup.ValidationError(message, {}, `${baseChemin}.jour`),
    new Yup.ValidationError(message, {}, `${baseChemin}.mois`),
    new Yup.ValidationError(message, {}, `${baseChemin}.annee`)
  ]);

const getSchemaValidationDate = (bloquerDateFuture?: boolean): Yup.ObjectSchema<TDateChamp> =>
  Yup.object()
    .shape({
      jour: Yup.string(),
      mois: Yup.string(),
      annee: Yup.string()
        .length(4, messagesErreur.ANNEE_SUR_QUATRE_CHIFFRES)
        .matches(REGEX_ANNEE_QUATRE_CHIFFRES, messagesErreur.ANNEE_INVALIDE),
      heure: Yup.string(),
      minute: Yup.string()
    })

    .test("jourValide", (date, error) => {
      if (!date.jour || !date.mois || !date.annee) {
        return true;
      }

      return new Date(Number(date.annee), Number(date.mois) - 1, Number(date.jour)).getDate() !== Number(date.jour)
        ? error.createError({
            path: `${error.path}.jour`,
            message: messagesErreur.DATE_INVALIDE
          })
        : true;
    })

    .test("moisValide", (date, error) => {
      if (!date.mois || !date.annee) {
        return true;
      }

      return isNaN(Date.parse(`${date.annee?.padStart(4, "0")}-${date.mois?.padStart(2, "0")}-01`))
        ? error.createError({
            path: `${error.path}.mois`,
            message: messagesErreur.DATE_INVALIDE
          })
        : true;
    })

    .test("heureValide", (date, error) => {
      if (!date.heure && !date.minute) {
        return true;
      }

      return !date.heure || Number(date.heure) >= 24
        ? error.createError({
            path: `${error.path}.heure`,
            message: messagesErreur.DATE_INVALIDE
          })
        : true;
    })
    .test("minuteValide", (date, error) => {
      if (!date.minute) {
        return true;
      }

      return Number(date.minute) >= 60
        ? error.createError({
            path: `${error.path}.minute`,
            message: messagesErreur.DATE_INVALIDE
          })
        : true;
    })
    .test("dateFuture", (date, error) => {
      if (!bloquerDateFuture) {
        return true;
      }
      const estDateFuture = (() => {
        if (!date.annee) return false;

        const dateActuelle = new Date();
        switch (true) {
          case !date.mois:
            return Number(date.annee) > dateActuelle.getFullYear();

          case !date.jour:
            return Number(date.mois) > dateActuelle.getMonth() + 1 && Number(date.annee) >= dateActuelle.getFullYear();

          case Boolean(date.jour):
            return new Date(Number(date.annee), Number(date.mois) - 1, Number(date.jour)).getTime() > dateActuelle.getTime();
        }

        return false;
      })();

      return estDateFuture ? erreurSurDateEntiere(messagesErreur.DATE_FUTURE, error.path) : true;
    });

export const estChampRenseigne = (valeur: any): boolean => {
  if (valeur === null || valeur === undefined || valeur === "") return false;

  if (typeof valeur === "object" && !Array.isArray(valeur)) {
    return Object.values(valeur).some(estChampRenseigne);
  }

  return true;
};

export const getValeursRenseigneesFormulaire = (valeur?: string | boolean | object | null, clesExclues?: string[]): string[] => {
  if (!valeur || typeof valeur === "boolean") return [];

  if (typeof valeur === "object") {
    return Object.entries(valeur).flatMap(([cle, value]) => {
      return clesExclues?.includes(cle) ? [] : getValeursRenseigneesFormulaire(value, clesExclues);
    });
  }

  return [valeur];
};

const comparerValeurChamps = <TSchemaChamp extends Yup.AnySchema = Yup.AnySchema>(
  schema: TSchemaChamp,
  { cheminChampCompare, operateur, champEnfantCompare, messageErreurSpecifique }: TComparaisonValeurAutreChamp
) =>
  schema.test("valeursIncoherentes", (valeur, context) => {
    const valeurChampCompare = getIn(context.options.context, cheminChampCompare)?.toString();
    if (!valeurChampCompare || !estChampRenseigne(valeur)) return true;

    const erreurComparaison = context.createError({
      path: champEnfantCompare ? `${context.path}.${champEnfantCompare}` : context.path,
      message: messageErreurSpecifique ?? messagesErreur.CHAMPS_INCOHERENTS
    });

    const valeurChamp = (champEnfantCompare ? valeur[champEnfantCompare] : valeur)?.toString();

    const estValeursChampsSimilaire = valeurChamp === valeurChampCompare;

    const estConditionRespectee = operateur === EOperateurCondition.EGAL ? estValeursChampsSimilaire : !estValeursChampsSimilaire;

    return estConditionRespectee || erreurComparaison;
  });

const champSeulInterdit = <TSchemaChamp extends Yup.AnySchema = Yup.AnySchema>(
  schema: TSchemaChamp,
  { champsEnErreur, champsAIgnorer, messageErreurSpecifique, limiterAuBloc }: TInterditSeul
) =>
  schema.test("champSeulInvalide", (valeur, context) => {
    const errors: Yup.ValidationError[] = [];
    const cleChampActuel = context.path.split(".").pop();
    let clesChampsAFiltrer: string[] = cleChampActuel ? [cleChampActuel] : [];
    if (champsAIgnorer) clesChampsAFiltrer = [...clesChampsAFiltrer, ...champsAIgnorer];

    const autresValeursFormulaire = getValeursRenseigneesFormulaire(
      limiterAuBloc ? context.parent : context.options.context,
      clesChampsAFiltrer
    );

    if (estChampRenseigne(valeur) && autresValeursFormulaire.filter(estChampRenseigne).length === 0) {
      if (!champsEnErreur) {
        return context.createError({
          path: context.path,
          message: messageErreurSpecifique ?? messagesErreur.CHAMP_SEUL_INVALIDE
        });
      }
      champsEnErreur.forEach(champ => {
        return errors.push(
          context.createError({
            path: `${context.path}.${champ}`,
            message: messageErreurSpecifique ?? messagesErreur.CHAMP_SEUL_INVALIDE
          })
        );
      });

      return new Yup.ValidationError(errors);
    }

    return true;
  });

const champInterditAvec = <TSchemaChamp extends Yup.AnySchema = Yup.AnySchema>(
  schema: TSchemaChamp,
  { champExclusif, valeursExclusives, messageErreurSpecifique }: TInterditAvec
) =>
  schema.test("champInterditAvec", (valeur, context) => {
    const valeurChampExclusif = getIn(context.options.context, champExclusif);

    if (!valeurChampExclusif || !estChampRenseigne(valeur) || (valeursExclusives && !valeursExclusives.includes(valeurChampExclusif)))
      return true;

    return context.createError({
      path: context.path,
      message: messageErreurSpecifique ?? messagesErreur.CHAMP_EXCLUSIF
    });
  });

const gestionObligation = <TSchemaChamp extends Yup.AnySchema = Yup.AnySchema>({
  schema,
  obligatoire,
  actionObligation,
  conditionOu,
  dansTableauConditionsOu,
  interditSeul,
  interditAvec,
  comparaisonValeurAutreChamp
}: TGestionObligationParams<TSchemaChamp>): TSchemaChamp => {
  if (interditSeul) {
    schema = champSeulInterdit(schema, typeof interditSeul === "boolean" ? {} : interditSeul);
  }

  if (interditAvec) {
    interditAvec.forEach(conditionExclusivite => {
      schema = champInterditAvec(schema, conditionExclusivite);
    });
  }

  if (comparaisonValeurAutreChamp) {
    schema = comparerValeurChamps(schema, comparaisonValeurAutreChamp);
  }

  if (typeof obligatoire === "boolean") {
    return obligatoire ? actionObligation() : schema;
  }

  switch (true) {
    case !obligatoire.length:
    case typeof obligatoire[0] === "object" && (obligatoire[0] as ConditionChamp).operateur === "AlwaysFalse":
      return schema;
    case typeof obligatoire[0] === "object" && (obligatoire[0] as ConditionChamp).operateur === "AlwaysTrue":
      return actionObligation();
    default:
      return (() => {
        const clesChampsReference = obligatoire.reduce((cles: string[], condition) => {
          if (Array.isArray(condition)) {
            return cles.concat(...condition.map(sousCondition => `$${sousCondition.idChampReference}`));
          }

          return cles.concat(`$${condition.idChampReference}`);
        }, []);

        const dansTableauConditionsOperateur = dansTableauConditionsOu ? "some" : "every";

        return schema.when(clesChampsReference, {
          is: (...valeurChamp: TValeurChamp[]) => {
            let indexValeur = 0;

            const verificationCondition = (condition: ConditionChamp) => condition.estRespecteePourValeur(valeurChamp[indexValeur++]);

            return obligatoire
              .map(condition => {
                if (Array.isArray(condition)) {
                  return condition.length ? condition.map(verificationCondition)[dansTableauConditionsOperateur](Boolean) : true;
                }

                return verificationCondition(condition);
              })
              [conditionOu ? "some" : "every"](Boolean);
          },
          then: actionObligation()
        });
      })();
  }
};

const SchemaValidation: ISchemaValidation = {
  objet: (objet = {}) => Yup.object().shape(objet),

  texte: (schemaParams = {}) => {
    let schema = Yup.string();

    if (schemaParams.listeRegexp?.length)
      schemaParams.listeRegexp.forEach(regexp => {
        schema = schema.matches(regexp.valeur, regexp.message ?? "⚠ La valeur n'est pas conforme");
      });

    return gestionObligation({
      schema: schema,
      obligatoire: schemaParams.obligatoire ?? false,
      actionObligation: () => schema.required(messagesErreur.CHAMP_OBLIGATOIRE),
      conditionOu: schemaParams.operateurConditionsOu,
      dansTableauConditionsOu: schemaParams.dansTableauOperateurConditionsOu,
      interditSeul: schemaParams.interditSeul,
      interditAvec: schemaParams.interditAvec,
      comparaisonValeurAutreChamp: schemaParams.comparaisonValeurAutreChamp
    });
  },

  entier: (schemaParams = {}) => {
    let schema = Yup.number().integer(messagesErreur.DOIT_ETRE_ENTIER);
    schemaParams.min &&
      (schema = schema.min(
        schemaParams.min.valeur,
        schemaParams.min.message ?? `⚠ La valeur ne peut pas être inférieure à ${schemaParams.min.valeur}`
      ));
    schemaParams.max &&
      (schema = schema.max(
        schemaParams.max.valeur,
        schemaParams.max.message ?? `⚠ La valeur ne peut pas être supérieure à ${schemaParams.max.valeur}`
      ));

    return gestionObligation({
      schema: schema,
      obligatoire: schemaParams.obligatoire ?? false,
      actionObligation: () => schema.required(messagesErreur.CHAMP_OBLIGATOIRE),
      conditionOu: schemaParams.operateurConditionsOu,
      interditSeul: schemaParams.interditSeul,
      interditAvec: schemaParams.interditAvec,
      comparaisonValeurAutreChamp: schemaParams.comparaisonValeurAutreChamp
    });
  },

  booleen: (schemaParams = {}) => {
    let schema = Yup.boolean();

    return gestionObligation({
      schema: schema,
      obligatoire: schemaParams.obligatoire ?? false,
      actionObligation: () => schema.required(messagesErreur.CHAMP_OBLIGATOIRE),
      conditionOu: schemaParams.operateurConditionsOu,
      interditSeul: schemaParams.interditSeul,
      interditAvec: schemaParams.interditAvec,
      comparaisonValeurAutreChamp: schemaParams.comparaisonValeurAutreChamp
    });
  },

  listeDeroulante: (schemaParams = {}) => {
    let schema = Yup.string();

    if (schemaParams.options) {
      schema = schema.oneOf(schemaParams.options, messagesErreur.CHAMP_OBLIGATOIRE);
    }

    if (schemaParams.valeursPossibles) {
      schemaParams.valeursPossibles.forEach((valeurPossible: ValeursConditionneesMetaModele) => {
        valeurPossible.conditions.some((obligation: ConditionChamp) => {
          switch (obligation.operateur) {
            case "AlwaysTrue":
              schema = schema.oneOf(valeurPossible.valeurs, messagesErreur.CHAMP_OBLIGATOIRE);
              return true;
            case "AlwaysFalse":
              return true;
            default:
              schema = schema.when(`$${obligation.idChampReference}`, {
                is: (valeurChamp: TValeurChamp) => obligation.estRespecteePourValeur(valeurChamp),
                then: schema.oneOf(valeurPossible.valeurs, messagesErreur.CHAMP_VALEUR_IMPOSEE)
              });
              return false;
          }
        });
      });
    }

    return gestionObligation({
      schema: schema,
      obligatoire: schemaParams.obligatoire ?? false,
      actionObligation: () => schema.required(messagesErreur.CHAMP_OBLIGATOIRE),
      conditionOu: schemaParams.operateurConditionsOu,
      interditSeul: schemaParams.interditSeul,
      interditAvec: schemaParams.interditAvec,
      comparaisonValeurAutreChamp: schemaParams.comparaisonValeurAutreChamp
    });
  },

  dateComplete: (schemaParams = {}) => {
    let schema = getSchemaValidationDate(schemaParams.bloquerDateFuture)
      .test("dateCompleteObligatoireJour", (date, error) =>
        !date.jour && (Boolean(date.mois) || Boolean(date.annee))
          ? error.createError({
              path: `${error.path}.jour`,
              message: messagesErreur.DATE_INCOMPLETE
            })
          : true
      )
      .test("dateCompleteObligatoireJour", (date, error) =>
        !date.mois && (Boolean(date.jour) || Boolean(date.annee))
          ? error.createError({
              path: `${error.path}.mois`,
              message: messagesErreur.DATE_INCOMPLETE
            })
          : true
      )
      .test("dateCompleteObligatoireJour", (date, error) =>
        !date.annee && (Boolean(date.jour) || Boolean(date.mois))
          ? error.createError({
              path: `${error.path}.annee`,
              message: messagesErreur.DATE_INCOMPLETE
            })
          : true
      );

    return gestionObligation({
      schema: schema,
      obligatoire: schemaParams.obligatoire ?? false,
      actionObligation: () =>
        schema.test("dateEntiereObligatoire", (date, error) =>
          !date.jour && !date.mois && !date.annee ? erreurSurDateEntiere(messagesErreur.DATE_OBLIGATOIRE, error.path) : true
        ),
      conditionOu: schemaParams.operateurConditionsOu,
      interditSeul: schemaParams.interditSeul,
      interditAvec: schemaParams.interditAvec,
      comparaisonValeurAutreChamp: schemaParams.comparaisonValeurAutreChamp
    });
  },

  dateIncomplete: (schemaParams = {}) => {
    let schema = getSchemaValidationDate(schemaParams.bloquerDateFuture)
      .test("anneeObligatoireSiDateSaisie", (date, error) =>
        (Boolean(date.jour) || Boolean(date.mois)) && !date.annee
          ? error.createError({ path: `${error.path}.annee`, message: messagesErreur.DATE_INCOMPLETE })
          : true
      )
      .test("jourSansMois", (date, error) => {
        return Boolean(date.jour) && !date.mois
          ? error.createError({
              path: `${error.path}.mois`,
              message: messagesErreur.DATE_INCOMPLETE
            })
          : true;
      });

    return gestionObligation({
      schema: schema,
      obligatoire: schemaParams.obligatoire ?? false,
      actionObligation: () =>
        schema.test("anneeToujoursObligatoire", (date, error) =>
          !date.annee
            ? error.createError({
                path: `${error.path}.annee`,
                message: messagesErreur.DATE_OBLIGATOIRE
              })
            : true
        ),
      conditionOu: schemaParams.operateurConditionsOu,
      interditSeul: schemaParams.interditSeul,
      interditAvec: schemaParams.interditAvec,
      comparaisonValeurAutreChamp: schemaParams.comparaisonValeurAutreChamp
    });
  },

  annee: (schemaParams = {}) =>
    SchemaValidation.entier({
      obligatoire: schemaParams.obligatoire,
      min: { valeur: schemaParams.min?.valeur ?? 1000, message: schemaParams.min?.message ?? "⚠ L'année doit être sur 4 chiffres" },
      max: { valeur: dayjs().get("year"), message: "⚠ L'année ne peut pas être supérieure à l'année actuelle" },
      interditSeul: schemaParams.interditSeul,
      interditAvec: schemaParams.interditAvec,
      comparaisonValeurAutreChamp: schemaParams.comparaisonValeurAutreChamp
    }),

  nomSecable: (schemaParams = {}) => {
    let schema = SchemaValidation.objet({
      nom: Yup.string(),
      secable: Yup.boolean(),
      nomPartie1: Yup.string(),
      nomPartie2: Yup.string()
    });

    return gestionObligation({
      schema: schema,
      obligatoire: schemaParams.obligatoire ?? false,
      actionObligation: () =>
        schema.test("nomSecableObligatoire", ({ nom }, error) =>
          !nom
            ? error.createError({
                path: `${error.path}.nom`,
                message: messagesErreur.CHAMP_OBLIGATOIRE
              })
            : true
        ),
      conditionOu: schemaParams.operateurConditionsOu,
      interditSeul: schemaParams.interditSeul,
      interditAvec: schemaParams.interditAvec,
      comparaisonValeurAutreChamp: schemaParams.comparaisonValeurAutreChamp
    }) as Yup.ObjectSchema<TNomSecableChamp>;
  },

  prenoms: (prefix: string) => {
    const schemaPrenoms: { [cle: string]: Yup.StringSchema } = {};
    Array.from({ length: 15 }).forEach((_, index) => {
      let schema = Yup.string();

      if (index < 14) {
        const prenomsSuivants = Array.from({ length: 14 - index }).map((_, idx) => `$${prefix}${idx + index + 2}`);
        schema = schema.when(prenomsSuivants, {
          is: (...valeur: (string | undefined)[]) => valeur.some(val => Boolean(val)),
          then: schema.required(messagesErreur.PRENOM_OBLIGATOIRE)
        });
      }

      schemaPrenoms[`prenom${index + 1}`] = schema;
    });

    return SchemaValidation.objet(schemaPrenoms);
  },

  champsAnneeEtNumero: ({ obligatoire, operateurConditionsOu, interditSeul, interditAvec, comparaisonValeurAutreChamp, min } = {}) => {
    let schema = SchemaValidation.objet({
      numero: SchemaValidation.entier({ obligatoire: obligatoire }),
      annee: SchemaValidation.annee({ obligatoire: obligatoire, min })
    })
      .test("numeroIncompletInterditAnnee", (numeroRcRcaPacs, error) => {
        return Boolean(numeroRcRcaPacs.numero) && !numeroRcRcaPacs.annee
          ? error.createError({
              path: `${error.path}.annee`,
              message: messagesErreur.CHAMP_INCOMPLET
            })
          : true;
      })
      .test("numeroIncompletInterditNumero", (numeroRcRcaPacs, error) => {
        return !numeroRcRcaPacs.numero && Boolean(numeroRcRcaPacs.annee)
          ? error.createError({
              path: `${error.path}.numero`,
              message: messagesErreur.CHAMP_INCOMPLET
            })
          : true;
      });

    return gestionObligation({
      schema: schema,
      obligatoire: obligatoire ?? false,
      actionObligation: () => {
        return schema;
      },
      conditionOu: operateurConditionsOu,
      interditSeul: interditSeul,
      interditAvec: interditAvec,
      comparaisonValeurAutreChamp: comparaisonValeurAutreChamp
    });
  },

  numeroRcRcaPacs: ({ obligatoire, operateurConditionsOu, interditSeul, interditAvec, comparaisonValeurAutreChamp } = {}) => {
    let schema = SchemaValidation.champsAnneeEtNumero({
      obligatoire,
      operateurConditionsOu,
      interditSeul,
      interditAvec,
      comparaisonValeurAutreChamp
    });

    return gestionObligation({
      schema: schema,
      obligatoire: obligatoire ?? false,
      actionObligation: () => {
        return schema;
      },
      conditionOu: operateurConditionsOu,
      interditSeul: interditSeul,
      interditAvec: interditAvec,
      comparaisonValeurAutreChamp: comparaisonValeurAutreChamp
    });
  },

  numerosRcRcaPacs: (schemaParams = { prefix: "", tailleMax: 8 }) => {
    const schemaNumeros: { [cle: string]: Yup.AnyObjectSchema } = {};

    Array.from({ length: schemaParams.tailleMax }).forEach((_, index) => {
      let schemaAnnee = SchemaValidation.annee({ obligatoire: false });
      schemaAnnee = schemaAnnee.when(`$${schemaParams.prefix}${index + 1}.numero`, {
        is: (numero: number) => Boolean(`${numero ?? ""}`.length),
        then: schemaAnnee.required(messagesErreur.CHAMP_OBLIGATOIRE)
      });
      let schemaNumero = SchemaValidation.entier({ obligatoire: false });
      schemaNumero = schemaNumero.when(`$${schemaParams.prefix}${index + 1}.annee`, {
        is: (annee: number) => Boolean(`${annee ?? ""}`.length),
        then: schemaNumero.required(messagesErreur.CHAMP_OBLIGATOIRE)
      });

      if (index === 0) {
        schemaAnnee = gestionObligation({
          schema: schemaAnnee,
          obligatoire: schemaParams.obligatoire ?? false,
          actionObligation: () => schemaAnnee.required(messagesErreur.CHAMP_OBLIGATOIRE)
        });
        schemaNumero = gestionObligation({
          schema: schemaNumero,
          obligatoire: schemaParams.obligatoire ?? false,
          actionObligation: () => schemaNumero.required(messagesErreur.CHAMP_OBLIGATOIRE)
        });
      }

      const numerosSuivants = Array.from({ length: schemaParams.tailleMax - 1 - index }).map(
        (_, idx) => `$${schemaParams.prefix}${idx + index + 2}`
      );
      schemaAnnee = schemaAnnee.when(numerosSuivants, {
        is: (...valeur: (INumeroRcRcaPacs | undefined)[]) => valeur.some(val => Boolean(val?.annee) && Boolean(val?.numero)),
        then: schemaAnnee.required(messagesErreur.CHAMP_OBLIGATOIRE)
      });
      schemaNumero = schemaNumero.when(numerosSuivants, {
        is: (...valeur: (INumeroRcRcaPacs | undefined)[]) => valeur.some(val => Boolean(val?.annee) && Boolean(val?.numero)),
        then: schemaNumero.required(messagesErreur.CHAMP_OBLIGATOIRE)
      });

      schemaNumeros[`ligne${index + 1}`] = SchemaValidation.objet({
        annee: schemaAnnee,
        numero: schemaNumero
      });
    });

    return SchemaValidation.objet(schemaNumeros);
  },

  referenceRECE: ({ obligatoire, operateurConditionsOu, interditSeul, interditAvec, comparaisonValeurAutreChamp } = {}) => {
    let schema = SchemaValidation.champsAnneeEtNumero({
      min: { valeur: 2021, message: "L'année doit être postérieure à 2020" },
      obligatoire,
      operateurConditionsOu,
      interditSeul,
      interditAvec,
      comparaisonValeurAutreChamp
    });

    return gestionObligation({
      schema: schema,
      obligatoire: obligatoire ?? false,
      actionObligation: () => {
        return schema;
      },
      conditionOu: operateurConditionsOu,
      interditSeul: interditSeul,
      interditAvec: interditAvec,
      comparaisonValeurAutreChamp: comparaisonValeurAutreChamp
    });
  },

  inconnu: () => Yup.mixed()
} as const;

export default SchemaValidation;
