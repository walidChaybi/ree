import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "@api/appels/requeteApi";
import {
  ICreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "@hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import {
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID
} from "@router/ReceUrls";
import { autorisePrendreEnChargeReqTableauCreation } from "@util/RequetesUtils";
import { getUrlWithParam } from "@util/route/routeUtil";
import { getMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
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
import { colonnesTableauRequetesServiceCreation } from "./params/RequetesServiceCreationParams";

interface RequetesServiceCreationProps {
  queryParametersPourRequetes: IQueryParametersPourRequetes;
}

export const RequetesServiceCreation: React.FC<
  RequetesServiceCreationProps
> = props => {
  const history = useHistory();
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();
  const [opEnCours, setOpEnCours] = useState<boolean>(false);
  const [paramsMiseAJour, setParamsMiseAJour] = useState<
    ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();

  const [parametresLienRequete, setParametresLienRequete] =
    useState<IQueryParametersPourRequetes>(props.queryParametersPourRequetes);
  const [enChargement, setEnChargement] = React.useState(true);
  const { dataState, paramsTableau } = useRequeteCreationApi(
    parametresLienRequete,
    TypeAppelRequete.REQUETE_CREATION_SERVICE,
    setEnChargement
  );

  useCreationActionMiseAjourStatutEtRmcAuto(paramsMiseAJour);

  const changementDePage = useCallback((link: string) => {
    const queryParametersPourRequetes = goToLinkRequete(
      link,
      "requetesService"
    );
    if (queryParametersPourRequetes) {
      setParametresLienRequete(queryParametersPourRequetes);
    }
  }, []);

  const handleChangeSortTableau = useCallback(
    (tri: string, sens: SortOrder) => {
      const queryParameters = {
        statuts: statutsRequetesCreation,
        tri,
        sens,
        range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
      };

      setParametresLienRequete(queryParameters);
    },
    []
  );

  useEffect(() => {
    if (dataState?.length === 0) {
      setZeroRequete(getMessageZeroRequete());
    }
  }, [dataState]);

  const finOpEnCours = () => {
    setOpEnCours(false);
  };

  function onClickOnLineTableau(
    idRequete: string,
    data: IRequeteTableauCreation[],
    idx: number
  ) {
    setOpEnCours(true);
    const requeteSelect = data[idx];
    if (autorisePrendreEnChargeReqTableauCreation(requeteSelect)) {
      setParamsMiseAJour({
        libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        requete: requeteSelect,
        urlCourante: URL_MES_REQUETES_CREATION,
        typeRequete: TypeRequete.CREATION
      });
    } else {
      history.push(
        getUrlWithParam(URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID, idRequete)
      );
    }
  }

  return (
    <>
      <OperationEnCours
        visible={opEnCours}
        onTimeoutEnd={finOpEnCours}
        onClick={finOpEnCours}
      />
      <TableauRece
        idKey={"idRequete"}
        sortOrderByState={parametresLienRequete.tri}
        sortOrderState={parametresLienRequete.sens}
        onClickOnLine={onClickOnLineTableau}
        columnHeaders={colonnesTableauRequetesServiceCreation}
        dataState={dataState}
        paramsTableau={paramsTableau}
        goToLink={changementDePage}
        handleChangeSort={handleChangeSortTableau}
        noRows={zeroRequete}
        enChargement={enChargement}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
      />
    </>
  );
};
