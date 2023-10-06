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
import { getMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_DEFAUT
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { SortOrder } from "@widget/tableau/TableUtils";
import React, { useCallback, useState } from "react";
import { useRequeteCreationApiHook } from "../../../common/hook/requete/creation/RequeteCreationApiHook";
import { goToLinkRequete } from "../../requeteDelivrance/espaceDelivrance/EspaceDelivranceUtils";
import { getOnClickSurLigneTableauEspaceCreation } from "./EspaceCreationUtils";
import { statutsRequetesCreation } from "./params/EspaceCreationParams";
import { colonnesTableauMesRequetesCreation } from "./params/MesRequetesCreationParams";

interface MesRequetesCreationProps {
  queryParametersPourRequetes: IQueryParametersPourRequetes;
}

export const MesRequetesCreation: React.FC<
  MesRequetesCreationProps
> = props => {
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
  const { dataState, paramsTableau } = useRequeteCreationApiHook(
    TypeAppelRequete.MES_REQUETES_CREATION,
    setEnChargement,
    linkParameters
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
        onClickOnLine={getOnClickSurLigneTableauEspaceCreation(
          setOperationEnCours,
          setParamsMiseAJour,
          setParamsCreation
        )}
        columnHeaders={colonnesTableauMesRequetesCreation}
        dataState={dataState}
        paramsTableau={paramsTableau}
        goToLink={goToLink}
        handleChangeSort={handleChangeSort}
        noRows={getMessageZeroRequete()}
        enChargement={enChargement}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
      />
      <BoutonRetour />
    </>
  );
};
