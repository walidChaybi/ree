import React, { useCallback, useEffect, useState } from "react";
import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import {
  INavigationApercuRMCAutoParams,
  useNavigationApercuRMCAuto
} from "../../../../common/hook/v2/navigationApercuRequeteRmcAuto/NavigationApercuRMCAutoHook";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { getMessageZeroRequete } from "../../../../common/util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "../../../../common/widget/attente/OperationEnCours";
import { TableauRece } from "../../../../common/widget/tableau/v2/TableauRece";
import { URL_RECHERCHE_REQUETE } from "../../../../router/ReceUrls";
import { goToLinkRMC } from "../../acteInscription/resultats/RMCTableauCommun";
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
  const [paramsRMCAuto, setParamsRMCAuto] = useState<
    INavigationApercuRMCAutoParams | undefined
  >();
  useNavigationApercuRMCAuto(paramsRMCAuto);

  const onClickOnLine = (
    idRequete: string,
    dataRequetes: any,
    idxGlobal: number
  ) => {
    const requete = dataRequetes[idxGlobal];

    setParamsRMCAuto({
      requete,
      dataRequetes,
      urlCourante: URL_RECHERCHE_REQUETE
    });
  };

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
