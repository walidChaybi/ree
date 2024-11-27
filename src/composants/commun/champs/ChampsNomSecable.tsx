import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { DEUX, UN } from "@util/Utils";
import { FormikErrors, FormikValues, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import BoutonIcon from "../bouton/BoutonIcon";
import ChampsCaseACocher from "./ChampsCaseACocher";
import "./ChampsNomSecable.scss";
import ChampsTexte from "./ChampsTexte";

interface IChamps {
  name: string;
  libelle: string;
}

interface IChampsNomSecableProps {
  nom: IChamps;
  secable: IChamps;
  nomPartie1: IChamps;
  nomPartie2: IChamps;
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

const ChampsNomSecable: React.FC<IChampsNomSecableProps> = ({ nom, secable, nomPartie1, nomPartie2 }) => {
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
    <div className="conteneur-champs-nom-secable">
      <ChampsTexte
        name={nom.name}
        libelle={nom.libelle}
      />
      <div className="champs-secable-et-info">
        <ChampsCaseACocher
          name={secable.name}
          libelle={secable.libelle}
          disabled={!secablePossible}
        />
        <span
          className="info-nom-secable"
          title="Gestion du nom sécable pour la délivrance des extraits"
        >
          {"?"}
        </span>
      </div>

      {valeurChamps(values, secable.name) && (
        <>
          <div className="flex gap-2">
            <ChampsTexte
              name={nomPartie1.name}
              libelle={nomPartie1.libelle}
              readOnly
            />

            <div className="flex w-10 items-end">
              {boutonPresent(valeurChamps(values, nomPartie1.name) as string) && (
                <BoutonIcon
                  type="button"
                  title="Descendre la dernière vocable"
                  onClick={() => deplacerVocable(false)}
                >
                  <ArrowDownward />
                </BoutonIcon>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <ChampsTexte
              name={nomPartie2.name}
              libelle={nomPartie2.libelle}
              readOnly
            />

            <div className="flex w-10 items-end">
              {boutonPresent(valeurChamps(values, nomPartie2.name) as string) && (
                <BoutonIcon
                  type="button"
                  title="Remonter la première vocable"
                  onClick={() => deplacerVocable(true)}
                >
                  <ArrowUpward />
                </BoutonIcon>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChampsNomSecable;
