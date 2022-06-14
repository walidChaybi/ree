import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "../../../../api/appels/requeteApi";
import { SousTypeInformation } from "../../../../model/requete/enum/SousTypeInformation";
import { TypeRequete } from "../../../../model/requete/enum/TypeRequete";
import { IRequeteTableauInformation } from "../../../../model/requete/IRequeteTableauInformation";
import { MenuTransfert } from "../../../common/composant/menuTransfert/MenuTransfert";
import {
  INavigationApercuReqInfoParams,
  useNavigationApercuInformation
} from "../../../common/hook/navigationApercuRequeteInformation/NavigationApercuInformationHook";
import { getMessageZeroRequete } from "../../../common/util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "../../../common/widget/attente/OperationEnCours";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_DEFAUT
} from "../../../common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "../../../common/widget/tableau/TableauRece/TableauRece";
import { receUrl } from "../../../router/ReceUrls";
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
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();
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
    const urlCourante = receUrl.getUrlCourante(history);
    setOperationEnCours(true);
    setParamsNavReqInfo({
      requete,
      callback: finOperationEnCours,
      urlCourante
    });
  }

  useEffect(() => {
    if (dataState && dataState.length === 0) {
      setZeroRequete(getMessageZeroRequete());
    }
  }, [dataState]);

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
        noRows={zeroRequete}
        enChargement={enChargement}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
      />
      <BoutonRetour />
    </>
  );
};
