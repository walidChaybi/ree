import { RECEContextData } from "@core/contexts/RECEContext";
import {
  NavigationApercuReqCreationParams,
  useNavigationApercuCreation
} from "@hook/navigationApercuRequeteCreation/NavigationApercuCreationHook";
import {
  INavigationApercuDelivranceParams,
  useNavigationApercuDelivrance
} from "@hook/navigationApercuRequeteDelivrance/NavigationApercuDelivranceHook";
import {
  INavigationApercuReqInfoParams,
  useNavigationApercuInformation
} from "@hook/navigationApercuRequeteInformation/NavigationApercuInformationHook";
import {
  ICreationActionMiseAjourStatutEtRedirectionParams,
  useCreationActionMiseAjourStatutEtRedirectionHook
} from "@hook/requete/CreationActionMiseAjourStatutEtRedirectionHook";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { ESousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { RequeteTableauRMC, TRequeteTableauRMC } from "@model/rmc/requete/RequeteTableauRMC";
import { setParamsUseApercuCreation } from "@pages/requeteCreation/commun/requeteCreationUtils";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { autorisePrendreEnChargeReqTableauCreation, autorisePrendreEnChargeReqTableauDelivrance } from "@util/RequetesUtils";
import { RenderMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { NB_LIGNES_PAR_APPEL_REQUETE, NB_LIGNES_PAR_PAGE_REQUETE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import React, { useCallback, useContext, useState } from "react";
import LiensRECE from "../../../../../router/LiensRECE";
import { INFO_PAGE_RECHERCHE_REQUETE } from "../../../../../router/infoPages/InfoPagesEspaceRecherche";
import { goToLinkRMC } from "../../acteInscription/resultats/RMCTableauCommun";
import { columnsTableauRequete } from "./RMCTableauRequetesParams";

interface RMCResultatRequetesProps {
  dataRMCRequete: TRequeteTableauRMC[];
  dataTableauRMCRequete: IParamsTableau;
  setRangeRequete: (range: string) => void;
}

export const RMCTableauRequetes: React.FC<RMCResultatRequetesProps> = ({ dataRMCRequete, dataTableauRMCRequete, setRangeRequete }) => {
  // Gestion du tableau
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const [navigationApercuDelivranceParams, setNavigationApercuDelivranceParams] = useState<INavigationApercuDelivranceParams | null>(null);

  //**** RMC AUTO ****//
  const [paramsMiseAJour, setParamsMiseAJour] = useState<ICreationActionMiseAjourStatutEtRedirectionParams | undefined>();
  const [paramsCreation, setParamsCreation] = useState<NavigationApercuReqCreationParams | undefined>();

  const { services, decrets, utilisateurConnecte } = useContext(RECEContextData);

  useCreationActionMiseAjourStatutEtRedirectionHook(paramsMiseAJour);
  useNavigationApercuDelivrance(navigationApercuDelivranceParams);
  useNavigationApercuCreation(paramsCreation);

  /**** Navigation vers Apercu Information ****/
  const [paramsNavReqInfo, setParamsNavReqInfo] = useState<INavigationApercuReqInfoParams | undefined>();

  useNavigationApercuInformation(paramsNavReqInfo);

  const goToLink = useCallback(
    (link: string) => {
      const range = goToLinkRMC(link);
      if (range && setRangeRequete) {
        setRangeRequete(range);
      }
    },
    [setRangeRequete]
  );

  const finOperationEnCours = () => {
    setOperationEnCours(false);
  };

  const onClickOnLine = (idRequete: string, requetes: TRequeteTableauRMC[], idx: number) => {
    const requeteCliquee = requetes[idx];
    switch (requeteCliquee.type) {
      case "DELIVRANCE":
        onClickReqDelivrance(requeteCliquee);
        break;
      case "INFORMATION":
        onClickReqInformation(requeteCliquee);
        break;
      case "CREATION":
        onClickReqCreation(requeteCliquee, utilisateurConnecte);
        break;
    }
  };

  const urlCourante = LiensRECE.genererLien(INFO_PAGE_RECHERCHE_REQUETE.url);

  const onClickReqDelivrance = (requete: RequeteTableauRMC<"DELIVRANCE">) => {
    setOperationEnCours(true);
    if (autorisePrendreEnChargeReqTableauDelivrance(utilisateurConnecte, requete)) {
      setParamsMiseAJour({
        libelleAction: EStatutRequete.PRISE_EN_CHARGE,
        statutRequete: "PRISE_EN_CHARGE",
        requete,
        urlCourante,
        typeRequete: "DELIVRANCE"
      });
    } else {
      setNavigationApercuDelivranceParams({
        requete,
        urlCourante
      });
    }
  };

  const onClickReqInformation = (requete: RequeteTableauRMC<"INFORMATION">) => {
    setOperationEnCours(true);
    setParamsNavReqInfo({
      requete,
      callback: finOperationEnCours,
      urlCourante
    });
  };

  const onClickReqCreation = (requete: RequeteTableauRMC<"CREATION">, utilisateurConnecte: UtilisateurConnecte) => {
    if (
      estRequeteRCTDOuRCTCEtALeDroitActeTranscrit(requete.sousType, utilisateurConnecte) ||
      estRequeteRCEXREtALeDroitActeEtabli(requete.sousType, utilisateurConnecte)
    ) {
      setOperationEnCours(true);
      if (autorisePrendreEnChargeReqTableauCreation(requete, utilisateurConnecte)) {
        setParamsMiseAJour({
          libelleAction: EStatutRequete.PRISE_EN_CHARGE,
          statutRequete: "PRISE_EN_CHARGE",
          requete,
          urlCourante,
          typeRequete: "CREATION"
        });
      } else {
        setParamsUseApercuCreation(requete.id, setParamsCreation, requete.sousType, requete.statut, requete.idUtilisateur ?? undefined);
      }
    }
  };
  return (
    <>
      <OperationEnCours
        visible={operationEnCours || !services || !decrets}
        onTimeoutEnd={finOperationEnCours}
      />
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={onClickOnLine}
        columnHeaders={columnsTableauRequete}
        dataState={dataRMCRequete}
        paramsTableau={dataTableauRMCRequete}
        goToLink={goToLink}
        messageAucunResultat={RenderMessageZeroRequete()}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_REQUETE}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_REQUETE}
      />
    </>
  );
};

const estRequeteRCTDOuRCTCEtALeDroitActeTranscrit = (
  sousType: keyof typeof ESousTypeCreation,
  utilisateurConnecte: UtilisateurConnecte
): boolean =>
  ["RCTC", "RCTD"].includes(sousType) && utilisateurConnecte.estHabilitePour({ leDroit: Droit.TRANSCRIPTION_CREER_PROJET_ACTE });

const estRequeteRCEXREtALeDroitActeEtabli = (sousType: keyof typeof ESousTypeCreation, utilisateurConnecte: UtilisateurConnecte): boolean =>
  sousType === "RCEXR" &&
  utilisateurConnecte.estHabilitePour({ leDroit: Droit.CREER_ACTE_ETABLI, surUnDesPerimetres: [Perimetre.TOUS_REGISTRES, Perimetre.ETAX] });
