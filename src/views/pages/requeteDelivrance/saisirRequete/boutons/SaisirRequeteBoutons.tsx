import { Droit } from "@model/agent/enum/Droit";
import { officierHabiliterPourLeDroit } from "@model/agent/IOfficier";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import "./scss/SaisirRequeteBoutons.scss";

export type SaisirRequeteBoutonsProps = {
  setIsBrouillon: any;
} & FormikComponentProps;

const SaisirRequeteBoutons: React.FC<SaisirRequeteBoutonsProps> = props => {
  return (
    <>
      <div className="Boutons">
        {officierHabiliterPourLeDroit(Droit.DELIVRER) ? (
          <Bouton
            disabled={!props.formik.dirty}
            id="boutonPrendreEnCharge"
            onClick={() => {
              props.setIsBrouillon(false);
              props.formik.submitForm();
            }}
          >
            {getLibelle("Prendre en charge")}
          </Bouton>
        ) : (
          <Bouton
            disabled={!props.formik.dirty}
            id="boutonSauvegarder"
            onClick={() => {
              props.setIsBrouillon(true);
              props.formik.submitForm();
            }}
          >
            {getLibelle("Sauvegarder")}
          </Bouton>
        )}
      </div>
    </>
  );
};

export default connect(SaisirRequeteBoutons);
