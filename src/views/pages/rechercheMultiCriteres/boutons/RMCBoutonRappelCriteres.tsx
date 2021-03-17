import React from "react";
import { connect } from "formik";
import { FormikComponentProps } from "../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../common/widget/Text";
import "./scss/RMCBoutons.scss";

export interface IRMCBoutonRappelCriteresPropsProps {
  rappelCriteres: () => any;
}

export type RMCBoutonRappelCriteresProps = IRMCBoutonRappelCriteresPropsProps &
  FormikComponentProps;

const RMCBoutonRappelCriteres: React.FC<RMCBoutonRappelCriteresProps> = props => {
  return (
    <>
      <button
        className="RappelBouton"
        type="button"
        onClick={() => {
          props.formik.setValues(props.rappelCriteres());
        }}
      >
        {getLibelle("Rappel critères")}
      </button>
    </>
  );
};

export default connect(RMCBoutonRappelCriteres);
