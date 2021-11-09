import React, { useCallback, useEffect, useState } from "react";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "../../../../../model/requete/v2/IRequeteTableauDelivrance";
import {
  INavigationApercuRMCAutoParams,
  useNavigationApercuRMCAuto
} from "../../../../common/hook/v2/navigationApercuRequeteRmcAuto/NavigationApercuRMCAutoHook";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { autorisePrendreEnChargeTableau } from "../../../../common/util/RequetesUtils";
import { getMessageZeroRequete } from "../../../../common/util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "../../../../common/widget/attente/OperationEnCours";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_REQUETE
} from "../../../../common/widget/tableau/v2/TableauPaginationConstantes";
import { TableauRece } from "../../../../common/widget/tableau/v2/TableauRece";
import { URL_RECHERCHE_REQUETE } from "../../../../router/ReceUrls";
import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "../../../apercuRequete/commun/hook/CreationActionMiseAjourStatutEtRmcAutoHook";
import { goToLinkRMC } from "../../acteInscription/resultats/RMCTableauCommun";
import { columnsTableauRequete } from "./RMCTableauRequetesParams";

export interface RMCResultatRequetesProps {
  dataRMCRequete: IRequeteTableauDelivrance[];
  dataTableauRMCRequete: IParamsTableau;
  setRangeRequete: (range: string) => void;
  resetTableauRequete: boolean;
}

export const RMCTableauRequetes: React.FC<RMCResultatRequetesProps> = ({
  dataRMCRequete,
  dataTableauRMCRequete,
  setRangeRequete,
  resetTableauRequete
}) => {
  // Gestion du tableau
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const [paramsMiseAJour, setParamsMiseAJour] = useState<
    CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();
  //**** RMC AUTO ****//
  const [paramsRMCAuto, setParamsRMCAuto] = useState<
    INavigationApercuRMCAutoParams | undefined
  >();

  useCreationActionMiseAjourStatutEtRmcAuto(paramsMiseAJour);
  useNavigationApercuRMCAuto(paramsRMCAuto);

  useEffect(() => {
    if (dataRMCRequete && dataRMCRequete.length === 0) {
      setZeroRequete(getMessageZeroRequete());
    }
  }, [dataRMCRequete]);

  const goToLink = useCallback(
    (link: string) => {
      const range = goToLinkRMC(link);
      if (range && setRangeRequete) {
        setRangeRequete(range);
      }
    },
    [setRangeRequete]
  );

  const onClickOnLine = (
    idRequete: string,
    data: IRequeteTableauDelivrance[],
    idx: number
  ) => {
    setOperationEnCours(true);
    const requeteSelect = data[idx];
    if (autorisePrendreEnChargeTableau(requeteSelect)) {
      setParamsMiseAJour({
        libelleAction: "Prendre en charge",
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        requete: requeteSelect,
        dataRequetes: data,
        urlCourante: URL_RECHERCHE_REQUETE
      });
    } else {
      setParamsRMCAuto({
        requete: requeteSelect,
        urlCourante: URL_RECHERCHE_REQUETE
      });
    }
  };
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
        onClickOnLine={onClickOnLine}
        columnHeaders={columnsTableauRequete}
        dataState={dataRMCRequete}
        paramsTableau={dataTableauRMCRequete}
        goToLink={goToLink}
        resetTableau={resetTableauRequete}
        noRows={zeroRequete}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_REQUETE}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
      />
    </>
  );
};
