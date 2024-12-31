// À tester
/* v8 ignore start */
import * as Yup from "yup";

interface IObligation {
  idChampReference: string;
  operateur: string;
  valeurs: string[];
}

interface ISchemaCommunParams {
  libelle: string;
  obligatoire?: boolean | IObligation[];
}

type TValeurChamp = string | boolean | number | undefined;

const getMessageObligatoire = (libelle: string) => `Le champ ${libelle} est obligatoire`;

const gestionObligation = (schema: Yup.AnySchema, libelle: string, obligatoire: boolean | IObligation[]): Yup.AnySchema => {
  const messageObligatoire = getMessageObligatoire(libelle);
  switch (true) {
    case obligatoire === true:
      return schema.required(messageObligatoire);
    case Array.isArray(obligatoire):
      [...(typeof obligatoire === "boolean" ? [] : obligatoire)].forEach((obligation: IObligation) => {
        schema = schema.when(`$${obligation.idChampReference}`, {
          is: (valeurChamp: TValeurChamp) =>
            obligation.operateur === "="
              ? obligation.valeurs.includes((valeurChamp ?? "").toString())
              : !obligation.valeurs.includes((valeurChamp ?? "").toString()),
          then: schema.required(messageObligatoire)
        });
      });

      return schema;
    default:
      return schema;
  }
};

const SchemaValidation = {
  texte: (schemaParams: ISchemaCommunParams) => {
    let schema = Yup.string();

    return gestionObligation(schema, schemaParams.libelle, schemaParams.obligatoire ?? false) as Yup.StringSchema;
  },

  entier: (schemaParams: ISchemaCommunParams) => {
    let schema = Yup.number().integer("La valeur doit être un entier");

    return gestionObligation(schema, schemaParams.libelle, schemaParams.obligatoire ?? false) as Yup.NumberSchema;
  },

  booleen: (schemaParams: ISchemaCommunParams) => {
    let schema = Yup.boolean();

    return gestionObligation(schema, schemaParams.libelle, schemaParams.obligatoire ?? false) as Yup.BooleanSchema;
  },

  listeDeroulante: (schemaParams: ISchemaCommunParams & { options: string[] }) => {
    let schema = Yup.string().oneOf(schemaParams.options, `Sélectionnez une valeur valide pour ${schemaParams.libelle}`);

    return gestionObligation(schema, schemaParams.libelle, schemaParams.obligatoire ?? false) as Yup.StringSchema;
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
    switch (true) {
      case schemaParams.obligatoire === true:
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
      case Array.isArray(schemaParams.obligatoire):
        [...(typeof schemaParams.obligatoire === "boolean" ? [] : (schemaParams.obligatoire ?? []))].forEach((obligation: IObligation) => {
          schema = schema.when(`$${obligation.idChampReference}`, {
            is: (valeurChamp: TValeurChamp) =>
              obligation.operateur === "="
                ? obligation.valeurs.includes((valeurChamp ?? "").toString())
                : !obligation.valeurs.includes((valeurChamp ?? "").toString()),
            then: schema
              .test("dateEntiereObligatoireJour", (date, error) =>
                !date.jour && !date.mois && !date.annee
                  ? error.createError({ path: `${error.path}.jour`, message: messageObligatoire })
                  : true
              )
              .test("dateEntiereObligatoireMois", (date, error) =>
                !date.jour && !date.mois && !date.annee
                  ? error.createError({ path: `${error.path}.mois`, message: messageObligatoire })
                  : true
              )
              .test("dateEntiereObligatoireAnnee", (date, error) =>
                !date.jour && !date.mois && !date.annee
                  ? error.createError({ path: `${error.path}.annee`, message: messageObligatoire })
                  : true
              )
          });
        });

        return schema;
      default:
        return schema;
    }
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

    switch (true) {
      case schemaParams?.obligatoire === true:
        return schema.test("anneeToujoursObligatoire", (date, error) =>
          !date.annee
            ? error.createError({
                path: `${error.path}.annee`,
                message: "L'année est obligatoire"
              })
            : true
        );
      case Array.isArray(schemaParams?.obligatoire):
        [...(typeof schemaParams?.obligatoire === "boolean" ? [] : (schemaParams?.obligatoire ?? []))].forEach(
          (obligation: IObligation) => {
            schema = schema.when(`$${obligation.idChampReference}`, {
              is: (valeurChamp: TValeurChamp) =>
                obligation.operateur === "="
                  ? obligation.valeurs.includes((valeurChamp ?? "").toString())
                  : !obligation.valeurs.includes((valeurChamp ?? "").toString()),
              then: schema.test("anneeToujoursObligatoire", (date, error) =>
                !date.annee
                  ? error.createError({
                      path: `${error.path}.annee`,
                      message: "L'année est obligatoire"
                    })
                  : true
              )
            });
          }
        );

        return schema;
      default:
        return schema;
    }
  },

  inconnu: () => Yup.mixed()
} as const;

export default SchemaValidation;
/* v8 ignore end */
