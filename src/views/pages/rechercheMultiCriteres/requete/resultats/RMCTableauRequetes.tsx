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
import { TRequeteTableau } from "@model/requete/IRequeteTableau";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { IRequeteTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { setParamsUseApercuCreation } from "@pages/requeteCreation/commun/requeteCreationUtils";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { autorisePrendreEnChargeReqTableauCreation, autorisePrendreEnChargeReqTableauDelivrance } from "@util/RequetesUtils";
import { RenderMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { NB_LIGNES_PAR_APPEL_REQUETE, NB_LIGNES_PAR_PAGE_REQUETE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import React, { useCallback, useContext, useState } from "react";
import { goToLinkRMC } from "../../acteInscription/resultats/RMCTableauCommun";
import { columnsTableauRequete } from "./RMCTableauRequetesParams";

interface RMCResultatRequetesProps {
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

  const onClickOnLine = (idRequete: string, data: TRequeteTableau[], idx: number) => {
    const requeteSelect = data[idx];
    switch (requeteSelect.type) {
      case TypeRequete.DELIVRANCE.libelle:
        onClickReqDelivrance(requeteSelect as IRequeteTableauDelivrance);
        break;
      case TypeRequete.INFORMATION.libelle:
        onClickReqInformation(requeteSelect as IRequeteTableauInformation);
        break;
      case TypeRequete.CREATION.libelle:
        onClickReqCreation(requeteSelect as IRequeteTableauCreation, utilisateurConnecte);
        break;
    }
  };

  const urlCourante = URL_RECHERCHE_REQUETE;

  const onClickReqDelivrance = (requete: IRequeteTableauDelivrance) => {
    setOperationEnCours(true);
    if (autorisePrendreEnChargeReqTableauDelivrance(utilisateurConnecte, requete)) {
      setParamsMiseAJour({
        libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        requete,
        urlCourante,
        typeRequete: TypeRequete.DELIVRANCE
      });
    } else {
      setNavigationApercuDelivranceParams({
        requete,
        urlCourante
      });
    }
  };

  const onClickReqInformation = (requete: IRequeteTableauInformation) => {
    setOperationEnCours(true);
    setParamsNavReqInfo({
      requete,
      callback: finOperationEnCours,
      urlCourante
    });
  };

  function estRequeteRCTDOuRCTCEtALeDroitActeTranscrit(sousType: SousTypeCreation) {
    return SousTypeCreation.estRCTDOuRCTC(sousType) && utilisateurConnecte.estHabilitePour({ leDroit: Droit.CREER_ACTE_TRANSCRIT });
  }

  function estRequeteRCEXREtALeDroitActeEtabli(sousType: SousTypeCreation) {
    return (
      SousTypeCreation.estRCEXR(sousType) &&
      utilisateurConnecte.estHabilitePour({
        leDroit: Droit.CREER_ACTE_ETABLI,
        surUnDesPerimetres: [Perimetre.TOUS_REGISTRES, Perimetre.ETAX]
      })
    );
  }

  const onClickReqCreation = (requete: IRequeteTableauCreation, utilisateurConnecte: UtilisateurConnecte) => {
    const sousType = SousTypeCreation.getEnumFromLibelleCourt(requete.sousType);
    if (estRequeteRCTDOuRCTCEtALeDroitActeTranscrit(sousType) || estRequeteRCEXREtALeDroitActeEtabli(sousType)) {
      setOperationEnCours(true);
      if (autorisePrendreEnChargeReqTableauCreation(requete, utilisateurConnecte)) {
        setParamsMiseAJour({
          libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
          statutRequete: StatutRequete.PRISE_EN_CHARGE,
          requete,
          urlCourante,
          typeRequete: TypeRequete.CREATION
        });
      } else {
        setParamsUseApercuCreation(requete.idRequete, setParamsCreation, requete.sousType, requete.statut, requete.idUtilisateur);
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
        resetTableau={resetTableauRequete}
        noRows={RenderMessageZeroRequete()}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_REQUETE}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_REQUETE}
      />
    </>
  );
};
