import React, { useEffect } from "react";
import { OfficierContextProps } from "../../core/contexts/OfficierContext";
import apiResources from "../../../ressources/api.json";
import messageManager from "./messageManager";
import { ApiEndpoints } from "../../router/UrlManager";
import { useHistory } from "react-router-dom";
import { IOfficierSSOApi } from "../../core/login/LoginHook";
import { getText } from "../widget/Text";

const TIME_OUT_MS = 500;
interface GestionnaireFermetureProps {
  paramsFctAAppler?: any;
  fctAAppeler?: (data: any) => any;
  fctTraitementResultat?: (res: any) => any;
  urlRedirection?: string;
}

export const GestionnaireFermeture: React.FC<GestionnaireFermetureProps> = (
  props
) => {
  const history = useHistory();
  useEffect(() => {
    const handleBackBeforUnload = (event: any) => {
      let resTraitement: any = true;
      if (props.fctAAppeler) {
        const res = props.fctAAppeler(props.paramsFctAAppler);

        if (props.fctTraitementResultat) {
          resTraitement = props.fctTraitementResultat(res);
        }
      }

      if (resTraitement) {
        // Cancel the default event
        event.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
        // Older browsers supported custom message
        event.returnValue = "Are you sur to close this window";
        if (props.urlRedirection) {
          executeEnDiffere(function () {
            if (props.urlRedirection) {
              history.push(props.urlRedirection);
            }
          });
        }
      } else {
        delete event["returnValue"]; // the absence of a returnValue property on the event will guarantee the browser unload happens
      }
    };
    window.top.addEventListener("beforeunload", handleBackBeforUnload);

    return () => {
      window.top.removeEventListener("beforeunload", handleBackBeforUnload);
    };
  }, [props, history]);

  return null;
};

const HTTP_STATUS_OK = 200;

export const appelRequetesASigner = (officier: OfficierContextProps) => {
  const officierPayload = officier?.officierDataState;
  const req = appelApi(officierPayload);
  const response = JSON.parse(req.response !== undefined ? req.response : null);
  return req.status === HTTP_STATUS_OK && response && response.data
    ? response.data
    : 0;
};

const appelApi = (officierPayload: IOfficierSSOApi | undefined) => {
  const req = new XMLHttpRequest();
  const api = apiResources.apis[0];
  const version = api.usedVersions[0];

  const params = `nomOec=${officierPayload?.nom}&prenomOec=${officierPayload?.prenom}&statuts=A_SIGNER`;
  const url = `${window.origin}/${api.domain}/${api.name}/${version}${ApiEndpoints.RequetesCountUrl}?${params}`;
  req.open("GET", url, false);
  req.send();

  return req;
};

export const traiteAppelRequeteASigner = (nbRequeteASigner: number) => {
  if (nbRequeteASigner > 0) {
    executeEnDiffere(function () {
      const msg = getText("pages.delivrance.mesRequetes.resteASigner", [
        nbRequeteASigner
      ]);
      messageManager.showWarningAndClose(msg);
    });
  }
  return nbRequeteASigner > 0;
};

const executeEnDiffere = (fct: any) => {
  setTimeout(fct, TIME_OUT_MS);
};
