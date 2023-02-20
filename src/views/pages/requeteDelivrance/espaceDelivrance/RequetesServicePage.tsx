import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "@api/appels/requeteApi";
import { MenuTransfert } from "@composant/menuTransfert/MenuTransfert";
import {
  ICreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "@hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { URL_REQUETES_DELIVRANCE_SERVICE } from "@router/ReceUrls";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { getMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { getLibelle } from "@util/Utils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import {
  NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE,
  NB_LIGNES_PAR_PAGE_ESPACE_DELIVRANCE
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { SortOrder } from "@widget/tableau/TableUtils";
import React, { useCallback, useEffect, useState } from "react";
import {
  dateStatutColumnHeaders,
  HeaderTableauRequete,
  requeteColumnHeaders
} from "./EspaceDelivranceParams";
import {
  goToLinkRequete,
  miseAjourOuRedirection
} from "./EspaceDelivranceUtils";
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
    urlWithParam: string,
    pasDeTraitementAuto: boolean
  ) => void;
}

export const RequetesServicePage: React.FC<MesRequetesServicePageProps> = props => {
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();

  const [paramsMiseAJour, setParamsMiseAJour] = useState<
    ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
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
    miseAjourOuRedirection(
      requeteSelect,
      setParamsMiseAJour,
      props,
      idRequete,
      data,
      idx,
      URL_REQUETES_DELIVRANCE_SERVICE
    );
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
