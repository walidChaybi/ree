import { connect } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { StatutRequete } from "../../../../../../../model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../../../../../model/requete/IRequeteDelivrance";
import { getLibelle } from "../../../../../../common/util/Utils";
import { FormikComponentProps } from "../../../../../../common/widget/formulaire/utils/FormUtil";
import { receUrl } from "../../../../../../router/ReceUrls";
import {
  UpdateChoixDelivranceProps,
  useUpdateChoixDelivrance
} from "../../../apercuRequeteEnpriseEnCharge/contenu/actions/hook/UpdateChoixDelivranceHook";
import "./scss/BoutonsCourrier.scss";

export type BoutonsCourrierProps = {
  requete: IRequeteDelivrance;
  optionsValides: boolean;
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

  const refValider = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    refValider.current?.focus();
  }, []);

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
          disabled={!props.optionsValides || !props.formik.isValid}
          type="button"
          id="boutonEnregistrer"
          ref={refValider}
          onClick={() => {
            props.formik.submitForm();
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
