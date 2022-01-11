import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "../../../../api/appels/requeteApi";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { IRequeteTableauInformation } from "../../../../model/requete/IRequeteTableauInformation";
import {
  CreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "../../../common/hook/requete/CreationActionMiseAjourStatutHook";
import { getUrlWithParam } from "../../../common/util/route/routeUtil";
import { getMessageZeroRequete } from "../../../common/util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "../../../common/widget/attente/OperationEnCours";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_DEFAUT
} from "../../../common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "../../../common/widget/tableau/TableauRece/TableauRece";
import { URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID } from "../../../router/ReceUrls";
import { goToLinkRequete } from "../../requeteDelivrance/espaceDelivrance/EspaceDelivranceUtils";
import { requeteInformationColumnHeaders } from "./EspaceReqInfoParams";
import { useRequeteInformationApi } from "./hook/DonneesRequeteInformationHook";
import "./scss/RequeteTableau.scss";

interface LocalProps {
  parametresReqInfo: IQueryParametersPourRequetes;
}

export const ReqInfoServicePage: React.FC<LocalProps> = ({
  parametresReqInfo
}) => {
  const history = useHistory();
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();
  const [paramsMAJReqInfo, setParamsMAJReqInfo] = useState<
    CreationActionMiseAjourStatutHookParams
  >();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  useCreationActionMiseAjourStatut(paramsMAJReqInfo);

  const [linkParameters, setLinkParameters] = React.useState<
    IQueryParametersPourRequetes
  >(parametresReqInfo);
  const [enChargement, setEnChargement] = React.useState(true);
  const { dataState, paramsTableau } = useRequeteInformationApi(
    linkParameters,
    TypeAppelRequete.REQUETE_INFO_SERVICE,
    setEnChargement
  );

  const goToLink = useCallback((link: string) => {
    const queryParametersPourRequetes = goToLinkRequete(
      link,
      "requetesinformationservice"
    );
    if (queryParametersPourRequetes) {
      setLinkParameters(queryParametersPourRequetes);
    }
  }, []);

  const redirectionVersApercu = useCallback(
    (idRequete: string) => {
      history.push(
        getUrlWithParam(
          URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID,
          idRequete
        )
      );
    },
    [history]
  );

  function onClickOnLine(
    idRequete: string,
    data: IRequeteTableauInformation[],
    idx: number
  ) {
    if (data[idx].statut === StatutRequete.TRANSFEREE.libelle) {
      setParamsMAJReqInfo({
        requete: data[idx],
        libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        callback: () => {
          redirectionVersApercu(idRequete);
        }
      });
    } else {
      redirectionVersApercu(idRequete);
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
        noRows={zeroRequete}
        enChargement={enChargement}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
      />
      <BoutonRetour />
    </>
  );
};
