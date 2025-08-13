import { IQueryParametersPourRequetes, TypeAppelRequete } from "@api/appels/requeteApi";
import { MenuTransfert } from "@composant/menuTransfert/MenuTransfert";
import { RECEContextData } from "@core/contexts/RECEContext";
import {
  ICreationActionMiseAjourStatutEtRedirectionParams,
  useCreationActionMiseAjourStatutEtRedirectionHook
} from "@hook/requete/CreationActionMiseAjourStatutEtRedirectionHook";
import { IFiltreServiceRequeteDelivranceFormValues } from "@model/form/delivrance/IFiltreServiceRequeteDelivrance";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { URL_REQUETES_DELIVRANCE_SERVICE } from "@router/ReceUrls";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { RenderMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import { SortOrder } from "@widget/tableau/TableUtils";
import {
  NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE,
  NB_LIGNES_PAR_PAGE_ESPACE_DELIVRANCE
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import React, { useCallback, useContext, useEffect, useState } from "react";
import PageChargeur from "../../../../composants/commun/chargeurs/PageChargeur";
import { HeaderTableauRequete, dateStatutColumnHeaders, requeteColumnHeaders } from "./EspaceDelivranceParams";
import { goToLinkRequete, miseAjourOuRedirection } from "./EspaceDelivranceUtils";
import { FiltreServiceRequeteDelivranceForm } from "./contenu/FiltreServiceRequeteDelivranceForm";
import { useRequeteDelivranceApiHook } from "./hook/DonneesRequeteDelivranceApiHook";
import "./scss/RequeteTableau.scss";

const columnsRequestesService = [
  ...requeteColumnHeaders,
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.AttribueA],
    title: "Attribuée à",
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
  setNavigationApercuDelivranceParams: (requete: IRequeteTableauDelivrance, urlWithParam: string) => void;
}

const defaultParamsRequetes = {
  statuts: StatutRequete.getStatutsRequetesService(),
  tri: "dateCreation",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}`
} as IQueryParametersPourRequetes;

export const RequetesServicePage: React.FC<MesRequetesServicePageProps> = props => {
  const [paramsMiseAJour, setParamsMiseAJour] = useState<ICreationActionMiseAjourStatutEtRedirectionParams | undefined>();
  const [parametresLienRequete, setParametresLienRequete] = React.useState<IQueryParametersPourRequetes>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [estTableauARafraichir, setEstTableauARafraichir] = useState<boolean>(false);
  const { decrets, utilisateurConnecte } = useContext(RECEContextData);
  const { dataState, paramsTableau, onSubmitFiltres } = useRequeteDelivranceApiHook(
    parametresLienRequete,
    TypeAppelRequete.REQUETE_DELIVRANCE_SERVICE,
    setParametresLienRequete
  );

  function goToLink(link: string) {
    const queryParametersPourRequetes = goToLinkRequete(link, "requetesService");
    if (queryParametersPourRequetes) {
      setParametresLienRequete(queryParametersPourRequetes);
    }
  }
  useEffect(() => {
    if (estTableauARafraichir) {
      setEstTableauARafraichir(false);
    }
  }, [estTableauARafraichir]);

  function rafraichirParent() {
    setParametresLienRequete({
      statuts: StatutRequete.getStatutsRequetesService(),
      tri: "dateCreation",
      sens: "ASC",
      range: `0-${NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}`
    });
  }

  useCreationActionMiseAjourStatutEtRedirectionHook(paramsMiseAJour);

  const handleChangeSort = useCallback((tri: string, sens: SortOrder) => {
    const queryParameters = {
      statuts: StatutRequete.getStatutsRequetesService(),
      tri,
      sens,
      range: `0-${NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}`
    };
    setParametresLienRequete(queryParameters);
  }, []);

  function onClickOnLine(idRequete: string, data: IRequeteTableauDelivrance[], idx: number) {
    setOperationEnCours(true);
    const requeteSelect = data[idx];
    miseAjourOuRedirection(
      requeteSelect,
      setParamsMiseAJour,
      props.setNavigationApercuDelivranceParams,
      idRequete,
      data,
      idx,
      URL_REQUETES_DELIVRANCE_SERVICE,
      utilisateurConnecte
    );
  }

  const finOperationEnCours = () => {
    setOperationEnCours(false);
  };

  const getIconeAssigneeA = (idRequete: string, sousType: string, idUtilisateur: string) => {
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

  function onSubmitFiltreServiceRequeteDelivrance(values: IFiltreServiceRequeteDelivranceFormValues) {
    if (!parametresLienRequete) {
      setParametresLienRequete(defaultParamsRequetes);
    }
    onSubmitFiltres(values);
    setEstTableauARafraichir(true);
  }

  return (
    <>
      <OperationEnCours
        visible={operationEnCours || !decrets}
        onTimeoutEnd={finOperationEnCours}
        onClick={finOperationEnCours}
      />
      <FiltreServiceRequeteDelivranceForm onSubmit={onSubmitFiltreServiceRequeteDelivrance} />
      {estTableauARafraichir ? (
        <PageChargeur />
      ) : (
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
          messageAucunResultat={RenderMessageZeroRequete()}
          nbLignesParPage={NB_LIGNES_PAR_PAGE_ESPACE_DELIVRANCE}
          nbLignesParAppel={NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}
        />
      )}
      <BoutonRetour />
    </>
  );
};

function gestionFeatureFlagAssigneeA(sousType: string) {
  return (
    (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES) &&
      (SousTypeDelivrance.RDC.libelleCourt === sousType || SousTypeDelivrance.RDD.libelleCourt === sousType)) ||
    (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_CERTIFS_SITUATION) &&
      (SousTypeDelivrance.RDCSC.libelleCourt === sousType || SousTypeDelivrance.RDCSD.libelleCourt === sousType))
  );
}
