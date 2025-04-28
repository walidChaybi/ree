import { GestionnaireApi } from "@api/GestionnaireApi";
import { TAppelApi, TBaseUri, TConfigurationApi, TReponseApiEchec, TReponseApiSucces } from "@model/api/Api";

import { useState } from "react";
import API from "../../utils/AppelApi";

const useFetchApi = <
  TUri extends TBaseUri,
  TBody extends object | undefined = undefined,
  TQuery extends object | undefined = undefined,
  TResultat = unknown
>(
  configuration: TConfigurationApi<TUri, TBody, TQuery, TResultat>,
  appelAvecAxios: boolean = false
) => {
  const [enAttenteDeReponseApi, setEnAttenteDeReponseApi] = useState(false);

  const appelApi = ({
    parametres,
    apresSucces,
    apresErreur,
    finalement,
    forcerAppelsMultiples
  }: TAppelApi<TUri, TBody, TQuery, TResultat>) => {
    if (enAttenteDeReponseApi && !forcerAppelsMultiples) {
      return;
    }

    !forcerAppelsMultiples && setEnAttenteDeReponseApi(true);
    /* istanbul ignore file */
    /* v8 ignore start a faire Lundi 31 Mars @ Adrien_Bonvin */
    if (configuration.avecAxios || appelAvecAxios) {
      API.appel({
        api: configuration.api,
        configurationRequete: {
          methode: configuration.methode,
          uri: configuration.uri,
          ...parametres
        }
      })
        .then(reponse => {
          const { data, headers } = reponse as TReponseApiSucces<TResultat>;
          apresSucces?.(data, headers);
        })
        .catch(erreur => {
          const { erreurs, status } = erreur as TReponseApiEchec;
          apresErreur?.(erreurs, status);
        })
        .finally(() => {
          finalement && finalement();
          setEnAttenteDeReponseApi(false);
          !forcerAppelsMultiples && setEnAttenteDeReponseApi(false);
        });
      return;
    }
    /* v8 ignore end */

    GestionnaireApi.getInstance(configuration.api.nom, configuration.api.version)
      .fetch({
        methode: configuration.methode,
        uri: configuration.uri,
        ...parametres
      })
      .then(reponse => {
        const { data, headers } = reponse as TReponseApiSucces<TResultat>;
        apresSucces?.(data, headers);
      })
      .catch(erreur => {
        const { erreurs, status } = erreur as TReponseApiEchec;
        apresErreur?.(erreurs, status);
      })
      .finally(() => {
        finalement && finalement();
        !forcerAppelsMultiples && setEnAttenteDeReponseApi(false);
      });
  };

  return {
    appelApi,
    enAttenteDeReponseApi
  };
};

export default useFetchApi;
