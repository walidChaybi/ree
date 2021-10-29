import React, { useCallback, useEffect, useState } from "react";
import {
  IQueryParametersPourRequetesV2,
  TypeAppelRequete
} from "../../../../api/appels/requeteApi";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "../../../../model/requete/v2/IRequeteTableauDelivrance";
import { autorisePrendreEnChargeTableau } from "../../../common/util/RequetesUtils";
import { getMessageZeroRequete } from "../../../common/util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "../../../common/widget/attente/OperationEnCours";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import { BoutonSignature } from "../../../common/widget/signature/BoutonSignature";
import {
  NB_LIGNES_PAR_APPEL,
  SortOrder
} from "../../../common/widget/tableau/TableUtils";
import { TableauRece } from "../../../common/widget/tableau/v2/TableauRece";
import { URL_MES_REQUETES_V2 } from "../../../router/ReceUrls";
import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "../../apercuRequete/commun/hook/CreationActionMiseAjourStatutEtRmcAutoHook";
import {
  dateStatutColumnHeaders,
  requerantColumnHeaders,
  requeteColumnHeaders,
  StatutsRequetesEspaceDelivrance
} from "./EspaceDelivranceParamsV2";
import { goToLinkRequete } from "./EspaceDelivranceUtilsV2";
import { useRequeteDelivranceApi } from "./hook/DonneesRequeteDelivranceHookV2";
import "./scss/RequeteTableauV2.scss";

const columnsMesRequestes = [
  ...requeteColumnHeaders,
  ...requerantColumnHeaders,
  ...dateStatutColumnHeaders
];

interface MesRequetesPageProps {
  miseAJourCompteur: () => void;
  setParamsRMCAuto: (
    id: string,
    data: any[],
    urlWithParam: string,
    idx: number
  ) => void;
}

export const MesRequetesPageV2: React.FC<MesRequetesPageProps> = props => {
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [paramsMiseAJour, setParamsMiseAJour] =
    useState<CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined>();

  const [linkParameters, setLinkParameters] =
    React.useState<IQueryParametersPourRequetesV2>({
      statuts: StatutsRequetesEspaceDelivrance,
      tri: "dateStatut",
      sens: "ASC",
      range: `0-${NB_LIGNES_PAR_APPEL}`
    });
  const [enChargement, setEnChargement] = React.useState(true);
  const { dataState, paramsTableau } = useRequeteDelivranceApi(
    linkParameters,
    TypeAppelRequete.MES_REQUETES,
    setEnChargement
  );

  useCreationActionMiseAjourStatutEtRmcAuto(paramsMiseAJour);

  const goToLink = useCallback((link: string) => {
    const queryParametersPourRequetes = goToLinkRequete(link, "requetes");
    if (queryParametersPourRequetes) {
      setLinkParameters(queryParametersPourRequetes);
    }
  }, []);

  const handleChangeSort = useCallback((tri: string, sens: SortOrder) => {
    const queryParameters = {
      statuts: StatutsRequetesEspaceDelivrance,
      tri,
      sens,
      range: `0-${NB_LIGNES_PAR_APPEL}`
    };

    setLinkParameters(queryParameters);
  }, []);

  /**
   * Test sur cette fonction trop compliqué et longue à faire par rapport à la valeur ajouté
   */
  /* istanbul ignore next */
  const handleReload = useCallback(() => {
    setLinkParameters({ ...linkParameters });
    if (props.miseAJourCompteur !== undefined) {
      props.miseAJourCompteur();
    }
  }, [linkParameters, props]);

  function onClickOnLine(
    idRequete: string,
    data: IRequeteTableauDelivrance[],
    idx: number
  ) {
    setOperationEnCours(true);
    const requeteSelect = data[idx];
    if (autorisePrendreEnChargeTableau(requeteSelect)) {
      setParamsMiseAJour({
        libelleAction: "Prendre en charge",
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        requete: requeteSelect,
        dataRequetes: data,
        urlCourante: URL_MES_REQUETES_V2
      });
    } else {
      props.setParamsRMCAuto(idRequete, data, URL_MES_REQUETES_V2, idx);
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
        columnHeaders={columnsMesRequestes}
        dataState={dataState}
        paramsTableau={paramsTableau}
        goToLink={goToLink}
        handleChangeSort={handleChangeSort}
        handleReload={handleReload}
        noRows={zeroRequete}
        enChargement={enChargement}
      >
        <BoutonSignature libelle={"pages.delivrance.action.signature"} />
      </TableauRece>

      <BoutonRetour />
    </>
  );
};
