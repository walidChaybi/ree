import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { autorisePrendreEnChargeReqTableauInformation } from "@util/RequetesUtils";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import LiensRECE from "../../../../router/LiensRECE";
import { INFO_PAGE_APERCU_REQUETE_INFORMATION } from "../../../../router/infoPages/InfoPagesEspaceInformation";
import { ICreationActionEtMiseAjourStatutParams, usePostCreationActionEtMiseAjourStatutApi } from "../requete/ActionHook";

export interface INavigationApercuReqInfoParams {
  requete: { id: string; statut: keyof typeof EStatutRequete; idUtilisateur: string | null };
}

export const useNavigationApercuInformation = (params?: INavigationApercuReqInfoParams) => {
  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);

  const [paramsMAJReqInfo, setParamsMAJReqInfo] = useState<ICreationActionEtMiseAjourStatutParams | null>(null);

  usePostCreationActionEtMiseAjourStatutApi(paramsMAJReqInfo);

  useEffect(() => {
    if (!params?.requete) return;

    const redirectionVersApercu = () => {
      navigate(
        LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_INFORMATION.url, {
          idRequeteParam: params.requete.id
        })
      );
    };

    if (autorisePrendreEnChargeReqTableauInformation(utilisateurConnecte, params.requete)) {
      setParamsMAJReqInfo({
        libelleAction: EStatutRequete.PRISE_EN_CHARGE,
        statutRequete: "PRISE_EN_CHARGE",
        requeteId: params.requete.id,
        callback: redirectionVersApercu
      });
    } else {
      redirectionVersApercu();
    }
  }, [params]);
};
