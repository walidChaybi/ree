import { IQueryParametersPourRequetes, TypeAppelRequete } from "@api/appels/requeteApi";
import { IFiltresServiceRequeteInformationFormValues } from "@model/requete/IFiltreServiceRequeteInformation";
import { IRequeteTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { SousTypeInformation } from "@model/requete/enum/SousTypeInformation";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { RenderMessageSaisirFiltreOuZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { SortOrder } from "@widget/tableau/TableUtils";
import { NB_LIGNES_PAR_APPEL_DEFAUT, NB_LIGNES_PAR_PAGE_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import React, { useCallback, useEffect, useState } from "react";
import PageChargeur from "../../../../composants/commun/chargeurs/PageChargeur";
import { MenuTransfert } from "../../../common/composant/menuTransfert/MenuTransfert";
import {
  INavigationApercuReqInfoParams,
  useNavigationApercuInformation
} from "../../../common/hook/navigationApercuRequeteInformation/NavigationApercuInformationHook";
import { goToLinkRequete } from "../../requeteDelivrance/espaceDelivrance/EspaceDelivranceUtils";
import FiltresServiceRequeteInformationForm, {
  VALEUR_FILTRE_INFORMATION_DEFAUT
} from "../commun/FiltresServiceRequeteInformationForm/FiltresServiceRequeteInformationForm";
import { StatutsRequetesInformation, requeteInformationRequetesServiceColumnHeaders } from "./EspaceReqInfoParams";
import { useRequeteInformationApi } from "./hook/DonneesRequeteInformationApiHook";

interface LocalProps {
  parametresReqInfo: IQueryParametersPourRequetes;
}

export const ReqInfoServicePage: React.FC<LocalProps> = ({ parametresReqInfo }) => {
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [paramsNavReqInfo, setParamsNavReqInfo] = useState<INavigationApercuReqInfoParams | undefined>();
  const [linkParameters, setLinkParameters] = useState<IQueryParametersPourRequetes>(parametresReqInfo);
  const [rechercheEffectuee, setRechercheEffectuee] = useState<boolean>(false);
  const [filtresSelectionne, setFiltresSelectionne] =
    useState<IFiltresServiceRequeteInformationFormValues>(VALEUR_FILTRE_INFORMATION_DEFAUT);
  const [estTableauARafraichir, setEstTableauARafraichir] = useState<boolean>(false);
  const { dataState, paramsTableau } = useRequeteInformationApi(
    linkParameters,
    TypeAppelRequete.REQUETE_INFO_SERVICE,

    filtresSelectionne,
    rechercheEffectuee
  );

  useNavigationApercuInformation(paramsNavReqInfo);

  const goToLink = useCallback((link: string) => {
    const queryParametersPourRequetes = goToLinkRequete(link, "requetesinformationservice");
    if (queryParametersPourRequetes) {
      setLinkParameters(queryParametersPourRequetes);
    }
  }, []);

  const rafraichirParent = useCallback(() => {
    setLinkParameters({ ...parametresReqInfo });
  }, [parametresReqInfo]);

  const onClickOnLine = (_: string, data: IRequeteTableauInformation[], idx: number) => {
    const requete = data[idx];
    setOperationEnCours(true);
    setParamsNavReqInfo({
      requete: {
        id: requete.idRequete,
        idUtilisateur: requete.idUtilisateur ?? null,
        statut: (requete.statut ?? "") as keyof typeof EStatutRequete
      }
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

  const getIcone = (idRequete: string, sousType: string, idUtilisateur: string) => (
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

  const soumettreFiltre = (values: IFiltresServiceRequeteInformationFormValues) => {
    if (values === filtresSelectionne && rechercheEffectuee) {
      return;
    }

    setFiltresSelectionne(values);
    setRechercheEffectuee(true);
    setEstTableauARafraichir(true);
  };

  useEffect(() => {
    if (estTableauARafraichir) {
      setEstTableauARafraichir(false);
    }
  }, [estTableauARafraichir]);

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={finOperationEnCours}
        onClick={finOperationEnCours}
      />
      <FiltresServiceRequeteInformationForm onSubmit={soumettreFiltre} />
      {estTableauARafraichir ? (
        <PageChargeur />
      ) : (
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
          messageAucunResultat={RenderMessageSaisirFiltreOuZeroRequete(rechercheEffectuee)}
          nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
          nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
          handleChangeSort={handleChangeSort}
        />
      )}
    </>
  );
};
