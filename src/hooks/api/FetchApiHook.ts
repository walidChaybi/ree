import { GestionnaireApi } from "@api/GestionnaireApi";
import { TAppelApi, TBaseUri, TConfigurationApi, TReponseApiEchec, TReponseApiSucces } from "@model/api/Api";

import { useState } from "react";

const useFetchApi = <
  TUri extends TBaseUri,
  TBody extends object | undefined = undefined,
  TQuery extends object | undefined = undefined,
  TResultat = unknown
>(
  configuration: TConfigurationApi<TUri, TBody, TQuery, TResultat>
) => {
  const [enAttenteDeReponseApi, setEnAttenteDeReponseApi] = useState(false);

  const appelApi = ({ parametres, apresSucces, apresErreur, finalement }: TAppelApi<TUri, TBody, TQuery, TResultat>) => {
    if (enAttenteDeReponseApi) {
      return;
    }
    setEnAttenteDeReponseApi(true);
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
        setEnAttenteDeReponseApi(false);
      });
  };

  return {
    appelApi,
    enAttenteDeReponseApi
  };
};

export default useFetchApi;
