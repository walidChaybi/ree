import { IMiseAJourAnalyseMarginaleValeursForm } from "@api/validations/requeteMiseAJour/MiseAJourAnalyseMarginaleValidation";
import { useFormikContext } from "formik";
import { useContext, useEffect, useMemo } from "react";
import { EditionMiseAJourContext } from "../../../../../contexts/EditionMiseAJourContextProvider";
import ChampsNomSecable from "../../../../commun/champs/ChampsNomSecable";
import ChampsPrenoms from "../../../../commun/champs/ChampsPrenoms";
import ChampsTexte from "../../../../commun/champs/ChampsTexte";
import BoutonAnnulerSaisie from "../BoutonAnnulerSaisie";
import "./FormulaireAnalyseMarginale.scss";

const ChampsFormulaireAnalyseMarginale: React.FC = () => {
  const { initialValues, values, dirty } = useFormikContext<IMiseAJourAnalyseMarginaleValeursForm>();
  const { miseAJourEffectuee } = useContext(EditionMiseAJourContext.Valeurs);
  const { setEstFormulaireAnalyseMarginaleModifie } = useContext(EditionMiseAJourContext.Actions);

  const estFormulaireAnalyseMarginaleInchange = useMemo(() => {
    switch (true) {
      case miseAJourEffectuee && initialValues.analyseMarginale.motif !== values.analyseMarginale.motif:
      case initialValues.analyseMarginale.nom.trim() !== values.analyseMarginale.nom.trim():
        return false;
      default:
        break;
    }

    const prenomsDefaut = initialValues.analyseMarginale.prenoms;
    const prenomsSaisis = values.analyseMarginale.prenoms;
    if (Object.values(prenomsDefaut).filter(prenom => prenom).length !== Object.values(prenomsSaisis).filter(prenom => prenom).length) {
      return false;
    }

    return Object.keys(prenomsDefaut).reduce((nonModifie, clePrenom) => {
      if (!nonModifie) {
        return false;
      }

      return prenomsDefaut[clePrenom].trim() === prenomsSaisis[clePrenom].trim();
    }, true);
  }, [initialValues, values, miseAJourEffectuee, dirty]);

  useEffect(() => {
    setEstFormulaireAnalyseMarginaleModifie(dirty && !estFormulaireAnalyseMarginaleInchange);
  }, [initialValues, values, dirty, miseAJourEffectuee]);

  return (
    <div className="formulaire-mise-a-jour-analyse-marginale">
      <div className="champs-formulaire">
        <div>
          <ChampsNomSecable
            nom={{ name: "analyseMarginale.nom", libelle: "Nom" }}
            secable={{ name: "nomSecable.secable", libelle: "Nom sécable" }}
            nomPartie1={{
              name: "nomSecable.nomPartie1",
              libelle: "Nom 1re partie"
            }}
            nomPartie2={{
              name: "nomSecable.nomPartie2",
              libelle: "Nom 2nde partie"
            }}
          />
        </div>

        <div>
          <ChampsPrenoms
            cheminPrenoms={"analyseMarginale.prenoms"}
            prefixePrenom={"prenom"}
          />
        </div>

        <ChampsTexte
          className="champs-motif"
          name="analyseMarginale.motif"
          libelle="Motif"
          type="text"
        />
      </div>

      <div className="bouton-annuler-saisie">
        <BoutonAnnulerSaisie />
      </div>
    </div>
  );
};

export default ChampsFormulaireAnalyseMarginale;
