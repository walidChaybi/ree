import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "@api/appels/requeteApi";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID } from "@router/ReceUrls";
import { getUrlWithParam } from "@util/route/routeUtil";
import { getMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_DEFAUT
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { SortOrder } from "@widget/tableau/TableUtils";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { goToLinkRequete } from "../../requeteDelivrance/espaceDelivrance/EspaceDelivranceUtils";
import { useRequeteCreationApi } from "../hook/DonneesRequeteCreationApiHook";
import { statutsRequetesCreation } from "./params/EspaceCreationParams";
import { colonnesTableauMesRequetesCreation } from "./params/MesRequetesCreationParams";

interface MesRequetesCreationProps {
  queryParametersPourRequetes: IQueryParametersPourRequetes;
}

export const MesRequetesCreation: React.FC<
  MesRequetesCreationProps
> = props => {
  const history = useHistory();
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const [linkParameters, setLinkParameters] =
    React.useState<IQueryParametersPourRequetes>(
      props.queryParametersPourRequetes
    );
  const [enChargement, setEnChargement] = React.useState(true);
  const { dataState, paramsTableau } = useRequeteCreationApi(
    linkParameters,
    TypeAppelRequete.MES_REQUETES_CREATION,
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
      statuts: statutsRequetesCreation,
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
        columnHeaders={colonnesTableauMesRequetesCreation}
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
