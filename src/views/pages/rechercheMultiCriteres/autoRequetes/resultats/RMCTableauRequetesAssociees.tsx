import React, { useCallback, useEffect, useState } from "react";
import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { TableauRece } from "../../../../common/widget/tableau/v2/TableauRece";
import {
  getMessageZeroRequete,
  goToLinkRMCAuto
} from "../hook/RMCAutoRequetesUtils";
import { columnsTableauRequeteAssociees } from "./RMCTableauRequetesAssocieesParams";

export interface RMCTableauRequetesAssocieesProps {
  dataRMCAutoRequete: IRequeteTableau[];
  dataTableauRMCAutoRequete: IParamsTableau;
  setRangeRequete?: (range: string) => void;
}

const NB_REQUETE_PAR_PAGE = 5;

export const RMCTableauRequetesAssociees: React.FC<RMCTableauRequetesAssocieesProps> = ({
  dataRMCAutoRequete,
  dataTableauRMCAutoRequete,
  setRangeRequete
}) => {
  // Gestion du tableau
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();

  useEffect(() => {
    if (dataRMCAutoRequete?.length === 0) {
      setZeroRequete(getMessageZeroRequete());
    }
  }, [dataRMCAutoRequete]);

  const goToLink = useCallback(
    (link: string) => {
      const range = goToLinkRMCAuto(link);
      if (range && setRangeRequete) {
        setRangeRequete(range);
      }
    },
    [setRangeRequete]
  );

  return (
    <>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={() => {}} //TODO: US-220
        columnHeaders={columnsTableauRequeteAssociees}
        dataState={dataRMCAutoRequete}
        paramsTableau={dataTableauRMCAutoRequete}
        goToLink={goToLink}
        nbLignesParPage={NB_REQUETE_PAR_PAGE}
        noRows={zeroRequete}
      />
    </>
  );
};
