import { RECEContextData } from "@core/contexts/RECEContext";
import { IRequeteTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { RequeteTableauRMC } from "@model/rmc/requete/RequeteTableauRMC";
import { autorisePrendreEnChargeReqTableauInformation } from "@util/RequetesUtils";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LiensRECE from "../../../../router/LiensRECE";
import { INFO_PAGE_APERCU_REQUETE_INFORMATION } from "../../../../router/infoPages/InfoPagesEspaceInformation";
import { ICreationActionMiseAjourStatutHookParams, useCreationActionMiseAjourStatut } from "../requete/CreationActionMiseAjourStatutHook";

export interface INavigationApercuReqInfoParams {
  requete: IRequeteTableauInformation | RequeteTableauRMC<"INFORMATION">;
  callback?: () => void;
  urlCourante: string;
}

export function useNavigationApercuInformation(params?: INavigationApercuReqInfoParams) {
  const [paramsMAJReqInfo, setParamsMAJReqInfo] = useState<ICreationActionMiseAjourStatutHookParams | undefined>();

  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);

  useCreationActionMiseAjourStatut(paramsMAJReqInfo);

  const redirectionVersApercu = useCallback(() => {
    if (params) {
      navigate(
        LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_INFORMATION.url, {
          idRequeteParam: "idRequete" in params.requete ? params.requete.idRequete : params.requete.id
        })
      );
    }
  }, [params, navigate]);

  useEffect(() => {
    if (params?.requete) {
      if (autorisePrendreEnChargeReqTableauInformation(utilisateurConnecte, params.requete)) {
        setParamsMAJReqInfo({
          libelleAction: EStatutRequete.PRISE_EN_CHARGE,
          statutRequete: "PRISE_EN_CHARGE",
          requete: params.requete,
          callback: () => {
            redirectionVersApercu();
          }
        });
      } else {
        redirectionVersApercu();
      }
    }
  }, [params]);
}
