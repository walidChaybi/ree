import React, { useCallback } from "react";
import { TableauRece } from "../../../../common/widget/tableau/TableauRece";
import { columnsTableauRequete } from "./RMCTableauRequetesParams";
import { IDataTableau } from "../../../../common/util/GestionDesLiensApi";
import { IResultatRMCRequete } from "../../../../../model/rmc/requete/IResultatRMCRequete";
import { goToLinkRMC } from "../../acteInscription/resultats/RMCTableauCommun";

export interface RMCResultatRequetesProps {
  dataRMCRequete: IResultatRMCRequete[];
  dataTableauRMCRequete: IDataTableau;
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
  const rowsNumberState = dataTableauRMCRequete?.rowsNumberState
    ? dataTableauRMCRequete?.rowsNumberState
    : 0;
  const nextDataLinkState = dataTableauRMCRequete?.nextDataLinkState
    ? dataTableauRMCRequete?.nextDataLinkState
    : "";
  const previousDataLinkState = dataTableauRMCRequete?.previousDataLinkState
    ? dataTableauRMCRequete?.previousDataLinkState
    : "";

  const goToLink = useCallback(
    (link: string) => {
      const range = goToLinkRMC(link);
      if (range && setRangeRequete) {
        setRangeRequete(range);
      }
    },
    [setRangeRequete]
  );

  // Gestion de la Fenêtre
  const onClickOnLine = () => {
    // TODO
  };

  return (
    <>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={onClickOnLine}
        columnHeaders={columnsTableauRequete}
        dataState={dataRMCRequete}
        rowsNumberState={rowsNumberState}
        nextDataLinkState={nextDataLinkState}
        previousDataLinkState={previousDataLinkState}
        goToLink={goToLink}
        nbLignesParPage={NB_REQUETE_PAR_PAGE}
        resetTableau={resetTableauRequete}
      />
    </>
  );
};
