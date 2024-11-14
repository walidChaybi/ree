import {
  ICreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto,
} from "@hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { mappingRequeteDelivranceToRequeteTableau } from "@pages/requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import { PATH_APERCU_REQ_PRISE } from "@router/ReceUrls";
import {
  getUrlPrecedente,
  getUrlWithParam,
  replaceUrl,
} from "@util/route/UrlUtil";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IBoutonProps } from "../../../../commun/bouton/Bouton";
import { BoutonAvecChargement } from "../../../../commun/bouton/BoutonAvecChargement";

interface BoutonModifierTraitementProps extends IBoutonProps {
  requete: IRequeteDelivrance;
}

export const BoutonModifierTraitement: React.FC<
  BoutonModifierTraitementProps
> = ({ requete, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [paramsCreerActionEtMajRmc, setParamsCreerActionEtMajRmc] = useState<
    ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();

  const setActionEtUpdateStatut = () => {
    if (requete.documentsReponses?.length > 0) {
      setParamsCreerActionEtMajRmc({
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        libelleAction: "Revue du traitement",
        urlCourante: getUrlWithParam(location.pathname, requete.id),
        requete: mappingRequeteDelivranceToRequeteTableau(requete),
        pasDeTraitementAuto: true,
        typeRequete: TypeRequete.DELIVRANCE,
      });
    } else {
      replaceUrl(
        navigate,
        `${getUrlPrecedente(location.pathname)}/${PATH_APERCU_REQ_PRISE}/${
          requete.id
        }`,
      );
    }
  };

  useCreationActionMiseAjourStatutEtRmcAuto(paramsCreerActionEtMajRmc);

  return (
    <BoutonAvecChargement
      executerApresClick={setActionEtUpdateStatut}
      styleBouton="secondaire"
      title={
        "Retour à la prise en charge de la requête, les documents constitués seront supprimés"
      }
      {...props}
    >
      Modifier le traitement
    </BoutonAvecChargement>
  );
};
