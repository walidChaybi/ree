import { ObjetFormulaire } from "@model/form/commun/ObjetFormulaire";
import { DEUX, UN } from "@util/Utils";
import { FormikErrors, FormikValues, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import BoutonIcon from "../bouton/BoutonIcon";
import ChampCaseACocher from "./ChampCaseACocher";
import ChampTexte from "./ChampTexte";

interface IChamps {
  name: string;
  libelle: string;
}

interface IChampsNomSecableProps {
  nom: IChamps;
  secable: IChamps;
  nomPartie1: IChamps;
  nomPartie2: IChamps;
  estObligatoire?: boolean;
  afficherInfo?: boolean;
}

const valeurChamps = (valeurs: FormikValues, chemin: string) =>
  chemin.split(".").reduce((valeur: string | boolean | FormikValues, partieChemin: string) => {
    if (valeur instanceof Object) {
      return valeur[partieChemin] ?? "";
    }

    return valeur;
  }, valeurs);

const mettreAJourChamps = (
  nomChamps: string,
  ancienneValeur: string | boolean,
  nouvelleValeur: string | boolean,
  modifierChamps: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<FormikValues>>
) => ancienneValeur !== nouvelleValeur && modifierChamps(nomChamps, nouvelleValeur);

const ChampsNomSecable: React.FC<IChampsNomSecableProps> = ({
  nom,
  secable,
  nomPartie1,
  nomPartie2,
  estObligatoire,
  afficherInfo = true
}) => {
  const { values, setFieldValue } = useFormikContext<FormikValues>();
  const [secablePossible, setSecablePossible] = useState<boolean>(false);

  const valeurNomPartie1 = valeurChamps(values, nomPartie1.name) as string;
  const valeurNomPartie2 = valeurChamps(values, nomPartie2.name) as string;

  const estSecable = Boolean(ObjetFormulaire.recupererValeur({ valeurs: values, cleAttribut: secable.name }));

  const tailleNomPartie1 = valeurNomPartie1.split(" ").filter(Boolean).length;
  const tailleNomPartie2 = valeurNomPartie2.split(" ").filter(Boolean).length;

  const deplacerVocable = (remonter: boolean = true) => {
    const valeursNom1 = valeurNomPartie1.split(" ");
    const valeursNom2 = valeurNomPartie2.split(" ");

    if (remonter) {
      valeursNom1.push(valeursNom2.shift() as string);
    } else {
      valeursNom2.unshift(valeursNom1.pop() as string);
    }

    setFieldValue(nomPartie1.name, valeursNom1.join(" "));
    setFieldValue(nomPartie2.name, valeursNom2.join(" "));
  };

  useEffect(() => {
    const valeursNom = (valeurChamps(values, nom.name) as string).split(" ").filter(partieNom => partieNom.length);
    const valeurNom1 = valeurChamps(values, nomPartie1.name) as string;
    const valeurNom2 = valeurChamps(values, nomPartie2.name) as string;
    const valeurSecable = valeurChamps(values, secable.name) as boolean;

    if (valeursNom.length <= UN) {
      mettreAJourChamps(secable.name, valeurSecable, false, setFieldValue);
      mettreAJourChamps(nomPartie1.name, valeurNom1, "", setFieldValue);
      mettreAJourChamps(nomPartie2.name, valeurNom2, "", setFieldValue);
      setSecablePossible(false);

      return;
    }

    setSecablePossible(true);
    if (!valeurChamps(values, secable.name)) {
      return;
    }

    if (!valeurNom1 || !valeurNom2 || valeursNom.length === DEUX) {
      mettreAJourChamps(nomPartie1.name, valeurNom1, valeursNom.shift() as string, setFieldValue);
      mettreAJourChamps(nomPartie2.name, valeurNom2, valeursNom.join(" "), setFieldValue);

      return;
    }

    const vocablesPartie1 = Array.from({
      length: valeurNom1.split(" ").length
    }).map(() => valeursNom.shift());
    mettreAJourChamps(nomPartie1.name, valeurNom1, vocablesPartie1.join(" "), setFieldValue);
    mettreAJourChamps(nomPartie2.name, valeurNom2, valeursNom.join(" "), setFieldValue);
  }, [values]);

  return (
    <div className="grid gap-4">
      <div className="flex items-start gap-4">
        <ChampTexte
          name={nom.name}
          libelle={nom.libelle}
          estObligatoire={estObligatoire}
        />

        <div className="flex flex-nowrap items-center gap-3 pt-8">
          <ChampCaseACocher
            name={secable.name}
            libelle={secable.libelle}
            disabled={!secablePossible}
            apresChangement={estNomSecable => {
              if (!estNomSecable) {
                setFieldValue(nomPartie1.name, "");
                setFieldValue(nomPartie2.name, "");
              }
            }}
          />
          {afficherInfo && (
            <span
              className="flex h-6 w-6 cursor-help items-center justify-center rounded-full bg-bleu-sombre text-center font-semibold text-blanc"
              title="Gestion du nom sécable pour la délivrance des extraits"
            >
              {"?"}
            </span>
          )}
        </div>
      </div>

      {estSecable && (
        <div className="grid grid-cols-2 gap-4">
          <ChampTexte
            name={nomPartie1.name}
            libelle={nomPartie1.libelle}
            readOnly
            boutonChamp={{
              composant: (
                <BoutonIcon
                  className={`group absolute right-0 top-0 flex h-full w-8 items-center justify-center rounded-l-none hover:text-white disabled:bg-transparent disabled:text-gris-desactive disabled:opacity-30`}
                  type="button"
                  title="Déplacer le dernier vocable"
                  aria-label="Déplacer le dernier vocable"
                  onClick={() => deplacerVocable(false)}
                  disabled={tailleNomPartie1 < DEUX}
                >
                  <div className={`flex transform items-center transition-transform duration-200 ease-in group-hover:translate-x-1`}>
                    <MdArrowBack
                      className="rotate-180"
                      aria-hidden
                    />
                  </div>
                </BoutonIcon>
              )
            }}
          />

          <ChampTexte
            name={nomPartie2.name}
            libelle={nomPartie2.libelle}
            readOnly
            boutonChamp={{
              composant: (
                <BoutonIcon
                  className={`group absolute left-0 top-0 flex h-full w-8 items-center justify-center rounded-r-none hover:text-white disabled:bg-transparent disabled:text-gris-desactive disabled:opacity-30`}
                  type="button"
                  title="Déplacer le premier vocable"
                  aria-label="Déplacer le premier vocable"
                  onClick={() => deplacerVocable(true)}
                  disabled={tailleNomPartie2 < DEUX}
                >
                  <div className={`left-4 flex transform transition-transform duration-200 ease-in group-hover:-translate-x-1`}>
                    <MdArrowBack aria-hidden />
                  </div>
                </BoutonIcon>
              ),
              estAGauche: true
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChampsNomSecable;
