import React, { useState, useEffect, useCallback } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { EtatRequete } from "./EtatRequete";
import { ContenuRequete } from "./ContenuRequete";
import { ActionsButtonsRequestPage } from "./ActionsButtonsRequestPage";
import { useRequeteDataApi } from "./DonneeRequeteHook";
import { IDataTable } from "../MesRequetesPage";
import { AppUrls } from "../../../router/UrlManager";
import { Title } from "../../../core/title/Title";
import { IDocumentDelivre } from "./RequeteType";
import { IUtilisateurSSOApi } from "../../../core/LoginHook";

export interface RequestsInformations {
  data: IDataTable[];
}

export interface Test {
  officier?: IUtilisateurSSOApi;
}

type RequetePageProps = RouteComponentProps<{ idRequete: string }> & Test;

export const RequetePage: React.FC<RequetePageProps> = (props) => {
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
      idRequete: props.match.params.idRequete,
    },
    props.officier,
    histoReq
  );

  // Contenu du document en base 64
  const [requeteState, setRequeteState] = useState<IDataTable>();

  const changeIndex = useCallback(
    (idx: number) => {
      history.push(`${AppUrls.ctxMesRequetesUrl}/${dataState[idx].idRequete}`);
      setIndexRequete(idx);
    },
    [dataState, history]
  );

  useEffect(() => {
    const idx = dataState.findIndex((donnee) => {
      return donnee.idRequete === props.match.params.idRequete;
    });
    setIndexRequete(idx);
  }, [dataState, props.match.params.idRequete]);

  const setDocumentDelivreFct = useCallback(
    (newDocumentsDelivres: IDocumentDelivre) => {
      const newRequete: IDataTable = { ...histoReq.data[indexRequete] };
      newRequete.documentsDelivres = [newDocumentsDelivres];

      setRequeteState(newRequete);
    },
    [histoReq, indexRequete]
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
            requetes={requeteState !== undefined ? [requeteState] : []}
            idRequete={props.match.params.idRequete}
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
