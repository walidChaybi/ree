import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IQueryParametersPourRequetesV2 } from "../../../../api/appels/requeteApi";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "../../../../model/requete/v2/IRequeteTableauDelivrance";
import { getUrlWithParam } from "../../../common/util/route/routeUtil";
import { getMessageZeroRequete } from "../../../common/util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "../../../common/widget/attente/OperationEnCours";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import { SortOrder } from "../../../common/widget/tableau/TableUtils";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_DEFAUT
} from "../../../common/widget/tableau/v2/TableauPaginationConstantes";
import { TableauRece } from "../../../common/widget/tableau/v2/TableauRece";
import { URL_MES_REQUETES_INFORMATION_APERCU_ID } from "../../../router/ReceUrls";
import { goToLinkRequete } from "../../espaceDelivrance/v2/EspaceDelivranceUtilsV2";
import "../../espaceDelivrance/v2/scss/RequeteTableauV2.scss";
import {
  requeteInformationColumnHeaders,
  StatutsRequetesInformation
} from "./EspaceReqInfoParams";
import { useRequeteInformationApi } from "./hook/DonneesRequeteInformationHook";
import { useUpdateStatutRequeteInformation } from "./hook/UpdateStatutRequeteInformation";

export const MesRequetesInformationPage: React.FC = () => {
  const history = useHistory();
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();
  const [idRequeteToUpdate, setIdRequeteToUpdate] = useState<string>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const idRequeteMiseAJour = useUpdateStatutRequeteInformation(
    idRequeteToUpdate,
    StatutRequete.PRISE_EN_CHARGE
  );

  const [
    linkParameters,
    setLinkParameters
  ] = React.useState<IQueryParametersPourRequetesV2>({
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

  const redirectionVersApercu = useCallback(
    (idRequete: string) => {
      history.push(
        getUrlWithParam(URL_MES_REQUETES_INFORMATION_APERCU_ID, idRequete)
      );
    },
    [history]
  );

  function onClickOnLine(
    idRequete: string,
    data: IRequeteTableauDelivrance[],
    idx: number
  ) {
    if (data[idx].statut === StatutRequete.TRANSFEREE.libelle) {
      setIdRequeteToUpdate(idRequete);
    } else {
      redirectionVersApercu(idRequete);
    }
  }

  useEffect(() => {
    if (idRequeteMiseAJour) {
      redirectionVersApercu(idRequeteMiseAJour);
    }
  }, [idRequeteMiseAJour, redirectionVersApercu]);

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
