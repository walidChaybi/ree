import { connect } from "formik";
import React from "react";
import { officierHabiliterPourLeDroit } from "../../../../../model/agent/IOfficier";
import { Droit } from "../../../../../model/Droit";
import { getLibelle } from "../../../../common/util/Utils";
import { FormikComponentProps } from "../../../../common/widget/formulaire/utils/FormUtil";
import "./scss/SaisirRequeteBoutons.scss";

export type SaisirRequeteBoutonsProps = {
  setIsBrouillon: any;
  desactiverPrendreEnCharge: boolean;
} & FormikComponentProps;

const SaisirRequeteBoutons: React.FC<SaisirRequeteBoutonsProps> = props => {
  return (
    <>
      <div className="Boutons">
        <button
          disabled={
            !props.formik.dirty || !officierHabiliterPourLeDroit(Droit.DELIVRER)
          }
          type="button"
          id="boutonSauvegarder"
          onClick={() => {
            props.setIsBrouillon(true);
            props.formik.submitForm();
          }}
        >
          {getLibelle("Sauvegarder")}
        </button>
        <button
          disabled={
            !officierHabiliterPourLeDroit(Droit.DELIVRER) ||
            (!props.formik.dirty && props.desactiverPrendreEnCharge)
          }
          type="button"
          id="boutonPrendreEnCharge"
          onClick={() => {
            props.setIsBrouillon(false);
            props.formik.submitForm();
          }}
        >
          {getLibelle("Prendre en charge")}
        </button>
      </div>
    </>
  );
};

export default connect(SaisirRequeteBoutons);
