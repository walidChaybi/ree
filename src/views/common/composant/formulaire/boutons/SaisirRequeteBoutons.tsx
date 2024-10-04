import {
  estOfficierHabiliterPourTousLesDroits,
  officierHabiliterPourLeDroit
} from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { UN, getLibelle } from "@util/Utils";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { GestionnaireBlockErreur } from "@widget/formulaire/GestionnaireBlockErreur";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./scss/SaisirRequeteBoutons.scss";

export interface ComponentProps {
  setIsBrouillon?: any;
  modeModification?: boolean;
  onTransferer?: () => void;
}

export type SaisirRequeteBoutonsProps = ComponentProps & FormikComponentProps;

const SaisirRequeteBoutons: React.FC<SaisirRequeteBoutonsProps> = props => {
  const navigate = useNavigate();

  const annuler = () => {
    navigate(-UN);
  };

  const valider = () => {
    props.formik.submitForm().then(() => {
      GestionnaireBlockErreur.scrollALaPremiereErreur();
    });
  };

  const prendreEnCharge = () => {
    props.setIsBrouillon && props.setIsBrouillon(false);
    valider();
  };
  const sauvegarder = () => {
    props.setIsBrouillon && props.setIsBrouillon(true);
    valider();
  };

  return (
    <>
      <div className="Boutons">
        {props.modeModification ? (
          <div>
            <BoutonDoubleSubmit id="boutonAnnulerModif" onClick={annuler}>
              {getLibelle("Annuler")}
            </BoutonDoubleSubmit>
            <BoutonDoubleSubmit
              disabled={!props.formik.dirty}
              id="boutonValiderModif"
              onClick={valider}
            >
              {getLibelle("Valider")}
            </BoutonDoubleSubmit>
          </div>
        ) : officierHabiliterPourLeDroit(Droit.DELIVRER) ||
          estOfficierHabiliterPourTousLesDroits([
            Droit.SAISIR_REQUETE,
            Droit.CREER_ACTE_TRANSCRIT
          ]) ? (
          <>
            <BoutonDoubleSubmit
              disabled={!props.formik.dirty}
              id="boutonPrendreEnCharge"
              onClick={prendreEnCharge}
            >
              {getLibelle("Prendre en charge")}
            </BoutonDoubleSubmit>
            {props.onTransferer && (
              <BoutonDoubleSubmit
                onClick={props.onTransferer}
                disabled={!props.formik.dirty}
              >
                {getLibelle("Transmettre au service compétent")}
              </BoutonDoubleSubmit>
            )}
          </>
        ) : (
          <BoutonDoubleSubmit
            disabled={!props.formik.dirty}
            id="boutonSauvegarder"
            onClick={sauvegarder}
          >
            {getLibelle("Sauvegarder")}
          </BoutonDoubleSubmit>
        )}
      </div>
    </>
  );
};

export default connect<ComponentProps>(SaisirRequeteBoutons);
