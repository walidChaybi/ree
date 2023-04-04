import {
  aDroitConsulterApercuRequeteInformation,
  aDroitConsulterRequeteCreation,
  aDroitConsulterRequeteDelivrance
} from "@model/agent/IOfficier";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import { IRMCRequete } from "@model/rmc/requete/IRMCRequete";
import { ApercuReqCreationEtablissementPage } from "@pages/requeteCreation/apercuRequete/etablissement/ApercuReqCreationEtablissementPage";
import { ApercuReqCreationTranscriptionSimplePage } from "@pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionSimplePage";
import { ApercuRequetePage } from "@pages/requeteDelivrance/apercuRequete/apercuRequete/ApercuRequetePage";
import { ApercuReqInfoPage } from "@pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage";
import { FenetreExterne } from "@util/FenetreExterne";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { storeRece } from "@util/storeRece";
import {
  NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES,
  NB_LIGNES_PAR_PAGE_REQUETE_ASSOCIEES
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import React, { useCallback, useEffect, useState } from "react";
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

export interface IInfoRequeteSelectionnee {
  idRequete: string;
  numeroFonctionnel?: string;
  type: string;
  sousType: string;
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
    const utilisateurPeutOuvrirLaRequete = utilisateurADroitOuvrirRequete(
      requeteCliquee.type,
      requeteCliquee.sousType
    );
    if (utilisateurPeutOuvrirLaRequete) {
      setRequeteSelectionnee({
        idRequete: requeteCliquee.idRequete,
        numeroFonctionnel: requeteCliquee.numero,
        type: requeteCliquee.type,
        sousType: requeteCliquee.sousType
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
          {getApercuRequeteSimple(requeteSelectionnee)}
        </FenetreExterne>
      )}
    </>
  );
};

export const utilisateurADroitOuvrirRequete = (
  typeRequete: string,
  sousTypeRequete: string
) => {
  let aLeDroit = false;
  if (storeRece.utilisateurCourant) {
    switch (typeRequete) {
      case TypeRequete.DELIVRANCE.libelle:
        aLeDroit = aDroitConsulterRequeteDelivrance();
        break;
      case TypeRequete.CREATION.libelle:
        aLeDroit = aDroitConsulterRequeteCreation(sousTypeRequete);
        break;
      case TypeRequete.INFORMATION.libelle:
        aLeDroit = aDroitConsulterApercuRequeteInformation();
        break;
      default:
        break;
    }
  }
  return aLeDroit;
};

export const getApercuRequeteSimple = (
  requeteSelectionnee: IInfoRequeteSelectionnee
): JSX.Element => {
  let apercuRequete: JSX.Element = <></>;
  switch (requeteSelectionnee.type) {
    case TypeRequete.DELIVRANCE.libelle:
      apercuRequete = (
        <ApercuRequetePage
          idRequeteAAfficher={requeteSelectionnee?.idRequete}
        />
      );
      break;
    case TypeRequete.CREATION.libelle:
      apercuRequete =
        getApercuRequeteEtablissementOuTranscription(requeteSelectionnee);
      break;
    case TypeRequete.INFORMATION.libelle:
      apercuRequete = <ApercuReqInfoPage />;
      break;
    default:
      break;
  }

  return apercuRequete;
};

export const getApercuRequeteEtablissementOuTranscription = (
  requeteSelectionnee: IInfoRequeteSelectionnee
): JSX.Element => {
  let apercuSimpleCreation: JSX.Element = <></>;
  const sousTypeCreation = SousTypeCreation.getEnumFromLibelleCourt(
    requeteSelectionnee.sousType
  );
  if (SousTypeCreation.estRCEXR(sousTypeCreation)) {
    apercuSimpleCreation = (
      <ApercuReqCreationEtablissementPage
        idRequeteAAfficher={requeteSelectionnee.idRequete}
      />
    );
  } else if (SousTypeCreation.estRCTDOuRCTC(sousTypeCreation)) {
    apercuSimpleCreation = (
      <ApercuReqCreationTranscriptionSimplePage
        idRequeteAAfficher={requeteSelectionnee.idRequete}
      />
    );
  }

  return apercuSimpleCreation;
};
