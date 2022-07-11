import { connect } from "formik";
import React from "react";
import { Bouton } from "../../composant/boutonAntiDoubleSubmit/Bouton";
import { getLibelle } from "../../util/Utils";
import { FormikComponentProps } from "../formulaire/utils/FormUtil";

export type IFormBoutonsProps = {
  onClosePopin: () => void;
};

export type FormBoutonsProps = IFormBoutonsProps & FormikComponentProps;

const FormBoutons: React.FC<FormBoutonsProps> = ({ formik, onClosePopin }) => {
  return (
    <div className="FormAjouterBoutons">
      <Bouton type="button" onClick={onClosePopin}>
        {getLibelle("Annuler")}
      </Bouton>
      <Bouton type="submit" disabled={!formik.dirty || !formik.isValid}>
        {getLibelle("Valider")}
      </Bouton>
    </div>
  );
};

export default connect(FormBoutons);
