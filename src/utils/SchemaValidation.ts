// À tester
/* v8 ignore start */
import { IExigence, IValeursPossibles } from "@model/etatcivil/acte/mention/IMetaModeleTypeMention";
import * as Yup from "yup";

interface ISchemaCommunParams {
  libelle: string;
  obligatoire: boolean | IExigence[];
}

type TValeurChamp = string | boolean | number | undefined;

interface IDateCompose {
  jour: string;
  mois: string;
  annee: string;
}

const MOIS_MAXIMUM = 12;

const getSchemaValidationDate = (bloquerDateFutur: boolean) =>
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
            message: "⚠ La date est invalide"
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
            message: "⚠ La date est invalide"
          })
        : true
    );

const DateUtils = {
  estDateValide: (date: IDateCompose): boolean => {
    if (!date || !date.annee) return false;

    switch (true) {
      case !date.jour && !date.mois:
        return true;

      case !date.jour && Boolean(date.mois):
        return Number(date.mois) <= MOIS_MAXIMUM;

      case Boolean(date.jour):
        const dateObj = new Date(Number(date.annee), Number(date.mois) - 1, Number(date.jour));
        const dateIso = `${date.annee}-${date.mois}-${date.jour}`;
        const timestamp = Date.parse(dateIso);

        return !isNaN(timestamp) && dateObj.getDate() === Number(date.jour);
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

const getMessageObligatoire = (libelle: string) => `⚠ La saisie du champ est obligatoire`;

const gestionObligation = (schema: Yup.AnySchema, libelle: string, obligatoire: boolean | IExigence[]): Yup.AnySchema => {
  const messageObligatoire = getMessageObligatoire(libelle);

  if (typeof obligatoire === "boolean") {
    return obligatoire ? schema.required(messageObligatoire) : schema;
  }

  obligatoire.some((obligation: IExigence) => {
    switch (obligation.operateur) {
      case "AlwaysTrue":
        schema = schema.required(messageObligatoire);
        return true;
      case "AlwaysFalse":
        return true;
      default:
        schema = schema.when(`$${obligation.idChampReference}`, {
          is: (valeurChamp: TValeurChamp) =>
            obligation.operateur === "=="
              ? obligation.valeurs?.includes((valeurChamp ?? "").toString())
              : !obligation.valeurs?.includes((valeurChamp ?? "").toString()),
          then: schema.required(messageObligatoire)
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
    let schema = Yup.number().integer("⚠ La valeur doit être un entier");

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

  dateComplete: (schemaParams: ISchemaCommunParams, bloquerDateFutur: boolean = false) => {
    let schema = getSchemaValidationDate(bloquerDateFutur).test("dateCompleteObligatoire", (date, error) =>
      !date.jour || !date.mois || !date.annee
        ? error.createError({
            path: `${error.path}.annee`,
            message: "⚠ La date est invalide"
          })
        : true
    );

    const messageObligatoire = getMessageObligatoire(schemaParams.libelle);

    if (schemaParams.obligatoire === false) return schema;

    if (schemaParams.obligatoire === true || schemaParams.obligatoire.some(obligation => obligation.operateur === "AlwaysTrue")) {
      return schema
        .test("dateEntiereObligatoireJour", (date, error) =>
          !date.jour && !date.mois && !date.annee ? error.createError({ path: `${error.path}.jour`, message: messageObligatoire }) : true
        )
        .test("dateEntiereObligatoireMois", (date, error) =>
          !date.jour && !date.mois && !date.annee ? error.createError({ path: `${error.path}.mois`, message: messageObligatoire }) : true
        )
        .test("dateEntiereObligatoireAnnee", (date, error) =>
          !date.jour && !date.mois && !date.annee ? error.createError({ path: `${error.path}.annee`, message: messageObligatoire }) : true
        );
    }

    schemaParams.obligatoire.forEach((obligation: IExigence) => {
      schema = schema.when(`$${obligation.idChampReference}`, {
        is: (valeurChamp: TValeurChamp) =>
          obligation.operateur === "=="
            ? obligation.valeurs?.includes((valeurChamp ?? "").toString())
            : !obligation.valeurs?.includes((valeurChamp ?? "").toString()),
        then: schema
          .test("dateEntiereObligatoireJour", (date, error) =>
            !date.jour && !date.mois && !date.annee ? error.createError({ path: `${error.path}.jour`, message: messageObligatoire }) : true
          )
          .test("dateEntiereObligatoireMois", (date, error) =>
            !date.jour && !date.mois && !date.annee ? error.createError({ path: `${error.path}.mois`, message: messageObligatoire }) : true
          )
          .test("dateEntiereObligatoireAnnee", (date, error) =>
            !date.jour && !date.mois && !date.annee ? error.createError({ path: `${error.path}.annee`, message: messageObligatoire }) : true
          )
      });
    });
    return schema;
  },

  dateIncomplete: (schemaParams?: Omit<ISchemaCommunParams, "libelle">, bloquerDateFutur: boolean = false) => {
    let schema = getSchemaValidationDate(bloquerDateFutur);

    if (schemaParams?.obligatoire === false) return schema;

    if (schemaParams?.obligatoire === true || schemaParams?.obligatoire.some(obligation => obligation.operateur === "AlwaysTrue")) {
      return schema.test("anneeToujoursObligatoire", (date, error) =>
        !date.annee
          ? error.createError({
              path: `${error.path}.annee`,
              message: "⚠ La saisie de la date est obligatoire"
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
                message: "⚠ La saisie de la date est obligatoire"
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
