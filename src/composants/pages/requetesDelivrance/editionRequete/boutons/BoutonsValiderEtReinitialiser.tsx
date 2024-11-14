import { RECEContextData } from "@core/contexts/RECEContext";
import { officierHabiliterPourLeDroit } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { useFormikContext } from "formik";
import React, { useContext } from "react";
import Bouton, { TStyleBouton } from "../../../../commun/bouton/Bouton";

interface BoutonsValiderEtReinitialiserProps {
  onReinitialiser?: any;
  desactiverBoutonValider?: boolean;
  styleBoutonValider?: TStyleBouton;
}

const BoutonsValiderEtReinitialiser: React.FC<
  BoutonsValiderEtReinitialiserProps
> = ({ onReinitialiser, desactiverBoutonValider, styleBoutonValider }) => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const formik = useFormikContext();

  return (
    <div className="flex gap-4">
      <Bouton
        styleBouton="secondaire"
        type="reset"
        onClick={onReinitialiser}
        disabled={!formik.dirty}
        aria-label="Réinitialiser"
      >
        Réinitialiser
      </Bouton>
      <Bouton
        styleBouton={styleBoutonValider}
        className={`${styleBoutonValider === "secondaire" && "hover:bg-bleu hover:text-white"}`}
        type="submit"
        onClick={formik.submitForm}
        disabled={
          desactiverBoutonValider ||
          !formik.dirty ||
          !officierHabiliterPourLeDroit(utilisateurConnecte, Droit.DELIVRER)
        }
        aria-label="Valider"
      >
        Valider
      </Bouton>
    </div>
  );
};

export default BoutonsValiderEtReinitialiser;
