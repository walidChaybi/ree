import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "@api/appels/requeteApi";
import { MenuTransfert } from "@composant/menuTransfert/MenuTransfert";
import {
  ICreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "@hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { IFiltreServiceRequeteDelivranceFormValues } from "@model/form/delivrance/IFiltreServiceRequeteDelivrance";
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
import { FiltreServiceRequeteDelivranceForm } from "./contenu/FiltreServiceRequeteDelivranceForm";
import {
  dateStatutColumnHeaders,
  HeaderTableauRequete,
  requeteColumnHeaders
} from "./EspaceDelivranceParams";
import {
  goToLinkRequete,
  miseAjourOuRedirection
} from "./EspaceDelivranceUtils";
import { useRequeteDelivranceApiHook } from "./hook/DonneesRequeteDelivranceApiHook";
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

const defaultParamsRequetes = {
  statuts: StatutRequete.getStatutsRequetesService(),
  tri: "dateCreation",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}`
} as IQueryParametersPourRequetes;

export const RequetesServicePage: React.FC<
  MesRequetesServicePageProps
> = props => {
  const [paramsMiseAJour, setParamsMiseAJour] = useState<
    ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();

  const [parametresLienRequete, setParametresLienRequete] =
    React.useState<IQueryParametersPourRequetes>();
  const [enChargement, setEnChargement] = React.useState(false);
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [estTableauARafraichir, setEstTableauARafraichir] =
    useState<boolean>(false);

  const { dataState, paramsTableau, onSubmitFiltres } =
    useRequeteDelivranceApiHook(
      parametresLienRequete,
      TypeAppelRequete.REQUETE_DELIVRANCE_SERVICE,
      setEnChargement
    );

  function goToLink(link: string) {
    const queryParametersPourRequetes = goToLinkRequete(
      link,
      "requetesService"
    );
    if (queryParametersPourRequetes) {
      setParametresLienRequete(queryParametersPourRequetes);
    }
  }
  useEffect(() => {
    setEstTableauARafraichir(false);
  }, [estTableauARafraichir]);

  function rafraichirParent() {
    setParametresLienRequete({
      statuts: StatutRequete.getStatutsRequetesService(),
      tri: "dateCreation",
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
    setParametresLienRequete(queryParameters);
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

  function onSubmitFiltreServiceRequeteDelivrance(
    values: IFiltreServiceRequeteDelivranceFormValues
  ) {
    if (!parametresLienRequete) {
      setParametresLienRequete(defaultParamsRequetes);
    }
    onSubmitFiltres(values);
    setEstTableauARafraichir(true);
  }

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={finOperationEnCours}
        onClick={finOperationEnCours}
      />
      <FiltreServiceRequeteDelivranceForm
        onSubmit={onSubmitFiltreServiceRequeteDelivrance}
      />
      <TableauRece
        idKey={"idRequete"}
        sortOrderByState={parametresLienRequete?.tri}
        sortOrderState={parametresLienRequete?.sens}
        onClickOnLine={onClickOnLine}
        columnHeaders={columnsRequestesService}
        dataState={dataState}
        icone={{ keyColonne: "iconeAssigne", getIcone: getIconeAssigneeA }}
        paramsTableau={paramsTableau}
        goToLink={goToLink}
        handleChangeSort={handleChangeSort}
        noRows={getMessageZeroRequete()}
        enChargement={enChargement}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_ESPACE_DELIVRANCE}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}
        resetTableau={estTableauARafraichir}
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
