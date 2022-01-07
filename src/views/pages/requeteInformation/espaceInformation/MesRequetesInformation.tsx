import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IQueryParametersPourRequetes } from "../../../../api/appels/requeteApi";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "../../../../model/requete/IRequeteTableauDelivrance";
import {
  INavigationApercuReqInfoParams,
  useNavigationApercuInformation
} from "../../../common/hook/navigationApercuRequeteInformation/NavigationApercuInformationHook";
import {
  CreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "../../../common/hook/requete/CreationActionMiseAjourStatutHook";
import { getMessageZeroRequete } from "../../../common/util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "../../../common/widget/attente/OperationEnCours";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_DEFAUT
} from "../../../common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "../../../common/widget/tableau/TableauRece/TableauRece";
import { SortOrder } from "../../../common/widget/tableau/TableUtils";
import { receUrl } from "../../../router/ReceUrls";
import { goToLinkRequete } from "../../requeteDelivrance/espaceDelivrance/EspaceDelivranceUtils";
import {
  requeteInformationColumnHeaders,
  StatutsRequetesInformation
} from "./EspaceReqInfoParams";
import { useRequeteInformationApi } from "./hook/DonneesRequeteInformationHook";
import "./scss/RequeteTableau.scss";

export const MesRequetesInformationPage: React.FC = () => {
  const history = useHistory();
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const [paramsMAJReqInfo, setParamsMAJReqInfo] = useState<
    CreationActionMiseAjourStatutHookParams | undefined
  >();
  const [paramsNavReqInfo, setParamsNavReqInfo] = useState<
    INavigationApercuReqInfoParams | undefined
  >();

  useCreationActionMiseAjourStatut(paramsMAJReqInfo);
  useNavigationApercuInformation(paramsNavReqInfo);

  const [
    linkParameters,
    setLinkParameters
  ] = React.useState<IQueryParametersPourRequetes>({
    statuts: StatutsRequetesInformation,
    tri: "dateCreation",
    sens: "ASC",
    range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
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
      range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
    };

    setLinkParameters(queryParameters);
  }, []);

  function onClickOnLine(
    idRequete: string,
    data: IRequeteTableauDelivrance[],
    idx: number
  ) {
    const requete = data[idx];
    const urlCourante = receUrl.getUrlCourante(history);

    if (requete.statut === StatutRequete.TRANSFEREE.libelle) {
      setParamsMAJReqInfo({
        requete,
        libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        urlCourante,
        callback: () => {
          setParamsNavReqInfo({
            requete,
            callback: finOperationEnCours,
            urlCourante
          });
        }
      });
    } else {
      setParamsNavReqInfo({
        requete,
        callback: finOperationEnCours,
        urlCourante
      });
    }
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
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
      ></TableauRece>
      <BoutonRetour />
    </>
  );
};
