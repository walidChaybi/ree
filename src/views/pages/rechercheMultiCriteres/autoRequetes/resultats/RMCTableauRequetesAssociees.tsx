import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import { IRMCRequete } from "@model/rmc/requete/IRMCRequete";
import { FenetreExterne } from "@util/FenetreExterne";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import {
  NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES,
  NB_LIGNES_PAR_PAGE_REQUETE_ASSOCIEES
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import React, { useCallback, useEffect, useState } from "react";
import { DetailRequetePage } from "../../../requeteDelivrance/detailRequete/DetailRequetePage";
import { goToLinkRMC } from "../../acteInscription/resultats/RMCTableauCommun";
import { BoutonNouvelleRMCRequete } from "../contenu/BoutonNouvelleRMCRequete";
import { getMessageZeroRequete } from "../hook/RMCAutoRequetesUtils";
import { columnsTableauRequeteAssociees } from "./RMCTableauRequetesAssocieesParams";

const width = 1100;
const height = 600;
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

interface IInfoRequeteSelectionnee {
  idRequete: string;
  numeroFonctionnel?: string;
}

export const RMCTableauRequetesAssociees: React.FC<
  RMCTableauRequetesAssocieesProps
> = ({
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
  const [requeteSelectionnee, setRequeteSelectionnee] =
    useState<IInfoRequeteSelectionnee>();

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

  const onClose = () => {
    setRequeteSelectionnee(undefined);
  };

  const onClickOnLine = (
    idRequete: string,
    data: IRequeteTableauDelivrance[],
    idx: number
  ) => {
    const requeteCliquee = data[idx];
    if (requeteCliquee.type === TypeRequete.DELIVRANCE.libelle) {
      setRequeteSelectionnee({
        idRequete: requeteCliquee.idRequete,
        numeroFonctionnel: requeteCliquee.numero
      });
    }
  };

  return (
    <>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={onClickOnLine}
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
      {requeteSelectionnee && (
        <FenetreExterne
          titre={`Détails requête : N°${requeteSelectionnee.numeroFonctionnel}`}
          onCloseHandler={onClose}
          height={height}
          width={width}
        >
          <DetailRequetePage
            idRequeteAAfficher={requeteSelectionnee.idRequete}
          />
        </FenetreExterne>
      )}
    </>
  );
};
