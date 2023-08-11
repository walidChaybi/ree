import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "@api/appels/requeteApi";
import { MenuTransfert } from "@composant/menuTransfert/MenuTransfert";
import {
  INavigationApercuReqInfoParams,
  useNavigationApercuInformation
} from "@hook/navigationApercuRequeteInformation/NavigationApercuInformationHook";
import { IRequeteTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { SousTypeInformation } from "@model/requete/enum/SousTypeInformation";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { getUrlCourante } from "@util/route/UrlUtil";
import { getMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_DEFAUT
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { goToLinkRequete } from "../../requeteDelivrance/espaceDelivrance/EspaceDelivranceUtils";
import { requeteInformationRequetesServiceColumnHeaders } from "./EspaceReqInfoParams";
import { useRequeteInformationApi } from "./hook/DonneesRequeteInformationApiHook";
import "./scss/RequeteTableau.scss";

interface LocalProps {
  parametresReqInfo: IQueryParametersPourRequetes;
}

export const ReqInfoServicePage: React.FC<LocalProps> = ({
  parametresReqInfo
}) => {
  const history = useHistory();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [paramsNavReqInfo, setParamsNavReqInfo] = useState<
    INavigationApercuReqInfoParams | undefined
  >();

  const [linkParameters, setLinkParameters] =
    React.useState<IQueryParametersPourRequetes>(parametresReqInfo);
  const [enChargement, setEnChargement] = React.useState(true);
  const { dataState, paramsTableau } = useRequeteInformationApi(
    linkParameters,
    TypeAppelRequete.REQUETE_INFO_SERVICE,
    setEnChargement
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

  function onClickOnLine(
    idRequete: string,
    data: IRequeteTableauInformation[],
    idx: number
  ) {
    const requete = data[idx];
    const urlCourante = getUrlCourante(history);
    setOperationEnCours(true);
    setParamsNavReqInfo({
      requete,
      callback: finOperationEnCours,
      urlCourante
    });
  }

  const getIcone = (
    idRequete: string,
    sousType: string,
    idUtilisateur: string
  ) => {
    return (
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
  };

  const finOperationEnCours = () => {
    setOperationEnCours(false);
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
        columnHeaders={requeteInformationRequetesServiceColumnHeaders}
        dataState={dataState}
        icone={{ keyColonne: "iconeAssigne", getIcone }}
        paramsTableau={paramsTableau}
        goToLink={goToLink}
        noRows={getMessageZeroRequete()}
        enChargement={enChargement}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
      />
      <BoutonRetour />
    </>
  );
};
