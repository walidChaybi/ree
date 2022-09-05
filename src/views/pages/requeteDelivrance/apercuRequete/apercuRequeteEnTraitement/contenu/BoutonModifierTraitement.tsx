import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { StatutRequete } from "../../../../../../model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../../../../model/requete/IRequeteDelivrance";
import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "../../../../../common/hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import {
  getUrlPrecedente,
  getUrlWithParam
} from "../../../../../common/util/route/routeUtil";
import { getLibelle } from "../../../../../common/util/Utils";
import { BoutonOperationEnCours } from "../../../../../common/widget/attente/BoutonOperationEnCours";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";

interface BoutonModifierTraitementProps {
  requete: IRequeteDelivrance;
}

export const BoutonModifierTraitement: React.FC<
  BoutonModifierTraitementProps
> = props => {
  const history = useHistory();

  const [params, setParams] = useState<
    CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();

  const setActionEtUpdateStatut = () => {
    if (props.requete.documentsReponses.length === 0) {
      history.replace(getUrlPrecedente(history.location.pathname));
    } else {
      setParams({
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        libelleAction: getLibelle("Revue du traitement"),
        urlCourante: getUrlWithParam(
          history.location.pathname,
          props.requete.id
        ),
        requete: mappingRequeteDelivranceToRequeteTableau(props.requete),
        pasDeTraitementAuto: true
      });
    }
  };

  useCreationActionMiseAjourStatutEtRmcAuto(params);

  return (
    <BoutonOperationEnCours
      onClick={setActionEtUpdateStatut}
      checkDirtyActive={true}
      title={getLibelle(
        "Retour à la prise en charge de la requête, les documents constitués seront supprimés"
      )}
    >
      {getLibelle("Modifier le traitement")}
    </BoutonOperationEnCours>
  );
};
