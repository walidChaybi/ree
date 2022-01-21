import React, { useCallback, useEffect, useState } from "react";
import { SousTypeDelivrance } from "../../../../../model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../../model/requete/enum/StatutRequete";
import { TypeRequete } from "../../../../../model/requete/enum/TypeRequete";
import { IRequeteTableauDelivrance } from "../../../../../model/requete/IRequeteTableauDelivrance";
import { IRequeteTableauInformation } from "../../../../../model/requete/IRequeteTableauInformation";
import {
  INavigationApercuRMCAutoParams,
  useNavigationApercuRMCAuto
} from "../../../../common/hook/navigationApercuRequeteDelivrance/NavigationApercuDelivranceRMCAutoHook";
import {
  INavigationApercuReqInfoParams,
  useNavigationApercuInformation
} from "../../../../common/hook/navigationApercuRequeteInformation/NavigationApercuInformationHook";
import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "../../../../common/hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import {
  CreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "../../../../common/hook/requete/CreationActionMiseAjourStatutHook";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import {
  autorisePrendreEnChargeReqTableauDelivrance,
  autorisePrendreEnChargeReqTableauInformation
} from "../../../../common/util/RequetesUtils";
import { getMessageZeroRequete } from "../../../../common/util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "../../../../common/widget/attente/OperationEnCours";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_REQUETE
} from "../../../../common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "../../../../common/widget/tableau/TableauRece/TableauRece";
import { URL_RECHERCHE_REQUETE } from "../../../../router/ReceUrls";
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
  const [paramsMAJReqDelivrance, setParamsMAJReqDelivrance] =
    useState<CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined>();
  const [paramsRMCAuto, setParamsRMCAuto] =
    useState<INavigationApercuRMCAutoParams | undefined>();

  useCreationActionMiseAjourStatutEtRmcAuto(paramsMAJReqDelivrance);
  useNavigationApercuRMCAuto(paramsRMCAuto);

  /**** Navigation vers Apercu Information ****/
  const [paramsMAJReqInfo, setParamsMAJReqInfo] =
    useState<CreationActionMiseAjourStatutHookParams | undefined>();
  const [paramsNavReqInfo, setParamsNavReqInfo] =
    useState<INavigationApercuReqInfoParams | undefined>();

  useCreationActionMiseAjourStatut(paramsMAJReqInfo);
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
    data: IRequeteTableauDelivrance[],
    idx: number
  ) => {
    const requeteSelect = data[idx];
    if (requeteSelect.type === TypeRequete.DELIVRANCE.libelle) {
      onClickReqDelivrance(requeteSelect);
    } else if (requeteSelect.type === TypeRequete.INFORMATION.libelle) {
      onClickReqInformation(requeteSelect);
    }
  };

  const urlCourante = URL_RECHERCHE_REQUETE;

  const onClickReqDelivrance = (requete: IRequeteTableauDelivrance) => {
    setOperationEnCours(true);
    if (autorisePrendreEnChargeReqTableauDelivrance(requete)) {
      setParamsMAJReqDelivrance({
        libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        requete,
        urlCourante
      });
    } else {
      setParamsRMCAuto({
        requete,
        urlCourante,
        // La RMC ne remonte pas les informations suffisantes pour générer un certificat de situation automatique
        pasDeTraitementAuto: SousTypeDelivrance.estSousTypeCertificatSituation(
          SousTypeDelivrance.getEnumFromLibelleCourt(requete.sousType)
        )
      });
    }
  };

  const onClickReqInformation = (requete: IRequeteTableauInformation) => {
    setOperationEnCours(true);
    if (autorisePrendreEnChargeReqTableauInformation(requete)) {
      setParamsMAJReqInfo({
        libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        requete,
        callback: () => {
          setParamsNavReqInfo({
            requete,
            callback: finOperationEnCours,
            urlCourante
          });
        }
      });
    } else {
      setParamsNavReqInfo({
        requete,
        callback: finOperationEnCours,
        urlCourante
      });
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
