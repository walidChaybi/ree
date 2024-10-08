import { RECEContextData } from "@core/contexts/RECEContext";
import {
  estOfficierHabiliterPourTousLesDroits,
  officierHabiliterPourLeDroit
} from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { UN, getLibelle } from "@util/Utils";
import { GestionnaireBlockErreur } from "@widget/formulaire/GestionnaireBlockErreur";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Bouton from "../../../../../composants/commun/bouton/Bouton";
import "./scss/SaisirRequeteBoutons.scss";

export interface ComponentProps {
  setIsBrouillon?: any;
  modeModification?: boolean;
  onTransferer?: () => void;
}

export type SaisirRequeteBoutonsProps = ComponentProps & FormikComponentProps;

const SaisirRequeteBoutons: React.FC<SaisirRequeteBoutonsProps> = props => {
  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);

  const annuler = () => {
    navigate(-UN);
  };

  const valider = () => {
    props.formik.submitForm().then(() => {
      GestionnaireBlockErreur.scrollALaPremiereErreur();
    });
  };

  const prendreEnCharge = () => {
    props.setIsBrouillon?.(false);
    valider();
  };
  const sauvegarder = () => {
    props.setIsBrouillon?.(true);
    valider();
  };

  return (
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
      ) : officierHabiliterPourLeDroit(utilisateurConnecte, Droit.DELIVRER) ||
        estOfficierHabiliterPourTousLesDroits(utilisateurConnecte, [
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
            <Bouton onClick={props.onTransferer} disabled={!props.formik.dirty}>
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
  );
};

export default connect<ComponentProps>(SaisirRequeteBoutons);
