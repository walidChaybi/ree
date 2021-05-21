import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRequeteDataApi } from "./hook/DonneeRequeteHook";
import { IDataTable } from "../../../model/requete/IDataTable";
import {
  URL_MES_REQUETES,
  URL_REQUETES_SERVICE,
  URL_MES_REQUETES_ID,
  URL_REQUETES_SERVICE_ID
} from "../../router/ReceUrls";
import { Title } from "../../core/title/Title";
import { ActionsButtonsRequestPage } from "./actions/ActionsButtonsRequestPage";
import { EtatRequete } from "./contenu/EtatRequete";
import { ContenuRequete } from "./contenu/ContenuRequete";
import { IDocumentDelivre } from "../../common/types/RequeteType";
import { storeRece } from "../../common/util/storeRece";
import { getUrlWithParam } from "../../common/util/route/routeUtil";

export interface RequestsInformations {
  data: IDataTable[];
}

export const ApercuRequetePage: React.FC = () => {
  const { idRequete } = useParams();
  const history = useHistory();
  const [histoReq] = useState<RequestsInformations>(
    history.location.state as RequestsInformations
  );
  const [indexRequete, setIndexRequete] = useState<number>(
    getIndexRequete(idRequete, histoReq)
  );

  const { dataState } = useRequeteDataApi(
    {
      idRequete
    },
    histoReq
  );

  const changeIndex = useCallback(
    (idx: number) => {
      const pathname = history.location.pathname;
      if (pathname.startsWith(URL_MES_REQUETES)) {
        const url = getUrlWithParam(
          URL_MES_REQUETES_ID,
          dataState[idx].idRequete
        );
        history.push(url);
      }
      if (pathname.startsWith(URL_REQUETES_SERVICE)) {
        const url = getUrlWithParam(
          URL_REQUETES_SERVICE_ID,
          dataState[idx].idRequete
        );
        history.push(url);
      }
      setIndexRequete(idx);
    },
    [dataState, history]
  );

  useEffect(() => {
    const idx = dataState.findIndex(donnee => {
      return donnee.idRequete === idRequete;
    });
    setIndexRequete(idx);
  }, [dataState, idRequete]);

  const setDocumentDelivreFct = useCallback(
    (newDocumentsDelivres: IDocumentDelivre) => {
      const data = histoReq && histoReq.data ? histoReq.data : dataState;
      const newRequete: IDataTable = { ...data[indexRequete] };
      newRequete.documentsDelivres = [newDocumentsDelivres];
    },
    [histoReq, indexRequete, dataState]
  );

  const reloadData = useCallback(
    (allsigned: boolean) => {
      if (allsigned === true) {
        history.push(URL_MES_REQUETES);
      }
    },
    [history]
  );

  return (
    <>
      <Title titleId={"pages.delivrance.apercu.titre"} />

      {dataState.length > 0 && indexRequete >= 0 && (
        <>
          <ActionsButtonsRequestPage
            maxRequetes={dataState.length}
            indexRequete={indexRequete}
            setIndexRequete={changeIndex}
            requetes={dataState !== undefined ? dataState : []}
            idRequete={idRequete}
            reloadData={reloadData}
            connectedUser={storeRece.utilisateurCourant}
          />
          <EtatRequete requete={dataState[indexRequete]} />
          <ContenuRequete
            requete={dataState[indexRequete]}
            setDocumentDelivreFct={setDocumentDelivreFct}
          />
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
    position = requetesInfos.data.findIndex((element, index) => {
      if (element.idRequete === idRequete) {
        return true;
      }
      return false;
    });
  }
  return position;
}
