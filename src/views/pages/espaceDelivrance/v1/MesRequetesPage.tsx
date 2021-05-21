import React, { useCallback } from "react";
import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "../../../../api/appels/requeteApi";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import { BoutonSignature } from "../../../common/widget/signature/BoutonSignature";
import { SortOrder } from "../../../common/widget/tableau/TableUtils";
import {
  NB_LIGNES_PAR_APPEL,
  TableauRece
} from "../../../common/widget/tableau/v1/TableauRece";
import { URL_MES_REQUETES_ID } from "../../../router/ReceUrls";
import {
  dateStatutColumnHeaders,
  requerantColumnHeaders,
  requeteColumnHeaders
} from "./EspaceDelivranceParams";
import { goToLinkRequete } from "./EspaceDelivranceUtils";
import { useRequeteApi } from "./hook/DonneesRequeteHook";
import "./scss/RequeteTableau.scss";

const columnsMesRequestes = [
  ...requeteColumnHeaders,
  ...requerantColumnHeaders,
  ...dateStatutColumnHeaders
];

interface MesRequetesPageProps {
  miseAJourCompteur: () => void;
  getUrlBack: (id: string, data: any[], urlWithParam: string) => void;
}

export const MesRequetesPage: React.FC<MesRequetesPageProps> = props => {
  const [
    linkParameters,
    setLinkParameters
  ] = React.useState<IQueryParametersPourRequetes>({
    statuts: [
      StatutRequete.ASigner,
      StatutRequete.ATraiterDemat,
      StatutRequete.AImprimer
    ],
    tri: "dateStatut",
    sens: "ASC",
    range: `0-${NB_LIGNES_PAR_APPEL}`
  });

  const {
    dataState = [],
    rowsNumberState = 0,
    nextDataLinkState = "",
    previousDataLinkState = ""
  } = useRequeteApi(linkParameters, TypeAppelRequete.MES_REQUETES);

  const goToLink = useCallback((link: string) => {
    const queryParametersPourRequetes = goToLinkRequete(link, "requetes");
    if (queryParametersPourRequetes) {
      setLinkParameters(queryParametersPourRequetes);
    }
  }, []);

  const handleChangeSort = useCallback((tri: string, sens: SortOrder) => {
    const queryParameters = {
      statuts: [
        StatutRequete.ASigner,
        StatutRequete.ATraiterDemat,
        StatutRequete.AImprimer
      ],
      tri,
      sens,
      range: `0-${NB_LIGNES_PAR_APPEL}`
    };

    setLinkParameters(queryParameters);
  }, []);

  /**
   * Test sur cette fonction trop compliqué et longue à faire par rapport à la valeur ajouté
   */
  /* istanbul ignore next */
  const handleReload = useCallback(() => {
    setLinkParameters({ ...linkParameters });
    if (props.miseAJourCompteur !== undefined) {
      props.miseAJourCompteur();
    }
  }, [linkParameters, props]);

  function onClickOnLine(identifiant: string, data: any[]) {
    props.getUrlBack(identifiant, data, URL_MES_REQUETES_ID);
  }

  return (
    <>
      <TableauRece
        idKey={"idRequete"}
        sortOrderByState={linkParameters.tri}
        sortOrderState={linkParameters.sens}
        onClickOnLine={onClickOnLine}
        columnHeaders={columnsMesRequestes}
        dataState={dataState}
        rowsNumberState={rowsNumberState}
        nextDataLinkState={nextDataLinkState}
        previousDataLinkState={previousDataLinkState}
        goToLink={goToLink}
        handleChangeSort={handleChangeSort}
        handleReload={handleReload}
      >
        <BoutonSignature libelle={"pages.delivrance.action.signature"} />
      </TableauRece>
      <BoutonRetour />
    </>
  );
};
