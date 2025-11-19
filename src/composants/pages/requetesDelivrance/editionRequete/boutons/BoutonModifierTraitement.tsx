import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { replaceUrl } from "@util/route/UrlUtil";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import LiensRECE from "../../../../../router/LiensRECE";
import { INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE } from "../../../../../router/infoPages/InfoPagesEspaceDelivrance";
import {
  ICreationActionMiseAjourStatutEtRedirectionParams,
  useCreationActionMiseAjourStatutEtRedirectionHook
} from "../../../../../views/common/hook/requete/CreationActionMiseAjourStatutEtRedirectionHook";
import { mappingRequeteDelivranceToRequeteTableau } from "../../../../../views/pages/requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import { IBoutonProps } from "../../../../commun/bouton/Bouton";
import { BoutonAvecChargement } from "../../../../commun/bouton/BoutonAvecChargement";

interface BoutonModifierTraitementProps extends IBoutonProps {
  requete: IRequeteDelivrance;
}

export const BoutonModifierTraitement: React.FC<BoutonModifierTraitementProps> = ({ requete, ...props }) => {
  const navigate = useNavigate();

  const [paramsCreerActionMAJEtRedirection, setParamsCreerActionMAJEtRedirection] = useState<
    ICreationActionMiseAjourStatutEtRedirectionParams | undefined
  >();

  const setActionEtUpdateStatut = () => {
    if (requete.documentsReponses?.length > 0) {
      setParamsCreerActionMAJEtRedirection({
        statutRequete: "PRISE_EN_CHARGE",
        libelleAction: "Revue du traitement",
        requete: mappingRequeteDelivranceToRequeteTableau(requete),
        typeRequete: "DELIVRANCE",
        autoriserTraitementAutoRDCS: false
      });
    } else {
      replaceUrl(navigate, LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE.url, { idRequeteParam: requete.id }), {
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
