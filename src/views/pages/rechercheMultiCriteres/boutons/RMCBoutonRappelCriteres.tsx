import { connect } from "formik";
import React from "react";
import { getLibelle } from "../../../common/util/Utils";
import { FormikComponentProps } from "../../../common/widget/formulaire/utils/FormUtil";
import "./scss/RMCBoutons.scss";

export interface IRMCBoutonRappelCriteresPropsProps {
  rappelCriteres: () => any;
}

export type RMCBoutonRappelCriteresProps = IRMCBoutonRappelCriteresPropsProps &
  FormikComponentProps;

const RMCBoutonRappelCriteres: React.FC<RMCBoutonRappelCriteresProps> = props => {
  const values = props.rappelCriteres();
  return (
    <>
      <button
        className="RappelBouton"
        type="button"
        disabled={values == null}
        onClick={() => {
          props.formik.setValues(values);
        }}
      >
        {getLibelle("Rappel critères")}
      </button>
    </>
  );
};

export default connect(RMCBoutonRappelCriteres);
