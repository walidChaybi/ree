import { Droit } from "@model/agent/enum/Droit";
import { useFormikContext } from "formik";
import React, { useContext } from "react";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
import Bouton, { TStyleBouton } from "../../../../commun/bouton/Bouton";

interface BoutonsValiderEtReinitialiserProps {
  onReinitialiser?: any;
  desactiverBoutonValider?: boolean;
  styleBoutonValider?: TStyleBouton;
}

const BoutonsValiderEtReinitialiser: React.FC<BoutonsValiderEtReinitialiserProps> = ({
  onReinitialiser,
  desactiverBoutonValider,
  styleBoutonValider
}) => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const formik = useFormikContext();

  return (
    <div className="flex justify-end gap-4 pr-4">
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
        disabled={desactiverBoutonValider || !utilisateurConnecte.estHabilitePour({ leDroit: Droit.DELIVRER })}
        aria-label="Valider"
      >
        Valider
      </Bouton>
    </div>
  );
};

export default BoutonsValiderEtReinitialiser;
