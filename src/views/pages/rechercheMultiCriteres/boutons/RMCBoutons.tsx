import React from "react";
import { connect } from "formik";
import { FormikComponentProps } from "../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../common/widget/Text";
import "./scss/RMCBoutons.scss";
import RMCBoutonRappelCriteres, {
  RMCBoutonRappelCriteresProps
} from "./RMCBoutonRappelCriteres";

export interface IRMCBoutonsProps {
  rappelCriteres?: () => any;
}

export type RMCBoutonsProps = IRMCBoutonsProps & FormikComponentProps;

const RMCBoutons: React.FC<RMCBoutonsProps> = props => {
  const rmcBoutonRappelCriteresProps = {
    rappelCriteres: props.rappelCriteres
  } as RMCBoutonRappelCriteresProps;

  return (
    <>
      <div className="Boutons">
        {props.rappelCriteres && (
          <RMCBoutonRappelCriteres {...rmcBoutonRappelCriteresProps} />
        )}

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
