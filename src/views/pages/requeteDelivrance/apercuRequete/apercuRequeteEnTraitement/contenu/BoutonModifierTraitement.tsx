import {
  ICreationActionMiseAjourStatutEtRedirectionParams,
  useCreationActionMiseAjourStatutEtRedirectionHook
} from "@hook/requete/CreationActionMiseAjourStatutEtRedirectionHook";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { BoutonOperationEnCours } from "@widget/attente/BoutonOperationEnCours";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import LiensRECE from "../../../../../../router/LiensRECE";
import { INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE } from "../../../../../../router/infoPages/InfoPagesEspaceDelivrance";
import { replaceUrl } from "../../../../../common/util/route/UrlUtil";
import { mappingRequeteDelivranceToRequeteTableau } from "../../mapping/ReqDelivranceToReqTableau";

interface BoutonModifierTraitementProps {
  requete: IRequeteDelivrance;
}

export const BoutonModifierTraitement: React.FC<BoutonModifierTraitementProps> = props => {
  const navigate = useNavigate();

  const [params, setParams] = useState<ICreationActionMiseAjourStatutEtRedirectionParams | undefined>();

  const setActionEtUpdateStatut = () => {
    if (!props.requete.documentsReponses || props.requete.documentsReponses.length === 0) {
      replaceUrl(
        navigate,
        LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE.url, { idRequeteParam: props.requete.id }),
        {
          autoriserTraitementAutoRDCS: false
        }
      );
    } else {
      setParams({
        statutRequete: "PRISE_EN_CHARGE",
        libelleAction: "Revue du traitement",
        requete: mappingRequeteDelivranceToRequeteTableau(props.requete),
        typeRequete: "DELIVRANCE",
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
