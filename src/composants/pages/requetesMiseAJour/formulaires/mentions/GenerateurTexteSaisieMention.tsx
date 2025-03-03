/* v8 ignore start */
import { ObjetFormulaire } from "@model/form/commun/ObjetFormulaire";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import Texte from "../../../../../utils/Texte";
import { TMentionForm } from "../MentionForm";

interface IDate {
  jour: string;
  mois: string;
  annee: string;
  sansPrefix?: boolean;
}

type TCondition = {
  si: string;
  alors: (string | TCondition)[];
  sinon: (string | TCondition)[];
};

interface IConditionEncours {
  index: number;
  estSinon: boolean;
}

const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

const FormaterTexteHelper = {
  formaterDate: ({ jour, mois, annee, sansPrefix }: IDate): string => {
    const moisFormate = mois ? MOIS[parseInt(mois, 10) - 1] : null;
    const jourFormate = jour ? jour.replace(/^0/, "") : null;

    switch (true) {
      case !annee:
        return "";
      case Boolean(jourFormate && moisFormate):
        return `${sansPrefix ? "" : "le "}${jourFormate === "1" ? "1er" : jourFormate} ${moisFormate} ${annee}`;
      case Boolean(moisFormate):
        return `${sansPrefix ? "" : "en "}${moisFormate} ${annee}`;
      default:
        return `${sansPrefix ? "" : "en "}${annee}`;
    }
  }
};

