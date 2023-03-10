import { Droit } from "@model/agent/enum/Droit";
import { officierHabiliterPourLeDroit } from "@model/agent/IOfficier";
import { receUrl } from "@router/ReceUrls";
import { replaceUrl } from "@util/route/UrlUtil";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import { useHistory } from "react-router";
import "./scss/SaisirRequeteBoutons.scss";


export interface ComponentProps {
  setIsBrouillon?: any;
  modeModification?: boolean;
  onTransferer: () => void;
}

export type SaisirRequeteBoutonsProps = ComponentProps & FormikComponentProps;

const SaisirRequeteBoutons: React.FC<SaisirRequeteBoutonsProps> = props => {
  const history = useHistory();
  const annuler = () => {
    const url = receUrl.getUrlApercuPriseEnChargeAPartirDe({
      url: history.location.pathname
    });
    replaceUrl(history, url);
  };

  const valider = () => {
    props.formik.submitForm();
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
        ) : officierHabiliterPourLeDroit(Droit.DELIVRER) ? (
          <Bouton
            disabled={!props.formik.dirty}
            id="boutonPrendreEnCharge"
            onClick={prendreEnCharge}
          >
            {getLibelle("Prendre en charge")}
          </Bouton>
        ) : (
          <Bouton
            disabled={!props.formik.dirty}
            id="boutonSauvegarder"
            onClick={sauvegarder}
          >
            {getLibelle("Sauvegarder")}
          </Bouton>
        )}
        <Bouton onClick={props.onTransferer}>
          {getLibelle("Transmettre au service compétent")}
        </Bouton>
      </div>
    </>
  );
};

export default connect<ComponentProps>(SaisirRequeteBoutons);
