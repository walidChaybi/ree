import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { getMessageZeroRequete } from "../../../../common/util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "../../../../common/widget/attente/OperationEnCours";
import { TableauRece } from "../../../../common/widget/tableau/v2/TableauRece";
import { IUrlData, URL_RECHERCHE_REQUETE } from "../../../../router/ReceUrls";
import { navigationApercu } from "../../../apercuRequete/v2/ApercuRequeteUtils";
import { goToLinkRMC } from "../../acteInscription/resultats/RMCTableauCommun";
import {
  IRMCAutoParams,
  useRMCAutoHook
} from "../../autoActesInscriptions/hook/RMCAutoHook";
import { columnsTableauRequete } from "./RMCTableauRequetesParams";

export interface RMCResultatRequetesProps {
  dataRMCRequete: IRequeteTableau[];
  dataTableauRMCRequete: IParamsTableau;
  setRangeRequete?: (range: string) => void;
  resetTableauRequete?: boolean;
}

const NB_REQUETE_PAR_PAGE = 10;

export const RMCTableauRequetes: React.FC<RMCResultatRequetesProps> = ({
  dataRMCRequete,
  dataTableauRMCRequete,
  setRangeRequete,
  resetTableauRequete
}) => {
  const history = useHistory();

  // Gestion du tableau
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

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

  //**** RMC AUTO ****//
  const [paramsRMCAuto, setParamsRMCAuto] = useState<IRMCAutoParams>(
    {} as IRMCAutoParams
  );

  const rmcAutoUrlData: IUrlData = useRMCAutoHook(paramsRMCAuto);

  const onClickOnLine = (
    idRequete: string,
    dataRequetes: any,
    idxGlobal: number
  ) => {
    const requete = dataRequetes[idxGlobal];
    const navigation = navigationApercu(URL_RECHERCHE_REQUETE, requete);
    if (navigation.isRmcAuto) {
      setParamsRMCAuto({
        requete,
        dataRequetes,
        urlCourante: URL_RECHERCHE_REQUETE
      });
    } else if (navigation.url) {
      history.push(navigation.url, dataRequetes);
    }
  };

  useEffect(
    () => {
      if (rmcAutoUrlData.url && rmcAutoUrlData.data) {
        history.push(rmcAutoUrlData.url, rmcAutoUrlData.data);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rmcAutoUrlData.url]
  );

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={onClickOnLine}
        columnHeaders={columnsTableauRequete}
        dataState={dataRMCRequete}
        paramsTableau={dataTableauRMCRequete}
        goToLink={goToLink}
        nbLignesParPage={NB_REQUETE_PAR_PAGE}
        resetTableau={resetTableauRequete}
        noRows={zeroRequete}
      />
    </>
  );
};
