import { connect } from "formik";
import React from "react";
import { getLibelle } from "../../util/Utils";
import { FormikComponentProps } from "../formulaire/utils/FormUtil";

export type IFormBoutonsProps = {
  onClosePopin: () => void;
};

export type FormBoutonsProps = IFormBoutonsProps & FormikComponentProps;

const FormBoutons: React.FC<FormBoutonsProps> = ({ formik, onClosePopin }) => {
  return (
    <div className="FormAjouterBoutons">
      <button type="button" onClick={onClosePopin}>
        {getLibelle("Annuler")}
      </button>
      <button type="submit" disabled={!formik.dirty || !formik.isValid}>
        {getLibelle("Valider")}
      </button>
    </div>
  );
};

export default connect(FormBoutons);
