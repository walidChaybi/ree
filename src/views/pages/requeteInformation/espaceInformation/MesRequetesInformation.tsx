import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IQueryParametersPourRequetesV2 } from "../../../../api/appels/requeteApi";
import { IRequeteTableauDelivrance } from "../../../../model/requete/v2/IRequeteTableauDelivrance";
import { getUrlWithParam } from "../../../common/util/route/routeUtil";
import { getMessageZeroRequete } from "../../../common/util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "../../../common/widget/attente/OperationEnCours";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import {
  NB_LIGNES_PAR_APPEL,
  SortOrder
} from "../../../common/widget/tableau/TableUtils";
import { TableauRece } from "../../../common/widget/tableau/v2/TableauRece";
import { URL_MES_REQUETES_INFORMATION_APERCU_ID } from "../../../router/ReceUrls";
import { goToLinkRequete } from "../../espaceDelivrance/v2/EspaceDelivranceUtilsV2";
import "../../espaceDelivrance/v2/scss/RequeteTableauV2.scss";
import {
  requeteInformationColumnHeaders,
  StatutsRequetesInformation
} from "./EspaceReqInfoParams";
import { useRequeteInformationApi } from "./hook/DonneesRequeteInformationHook";

export const MesRequetesInformationPage: React.FC = () => {
  const history = useHistory();
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const [
    linkParameters,
    setLinkParameters
  ] = React.useState<IQueryParametersPourRequetesV2>({
    statuts: StatutsRequetesInformation,
    tri: "dateCreation",
    sens: "ASC",
    range: `0-${NB_LIGNES_PAR_APPEL}`
  });
  const [enChargement, setEnChargement] = React.useState(true);
  const { dataState, paramsTableau } = useRequeteInformationApi(
    linkParameters,
    setEnChargement
  );

  const goToLink = useCallback((link: string) => {
    const queryParametersPourRequetes = goToLinkRequete(link, "requetes");
    if (queryParametersPourRequetes) {
      setLinkParameters(queryParametersPourRequetes);
    }
  }, []);

  const handleChangeSort = useCallback((tri: string, sens: SortOrder) => {
    const queryParameters = {
      statuts: StatutsRequetesInformation,
      tri,
      sens,
      range: `0-${NB_LIGNES_PAR_APPEL}`
    };

    setLinkParameters(queryParameters);
  }, []);

  function onClickOnLine(
    idRequete: string,
    data: IRequeteTableauDelivrance[],
    idx: number
  ) {
    history.push(
      getUrlWithParam(URL_MES_REQUETES_INFORMATION_APERCU_ID, idRequete)
    );
  }

  useEffect(() => {
    if (dataState && dataState.length === 0) {
      setZeroRequete(getMessageZeroRequete());
    }
  }, [dataState]);

  const finOperationEnCours = () => {
    setOperationEnCours(false);
  };

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={finOperationEnCours}
        onClick={finOperationEnCours}
      />
      <TableauRece
        idKey={"idRequete"}
        sortOrderByState={linkParameters.tri}
        sortOrderState={linkParameters.sens}
        onClickOnLine={onClickOnLine}
        columnHeaders={requeteInformationColumnHeaders}
        dataState={dataState}
        paramsTableau={paramsTableau}
        goToLink={goToLink}
        handleChangeSort={handleChangeSort}
        noRows={zeroRequete}
        enChargement={enChargement}
      ></TableauRece>
      <BoutonRetour />
    </>
  );
};
