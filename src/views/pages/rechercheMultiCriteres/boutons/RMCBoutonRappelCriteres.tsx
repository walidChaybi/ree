import { stockageDonnees } from "@util/stockageDonnees";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import "./scss/RMCBoutons.scss";

interface IRMCBoutonRappelCriteresPropsProps {
  rappelCriteres: () => any;
}

export type RMCBoutonRappelCriteresProps = IRMCBoutonRappelCriteresPropsProps & FormikComponentProps;

const RMCBoutonRappelCriteres: React.FC<RMCBoutonRappelCriteresProps> = props => {
  const values = stockageDonnees.recupererCriteresRMCActeInspt();
  return (
    <button
      className="RappelBouton"
      type="button"
      disabled={values == null}
      onClick={() => {
        values && props.formik.setValues(values);
      }}
    >
      {"Rappel critères"}
    </button>
  );
};

export default connect(RMCBoutonRappelCriteres);
