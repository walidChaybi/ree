import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "@api/appels/requeteApi";
import {
  NavigationApercuReqCreationParams,
  useNavigationApercuCreation
} from "@hook/navigationApercuRequeteCreation/NavigationApercuCreationHook";
import {
  ICreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "@hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { URL_MES_REQUETES_CREATION } from "@router/ReceUrls";
import { autorisePrendreEnChargeReqTableauCreation } from "@util/RequetesUtils";
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
import { useRequeteCreationApi } from "../../../common/hook/requete/creation/DonneesRequeteCreationApiHook";
import { goToLinkRequete } from "../../requeteDelivrance/espaceDelivrance/EspaceDelivranceUtils";
import { setParamsUseApercuCreation } from "../commun/requeteCreationUtils";
import { statutsRequetesCreation } from "./params/EspaceCreationParams";
import { colonnesTableauMesRequetesCreation } from "./params/MesRequetesCreationParams";

interface MesRequetesCreationProps {
  queryParametersPourRequetes: IQueryParametersPourRequetes;
}

export const MesRequetesCreation: React.FC<
  MesRequetesCreationProps
> = props => {
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [paramsMiseAJour, setParamsMiseAJour] = useState<
    ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();
  const [paramsCreation, setParamsCreation] = useState<
    NavigationApercuReqCreationParams | undefined
  >();

  const [linkParameters, setLinkParameters] =
    useState<IQueryParametersPourRequetes>(props.queryParametersPourRequetes);
  const [enChargement, setEnChargement] = React.useState(true);
  const { dataState, paramsTableau } = useRequeteCreationApi(
    linkParameters,
    TypeAppelRequete.MES_REQUETES_CREATION,
    setEnChargement
  );

  useCreationActionMiseAjourStatutEtRmcAuto(paramsMiseAJour);
  useNavigationApercuCreation(paramsCreation);

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
    if (dataState?.length === 0) {
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
    setOperationEnCours(true);
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
      setParamsUseApercuCreation(
        idRequete,
        setParamsCreation,
        requeteSelect.sousType,
        requeteSelect.statut,
        requeteSelect.idUtilisateur
      );
    }
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
        goToLink={goToLink}
        handleChangeSort={handleChangeSort}
        noRows={zeroRequete}
        enChargement={enChargement}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
      />
      <BoutonRetour />
    </>
  );
};
