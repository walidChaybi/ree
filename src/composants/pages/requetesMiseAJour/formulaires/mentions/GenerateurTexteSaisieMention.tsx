import { useFormikContext } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import ModeleTexte from "../../../../../utils/ModeleTexte";
import { TMentionForm } from "../MentionForm";

export const TexteMentionAideALaSaisie: React.FC<{ templateTexteMention: string }> = ({ templateTexteMention }) => {
  const { values, setFieldValue } = useFormikContext<TMentionForm>();
  const modeleTexte = useMemo(() => ModeleTexte.creer(templateTexteMention), [templateTexteMention]);
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
    setTexteSaisie(modeleTexte.generer(values));
  }, [values, modeleTexte]);

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
