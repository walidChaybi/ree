import { HTTP_STATUS_OK } from "@api/ApiManager";
import { URL_REQUETES_COUNT } from "@api/appels/requeteApi";
import { RECEContext } from "@core/body/RECEContext";
import { OfficierContextProps } from "@core/contexts/OfficierContext";
import { IOfficier } from "@model/agent/IOfficier";
import { executeEnDiffere, getLibelle } from "@util/Utils";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import apiResources from "../../../ressources/api.json";
import { getCsrfHeader } from "./CsrfUtil";
import messageManager from "./messageManager";

const TIME_OUT_MS = 2000;

interface GestionnaireFermetureProps {
  paramsFctAAppler?: any;
  fctAAppeler?: (data: any) => any;
  fctTraitementResultat?: (res: any) => any;
  urlRedirection?: string;
}

export const GestionnaireFermeture: React.FC<
  GestionnaireFermetureProps
> = props => {
  const history = useHistory();
  const { isDirty } = useContext(RECEContext);

  useEffect(() => {
    const handleBackBeforUnload = (event: any) => {
      let resTraitement: any = false;
      if (props.fctAAppeler && !isDirty) {
        const res = props.fctAAppeler(props.paramsFctAAppler);
        if (props.fctTraitementResultat) {
          resTraitement = props.fctTraitementResultat(res);
        }
      }

      if (resTraitement) {
        event.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown

        if (props.urlRedirection) {
          executeEnDiffere(function () {
            if (props.urlRedirection) {
              history.push(props.urlRedirection);
            }
          }, TIME_OUT_MS);
        }
      }
    };
    if (window.top) {
      window.top.removeEventListener("beforeunload", handleBackBeforUnload);
      window.top.addEventListener("beforeunload", handleBackBeforUnload);
    }

    return () => {
      if (window.top) {
        window.top.removeEventListener("beforeunload", handleBackBeforUnload);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  return null;
};

export const appelRequetesASigner = (officier: OfficierContextProps) => {
  const officierPayload = officier?.officierDataState;
  const req = appelApi(officierPayload);
  let response;
  try {
    response = JSON.parse(req.response ? req.response : null);
  } catch (error) {
    return 0;
  }
  return req.status === HTTP_STATUS_OK && response && response.data
    ? response.data
    : 0;
};

const appelApi = (officierPayload: IOfficier | undefined) => {
  const req = new XMLHttpRequest();
  const api = apiResources.apis[0];
  const version = api.usedVersions[1];

  const params = `statuts=A_SIGNER`;
  const url = `${window.origin}/${api.domain}/${api.name}/${version}${URL_REQUETES_COUNT}?${params}`;
  req.open("GET", url, false);

  // Ajout de la valeur du cookie csrf dans l'entête
  const header = getCsrfHeader();
  req.setRequestHeader(header.header, header.value);
  try {
    // Envoi de la requête
    req.send();
  } catch (e) {
    // en cas d'erreur, on considère qu'il n'y a pas de requête à signer
    return { response: { date: 0 }, status: HTTP_STATUS_OK };
  }

  return req;
};

export const traiteAppelRequeteASigner = (nbRequeteASigner: number) => {
  if (nbRequeteASigner > 0) {
    executeEnDiffere(function () {
      const msg = getLibelle(
        `Il reste ${nbRequeteASigner} requête(s) à signer`
      );
      messageManager.showWarningAndClose(msg);
    }, TIME_OUT_MS);
  }
  return nbRequeteASigner > 0;
};
