// À tester
/* v8 ignore start */
import { IExigence, IValeursPossibles } from "@model/etatcivil/acte/mention/IMetaModeleTypeMention";
import * as Yup from "yup";

interface ISchemaCommunParams {
  libelle: string;
  obligatoire: boolean | IExigence[];
}

type TValeurChamp = string | boolean | number | undefined;

type TDateChamp = {
  jour: Yup.StringSchema<string | undefined>;
  mois: Yup.StringSchema<string | undefined>;
  annee: Yup.StringSchema<string | undefined>;
};

interface IDateCompose {
  jour: string;
  mois: string;
  annee: string;
}

const MOIS_MAXIMUM = 12;

const messagesErreur = {
  DATE_INVALIDE: "⚠ La date est invalide",
  DOIT_ETRE_ENTIER: "⚠ La valeur doit être un entier",
  CHAMP_OBLIGATOIRE: "⚠ La saisie du champ est obligatoire"
};

const getSchemaValidationDate = (bloquerDateFutur?: boolean): Yup.ObjectSchema<TDateChamp> =>
  Yup.object()
    .shape({
      jour: Yup.string(),
      mois: Yup.string(),
      annee: Yup.string()
    })
    .test("dateValide", (date, error) => {
      return !DateUtils.estDateValide({
        jour: date.jour ?? "",
        mois: date.mois ?? "",
        annee: date.annee ?? ""
      })
        ? error.createError({
            path: `${error.path}.annee`,
            message: messagesErreur.DATE_INVALIDE
          })
        : true;
    })
    .test("dateFutur", (date, error) =>
      bloquerDateFutur &&
      DateUtils.estDateFutur({
        jour: date.jour ?? "",
        mois: date.mois ?? "",
        annee: date.annee ?? ""
      })
        ? error.createError({
            path: `${error.path}.annee`,
            message: messagesErreur.DATE_INVALIDE
          })
        : true
    );

const getValidationDateEntiereObligatoire = (schema: Yup.ObjectSchema<TDateChamp>) => {
  return schema
    .test("dateEntiereObligatoireJour", (date, error) =>
      !date.jour && !date.mois && !date.annee
        ? error.createError({ path: `${error.path}.jour`, message: messagesErreur.CHAMP_OBLIGATOIRE })
        : true
    )
    .test("dateEntiereObligatoireMois", (date, error) =>
      !date.jour && !date.mois && !date.annee
        ? error.createError({ path: `${error.path}.mois`, message: messagesErreur.CHAMP_OBLIGATOIRE })
        : true
    )
    .test("dateEntiereObligatoireAnnee", (date, error) =>
      !date.jour && !date.mois && !date.annee
        ? error.createError({ path: `${error.path}.annee`, message: messagesErreur.CHAMP_OBLIGATOIRE })
        : true
    );
};

const DateUtils = {
  estDateValide: (date: IDateCompose): boolean => {
    if (!date.annee) return false;

    switch (true) {
      case !date.jour && !date.mois:
        return true;

      case !date.jour && Boolean(date.mois):
        return Number(date.mois) <= MOIS_MAXIMUM;

      case Boolean(date.jour):
        return (() => {
          const dateObj = new Date(Number(date.annee), Number(date.mois) - 1, Number(date.jour));
          const dateIso = `${date.annee}-${date.mois}-${date.jour}`;
          const timestamp = Date.parse(dateIso);

          return !isNaN(timestamp) && dateObj.getDate() === Number(date.jour);
        })();
    }

    return true;
  },
  estDateFutur: (date: IDateCompose): boolean => {
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
  }
};

const gestionObligation = (schema: Yup.AnySchema, libelle: string, obligatoire: boolean | IExigence[]): Yup.AnySchema => {
  if (typeof obligatoire === "boolean") {
    return obligatoire ? schema.required(messagesErreur.CHAMP_OBLIGATOIRE) : schema;
  }

  obligatoire.some((obligation: IExigence) => {
    switch (obligation.operateur) {
      case "AlwaysTrue":
        schema = schema.required(messagesErreur.CHAMP_OBLIGATOIRE);
        return true;
      case "AlwaysFalse":
        return true;
      default:
        schema = schema.when(`$${obligation.idChampReference}`, {
          is: (valeurChamp: TValeurChamp) =>
            obligation.operateur === "=="
              ? obligation.valeurs?.includes((valeurChamp ?? "").toString())
              : !obligation.valeurs?.includes((valeurChamp ?? "").toString()),
          then: schema.required(messagesErreur.CHAMP_OBLIGATOIRE)
        });
        return false;
    }
  });

  return schema;
};

