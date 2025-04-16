import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import "./scss/RMCBoutons.scss";

export interface IRMCBoutonRappelCriteresPropsProps {
  rappelCriteres: () => any;
}

export type RMCBoutonRappelCriteresProps = IRMCBoutonRappelCriteresPropsProps & FormikComponentProps;

const RMCBoutonRappelCriteres: React.FC<RMCBoutonRappelCriteresProps> = props => {
  const values = props.rappelCriteres();
  return (
    <button
      className="RappelBouton"
      type="button"
      disabled={values == null}
      onClick={() => {
        props.formik.setValues(values);
      }}
    >
      {"Rappel critères"}
    </button>
  );
};

export default connect(RMCBoutonRappelCriteres);
