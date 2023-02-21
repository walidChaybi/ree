import {
  ICreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "@hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { PATH_APERCU_REQ_PRISE } from "@router/ReceUrls";
import { getLibelle } from "@util/Utils";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { StatutRequete } from "../../../../../../model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../../../../model/requete/IRequeteDelivrance";
import {
  getUrlPrecedente,
  getUrlWithParam
} from "../../../../../common/util/route/UrlUtil";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";

interface BoutonModifierTraitementProps {
  requete: IRequeteDelivrance;
}

export const BoutonModifierTraitement: React.FC<
  BoutonModifierTraitementProps
> = props => {
  const history = useHistory();

  const [params, setParams] = useState<
    ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();

  const setActionEtUpdateStatut = () => {
    if (
      !props.requete.documentsReponses ||
      props.requete.documentsReponses.length === 0
    ) {
      history.replace(
        `${getUrlPrecedente(
          history.location.pathname
        )}/${PATH_APERCU_REQ_PRISE}/${props.requete.id}`
      );
    } else {
      setParams({
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        libelleAction: getLibelle("Revue du traitement"),
        urlCourante: getUrlWithParam(
          history.location.pathname,
          props.requete.id
        ),
        requete: mappingRequeteDelivranceToRequeteTableau(props.requete),
        pasDeTraitementAuto: true,
        typeRequete: TypeRequete.DELIVRANCE
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
