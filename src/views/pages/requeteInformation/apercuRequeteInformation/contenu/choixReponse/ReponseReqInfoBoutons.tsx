import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { FormikComponentProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import { useNavigate } from "react-router";
import LiensRECE from "../../../../../../router/LiensRECE";
import "../scss/ReponseReqInfo.scss";

type ComponentProps = {
  formulaireDisabled: boolean;
  retourVisible?: boolean;
  affichageBoutonPrendreEnCharge?: boolean;
  onclickPrendreEnCharge?: () => void;
};

type BoutonsReponseReqInfoProps = ComponentProps & FormikComponentProps;

const ReponseReqInfoBoutons: React.FC<BoutonsReponseReqInfoProps> = props => {
  const navigate = useNavigate();

  return (
    <div className="Boutons">
      {props.retourVisible && (
        <BoutonDoubleSubmit
          type="button"
          title="Retour"
          id="boutonAnnuler"
          onClick={() => {
            navigate(LiensRECE.retourArriere(), { replace: true });
          }}
        >
          {"Retour"}
        </BoutonDoubleSubmit>
      )}
      {!props.affichageBoutonPrendreEnCharge && (
        <BoutonDoubleSubmit
          disabled={props.formulaireDisabled || !props.formik.isValid}
          aria-label={"Envoyer la réponse"}
          type="button"
          id="boutonEnvoyer"
          onClick={() => {
            props.formik.submitForm();
          }}
        >
          {"Envoyer la réponse"}
        </BoutonDoubleSubmit>
      )}
      {props.affichageBoutonPrendreEnCharge && (
        <BoutonDoubleSubmit
          type="button"
          id="boutonPrendreEnCharge"
          aria-label={"Prendre en charge"}
          onClick={props.onclickPrendreEnCharge}
        >
          {"Prendre en charge"}
        </BoutonDoubleSubmit>
      )}
    </div>
  );
};

export default connect<ComponentProps>(ReponseReqInfoBoutons);