const genererPourSaisie = (modeleTexte: string, valeurs: TMentionForm) => {
  const texteParConditions = modeleTexte.match(/({{#if[^}]{0,200}}})|({{else}})|({{\/if}})|({{#valeur[^}]{0,200}}})|[^{}]{0,500}/g) ?? [];

  const valeursEtConditions: (string | TCondition)[] = [];
  const conditionsEnCours: IConditionEncours[] = [];

  const insererValeur = (valeur: string): string => {
    if (!valeur.startsWith("{{#valeur ")) {
      return valeur;
    }

    const [cle, ...partiesValeurDefaut] = valeur.replace(/({{#valeur |}})/g, "").split(" ");
    const valeurRenseignee = ObjetFormulaire.recupererValeur({ valeurs: valeurs, cleAttribut: cle });
    const valeurDefaut = `${partiesValeurDefaut.join(" ")}`.toUpperCase();

    switch (true) {
      case Array.isArray(valeurRenseignee):
        return valeurDefaut;
      case typeof valeurRenseignee === "object" && Object.keys(valeurRenseignee).includes("annee"):
        return FormaterTexteHelper.formaterDate(valeurRenseignee as unknown as IDate) || valeurDefaut;
      case valeurRenseignee && typeof valeurRenseignee !== "object":
        return `${valeurRenseignee}`;
      default:
        return valeurDefaut;
    }
  };

  const ajouterCondition = (
    tableauPourAjout: (string | TCondition)[],
    listeConditionsEnCours: IConditionEncours[],
    condition: TCondition
  ) => {
    if (!listeConditionsEnCours.length) {
      const indexCondition = tableauPourAjout.push(condition) - 1;
      conditionsEnCours.push({ index: indexCondition, estSinon: false });

      return;
    }

    const conditionSuivante = listeConditionsEnCours.shift() as IConditionEncours;
    ajouterCondition(
      (tableauPourAjout[conditionSuivante.index] as TCondition)?.[conditionSuivante.estSinon ? "sinon" : "alors"],
      listeConditionsEnCours,
      condition
    );
  };

  const ajouterValeurACondition = (
    tableauPourAjout: (string | TCondition)[],
    listeConditionsEnCours: IConditionEncours[],
    valeur: string
  ) => {
    if (!listeConditionsEnCours.length) {
      tableauPourAjout.push(valeur);

      return;
    }

    const conditionSuivante = listeConditionsEnCours.shift() as IConditionEncours;
    ajouterValeurACondition(
      (tableauPourAjout[conditionSuivante.index] as TCondition)?.[conditionSuivante.estSinon ? "sinon" : "alors"],
      listeConditionsEnCours,
      valeur
    );
  };

  texteParConditions.forEach(valeur => {
    switch (true) {
      case valeur.startsWith("{{#if "):
        ajouterCondition(valeursEtConditions, [...conditionsEnCours], {
          si: valeur.replace(/{{#if|}}/g, "").trim(),
          alors: [],
          sinon: []
        });
        break;
      case valeur === "{{else}}":
        conditionsEnCours[conditionsEnCours.length - 1].estSinon = true;
        break;
      case valeur === "{{/if}}":
        conditionsEnCours.pop();
        break;
      case Boolean(conditionsEnCours.length):
        ajouterValeurACondition(valeursEtConditions, [...conditionsEnCours], insererValeur(valeur));
        break;
      default:
        valeursEtConditions.push(insererValeur(valeur));
        break;
    }
  });

  const gererConditon = (condition: TCondition): string[] => {
    const conditionValide = condition.si
      .split("&")
      .filter(partieCondition => Boolean(partieCondition.trim()))
      .every(partieCondition => {
        const [cle, ...valeurAttendue] = partieCondition.trim().split(" ");
        const negation = cle.startsWith("!");
        const valeurSaisie = Texte.normalise(ObjetFormulaire.recupererValeurTexte({ valeurs: valeurs, cleAttribut: cle.replace("!", "") }));
        const comparaison = valeurAttendue.length ? valeurSaisie === Texte.normalise(valeurAttendue.join(" ")) : Boolean(valeurSaisie);

        return negation ? !comparaison : comparaison;
      });

    return (conditionValide ? condition.alors : condition.sinon).reduce(
      (valeursCondition: string[], valeur: string | TCondition) => [
        ...valeursCondition,
        ...(typeof valeur === "string" ? [valeur] : gererConditon(valeur))
      ],
      []
    );
  };

  return valeursEtConditions
    .reduce(
      (partiesTexte: string[], valeurOuCondition: string | TCondition) => [
        ...partiesTexte,
        ...(typeof valeurOuCondition === "string" ? [valeurOuCondition] : gererConditon(valeurOuCondition))
      ],
      []
    )
    .join("");
};

export const TexteMentionAideALaSaisie: React.FC<{ templateTexteMention: string }> = ({ templateTexteMention }) => {
  const { values, setFieldValue } = useFormikContext<TMentionForm>();
  const [texteSaisie, setTexteSaisie] = useState("");

  const decouperTexteEditable = (texte: string) =>
    texte
      .split(/\[\[|\]\]/)
      .filter(partieTexte => partieTexte)
      .map((texte, index) => {
        const donneesEditables = /^(\d+)@(.*)/.exec(texte);
        if (!donneesEditables) {
          return { index: index, texte: texte };
        }

        const donnees = {
          index: parseInt(donneesEditables[1]),
          original: donneesEditables[2]
        };

        if (values.textesEdites[donnees.index]?.original !== donnees.original) {
          setFieldValue("textesEdites", {
            ...values.textesEdites,
            [donnees.index]: {
              original: donnees.original,
              edite: donnees.original
            }
          });
        }

        return {
          index: parseInt(donneesEditables[1]),
          texte: null
        };
      });

  useEffect(() => {
    setTexteSaisie(genererPourSaisie(templateTexteMention, values));
  }, [values]);

  useEffect(() => {
    setFieldValue(
      "texteMention",
      texteSaisie
        .split(/\[\[|\]\]/)
        .filter(partieTexte => partieTexte)
        .map(texte => {
          const donneesEditables = /^(\d+)@(.*)/.exec(texte);
          if (!donneesEditables) {
            return texte;
          }

          const indexEditable = parseInt(donneesEditables[1]);

          return values.textesEdites[indexEditable]?.edite ?? "";
        })
        .join("")
    );
  }, [texteSaisie, values.textesEdites]);

  return (
    <div className="text-start">
      <div className="mb-1 ml-1 text-bleu-sombre">{"Texte mention"}</div>
      <div className={"min-h-28 rounded border border-solid border-gris px-2 py-3"}>
        <div className={"text-left"}>
          {decouperTexteEditable(texteSaisie).map(donnees =>
            donnees.texte !== null ? (
              <span
                key={`non-editable--${donnees.index}`}
                className={"select-none rounded bg-gris-transparent px-0.5"}
              >
                {donnees.texte}
              </span>
            ) : (
              values.textesEdites[donnees.index] && (
                <span
                  key={`editable--${donnees.index}`}
                  contentEditable
                  className={"rounded px-0.5 outline-none transition-colors hover:bg-bleu-transparent focus-visible:bg-bleu-transparent"}
                  onBlur={e =>
                    setFieldValue("textesEdites", {
                      ...values.textesEdites,
                      [donnees.index]: {
                        ...values.textesEdites[donnees.index],
                        edite: e.target.innerText ?? ""
                      }
                    })
                  }
                  dangerouslySetInnerHTML={{ __html: values.textesEdites[donnees.index].edite }}
                ></span>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

/* v8 ignore end */
