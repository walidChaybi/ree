import {
  ICreationActionMiseAjourStatutEtRedirectionParams,
  useCreationActionMiseAjourStatutEtRedirectionHook
} from "@hook/requete/CreationActionMiseAjourStatutEtRedirectionHook";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { PATH_APERCU_REQ_PRISE } from "@router/ReceUrls";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IRequeteDelivrance } from "../../../../../../model/requete/IRequeteDelivrance";
import { StatutRequete } from "../../../../../../model/requete/enum/StatutRequete";
import { getUrlPrecedente, getUrlWithParam, replaceUrl } from "../../../../../common/util/route/UrlUtil";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";

interface BoutonModifierTraitementProps {
  requete: IRequeteDelivrance;
}

export const BoutonModifierTraitement: React.FC<BoutonModifierTraitementProps> = props => {
  const location = useLocation();
  const navigate = useNavigate();

  const [params, setParams] = useState<ICreationActionMiseAjourStatutEtRedirectionParams | undefined>();

  const setActionEtUpdateStatut = () => {
    if (!props.requete.documentsReponses || props.requete.documentsReponses.length === 0) {
      replaceUrl(navigate, `${getUrlPrecedente(location.pathname)}/${PATH_APERCU_REQ_PRISE}/${props.requete.id}`, {
        autoriserTraitementAutoRDCS: false
      });
    } else {
      setParams({
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        libelleAction: "Revue du traitement",
        urlCourante: getUrlWithParam(location.pathname, props.requete.id),
        requete: mappingRequeteDelivranceToRequeteTableau(props.requete),
        typeRequete: TypeRequete.DELIVRANCE,
        autoriserTraitementAutoRDCS: false
      });
    }
  };

  useCreationActionMiseAjourStatutEtRedirectionHook(params);

  return (
    <BoutonOperationEnCours
      onClick={setActionEtUpdateStatut}
      checkDirtyActive={true}
      title={"Retour à la prise en charge de la requête, les documents constitués seront supprimés"}
    >
      {"Modifier le traitement"}
    </BoutonOperationEnCours>
  );
};
