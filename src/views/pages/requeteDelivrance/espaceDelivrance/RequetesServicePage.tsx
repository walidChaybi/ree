import React, { useCallback, useEffect, useState } from "react";
import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "../../../../api/appels/requeteApi";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "../../../../model/requete/IRequeteTableauDelivrance";
import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "../../../common/hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { autorisePrendreEnChargeReqTableauDelivrance } from "../../../common/util/RequetesUtils";
import { getMessageZeroRequete } from "../../../common/util/tableauRequete/TableauRequeteUtils";
import { getLibelle } from "../../../common/util/Utils";
import { OperationEnCours } from "../../../common/widget/attente/OperationEnCours";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import {
  NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE,
  NB_LIGNES_PAR_PAGE_ESPACE_DELIVRANCE
} from "../../../common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "../../../common/widget/tableau/TableauRece/TableauRece";
import { TableauTypeColumn } from "../../../common/widget/tableau/TableauRece/TableauTypeColumn";
import { SortOrder } from "../../../common/widget/tableau/TableUtils";
import { URL_REQUETES_DELIVRANCE_SERVICE } from "../../../router/ReceUrls";
import {
  dateStatutColumnHeaders,
  HeaderTableauRequete,
  requeteColumnHeaders,
  StatutsRequetesEspaceDelivrance
} from "./EspaceDelivranceParams";
import { goToLinkRequete } from "./EspaceDelivranceUtils";
import { useRequeteDelivranceApi } from "./hook/DonneesRequeteDelivranceHook";
import "./scss/RequeteTableau.scss";

const columnsRequestesService = [
  ...requeteColumnHeaders,
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.AttribueA],
    title: getLibelle("Attribué à"),
    align: "center"
  }),
  ...dateStatutColumnHeaders
];
interface MesRequetesServicePageProps {
  setParamsRMCAuto: (
    id: string,
    requete: IRequeteTableauDelivrance,
    urlWithParam: string
  ) => void;
}

export const RequetesServicePage: React.FC<MesRequetesServicePageProps> = props => {
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();

  const [paramsMiseAJour, setParamsMiseAJour] = useState<
    CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();

  const [linkParameters, setLinkParameters] = React.useState<
    IQueryParametersPourRequetes
  >({
    statuts: StatutsRequetesEspaceDelivrance,
    tri: "dateStatut",
    sens: "ASC",
    range: `0-${NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}`
  });
  const [enChargement, setEnChargement] = React.useState(true);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const { dataState, paramsTableau } = useRequeteDelivranceApi(
    linkParameters,
    TypeAppelRequete.REQUETE_DELIVRANCE_SERVICE,
    setEnChargement
  );

  function goToLink(link: string) {
    const queryParametersPourRequetes = goToLinkRequete(
      link,
      "requetesService"
    );
    if (queryParametersPourRequetes) {
      setLinkParameters(queryParametersPourRequetes);
    }
  }

  useCreationActionMiseAjourStatutEtRmcAuto(paramsMiseAJour);

  const handleChangeSort = useCallback((tri: string, sens: SortOrder) => {
    const queryParameters = {
      statuts: StatutsRequetesEspaceDelivrance,
      tri,
      sens,
      range: `0-${NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}`
    };
    setLinkParameters(queryParameters);
  }, []);

  function onClickOnLine(
    idRequete: string,
    data: IRequeteTableauDelivrance[],
    idx: number
  ) {
    setOperationEnCours(true);
    const requeteSelect = data[idx];
    if (autorisePrendreEnChargeReqTableauDelivrance(requeteSelect)) {
      setParamsMiseAJour({
        libelleAction: "Prendre en charge",
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        requete: requeteSelect,
        urlCourante: URL_REQUETES_DELIVRANCE_SERVICE
      });
    } else {
      props.setParamsRMCAuto(
        idRequete,
        data[idx],
        URL_REQUETES_DELIVRANCE_SERVICE
      );
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
        columnHeaders={columnsRequestesService}
        dataState={dataState}
        paramsTableau={paramsTableau}
        goToLink={goToLink}
        handleChangeSort={handleChangeSort}
        noRows={zeroRequete}
        enChargement={enChargement}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_ESPACE_DELIVRANCE}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}
      />
      <BoutonRetour />
    </>
  );
};
