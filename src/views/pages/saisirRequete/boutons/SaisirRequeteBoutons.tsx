import React from "react";
import { connect } from "formik";
import { FormikComponentProps } from "../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../common/widget/Text";
import "./scss/SaisirRequeteBoutons.scss";

export type SaisirRequeteBoutonsProps = FormikComponentProps;

const SaisirRequeteBoutons: React.FC<SaisirRequeteBoutonsProps> = props => {
  return (
    <>
      <div className="Boutons">
        <button disabled={!props.formik.dirty} type="submit">
          {getLibelle("Enregistrer et valider")}
        </button>
      </div>
    </>
  );
};

export default connect(SaisirRequeteBoutons);
