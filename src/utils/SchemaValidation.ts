import { ValeursConditionneesMetaModele } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import { ConditionChamp } from "@model/form/commun/ConditionChamp";
import * as Yup from "yup";

interface ISchemaCommunParams {
  obligatoire: boolean | ConditionChamp[];
  operateurConditionsOu?: boolean;
}

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

export const messagesErreur = {
  DATE_INVALIDE: "⚠ La date est invalide",
  DATE_OBLIGATOIRE: "⚠ La saisie de la date est obligatoire",
  DATE_FUTURE: "⚠ La date ne peut pas être supérieure à la date du jour",
  DOIT_ETRE_ENTIER: "⚠ La valeur doit être un entier",
  CHAMP_OBLIGATOIRE: "⚠ La saisie du champ est obligatoire",
  PRENOM_OBLIGATOIRE: "⚠ La saisie du prénom est obligatoire"
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
      annee: Yup.string().length(4, "⚠ L'année doit être sur 4 chiffres"),
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
      if (!date.heure) {
        return true;
      }

      return Number(date.heure) >= 24
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
            path: `${error.path}.heure`,
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

const getSchemaValidationNumeroInscriptionRcRca = (): Yup.StringSchema =>
  Yup.string()
    .test("annéeInvalide", (numero, error) => {
      if (!numero) return true;

      return +numero.slice(0, 4) < 1000
        ? error.createError({
            path: `${error.path}`,
            message: messagesErreur.DATE_INVALIDE
          })
        : true;
    })
    .test("numeroIncomplet", (numero, error) => {
      if (!numero) return true;

      return numero.length < 10
        ? error.createError({
            path: `${error.path}`,
            message: messagesErreur.CHAMP_OBLIGATOIRE
          })
        : true;
    });

const gestionObligation = <TSchemaChamp extends Yup.AnySchema = Yup.AnySchema>(
  schema: TSchemaChamp,
  obligatoire: boolean | ConditionChamp[],
  actionObligation: () => TSchemaChamp,
  conditionOu?: boolean
): TSchemaChamp => {
  if (typeof obligatoire === "boolean") {
    return obligatoire ? actionObligation() : schema;
  }

  switch (true) {
    case !obligatoire.length:
    case obligatoire[0].operateur === "AlwaysFalse":
      return schema;
    case obligatoire[0].operateur === "AlwaysTrue":
      return actionObligation();
    default:
      return schema.when([...obligatoire.map(condition => `$${condition.idChampReference}`)], {
        is: (...valeurChamp: TValeurChamp[]) => {
          const verificationCondition = (condition: ConditionChamp, index: number) => condition.estRespecteePourValeur(valeurChamp[index]);

          return conditionOu ? obligatoire.some(verificationCondition) : obligatoire.every(verificationCondition);
        },
        then: actionObligation()
      });
  }
};

const SchemaValidation = {
  objet: (objet: { [cle: string]: Yup.AnySchema }) => Yup.object().shape(objet),

  texte: (schemaParams: ISchemaCommunParams & { regexp?: TValidationText }) => {
    let schema = Yup.string();

    if (schemaParams.regexp)
      schema = schema.matches(schemaParams.regexp.valeur, schemaParams.regexp.message ?? "⚠ La valeur n'est pas conforme'");

    return gestionObligation(
      schema,
      schemaParams.obligatoire,
      () => schema.required(messagesErreur.CHAMP_OBLIGATOIRE),
      schemaParams.operateurConditionsOu
    ) as Yup.StringSchema;
  },

  entier: (schemaParams: ISchemaCommunParams & { min?: TValidationEntier; max?: TValidationEntier }) => {
    let schema = Yup.number().integer(messagesErreur.DOIT_ETRE_ENTIER).nullable();
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
    return gestionObligation(schema, schemaParams.obligatoire, () => schema.required(messagesErreur.CHAMP_OBLIGATOIRE)) as Yup.NumberSchema;
  },

  booleen: (schemaParams: ISchemaCommunParams) => {
    let schema = Yup.boolean();

    return gestionObligation(schema, schemaParams.obligatoire, () =>
      schema.required(messagesErreur.CHAMP_OBLIGATOIRE)
    ) as Yup.BooleanSchema;
  },

  listeDeroulante: (schemaParams: ISchemaCommunParams & { options?: string[]; valeursPossibles?: ValeursConditionneesMetaModele[] }) => {
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
                then: schema.oneOf(valeurPossible.valeurs, messagesErreur.CHAMP_OBLIGATOIRE)
              });
              return false;
          }
        });
      });
    }

    return gestionObligation(schema, schemaParams.obligatoire, () => schema.required(messagesErreur.CHAMP_OBLIGATOIRE)) as Yup.StringSchema;
  },

  dateComplete: (schemaParams: ISchemaCommunParams & { bloquerDateFuture: boolean }) => {
    let schema = getSchemaValidationDate(schemaParams.bloquerDateFuture)
      .test("dateCompleteObligatoireJour", (date, error) =>
        !date.jour && (Boolean(date.mois) || Boolean(date.annee))
          ? error.createError({
              path: `${error.path}.jour`,
              message: messagesErreur.DATE_INVALIDE
            })
          : true
      )
      .test("dateCompleteObligatoireJour", (date, error) =>
        !date.mois && (Boolean(date.jour) || Boolean(date.annee))
          ? error.createError({
              path: `${error.path}.mois`,
              message: messagesErreur.DATE_INVALIDE
            })
          : true
      )
      .test("dateCompleteObligatoireJour", (date, error) =>
        !date.annee && (Boolean(date.jour) || Boolean(date.mois))
          ? error.createError({
              path: `${error.path}.annee`,
              message: messagesErreur.DATE_INVALIDE
            })
          : true
      );

    return gestionObligation(schema, schemaParams.obligatoire, () =>
      schema.test("dateEntiereObligatoire", (date, error) =>
        !date.jour && !date.mois && !date.annee ? erreurSurDateEntiere(messagesErreur.DATE_OBLIGATOIRE, error.path) : true
      )
    ) as Yup.ObjectSchema<TDateChamp>;
  },

  dateIncomplete: (schemaParams: Omit<ISchemaCommunParams, "libelle"> & { bloquerDateFuture?: boolean }) => {
    let schema = getSchemaValidationDate(schemaParams.bloquerDateFuture)
      .test("anneeObligatoireSiDateSaisie", (date, error) =>
        (Boolean(date.jour) || Boolean(date.mois)) && !date.annee
          ? error.createError({ path: `${error.path}.annee`, message: messagesErreur.DATE_INVALIDE })
          : true
      )
      .test("jourSansMois", (date, error) => {
        return Boolean(date.jour) && !date.mois
          ? error.createError({
              path: `${error.path}.mois`,
              message: messagesErreur.DATE_INVALIDE
            })
          : true;
      });

    return gestionObligation(schema, schemaParams.obligatoire, () =>
      schema.test("anneeToujoursObligatoire", (date, error) =>
        !date.annee
          ? error.createError({
              path: `${error.path}.annee`,
              message: messagesErreur.DATE_OBLIGATOIRE
            })
          : true
      )
    ) as Yup.ObjectSchema<TDateChamp>;
  },

  nomSecable: (schemaParams: ISchemaCommunParams) => {
    let schema = SchemaValidation.objet({
      nom: Yup.string(),
      secable: Yup.boolean(),
      nomPartie1: Yup.string(),
      nomPartie2: Yup.string()
    });

    return gestionObligation(schema, schemaParams.obligatoire, () =>
      schema.test("nomSecableObligatoire", ({ nom }, error) =>
        !nom
          ? error.createError({
              path: `${error.path}.nom`,
              message: messagesErreur.CHAMP_OBLIGATOIRE
            })
          : true
      )
    ) as Yup.ObjectSchema<TNomSecableChamp>;
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

  numerosInscriptionRcRca: ({ prefix, tailleMax, obligatoire }: { prefix: string; tailleMax: number } & ISchemaCommunParams) => {
    const schemaNumeros: { [cle: string]: Yup.StringSchema } = {};

    Array.from({ length: tailleMax }).forEach((_, index) => {
      let schema = getSchemaValidationNumeroInscriptionRcRca();

      let estPremierObligatoire = false;

      if (index === 0) {
        schema = gestionObligation(schema, obligatoire, () => {
          estPremierObligatoire = true;

          return schema.required(messagesErreur.CHAMP_OBLIGATOIRE);
        });
      }
      if (index < tailleMax && !estPremierObligatoire) {
        const numerosSuivants = Array.from({ length: tailleMax - 1 - index }).map((_, idx) => `$${prefix}${idx + index + 2}`);
        schema = schema.when(numerosSuivants, {
          is: (...valeur: (string | undefined)[]) => valeur.some(val => Boolean(val)),
          then: schema.required(messagesErreur.CHAMP_OBLIGATOIRE)
        });
      }

      schemaNumeros[`ligne${index + 1}`] = schema;
    });

    return SchemaValidation.objet(schemaNumeros);
  },

  inconnu: () => Yup.mixed()
} as const;

export default SchemaValidation;
