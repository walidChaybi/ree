import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "../../../../api/appels/requeteApi";
import { IRequeteTableauDelivrance } from "../../../../model/requete/IRequeteTableauDelivrance";
import {
  INavigationApercuReqInfoParams,
  useNavigationApercuInformation
} from "../../../common/hook/navigationApercuRequeteInformation/NavigationApercuInformationHook";
import { getMessageZeroRequete } from "../../../common/util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "../../../common/widget/attente/OperationEnCours";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_DEFAUT
} from "../../../common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "../../../common/widget/tableau/TableauRece/TableauRece";
import { receUrl } from "../../../router/ReceUrls";
import { goToLinkRequete } from "../../requeteDelivrance/espaceDelivrance/EspaceDelivranceUtils";
import { requeteInformationMesRequetesColumnHeaders } from "./EspaceReqInfoParams";
import { useRequeteInformationApi } from "./hook/DonneesRequeteInformationHook";
import "./scss/RequeteTableau.scss";

interface LocalProps {
  parametresReqInfo: IQueryParametersPourRequetes;
}

export const MesRequetesInformationPage: React.FC<LocalProps> = ({
  parametresReqInfo
}) => {
  const history = useHistory();
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const [paramsNavReqInfo, setParamsNavReqInfo] = useState<
    INavigationApercuReqInfoParams | undefined
  >();

  useNavigationApercuInformation(paramsNavReqInfo);

  const [linkParameters, setLinkParameters] =
    React.useState<IQueryParametersPourRequetes>(parametresReqInfo);
  const [enChargement, setEnChargement] = React.useState(true);
  const { dataState, paramsTableau } = useRequeteInformationApi(
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

  function onClickOnLine(
    idRequete: string,
    data: IRequeteTableauDelivrance[],
    idx: number
  ) {
    const requete = data[idx];
    const urlCourante = receUrl.getUrlCourante(history);
    setOperationEnCours(true);
    setParamsNavReqInfo({
      requete,
      callback: finOperationEnCours,
      urlCourante
    });
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
        columnHeaders={requeteInformationMesRequetesColumnHeaders}
        dataState={dataState}
        paramsTableau={paramsTableau}
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
