import { connect } from "formik";
import React from "react";
import { FormikComponentProps } from "../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../common/widget/Text";
import "./scss/SaisirRequeteBoutons.scss";

export type SaisirRequeteBoutonsProps = {
  setIsBrouillon: any;
} & FormikComponentProps;

const SaisirRequeteBoutons: React.FC<SaisirRequeteBoutonsProps> = props => {
  return (
    <>
      <div className="Boutons">
        <button
          disabled={!props.formik.dirty}
          type="button"
          id="boutonEnregistrer"
          onClick={() => {
            props.setIsBrouillon(true);
            props.formik.submitForm();
          }}
        >
          {getLibelle("Enregistrer")}
        </button>
        <button
          disabled={!props.formik.dirty}
          type="button"
          id="boutonEnregistrerValider"
          onClick={() => {
            props.setIsBrouillon(false);
            props.formik.submitForm();
          }}
        >
          {getLibelle("Enregistrer et valider")}
        </button>
      </div>
    </>
  );
};

export default connect(SaisirRequeteBoutons);
