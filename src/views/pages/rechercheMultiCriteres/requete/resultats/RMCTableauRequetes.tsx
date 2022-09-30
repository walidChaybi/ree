import {
  INavigationApercuRMCAutoParams,
  useNavigationApercuRMCAutoDelivrance
} from "@hook/navigationApercuRequeteDelivrance/NavigationApercuDelivranceRMCAutoHook";
import {
  INavigationApercuReqInfoParams,
  useNavigationApercuInformation
} from "@hook/navigationApercuRequeteInformation/NavigationApercuInformationHook";
import {
  ICreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "@hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { TRequeteTableau } from "@model/requete/IRequeteTableau";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { IRequeteTableauInformation } from "@model/requete/IRequeteTableauInformation";
import {
  URL_RECHERCHE_REQUETE,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_ID
} from "@router/ReceUrls";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import {
  autorisePrendreEnChargeReqTableauCreation,
  autorisePrendreEnChargeReqTableauDelivrance
} from "@util/RequetesUtils";
import { getUrlWithParam } from "@util/route/routeUtil";
import { getMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_REQUETE
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
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

  //**** RMC AUTO ****//
  const [paramsMiseAJour, setParamsMiseAJour] = useState<
    ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();
  const [paramsRMCAuto, setParamsRMCAuto] = useState<
    INavigationApercuRMCAutoParams | undefined
  >();

  useCreationActionMiseAjourStatutEtRmcAuto(paramsMiseAJour);
  useNavigationApercuRMCAutoDelivrance(paramsRMCAuto);

  /**** Navigation vers Apercu Information ****/
  const [paramsNavReqInfo, setParamsNavReqInfo] = useState<
    INavigationApercuReqInfoParams | undefined
  >();

  useNavigationApercuInformation(paramsNavReqInfo);

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

  const finOperationEnCours = () => {
    setOperationEnCours(false);
  };

  const onClickOnLine = (
    idRequete: string,
    data: TRequeteTableau[],
    idx: number
  ) => {
    const requeteSelect = data[idx];
    switch (requeteSelect.type) {
      case TypeRequete.DELIVRANCE.libelle:
        onClickReqDelivrance(requeteSelect as IRequeteTableauDelivrance);
        break;
      case TypeRequete.INFORMATION.libelle:
        onClickReqInformation(requeteSelect as IRequeteTableauInformation);
        break;
      case TypeRequete.CREATION.libelle:
        onClickReqCreation(requeteSelect as IRequeteTableauCreation);
        break;
    }
  };

  const urlCourante = URL_RECHERCHE_REQUETE;
  const history = useHistory();

  const onClickReqDelivrance = (requete: IRequeteTableauDelivrance) => {
    setOperationEnCours(true);
    if (autorisePrendreEnChargeReqTableauDelivrance(requete)) {
      setParamsMiseAJour({
        libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        requete,
        urlCourante,
        typeRequete: TypeRequete.DELIVRANCE
      });
    } else {
      setParamsRMCAuto({
        requete,
        urlCourante,
        // La RMC ne remonte pas les informations suffisantes pour générer un certificat de situation automatique
        pasDeTraitementAuto: SousTypeDelivrance.estRDCSDouRDCSC(
          SousTypeDelivrance.getEnumFromLibelleCourt(requete.sousType)
        )
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

  const onClickReqCreation = (requete: IRequeteTableauCreation) => {
    setOperationEnCours(true);
    if (autorisePrendreEnChargeReqTableauCreation(requete)) {
      setParamsMiseAJour({
        libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        requete,
        urlCourante,
        typeRequete: TypeRequete.CREATION
      });
    } else {
      history.push(
        getUrlWithParam(
          URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_ID,
          requete.idRequete
        )
      );
    }
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
