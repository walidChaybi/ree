import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "../../../../api/appels/requeteApi";
import { IRequeteTableauCreation } from "../../../../model/requete/IRequeteTableauCreation";
import { getUrlWithParam } from "../../../common/util/route/routeUtil";
import { getMessageZeroRequete } from "../../../common/util/tableauRequete/TableauRequeteUtils";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_DEFAUT
} from "../../../common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "../../../common/widget/tableau/TableauRece/TableauRece";
import { SortOrder } from "../../../common/widget/tableau/TableUtils";
import { URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID } from "../../../router/ReceUrls";
import { goToLinkRequete } from "../../requeteDelivrance/espaceDelivrance/EspaceDelivranceUtils";
import { useRequeteCreationApi } from "../hook/DonneesRequeteCreationApiHook";
import { statutsRequetesCreation } from "./params/EspaceCreationParams";
import { colonnesTableauRequetesServiceCreation } from "./params/RequetesServiceCreationParams";

interface RequetesServiceCreationProps {
  queryParametersPourRequetes: IQueryParametersPourRequetes;
}

export const RequetesServiceCreation: React.FC<
  RequetesServiceCreationProps
> = props => {
  const history = useHistory();

  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();
  const [linkParameters, setLinkParameters] =
    useState<IQueryParametersPourRequetes>(props.queryParametersPourRequetes);

  const [enChargement, setEnChargement] = React.useState(true);
  const { dataState, paramsTableau } = useRequeteCreationApi(
    linkParameters,
    TypeAppelRequete.REQUETE_CREATION_SERVICE,
    setEnChargement
  );

  const goToLink = useCallback((link: string) => {
    const queryParametersPourRequetes = goToLinkRequete(
      link,
      "requetesService"
    );
    if (queryParametersPourRequetes) {
      setLinkParameters(queryParametersPourRequetes);
    }
  }, []);

  const handleChangeSort = useCallback((tri: string, sens: SortOrder) => {
    const queryParameters = {
      statuts: statutsRequetesCreation,
      tri,
      sens,
      range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
    };

    setLinkParameters(queryParameters);
  }, []);

  useEffect(() => {
    if (dataState?.length === 0) {
      setZeroRequete(getMessageZeroRequete());
    }
  }, [dataState]);

  function onClickOnLine(
    idRequete: string,
    data: IRequeteTableauCreation[],
    idx: number
  ) {
    history.push(
      getUrlWithParam(URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID, idRequete)
    );
  }

  return (
    <>
      <TableauRece
        idKey={"idRequete"}
        sortOrderByState={linkParameters.tri}
        sortOrderState={linkParameters.sens}
        onClickOnLine={onClickOnLine}
        columnHeaders={colonnesTableauRequetesServiceCreation}
        dataState={dataState}
        paramsTableau={paramsTableau}
        goToLink={goToLink}
        handleChangeSort={handleChangeSort}
        noRows={zeroRequete}
        enChargement={enChargement}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
      />
    </>
  );
};
