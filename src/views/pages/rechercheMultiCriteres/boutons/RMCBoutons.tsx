import React from "react";
import { connect } from "formik";
import { FormikComponentProps } from "../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../common/widget/Text";
import "./scss/RMCBoutons.scss";

export interface IRMCBoutonsProps {
  rappelCriteres: () => any;
}

export type RMCBoutonsProps = IRMCBoutonsProps & FormikComponentProps;

const RMCBoutons: React.FC<RMCBoutonsProps> = props => {
  return (
    <>
      <div className="Boutons">
        <button
          type="button"
          onClick={() => {
            props.formik.setValues(props.rappelCriteres());
          }}
        >
          {getLibelle("Rappel critères")}
        </button>

        <button type="reset" onClick={() => props.formik.resetForm()}>
          {getLibelle("Réinitialiser les critères")}
        </button>

        <button
          disabled={!props.formik.isValid || !props.formik.dirty}
          type="submit"
        >
          {getLibelle("Rechercher")}
        </button>
      </div>
    </>
  );
};

export default connect(RMCBoutons);
