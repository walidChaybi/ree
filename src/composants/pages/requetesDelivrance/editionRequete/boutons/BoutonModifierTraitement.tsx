import {
  ICreationActionMiseAjourStatutEtRedirectionParams,
  useCreationActionMiseAjourStatutEtRedirectionHook
} from "@hook/requete/CreationActionMiseAjourStatutEtRedirectionHook";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { mappingRequeteDelivranceToRequeteTableau } from "@pages/requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import { PATH_APERCU_REQ_PRISE } from "@router/ReceUrls";
import { getUrlPrecedente, getUrlWithParam, replaceUrl } from "@util/route/UrlUtil";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { IBoutonProps } from "../../../../commun/bouton/Bouton";
import { BoutonAvecChargement } from "../../../../commun/bouton/BoutonAvecChargement";

interface BoutonModifierTraitementProps extends IBoutonProps {
  requete: IRequeteDelivrance;
}

export const BoutonModifierTraitement: React.FC<BoutonModifierTraitementProps> = ({ requete, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [paramsCreerActionMAJEtRedirection, setParamsCreerActionMAJEtRedirection] = useState<
    ICreationActionMiseAjourStatutEtRedirectionParams | undefined
  >();

  const setActionEtUpdateStatut = () => {
    if (requete.documentsReponses?.length > 0) {
      setParamsCreerActionMAJEtRedirection({
        statutRequete: "PRISE_EN_CHARGE",
        libelleAction: "Revue du traitement",
        urlCourante: getUrlWithParam(location.pathname, requete.id),
        requete: mappingRequeteDelivranceToRequeteTableau(requete),
        typeRequete: "DELIVRANCE",
        autoriserTraitementAutoRDCS: false
      });
    } else {
      replaceUrl(navigate, `${getUrlPrecedente(location.pathname)}/${PATH_APERCU_REQ_PRISE}/${requete.id}`, {
        autoriserTraitementAutoRDCS: false
      });
    }
  };

  useCreationActionMiseAjourStatutEtRedirectionHook(paramsCreerActionMAJEtRedirection);

  return (
    <BoutonAvecChargement
      executerApresClick={setActionEtUpdateStatut}
      styleBouton="secondaire"
      title={"Retour à la prise en charge de la requête, les documents constitués seront supprimés"}
      {...props}
    >
      Modifier le traitement
    </BoutonAvecChargement>
  );
};
