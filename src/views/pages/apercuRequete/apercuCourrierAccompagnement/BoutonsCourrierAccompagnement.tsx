import { connect } from "formik";
import React from "react";
import { FormikComponentProps } from "../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../common/widget/Text";
import "./scss/BoutonsCourrierAccompagnement.scss";

export type BoutonsCourrierAccompagnementProps = {
  annuler: () => void;
} & FormikComponentProps;

const BoutonsCourrierAccompagnement: React.FC<BoutonsCourrierAccompagnementProps> =
  props => {
    return (
      <>
        <div className="BoutonsCourrierAccompagnement" key="boutons">
          <button
            disabled={!props.formik.dirty}
            type="button"
            id="annuler"
            onClick={props.annuler}
            key={"annuler"}
          >
            {getLibelle("Annuler")}
          </button>
          <button
            disabled={!props.formik.dirty}
            type="button"
            id="boutonEnregistrer"
            onClick={() => {
              //props.formik.submitForm();
            }}
            key={"valider"}
          >
            {getLibelle("Valider")}
          </button>
        </div>
      </>
    );
  };

export default connect(BoutonsCourrierAccompagnement);
