import { IQueryParametersPourRequetes, TypeAppelRequete } from "@api/appels/requeteApi";
import { RenderMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import {
  NavigationApercuReqCreationParams,
  useNavigationApercuCreation
} from "@views/common/hook/navigationApercuRequeteCreation/NavigationApercuCreationHook";
import {
  ICreationActionMiseAjourStatutEtRedirectionParams,
  useCreationActionMiseAjourStatutEtRedirectionHook
} from "@views/common/hook/requete/CreationActionMiseAjourStatutEtRedirectionHook";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import { SortOrder } from "@widget/tableau/TableUtils";
import { NB_LIGNES_PAR_APPEL_DEFAUT, NB_LIGNES_PAR_PAGE_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import React, { useCallback, useContext, useState } from "react";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import { useRequeteCreationApiHook } from "../../../common/hook/requete/creation/RequeteCreationApiHook";
import { goToLinkRequete } from "../../requeteDelivrance/espaceDelivrance/EspaceDelivranceUtils";
import { getOnClickSurLigneTableauEspaceCreation } from "./EspaceCreationUtils";
import { statutsRequetesCreation } from "./params/EspaceCreationParams";
import { colonnesTableauMesRequetesCreation } from "./params/MesRequetesCreationParams";

interface MesRequetesCreationProps {
  queryParametersPourRequetes: IQueryParametersPourRequetes;
}

export const MesRequetesCreation: React.FC<MesRequetesCreationProps> = props => {
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [paramsMiseAJour, setParamsMiseAJour] = useState<ICreationActionMiseAjourStatutEtRedirectionParams | undefined>();
  const [paramsCreation, setParamsCreation] = useState<NavigationApercuReqCreationParams | undefined>();

  const [linkParameters, setLinkParameters] = useState<IQueryParametersPourRequetes>(props.queryParametersPourRequetes);

  const { decrets, utilisateurConnecte } = useContext(RECEContextData);

  const { dataState, paramsTableau } = useRequeteCreationApiHook(TypeAppelRequete.MES_REQUETES_CREATION, linkParameters);

  useCreationActionMiseAjourStatutEtRedirectionHook(paramsMiseAJour);
  useNavigationApercuCreation(paramsCreation);

  const goToLink = useCallback((link: string) => {
    const queryParametersPourRequetes = goToLinkRequete(link, "mesrequetes");
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
        visible={operationEnCours || !decrets || !utilisateurConnecte}
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
          setParamsCreation,
          utilisateurConnecte
        )}
        columnHeaders={colonnesTableauMesRequetesCreation}
        dataState={dataState}
        paramsTableau={paramsTableau}
        goToLink={goToLink}
        handleChangeSort={handleChangeSort}
        messageAucunResultat={RenderMessageZeroRequete()}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
      />

      <BoutonRetour />
    </>
  );
};
