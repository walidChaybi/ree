/* v8 ignore start */
import { IMetaModelBloc } from "@model/etatcivil/acte/mention/IMetaModeleTypeMention";
import { useFormikContext } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { recupererValeurAttribut } from "./AideALaSaisieMentionForm";

interface IDate {
  jour: string;
  mois: string;
  annee: string;
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
  formaterDate: ({ jour, mois, annee }: IDate): string => {
    const moisFormate = mois ? MOIS[parseInt(mois, 10) - 1] : null;
    const jourFormate = jour ? jour.replace(/^0/, "") : null;

    switch (true) {
      case Boolean(jourFormate && moisFormate):
        return `le ${jourFormate === "1" ? "1er" : jourFormate} ${moisFormate} ${annee}`;
      case Boolean(moisFormate):
        return `en ${moisFormate} ${annee}`;
      default:
        return `en ${annee}`;
    }
  }
};

const genererPourSaisie = (modeleTexte: string, valeurs: any, valeursDefaut: any) => {
  const texteParConditions =
    modeleTexte.match(/({{#if[a-zA-Zà-úÀ-Ú0-9 .'()]{0,200}}})|({{else}})|({{\/if}})|({{valeur[a-zA-Z0-9 .']{0,200}}})|[^{}]{0,500}/g) ?? [];

  const valeursEtConditions: (string | TCondition)[] = [];
  const conditionsEnCours: IConditionEncours[] = [];

  const insererValeur = (valeur: string): string => {
    if (!valeur.startsWith("{{valeur '")) {
      return valeur;
    }

    const cle = valeur.replace(/({{valeur '|'|}})/g, "");
    const valeurRenseignee = recupererValeurAttribut(valeurs, cle);

    switch (true) {
      case typeof valeurRenseignee === "object" && Boolean(valeurRenseignee.annee):
        return FormaterTexteHelper.formaterDate(valeurRenseignee as unknown as IDate);
      case valeurRenseignee && typeof valeurRenseignee !== "object":
        return `${valeurRenseignee}`;
    }

    const valeurDefaut = recupererValeurAttribut(valeursDefaut, cle);

    return `${valeurDefaut !== undefined && typeof valeurDefaut !== "object" ? valeurDefaut : cle}`.toUpperCase();
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
          si: valeur
            .replace(/{{#if|}}|\(eq|\)/g, "")
            .trim()
            .replace("'", "")
            .replace(/'$/, ""),
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
    const [cle, ...valeur] = condition.si.split(" ");
    const valeurSaisie = recupererValeurAttribut(valeurs, cle);
    const conditionValide = valeur.length ? valeurSaisie?.toString() === valeur.join(" ") : Boolean(valeurSaisie);

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

const genererValeursParDefaut = (blocs: IMetaModelBloc[]) =>
  blocs.reduce((placeholders, bloc) => {
    const libelleBloc = bloc.titre
      .replace(/\(.{1,50}\)/, "")
      .trim()
      .toUpperCase();

    return {
      ...placeholders,
      [bloc.id]: bloc.champs.reduce(
        (placeholdersChamps, champ) => ({
          ...placeholdersChamps,
          [champ.id]: `${champ.libelle.toUpperCase()} <${libelleBloc}>`
        }),
        {}
      )
    };
  }, {});

export const TexteMentionAideALaSaisie: React.FC<{ blocs: IMetaModelBloc[]; templateTexteMention: string }> = ({
  blocs,
  templateTexteMention
}) => {
  const valeursParDefaut = useMemo(() => genererValeursParDefaut(blocs), [blocs]);
  const { values, setFieldValue } = useFormikContext<any>();
  const [texteSaisie, setTexteSaisie] = useState("");
  const [textesEditables, setTextesEditables] = useState<{ [index: number]: any }>([]);

  const decouperTexteEditable = (texte: string) =>
    texte
      .split(/\[\[|\]\]/)
      .filter(partieTexte => partieTexte)
      .map(texte => {
        const donneesEditables = /^(\d+)@(.*)/.exec(texte);
        if (!donneesEditables) {
          return texte;
        }

        const donnees = {
          index: parseInt(donneesEditables[1]),
          original: donneesEditables[2]
        };

        if (textesEditables[donnees.index]?.original !== donnees.original) {
          setTextesEditables(prec => ({
            ...prec,
            [donnees.index]: {
              original: donnees.original,
              edite: donnees.original
            }
          }));
        }

        return {
          index: parseInt(donneesEditables[1])
        };
      });

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

          return textesEditables[indexEditable]?.edite ?? "";
        })
        .join("")
    );
  }, [texteSaisie, textesEditables]);

  useEffect(() => {
    setTexteSaisie(genererPourSaisie(templateTexteMention, values, valeursParDefaut));
  }, [values]);

  return (
    <div className={"min-h-28 rounded border border-solid border-gris px-2 py-3"}>
      <div className={"text-left"}>
        {decouperTexteEditable(texteSaisie).map(donnees =>
          typeof donnees === "string" ? (
            <span
              key={donnees}
              className={"select-none rounded bg-gris-transparent px-0.5"}
            >
              {donnees}
            </span>
          ) : (
            textesEditables[donnees.index] && (
              <span
                key={donnees.index}
                contentEditable
                className={"rounded px-0.5 outline-none transition-colors hover:bg-bleu-transparent focus-visible:bg-bleu-transparent"}
                onBlur={e => {
                  setTextesEditables(prec => ({
                    ...prec,
                    [donnees.index]: {
                      ...prec[donnees.index],
                      edite: e.target.innerText ?? ""
                    }
                  }));
                }}
                dangerouslySetInnerHTML={{ __html: textesEditables[donnees.index].edite }}
              ></span>
            )
          )
        )}
      </div>
    </div>
  );
};

/* v8 ignore end */
