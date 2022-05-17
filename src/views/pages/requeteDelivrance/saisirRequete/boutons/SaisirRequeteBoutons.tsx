import { connect } from "formik";
import React from "react";
import { officierHabiliterPourLeDroit } from "../../../../../model/agent/IOfficier";
import { Droit } from "../../../../../model/Droit";
import { getLibelle } from "../../../../common/util/Utils";
import { BoutonOperationEnCours } from "../../../../common/widget/attente/BoutonOperationEnCours";
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
        <BoutonOperationEnCours
          estDesactive={
            !props.formik.dirty || !officierHabiliterPourLeDroit(Droit.DELIVRER)
          }
          id="boutonSauvegarder"
          onClick={() => {
            props.setIsBrouillon(true);
            props.formik.submitForm();
          }}
        >
          {getLibelle("Sauvegarder")}
        </BoutonOperationEnCours>
        <BoutonOperationEnCours
          estDesactive={
            !officierHabiliterPourLeDroit(Droit.DELIVRER) ||
            (!props.formik.dirty && props.desactiverPrendreEnCharge)
          }
          id="boutonPrendreEnCharge"
          onClick={() => {
            props.setIsBrouillon(false);
            props.formik.submitForm();
          }}
        >
          {getLibelle("Prendre en charge")}
        </BoutonOperationEnCours>
      </div>
    </>
  );
};

export default connect(SaisirRequeteBoutons);
