import { connect } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { StatutRequete } from "../../../../../../model/requete/v2/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../../../../model/requete/v2/IRequeteDelivrance";
import { FormikComponentProps } from "../../../../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../../../../common/widget/Text";
import { receUrl } from "../../../../../router/ReceUrls";
import {
  UpdateChoixDelivranceProps,
  useUpdateChoixDelivrance
} from "../../../apercuRequeteEnpriseEnCharge/contenu/hook/UpdateChoixDelivranceHook";
import "./scss/BoutonsCourrier.scss";

export type BoutonsCourrierProps = {
  requete: IRequeteDelivrance;
} & FormikComponentProps;

const BoutonsCourrier: React.FC<BoutonsCourrierProps> = props => {
  const history = useHistory();
  const [params, setParams] = useState<UpdateChoixDelivranceProps>();

  const handleAnnuler = () => {
    if (props.requete.statutCourant.statut === StatutRequete.PRISE_EN_CHARGE) {
      props.requete.choixDelivrance = undefined;
      setParams({ requete: props.requete });
    }
    receUrl.goBack(history);
  };

  useUpdateChoixDelivrance(params);

  return (
    <>
      <div className="BoutonsCourrier" key="boutons">
        <button
          type="button"
          id="annuler"
          onClick={handleAnnuler}
          key={"annuler"}
        >
          {getLibelle("Annuler")}
        </button>
        <button
          disabled={!props.formik.dirty}
          type="button"
          id="boutonEnregistrer"
          onClick={() => {
            // TODO props.formik.submitForm();
          }}
          key={"valider"}
        >
          {getLibelle("Valider")}
        </button>
      </div>
    </>
  );
};

export default connect(BoutonsCourrier);
