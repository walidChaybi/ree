import { connect } from "formik";
import React from "react";
import { FormikComponentProps } from "../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../common/widget/Text";
import "./scss/SaisirRequeteBoutons.scss";

export type SaisirRequeteBoutonsProps = FormikComponentProps;

const SaisirRequeteBoutons: React.FC<SaisirRequeteBoutonsProps> = props => {
  return (
    <>
      <div className="Boutons">
        <button
          disabled={!props.formik.dirty}
          type="submit"
          id="boutonEnregistrerValider"
        >
          {getLibelle("Enregistrer et valider")}
        </button>
      </div>
    </>
  );
};

export default connect(SaisirRequeteBoutons);
