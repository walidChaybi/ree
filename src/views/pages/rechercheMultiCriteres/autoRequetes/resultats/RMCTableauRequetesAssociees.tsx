import React, { useCallback, useEffect, useState } from "react";
import { IRequeteTableauDelivrance } from "../../../../../model/requete/IRequeteTableauDelivrance";
import { ICriteresRMCRequete } from "../../../../../model/rmc/requete/ICriteresRMCRequete";
import { IRMCRequete } from "../../../../../model/rmc/requete/IRMCRequete";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import {
  NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES,
  NB_LIGNES_PAR_PAGE_REQUETE_ASSOCIEES
} from "../../../../common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "../../../../common/widget/tableau/TableauRece/TableauRece";
import { goToLinkRMC } from "../../acteInscription/resultats/RMCTableauCommun";
import { BoutonNouvelleRMCRequete } from "../contenu/BoutonNouvelleRMCRequete";
import { getMessageZeroRequete } from "../hook/RMCAutoRequetesUtils";
import { columnsTableauRequeteAssociees } from "./RMCTableauRequetesAssocieesParams";

export interface RMCTableauRequetesAssocieesProps {
  dataRMCRequete: IRequeteTableauDelivrance[];
  dataTableauRMCRequete: IParamsTableau;
  setRangeRequete: (range: string) => void;
  setNouvelleRMCRequete: React.Dispatch<React.SetStateAction<boolean>>;
  setValuesRMCRequete: React.Dispatch<React.SetStateAction<IRMCRequete>>;
  setCriteresRechercheRequete: React.Dispatch<
    React.SetStateAction<ICriteresRMCRequete | undefined>
  >;
  resetTableauRequete: boolean;
}

export const RMCTableauRequetesAssociees: React.FC<RMCTableauRequetesAssocieesProps> = ({
  dataRMCRequete,
  dataTableauRMCRequete,
  setRangeRequete,
  setNouvelleRMCRequete,
  setValuesRMCRequete,
  setCriteresRechercheRequete,
  resetTableauRequete
}) => {
  // Gestion du tableau
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();

  useEffect(() => {
    if (dataRMCRequete?.length === 0) {
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

  return (
    <>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={() => {}} //TODO: US-220
        columnHeaders={columnsTableauRequeteAssociees}
        dataState={dataRMCRequete}
        paramsTableau={dataTableauRMCRequete}
        goToLink={goToLink}
        resetTableau={resetTableauRequete}
        noRows={zeroRequete}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_REQUETE_ASSOCIEES}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES}
      >
        <BoutonNouvelleRMCRequete
          setNouvelleRMCRequete={setNouvelleRMCRequete}
          setValuesRMCRequete={setValuesRMCRequete}
          setCriteresRechercheRequete={setCriteresRechercheRequete}
        />
      </TableauRece>
    </>
  );
};
