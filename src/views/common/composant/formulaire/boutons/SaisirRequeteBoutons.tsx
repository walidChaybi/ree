import { RECEContextData } from "@core/contexts/RECEContext";
import { estOfficierHabiliterPourTousLesDroits, officierHabiliterPourLeDroit } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { UN } from "@util/Utils";
import { GestionnaireBlockErreur } from "@widget/formulaire/GestionnaireBlockErreur";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Bouton from "../../../../../composants/commun/bouton/Bouton";
import "./scss/SaisirRequeteBoutons.scss";

interface ComponentProps {
  setIsBrouillon?: any;
  modeModification?: boolean;
  onTransferer?: () => void;
}

type SaisirRequeteBoutonsProps = ComponentProps & FormikComponentProps;

const SaisirRequeteBoutons: React.FC<SaisirRequeteBoutonsProps> = props => {
  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);
  const utilisateurSansBrouillon =
    (officierHabiliterPourLeDroit(utilisateurConnecte, Droit.DELIVRER) ||
      estOfficierHabiliterPourTousLesDroits(utilisateurConnecte, [Droit.SAISIR_REQUETE, Droit.CREER_ACTE_TRANSCRIT])) ??
    true;
  const annuler = () => {
    navigate(-UN);
  };

  useEffect(() => {
    if (props.formik.isSubmitting) {
      GestionnaireBlockErreur.scrollALaPremiereErreur();
    }
  }, [props.formik.isSubmitting]);

  return (
    <div className="Boutons gap-x-2">
      {props.modeModification && (
        <div>
          <Bouton
            id="boutonAnnulerModif"
            onClick={annuler}
          >
            {"Annuler"}
          </Bouton>
          <Bouton
            disabled={!props.formik.dirty}
            id="boutonValiderModif"
            type="submit"
          >
            {"Valider"}
          </Bouton>
        </div>
      )}
      {utilisateurSansBrouillon && (
        <>
          {!props.modeModification && (
            <Bouton
              disabled={!props.formik.dirty}
              id="boutonPrendreEnCharge"
              type="submit"
            >
              {"Prendre en charge"}
            </Bouton>
          )}
          {props.onTransferer && (
            <Bouton
              onClick={props.onTransferer}
              disabled={!props.formik.dirty}
            >
              {"Transmettre au service compétent"}
            </Bouton>
          )}
        </>
      )}
      {!utilisateurSansBrouillon && (
        <Bouton
          disabled={!props.formik.dirty}
          id="boutonSauvegarder"
          type="submit"
        >
          {"Sauvegarder"}
        </Bouton>
      )}
    </div>
  );
};

export default connect<ComponentProps>(SaisirRequeteBoutons);
