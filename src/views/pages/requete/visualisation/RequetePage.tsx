import React, { useState, useEffect, useCallback } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { IDataTable } from "../RequeteTableauHeaderCell";
import { Text } from "../../../common/widget/Text";
import { EtatRequete } from "./EtatRequete";
import { ContenuRequete } from "./ContenuRequete";
import { ActionsButtonsRequestPage } from "./ActionsButtonsRequestPage";
import { useRequeteDataApi } from "./DonneeRequeteHook";
import { AppUrls } from "../../../router/UrlManager";

export interface RequestsInformations {
  data: IDataTable[];
}

type RequetePageProps = RouteComponentProps<{ idRequete: string }>;

export const RequetePage: React.FC<RequetePageProps> = props => {
  const history = useHistory();
  const [histoReq] = useState<RequestsInformations>(
    history.location.state as RequestsInformations
  );
  const [indexRequete, setIndexRequete] = useState<number>(
    getIndexRequete(props.match.params.idRequete, histoReq)
  );

  // TODO mettre les vraies valeurs quand on aura le WS d'auth
  const { dataState } = useRequeteDataApi(
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
      history.push(`${AppUrls.ctxMesRequetesUrl}/${dataState[idx].idRequete}`);
      setIndexRequete(idx);
    },
    [dataState, history]
  );

  useEffect(() => {
    const idx = dataState.findIndex(donnee => {
      return donnee.idRequete === props.match.params.idRequete;
    });
    setIndexRequete(idx);
  }, [dataState, props.match.params.idRequete]);

  return (
    <>
      <h2>
        <Text messageId={"pages.requetes.apercu.titre"} />
      </h2>
      {dataState.length > 0 && indexRequete >= 0 && (
        <>
          <ActionsButtonsRequestPage
            maxRequetes={dataState.length}
            indexRequete={indexRequete}
            setIndexRequete={changeIndex}
          />
          <EtatRequete requete={dataState[indexRequete]} />
          <ContenuRequete requete={dataState[indexRequete]} />
        </>
      )}
    </>
  );
};

function getIndexRequete(
  idRequete: string,
  requetesInfos: RequestsInformations
): number {
  let position = 0;
  if (requetesInfos !== undefined) {
    requetesInfos.data.find((element, index) => {
      if (element.idRequete === idRequete) {
        position = index;
        return true;
      }
      return false;
    });
  }

  return position;
}
