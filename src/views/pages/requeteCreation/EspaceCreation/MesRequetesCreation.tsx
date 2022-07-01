import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "../../../../api/appels/requeteApi";
import { IRequeteTableauCreation } from "../../../../model/requete/IRequeteTableauCreation";
import { getUrlWithParam } from "../../../common/util/route/routeUtil";
import { getMessageZeroRequete } from "../../../common/util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "../../../common/widget/attente/OperationEnCours";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_DEFAUT
} from "../../../common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "../../../common/widget/tableau/TableauRece/TableauRece";
import { SortOrder } from "../../../common/widget/tableau/TableUtils";
import { URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID } from "../../../router/ReceUrls";
import { goToLinkRequete } from "../../requeteDelivrance/espaceDelivrance/EspaceDelivranceUtils";
import { useRequeteCreationApi } from "../hook/DonneesRequeteCreationApiHook";
import {
  requeteCreationMesRequetesColumnHeaders,
  StatutsRequetesCreation
} from "./EspaceCreationParams";

interface LocalProps {
  parametresCreation: IQueryParametersPourRequetes;
}

export const MesRequetesCreationPage: React.FC<LocalProps> = ({
  parametresCreation
}) => {
  const history = useHistory();
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const [linkParameters, setLinkParameters] =
    React.useState<IQueryParametersPourRequetes>(parametresCreation);
  const [enChargement, setEnChargement] = React.useState(true);
  const { dataState, paramsTableau } = useRequeteCreationApi(
    linkParameters,
    TypeAppelRequete.MES_REQUETES_INFO,
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
      statuts: StatutsRequetesCreation,
      tri,
      sens,
      range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
    };

    setLinkParameters(queryParameters);
  }, []);

  useEffect(() => {
    if (dataState && dataState.length === 0) {
      setZeroRequete(getMessageZeroRequete());
    }
  }, [dataState]);

  const finOperationEnCours = () => {
    setOperationEnCours(false);
  };

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
        columnHeaders={requeteCreationMesRequetesColumnHeaders}
        dataState={dataState}
        paramsTableau={paramsTableau}
        handleChangeSort={handleChangeSort}
        goToLink={goToLink}
        noRows={zeroRequete}
        enChargement={enChargement}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
      ></TableauRece>
      <BoutonRetour />
    </>
  );
};
