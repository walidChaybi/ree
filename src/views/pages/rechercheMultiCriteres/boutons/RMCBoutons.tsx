import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import RMCBoutonRappelCriteres, { RMCBoutonRappelCriteresProps } from "./RMCBoutonRappelCriteres";
import "./scss/RMCBoutons.scss";

interface IRMCBoutonsProps {
  rappelCriteres?: () => any;
}

type RMCBoutonsProps = IRMCBoutonsProps & FormikComponentProps;

// A SUPPRIMER APRES LA REFONT DE RMC REQUETE
const RMCBoutons: React.FC<RMCBoutonsProps> = props => {
  const rmcBoutonRappelCriteresProps = {
    rappelCriteres: props.rappelCriteres
  } as RMCBoutonRappelCriteresProps;

  return (
    <div className="BoutonsRechercheMulti">
      <div className="rechercher">
        <BoutonDoubleSubmit
          disabled={!props.formik.isValid || !props.formik.dirty}
          type="submit"
        >
          {"Rechercher"}
        </BoutonDoubleSubmit>
      </div>
      <div className="rappelEtReinitialiser">
        {props.rappelCriteres && <RMCBoutonRappelCriteres {...rmcBoutonRappelCriteresProps} />}

        <button
          type="reset"
          onClick={() => props.formik.resetForm()}
        >
          {"Réinitialiser les critères"}
        </button>
      </div>
    </div>
  );
};

export default connect<IRMCBoutonsProps>(RMCBoutons);
