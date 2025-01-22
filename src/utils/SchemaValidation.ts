// À tester
/* v8 ignore start */
import { IExigence, IValeursPossibles } from "@model/etatcivil/acte/mention/IMetaModeleTypeMention";
import * as Yup from "yup";

interface ISchemaCommunParams {
  libelle: string;
  obligatoire: boolean | IExigence[];
}

type TValeurChamp = string | boolean | number | undefined;

const getMessageObligatoire = (libelle: string) => `Le champ ${libelle} est obligatoire`;

const gestionObligation = (schema: Yup.AnySchema, libelle: string, obligatoire: boolean | IExigence[]): Yup.AnySchema => {
  const messageObligatoire = getMessageObligatoire(libelle);

  if (typeof obligatoire === "boolean") {
    return obligatoire ? schema.required(messageObligatoire) : schema;
  }

  obligatoire.some((obligation: IExigence) => {
    if (obligation.operateur === "AlwaysTrue") {
      schema = schema.required(messageObligatoire);

      return true;
    }

    if (obligation.operateur === "AlwaysFalse") return true;

    schema = schema.when(`$${obligation.idChampReference}`, {
      is: (valeurChamp: TValeurChamp) =>
        obligation.operateur === "=="
          ? obligation.valeurs?.includes((valeurChamp ?? "").toString())
          : !obligation.valeurs?.includes((valeurChamp ?? "").toString()),
      then: schema.required(messageObligatoire)
    });
  });

  return schema;
};

const SchemaValidation = {
  texte: (schemaParams: ISchemaCommunParams) => {
    let schema = Yup.string();

    return gestionObligation(schema, schemaParams.libelle, schemaParams.obligatoire) as Yup.StringSchema;
  },

  entier: (schemaParams: ISchemaCommunParams) => {
    let schema = Yup.number().integer("La valeur doit être un entier");

    return gestionObligation(schema, schemaParams.libelle, schemaParams.obligatoire) as Yup.NumberSchema;
  },

  booleen: (schemaParams: ISchemaCommunParams) => {
    let schema = Yup.boolean();

    return gestionObligation(schema, schemaParams.libelle, schemaParams.obligatoire) as Yup.BooleanSchema;
  },

  listeDeroulante: (schemaParams: ISchemaCommunParams & { options?: string[]; valeursPossibles?: IValeursPossibles[] }) => {
    const messageObligatoire = `Sélectionnez une valeur valide pour ${schemaParams.libelle}`;
    let schema = Yup.string();

    if (schemaParams.options) {
      schema = schema.oneOf(schemaParams.options, `Sélectionnez une valeur valide pour ${schemaParams.libelle}`);
    }

    if (schemaParams.valeursPossibles) {
      schemaParams.valeursPossibles.forEach((valeurPossible: IValeursPossibles) => {
        valeurPossible.conditions.some((obligation: IExigence) => {
          if (obligation.operateur === "AlwaysTrue") {
            schema = schema.oneOf(valeurPossible.valeurs, messageObligatoire);

            return true;
          }

          if (obligation.operateur === "AlwaysFalse") return true;

          schema = schema.when(`$${obligation.idChampReference}`, {
            is: (valeurChamp: TValeurChamp) =>
              obligation.operateur === "=="
                ? obligation.valeurs?.includes((valeurChamp ?? "").toString())
                : !obligation.valeurs?.includes((valeurChamp ?? "").toString()),
            then: schema.oneOf(valeurPossible.valeurs, messageObligatoire)
          });
        });
      });
    }

    return gestionObligation(schema, schemaParams.libelle, schemaParams.obligatoire) as Yup.StringSchema;
  },

  dateComplete: (schemaParams: ISchemaCommunParams) => {
    let schema = Yup.object()
      .shape({
        jour: Yup.number(),
        mois: Yup.number(),
        annee: Yup.number()
      })
      .test("dateCompleteObligatoireJour", (date, error) =>
        !date.jour && (Boolean(date.mois) || Boolean(date.annee))
          ? error.createError({
              path: `${error.path}.jour`,
              message: "Le jour est obligatoire"
            })
          : true
      )
      .test("dateCompleteObligatoireJour", (date, error) =>
        !date.mois && (Boolean(date.jour) || Boolean(date.annee))
          ? error.createError({
              path: `${error.path}.mois`,
              message: "Le mois est obligatoire"
            })
          : true
      )
      .test("dateCompleteObligatoireJour", (date, error) =>
        !date.annee && (Boolean(date.jour) || Boolean(date.mois))
          ? error.createError({
              path: `${error.path}.annee`,
              message: "L'année est obligatoire"
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
      return schema.when(`$${obligation.idChampReference}`, {
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
  },

  dateIncomplete: (schemaParams?: Omit<ISchemaCommunParams, "libelle">) => {
    let schema = Yup.object()
      .shape({
        jour: Yup.number(),
        mois: Yup.number(),
        annee: Yup.number()
      })
      .test("anneeObligatoire", (date, error) =>
        (date.jour || date.mois) && !date.annee
          ? error.createError({
              path: `${error.path}.annee`,
              message: "L'année est obligatoire"
            })
          : true
      )
      .test("moisObligatoire", (date, error) =>
        date.jour && !date.mois
          ? error.createError({
              path: `${error.path}.mois`,
              message: "Le mois est obligatoire"
            })
          : true
      );

    if (schemaParams?.obligatoire === false) return schema;

    if (schemaParams?.obligatoire === true || schemaParams?.obligatoire.some(obligation => obligation.operateur === "AlwaysTrue")) {
      return schema.test("anneeToujoursObligatoire", (date, error) =>
        !date.annee
          ? error.createError({
              path: `${error.path}.annee`,
              message: "L'année est obligatoire"
            })
          : true
      );
    }

    schemaParams?.obligatoire?.forEach((obligation: IExigence) => {
      return schema.when(`$${obligation.idChampReference}`, {
        is: (valeurChamp: TValeurChamp) =>
          obligation.operateur === "=="
            ? obligation.valeurs?.includes((valeurChamp ?? "").toString())
            : !obligation.valeurs?.includes((valeurChamp ?? "").toString()),
        then: schema.test("anneeToujoursObligatoire", (date, error) =>
          !date.annee
            ? error.createError({
                path: `${error.path}.annee`,
                message: "L'année est obligatoire"
              })
            : true
        )
      });
    });
  },

  inconnu: () => Yup.mixed()
} as const;

export default SchemaValidation;
/* v8 ignore end */
