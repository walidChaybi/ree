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
  closePopIn?: () => void;
}

export type RMCBoutonsProps = IRMCBoutonsProps & FormikComponentProps;

const RMCBoutons: React.FC<RMCBoutonsProps> = props => {
  const rmcBoutonRappelCriteresProps = {
    rappelCriteres: props.rappelCriteres
  } as RMCBoutonRappelCriteresProps;

  const closePopIn = () => {
    if (props.closePopIn) {
      props.closePopIn();
    }
  };

  return (
    <>
      <div className="Boutons">
        {props.rappelCriteres && (
          <RMCBoutonRappelCriteres {...rmcBoutonRappelCriteresProps} />
        )}

        <button type="reset" onClick={() => props.formik.resetForm()}>
          {getLibelle("Réinitialiser les critères")}
        </button>

        <Bouton
          disabled={!props.formik.isValid || !props.formik.dirty}
          type="submit"
          onClick={closePopIn}
        >
          {getLibelle("Rechercher")}
        </Bouton>
      </div>
    </>
  );
};

export default connect(RMCBoutons);
