import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import RMCBoutonRappelCriteres, {
  RMCBoutonRappelCriteresProps
} from "./RMCBoutonRappelCriteres";
import "./scss/RMCBoutons.scss";

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
      <div className="BoutonsRechercheMulti">
        <div className="rechercher">
          <Bouton
            disabled={!props.formik.isValid || !props.formik.dirty}
            type="submit"
          >
            {getLibelle("Rechercher")}
          </Bouton>
        </div>
        <div className="rappelEtReinitialiser">
          {props.rappelCriteres && (
            <RMCBoutonRappelCriteres {...rmcBoutonRappelCriteresProps} />
          )}

          <button type="reset" onClick={() => props.formik.resetForm()}>
            {getLibelle("Réinitialiser les critères")}
          </button>
        </div>
      </div>
    </>
  );
};

export default connect<IRMCBoutonsProps>(RMCBoutons);
