import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { connect } from "formik";
import React from "react";
import { FormikComponentProps } from "../formulaire/utils/FormUtil";

type IFormBoutonsProps = {
  onClosePopin: () => void;
};

export type FormBoutonsProps = IFormBoutonsProps & FormikComponentProps;

const FormBoutons: React.FC<FormBoutonsProps> = ({ formik, onClosePopin }) => {
  return (
    <div className="FormAjouterBoutons">
      <BoutonDoubleSubmit
        type="button"
        onClick={onClosePopin}
      >
        {"Annuler"}
      </BoutonDoubleSubmit>
      <BoutonDoubleSubmit
        type="submit"
        disabled={!formik.dirty || !formik.isValid}
      >
        {"Valider"}
      </BoutonDoubleSubmit>
    </div>
  );
};

export default connect(FormBoutons);
