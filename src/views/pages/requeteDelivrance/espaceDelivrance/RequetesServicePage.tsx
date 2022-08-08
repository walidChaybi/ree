import React, { useCallback, useEffect, useState } from "react";
import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "../../../../api/appels/requeteApi";
import { SousTypeDelivrance } from "../../../../model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { TypeRequete } from "../../../../model/requete/enum/TypeRequete";
import { IRequeteTableauDelivrance } from "../../../../model/requete/IRequeteTableauDelivrance";
import { MenuTransfert } from "../../../common/composant/menuTransfert/MenuTransfert";
import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "../../../common/hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { FeatureFlag } from "../../../common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../../common/util/featureFlag/gestionnaireFeatureFlag";
import { autorisePrendreEnChargeReqTableauDelivrance } from "../../../common/util/RequetesUtils";
import { getMessageZeroRequete } from "../../../common/util/tableauRequete/TableauRequeteUtils";
import { getLibelle } from "../../../common/util/Utils";
import { OperationEnCours } from "../../../common/widget/attente/OperationEnCours";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import {
  NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE,
  NB_LIGNES_PAR_PAGE_ESPACE_DELIVRANCE
} from "../../../common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "../../../common/widget/tableau/TableauRece/TableauRece";
import { TableauTypeColumn } from "../../../common/widget/tableau/TableauRece/TableauTypeColumn";
import { SortOrder } from "../../../common/widget/tableau/TableUtils";
import { URL_REQUETES_DELIVRANCE_SERVICE } from "../../../router/ReceUrls";
import {
  dateStatutColumnHeaders,
  HeaderTableauRequete,
  requeteColumnHeaders
} from "./EspaceDelivranceParams";
import { goToLinkRequete } from "./EspaceDelivranceUtils";
import { useRequeteDelivranceApi } from "./hook/DonneesRequeteDelivranceHook";
import "./scss/RequeteTableau.scss";

const columnsRequestesService = [
  ...requeteColumnHeaders,
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.AttribueA],
    title: getLibelle("Attribuée à"),
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.IconeAssigne],
    title: "",
    align: "center"
  }),
  ...dateStatutColumnHeaders
];
interface MesRequetesServicePageProps {
  setParamsRMCAuto: (
    id: string,
    requete: IRequeteTableauDelivrance,
    urlWithParam: string
  ) => void;
}

export const RequetesServicePage: React.FC<
  MesRequetesServicePageProps
> = props => {
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();

  const [paramsMiseAJour, setParamsMiseAJour] = useState<
    CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();

  const [linkParameters, setLinkParameters] =
    React.useState<IQueryParametersPourRequetes>({
      statuts: StatutRequete.getStatutsRequetesService(),
      tri: "dateStatut",
      sens: "ASC",
      range: `0-${NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}`
    });
  const [enChargement, setEnChargement] = React.useState(true);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

  const { dataState, paramsTableau } = useRequeteDelivranceApi(
    linkParameters,
    TypeAppelRequete.REQUETE_DELIVRANCE_SERVICE,
    setEnChargement
  );

  function goToLink(link: string) {
    const queryParametersPourRequetes = goToLinkRequete(
      link,
      "requetesService"
    );
    if (queryParametersPourRequetes) {
      setLinkParameters(queryParametersPourRequetes);
    }
  }

  function rafraichirParent() {
    setLinkParameters({
      statuts: StatutRequete.getStatutsRequetesService(),
      tri: "dateStatut",
      sens: "ASC",
      range: `0-${NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}`
    });
  }

  useCreationActionMiseAjourStatutEtRmcAuto(paramsMiseAJour);

  const handleChangeSort = useCallback((tri: string, sens: SortOrder) => {
    const queryParameters = {
      statuts: StatutRequete.getStatutsRequetesService(),
      tri,
      sens,
      range: `0-${NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}`
    };
    setLinkParameters(queryParameters);
  }, []);

  function onClickOnLine(
    idRequete: string,
    data: IRequeteTableauDelivrance[],
    idx: number
  ) {
    setOperationEnCours(true);
    const requeteSelect = data[idx];
    if (autorisePrendreEnChargeReqTableauDelivrance(requeteSelect)) {
      setParamsMiseAJour({
        libelleAction: "Prendre en charge",
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        requete: requeteSelect,
        urlCourante: URL_REQUETES_DELIVRANCE_SERVICE
      });
    } else {
      props.setParamsRMCAuto(
        idRequete,
        data[idx],
        URL_REQUETES_DELIVRANCE_SERVICE
      );
    }
  }

  useEffect(() => {
    if (dataState && dataState.length === 0) {
      setZeroRequete(getMessageZeroRequete());
    }
  }, [dataState]);

  const finOperationEnCours = () => {
    setOperationEnCours(false);
  };

  const getIconeAssigneeA = (
    idRequete: string,
    sousType: string,
    idUtilisateur: string
  ) => {
    return (
      <>
        {gestionFeatureFlagAssigneeA(sousType) && (
          <MenuTransfert
            idRequete={idRequete}
            typeRequete={TypeRequete.DELIVRANCE}
            sousTypeRequete={SousTypeDelivrance.getEnumFor(sousType)}
            estTransfert={false}
            menuFermer={true}
            icone={true}
            pasAbandon={true}
            idUtilisateurRequete={idUtilisateur}
            rafraichirParent={rafraichirParent}
          />
        )}
      </>
    );
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
        sortOrderByState={linkParameters.tri}
        sortOrderState={linkParameters.sens}
        onClickOnLine={onClickOnLine}
        columnHeaders={columnsRequestesService}
        dataState={dataState}
        icone={{ keyColonne: "iconeAssigne", getIcone: getIconeAssigneeA }}
        paramsTableau={paramsTableau}
        goToLink={goToLink}
        handleChangeSort={handleChangeSort}
        noRows={zeroRequete}
        enChargement={enChargement}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_ESPACE_DELIVRANCE}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}
      />
      <BoutonRetour />
    </>
  );
};

function gestionFeatureFlagAssigneeA(sousType: string) {
  return (
    (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC) &&
      (SousTypeDelivrance.RDC.libelleCourt === sousType ||
        SousTypeDelivrance.RDD.libelleCourt === sousType)) ||
    (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_CS) &&
      (SousTypeDelivrance.RDCSC.libelleCourt === sousType ||
        SousTypeDelivrance.RDCSD.libelleCourt === sousType))
  );
}
