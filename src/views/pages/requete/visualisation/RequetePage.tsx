import React, { useState, useEffect, useCallback } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { IDataTable } from "../RequeteTableauHeaderCell";
import { Text } from "../../../common/widget/Text";
import { EtatRequete } from "./EtatRequete";
import { ContenuRequete } from "./ContenuRequete";
import { ActionsButtonsRequestPage } from "./ActionsButtonsRequestPage";
import { useRequeteDatumApi } from "./DonneeRequeteHook";
import { getAppUrl, MesRequetesUrl } from "../../../router/UrlManager";

export interface RequestsInformations {
  data: IDataTable[];
}

type RequetePageProps = RouteComponentProps<{ idRequete: string }>;

export const RequetePage: React.FC<RequetePageProps> = props => {
  const history = useHistory();
  const [indexRequete, setIndexRequete] = useState<number>(0);
  const [histoReq] = useState<RequestsInformations>(
    history.location.state as RequestsInformations
  );

  // TODO mettre les vraies valeurs quand on aura le WS d'auth
  const { dataState } = useRequeteDatumApi(
    {
      nomOec: "Garisson",
      prenomOec: "Juliette",
      statut: StatutRequete.ASigner,
      idRequete: props.match.params.idRequete
    },
    histoReq
  );

  const changeIndex = useCallback(
    (idx: number) => {
      history.push(`${getAppUrl(MesRequetesUrl)}/${dataState[idx].idRequete}`);
      setIndexRequete(idx);
    },
    [dataState, history]
  );

  useEffect(() => {
    const idx = dataState.findIndex(datum => {
      return datum.idRequete === props.match.params.idRequete;
    });
    setIndexRequete(idx);
  }, [dataState, props.match.params.idRequete]);

  return (
    <>
      <h2>
        <Text messageId={"pages.requetes.apercu.titre"} />
      </h2>
      {dataState.length > 0 && indexRequete >= 0 && (
        <EtatRequete requete={dataState[indexRequete]} />
      )}
      {dataState.length > 0 && indexRequete >= 0 && (
        <ContenuRequete requete={dataState[indexRequete]} />
      )}
      {dataState.length > 0 && indexRequete >= 0 && (
        <ActionsButtonsRequestPage
          maxRequetes={dataState.length}
          indexRequete={indexRequete}
          setIndexRequete={changeIndex}
        />
      )}
    </>
  );
};
