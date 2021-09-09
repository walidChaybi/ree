import { connect } from "formik";
import React from "react";
import { FormikComponentProps } from "../../../formulaire/utils/FormUtil";
import { getLibelle } from "../../../Text";

export type IFormAjouterAlerteBoutonsProps = {
  onClosePopin: () => void;
};

export type FormAjouterAlerteBoutonsProps = IFormAjouterAlerteBoutonsProps &
  FormikComponentProps;

const FormAjouterAlerteBoutons: React.FC<FormAjouterAlerteBoutonsProps> = ({
  formik,
  onClosePopin
}) => {
  return (
    <div className="FormAjouterAlerteBoutons">
      <button type="button" onClick={onClosePopin}>
        {getLibelle("Annuler")}
      </button>
      <button type="submit" disabled={!formik.dirty || !formik.isValid}>
        {getLibelle("Valider")}
      </button>
    </div>
  );
};

export default connect(FormAjouterAlerteBoutons);
