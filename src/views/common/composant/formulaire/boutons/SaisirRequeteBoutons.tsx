import { Droit } from "@model/agent/enum/Droit";
import {
  estOfficierHabiliterPourTousLesDroits,
  officierHabiliterPourLeDroit
} from "@model/agent/IOfficier";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { GestionnaireBlockErreur } from "@widget/formulaire/GestionnaireBlockErreur";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import { useHistory } from "react-router";
import "./scss/SaisirRequeteBoutons.scss";

export interface ComponentProps {
  setIsBrouillon?: any;
  modeModification?: boolean;
  onTransferer?: () => void;
}

export type SaisirRequeteBoutonsProps = ComponentProps & FormikComponentProps;

const SaisirRequeteBoutons: React.FC<SaisirRequeteBoutonsProps> = props => {
  const history = useHistory();

  const annuler = () => {
    history.goBack();
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
            <Bouton id="boutonAnnulerModif" onClick={annuler}>
              {getLibelle("Annuler")}
            </Bouton>
            <Bouton
              disabled={!props.formik.dirty}
              id="boutonValiderModif"
              onClick={valider}
            >
              {getLibelle("Valider")}
            </Bouton>
          </div>
        ) : officierHabiliterPourLeDroit(Droit.DELIVRER) ||
          estOfficierHabiliterPourTousLesDroits([
            Droit.SAISIR_REQUETE,
            Droit.CREER_ACTE_TRANSCRIT
          ]) ? (
          <>
            <Bouton
              disabled={!props.formik.dirty}
              id="boutonPrendreEnCharge"
              onClick={prendreEnCharge}
            >
              {getLibelle("Prendre en charge")}
            </Bouton>
            {props.onTransferer && (
              <Bouton
                onClick={props.onTransferer}
                disabled={!props.formik.dirty}
              >
                {getLibelle("Transmettre au service compétent")}
              </Bouton>
            )}
          </>
        ) : (
          <Bouton
            disabled={!props.formik.dirty}
            id="boutonSauvegarder"
            onClick={sauvegarder}
          >
            {getLibelle("Sauvegarder")}
          </Bouton>
        )}
      </div>
    </>
  );
};

export default connect<ComponentProps>(SaisirRequeteBoutons);
