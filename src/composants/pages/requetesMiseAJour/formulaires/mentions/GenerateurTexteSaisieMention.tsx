import { IMetaModelBloc } from "@model/etatcivil/acte/mention/IMetaModeleTypeMention";
import { useFormikContext } from "formik";
import Handlebars from "handlebars";
import React, { useEffect, useMemo, useState } from "react";
import { recupererValeurAttribut } from "./AideALaSaisieMentionForm";

// A tester Alexandre 22/01/25
/* v8 ignore start */
interface IDate {
  jour: string;
  mois: string;
  annee: string;
}

const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

const formaterDate = ({ jour, mois, annee }: IDate): string => {
  if (jour && mois && annee) return `le ${jour.replace(/^0/, "")}${jour === "01" ? "er" : ""} ${MOIS[parseInt(mois, 10) - 1]} ${annee}`;

  return `en ${mois ? MOIS[parseInt(mois, 10) - 1] : ""} ${annee}`;
};

const decoder = (str: string) => str.replace(/&#x27;/g, "'").replace(/&#39;/g, "'");

const GenerateurMention = {
  ajouterHelpers: (valeurs: any, valeurDefaut: any) => {
    Handlebars.registerHelper("valeur", (nomAttribut: string) => {
      const valeurRenseignee = recupererValeurAttribut(valeurs, nomAttribut);
      const estValeurDate = typeof valeurRenseignee === "object";

      if (valeurRenseignee && (!estValeurDate || valeurRenseignee.annee)) {
        return estValeurDate ? formaterDate(valeurRenseignee) : valeurRenseignee;
      }

      return `${recupererValeurAttribut(valeurDefaut, nomAttribut) ?? nomAttribut}`.toUpperCase();
    });
    Handlebars.registerHelper("eq", (valeur: string, comparaison: string) => valeur?.toString() === comparaison);
  },

  genererPourSaisie: (modeleTexte: string, valeurs: any, valeurDefaut: any) => {
    GenerateurMention.ajouterHelpers(valeurs, valeurDefaut);
    const generateur = Handlebars.compile(modeleTexte);

    return generateur(valeurs);
  }
};

const genererValeursParDefaut = (blocs: IMetaModelBloc[]) =>
  blocs.reduce((placeholders, bloc) => {
    const libelleBloc = bloc.titre.replace(/\(.{1,50}\)/, "").toUpperCase();

    return {
      ...placeholders,
      [bloc.id]: bloc.champs.reduce(
        (placeholdersChamps, champ) => ({
          ...placeholdersChamps,
          [champ.id]: `${champ.libelle.toUpperCase()} (${libelleBloc})`
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
  console.log("Valeuers par defaut :  ", valeursParDefaut);
  const { values } = useFormikContext<any>();
  const [texteSaisie, setTexteSaisie] = useState("");
  const [textesEditables, setTextesEditables] = useState<{ [index: number]: any }>([]);

  const decouperTexteEditable = (texte: string) =>
    decoder(texte)
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

  const genererTexteFinal = () =>
    decoder(texteSaisie)
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
      .join("");

  useEffect(() => {
    setTexteSaisie(GenerateurMention.genererPourSaisie(templateTexteMention, values, valeursParDefaut));
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
