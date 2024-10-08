import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "@api/appels/requeteApi";
import { MenuTransfert } from "@composant/menuTransfert/MenuTransfert";
import {
  INavigationApercuReqInfoParams,
  useNavigationApercuInformation
} from "@hook/navigationApercuRequeteInformation/NavigationApercuInformationHook";
import { IFiltresServiceRequeteInformationFormValues } from "@model/requete/IFiltreServiceRequeteInformation";
import { IRequeteTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { SousTypeInformation } from "@model/requete/enum/SousTypeInformation";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { RenderMessageSaisirFiltreOuZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import { SortOrder } from "@widget/tableau/TableUtils";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_DEFAUT
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import React, { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { goToLinkRequete } from "../../requeteDelivrance/espaceDelivrance/EspaceDelivranceUtils";
import FiltresServiceRequeteInformationForm, {
  VALEUR_FILTRE_INFORMATION_DEFAUT
} from "../commun/FiltresServiceRequeteInformationForm/FiltresServiceRequeteInformationForm";
import {
  StatutsRequetesInformation,
  requeteInformationRequetesServiceColumnHeaders
} from "./EspaceReqInfoParams";
import { useRequeteInformationApi } from "./hook/DonneesRequeteInformationApiHook";
import "./scss/RequeteTableau.scss";

interface LocalProps {
  parametresReqInfo: IQueryParametersPourRequetes;
}

export const ReqInfoServicePage: React.FC<LocalProps> = ({
  parametresReqInfo
}) => {
  const location = useLocation();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [paramsNavReqInfo, setParamsNavReqInfo] = useState<
    INavigationApercuReqInfoParams | undefined
  >();

  const [linkParameters, setLinkParameters] =
    useState<IQueryParametersPourRequetes>(parametresReqInfo);
  const [enChargement, setEnChargement] = useState<boolean>(false);
  const [rechercheEffectuee, setRechercheEffectuee] = useState<boolean>(false);
  const [filtresSelectionne, setFiltresSelectionne] =
    useState<IFiltresServiceRequeteInformationFormValues>(
      VALEUR_FILTRE_INFORMATION_DEFAUT
    );
  const [tableauDoitReset, setTableauDoitReset] = useState<boolean>(false);
  const { dataState, paramsTableau } = useRequeteInformationApi(
    linkParameters,
    TypeAppelRequete.REQUETE_INFO_SERVICE,
    setEnChargement,
    filtresSelectionne,
    rechercheEffectuee,
    setTableauDoitReset
  );

  useNavigationApercuInformation(paramsNavReqInfo);

  const goToLink = useCallback((link: string) => {
    const queryParametersPourRequetes = goToLinkRequete(
      link,
      "requetesinformationservice"
    );
    if (queryParametersPourRequetes) {
      setLinkParameters(queryParametersPourRequetes);
    }
  }, []);

  const rafraichirParent = useCallback(() => {
    setLinkParameters({ ...parametresReqInfo });
  }, [parametresReqInfo]);

  const onClickOnLine = (
    _: string,
    data: IRequeteTableauInformation[],
    idx: number
  ) => {
    const requete = data[idx];
    const urlCourante = location.pathname;
    setOperationEnCours(true);
    setParamsNavReqInfo({
      requete,
      callback: finOperationEnCours,
      urlCourante
    });
  };

  const handleChangeSort = useCallback((tri: string, sens: SortOrder) => {
    setLinkParameters({
      statuts: StatutsRequetesInformation,
      tri,
      sens,
      range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
    });
  }, []);

  const getIcone = (
    idRequete: string,
    sousType: string,
    idUtilisateur: string
  ) => (
    <MenuTransfert
      idRequete={idRequete}
      typeRequete={TypeRequete.INFORMATION}
      sousTypeRequete={SousTypeInformation.getEnumFor(sousType)}
      estTransfert={false}
      menuFermer={true}
      icone={true}
      idUtilisateurRequete={idUtilisateur}
      rafraichirParent={rafraichirParent}
    />
  );

  const finOperationEnCours = () => {
    setOperationEnCours(false);
  };

  const onSubmit = (values: IFiltresServiceRequeteInformationFormValues) => {
    if (values === filtresSelectionne && rechercheEffectuee) {
      return;
    }

    setFiltresSelectionne(values);
    setEnChargement(true);
    setRechercheEffectuee(true);
  };

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={finOperationEnCours}
        onClick={finOperationEnCours}
      />
      <FiltresServiceRequeteInformationForm onSubmit={onSubmit} />
      <TableauRece
        idKey={"idRequete"}
        sortOrderByState={linkParameters.tri}
        sortOrderState={linkParameters.sens}
        onClickOnLine={onClickOnLine}
        columnHeaders={requeteInformationRequetesServiceColumnHeaders}
        dataState={dataState}
        icone={{ keyColonne: "iconeAssigne", getIcone }}
        paramsTableau={paramsTableau}
        goToLink={goToLink}
        noRows={RenderMessageSaisirFiltreOuZeroRequete(rechercheEffectuee)}
        enChargement={enChargement}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
        handleChangeSort={handleChangeSort}
        resetTableau={tableauDoitReset}
      />
      <BoutonRetour />
    </>
  );
};