const SchemaValidation = {
  texte: (schemaParams: ISchemaCommunParams) => {
    let schema = Yup.string();

    return gestionObligation(schema, schemaParams.libelle, schemaParams.obligatoire) as Yup.StringSchema;
  },

  entier: (schemaParams: ISchemaCommunParams) => {
    let schema = Yup.number().integer(messagesErreur.DOIT_ETRE_ENTIER);

    return gestionObligation(schema, schemaParams.libelle, schemaParams.obligatoire) as Yup.NumberSchema;
  },

  booleen: (schemaParams: ISchemaCommunParams) => {
    let schema = Yup.boolean();

    return gestionObligation(schema, schemaParams.libelle, schemaParams.obligatoire) as Yup.BooleanSchema;
  },

  listeDeroulante: (schemaParams: ISchemaCommunParams & { options?: string[]; valeursPossibles?: IValeursPossibles[] }) => {
    const messageObligatoire = `⚠ Sélectionnez une valeur valide pour ${schemaParams.libelle}`;
    let schema = Yup.string();

    if (schemaParams.options) {
      schema = schema.oneOf(schemaParams.options, `⚠ Sélectionnez une valeur valide pour ${schemaParams.libelle}`);
    }

    if (schemaParams.valeursPossibles) {
      schemaParams.valeursPossibles.forEach((valeurPossible: IValeursPossibles) => {
        valeurPossible.conditions.some((obligation: IExigence) => {
          switch (obligation.operateur) {
            case "AlwaysTrue":
              schema = schema.oneOf(valeurPossible.valeurs, messageObligatoire);
              return true;
            case "AlwaysFalse":
              return true;
            default:
              schema = schema.when(`$${obligation.idChampReference}`, {
                is: (valeurChamp: TValeurChamp) =>
                  obligation.operateur === "=="
                    ? obligation.valeurs?.includes((valeurChamp ?? "").toString())
                    : !obligation.valeurs?.includes((valeurChamp ?? "").toString()),
                then: schema.oneOf(valeurPossible.valeurs, messageObligatoire)
              });
              return false;
          }
        });
      });
    }

    return gestionObligation(schema, schemaParams.libelle, schemaParams.obligatoire) as Yup.StringSchema;
  },

  dateComplete: (schemaParams: ISchemaCommunParams & { bloquerDateFutur: boolean }) => {
    let schema = getSchemaValidationDate(schemaParams.bloquerDateFutur)
      .test("dateCompleteObligatoireJour", (date, error) =>
        !date.jour && (Boolean(date.mois) || Boolean(date.annee))
          ? error.createError({
              path: `${error.path}.jour`,
              message: messagesErreur.CHAMP_OBLIGATOIRE
            })
          : true
      )
      .test("dateCompleteObligatoireJour", (date, error) =>
        !date.mois && (Boolean(date.jour) || Boolean(date.annee))
          ? error.createError({
              path: `${error.path}.mois`,
              message: messagesErreur.CHAMP_OBLIGATOIRE
            })
          : true
      )
      .test("dateCompleteObligatoireJour", (date, error) =>
        !date.annee && (Boolean(date.jour) || Boolean(date.mois))
          ? error.createError({
              path: `${error.path}.annee`,
              message: messagesErreur.CHAMP_OBLIGATOIRE
            })
          : true
      );

    if (schemaParams.obligatoire === false) return schema;

    if (schemaParams.obligatoire === true || schemaParams.obligatoire.some(obligation => obligation.operateur === "AlwaysTrue")) {
      return getValidationDateEntiereObligatoire(schema);
    }

    schemaParams.obligatoire.forEach((obligation: IExigence) => {
      schema = schema.when(`$${obligation.idChampReference}`, {
        is: (valeurChamp: TValeurChamp) =>
          obligation.operateur === "=="
            ? obligation.valeurs?.includes((valeurChamp ?? "").toString())
            : !obligation.valeurs?.includes((valeurChamp ?? "").toString()),
        then: getValidationDateEntiereObligatoire(schema)
      });
    });
    return schema;
  },

  dateIncomplete: (schemaParams: Omit<ISchemaCommunParams, "libelle"> & { bloquerDateFutur?: boolean }) => {
    let schema = getSchemaValidationDate(schemaParams.bloquerDateFutur).test("anneeObligatoireSiDateSaisie", (date, error) =>
      (Boolean(date.jour) || Boolean(date.mois)) && !date.annee
        ? error.createError({ path: `${error.path}.annee`, message: messagesErreur.DATE_INVALIDE })
        : true
    );
    schema = getValidationDateEntiereObligatoire(schema);
    console.log("schema APRES : ", schema);

    if (schemaParams.obligatoire === false) return schema;

    if (schemaParams.obligatoire === true || schemaParams.obligatoire.some(obligation => obligation.operateur === "AlwaysTrue")) {
      return schema.test("anneeToujoursObligatoire", (date, error) =>
        !date.annee
          ? error.createError({
              path: `${error.path}.annee`,
              message: messagesErreur.CHAMP_OBLIGATOIRE
            })
          : true
      );
    }

    schemaParams?.obligatoire?.forEach((obligation: IExigence) => {
      schema = schema.when(`$${obligation.idChampReference}`, {
        is: (valeurChamp: TValeurChamp) =>
          obligation.operateur === "=="
            ? obligation.valeurs?.includes((valeurChamp ?? "").toString())
            : !obligation.valeurs?.includes((valeurChamp ?? "").toString()),
        then: schema.test("anneeToujoursObligatoire", (date, error) =>
          !date.annee
            ? error.createError({
                path: `${error.path}.annee`,
                message: messagesErreur.CHAMP_OBLIGATOIRE
              })
            : true
        )
      });
    });
    return schema;
  },

  inconnu: () => Yup.mixed()
} as const;

export default SchemaValidation;
/* v8 ignore end */
