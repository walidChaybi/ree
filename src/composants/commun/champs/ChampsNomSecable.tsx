import ArrowBack from "@mui/icons-material/ArrowBack";
import { DEUX, UN } from "@util/Utils";
import { FormikErrors, FormikValues, useFormikContext } from "formik";
import { useEffect, useState } from "react";
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

const boutonPresent = (valeur: string): boolean => valeur.split(" ").length > UN;

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

  const deplacerVocable = (remonter: boolean = true) => {
    const valeursNom1 = (valeurChamps(values, nomPartie1.name) as string).split(" ");
    const valeursNom2 = (valeurChamps(values, nomPartie2.name) as string).split(" ");

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
      <div className="flex gap-4">
        <div className="w-full">
          <ChampTexte
            name={nom.name}
            libelle={nom.libelle}
            estObligatoire={estObligatoire}
          />
        </div>

        <div className="flex flex-nowrap items-end gap-4 pb-1">
          <ChampCaseACocher
            name={secable.name}
            libelle={secable.libelle}
            disabled={!secablePossible}
          />
          {afficherInfo && (
            <span
              className="h-6 w-6 flex-none cursor-help rounded-full bg-bleu-sombre text-center font-semibold text-blanc"
              title="Gestion du nom sécable pour la délivrance des extraits"
            >
              {"?"}
            </span>
          )}
        </div>
      </div>

      {valeurChamps(values, secable.name) && (
        <div className="flex w-full gap-4">
          <div className="w-[40%]">
            <ChampTexte
              name={nomPartie1.name}
              libelle={nomPartie1.libelle}
              readOnly
            />
          </div>

          <div className="relative flex w-[20%] items-end justify-center">
            {boutonPresent(valeurChamps(values, nomPartie2.name) as string) && (
              <BoutonIcon
                className="absolute right-0"
                type="button"
                title="Déplacer la dernière vocable"
                onClick={() => deplacerVocable(true)}
              >
                <ArrowBack />
              </BoutonIcon>
            )}
            {boutonPresent(valeurChamps(values, nomPartie1.name) as string) && (
              <BoutonIcon
                className="absolute left-0"
                type="button"
                title="Déplacer la première vocable"
                onClick={() => deplacerVocable(false)}
              >
                <ArrowBack className="rotate-180" />
              </BoutonIcon>
            )}
          </div>

          <div className="w-[40%]">
            <ChampTexte
              name={nomPartie2.name}
              libelle={nomPartie2.libelle}
              readOnly
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChampsNomSecable;
