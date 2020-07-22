import React from "react";

import { Text } from "../../common/widget/Text";
import {
  TableauRece,
  TableauTypeColumn,
} from "../../common/widget/tableau/TableauRece";
import {
  useRequeteApi,
  IRequerantApi,
  IReponseApi,
  IQueryParametersPourRequetes,
} from "./DonneesRequeteHook";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import { SortOrder } from "../../common/widget/tableau/TableUtils";
import { NatureActe } from "../../../model/requete/NatureActe";
import { Canal } from "../../../model/Canal";
import { IPieceJustificative } from "./visualisation/RequeteType";
import { ITitulaire } from "./visualisation/RequeteType";
import { AppUrls } from "../../router/UrlManager";
import { Box } from "@material-ui/core";
import { BoutonRetour } from "../../common/widget/BoutonRetour";
import "./sass/RequeteTableau.scss";
import {
  getMessagePrioriteDeLaRequete,
  prioriteDeLaRequete,
} from "./RequetesUtils";
import LabelIcon from "@material-ui/icons/Label";
import { HeaderTableauRequete } from "../../../model/requete/HeaderTableauRequete";
import { Motif } from "../../../model/requete/Motif";
import { CanalProvenance } from "../../../model/requete/CanalProvenance";
import { SousTypeRequete } from "../../../model/requete/SousTypeRequete";
import { TypeRequete } from "../../../model/requete/TypeRequete";

export interface IDataTable {
  idRequete: string;
  idSagaDila: number;
  idRequeteInitiale: number;
  sousTypeRequete: SousTypeRequete;
  typeRequete: TypeRequete;
  provenance: CanalProvenance;
  natureActe: NatureActe;
  dateCreation: string;
  dateDerniereMaj: string;
  dateStatut: string;
  statut: StatutRequete;
  prioriteRequete: string;
  villeEvenement: string;
  paysEvenement: string;
  canal: Canal;
  motif: Motif;
  requerant: IRequerantApi;
  titulaires: ITitulaire[];
  piecesJustificatives: IPieceJustificative[];
  nomOec: string;
  typeActe: string;
  reponse?: IReponseApi;
  anneeEvenement: number;
  jourEvenement: number;
  moisEvenement: number;
  nbExemplaire: number;
}

const columnsTableau = [
  new TableauTypeColumn(
    [HeaderTableauRequete.IdSagaDila],
    false,
    "pages.delivrance.mesRequetes.tableau.header"
  ),
  new TableauTypeColumn(
    [HeaderTableauRequete.SousTypeRequete],
    true,
    "pages.delivrance.mesRequetes.tableau.header",
    "referentiel.sousTypeRequete"
  ),
  new TableauTypeColumn(
    [HeaderTableauRequete.Canal],
    true,
    "pages.delivrance.mesRequetes.tableau.header",
    "referentiel.canal"
  ),
  new TableauTypeColumn(
    [HeaderTableauRequete.NatureActe],
    true,
    "pages.delivrance.mesRequetes.tableau.header",
    "referentiel.natureActe"
  ),
  new TableauTypeColumn(
    [HeaderTableauRequete.Requerant, HeaderTableauRequete.NomOuRaisonSociale],
    false,
    "pages.delivrance.mesRequetes.tableau.header"
  ),
  new TableauTypeColumn(
    [HeaderTableauRequete.DateCreation],
    false,
    "pages.delivrance.mesRequetes.tableau.header"
  ),
  new TableauTypeColumn(
    [HeaderTableauRequete.DateStatut],
    false,
    "pages.delivrance.mesRequetes.tableau.header"
  ),
  new TableauTypeColumn(
    [HeaderTableauRequete.Statut],
    true,
    "pages.delivrance.mesRequetes.tableau.header",
    "referentiel.statutRequete"
  ),
  new TableauTypeColumn(
    [HeaderTableauRequete.PrioriteRequete],
    false,
    "pages.delivrance.mesRequetes.tableau.header",
    "",
    getIconPrioriteMesRequetes
  ),
];

function getIconPrioriteMesRequetes(row: IDataTable): JSX.Element {
  return (
    <Box
      title={getMessagePrioriteDeLaRequete(row.dateStatut)}
      aria-label={getMessagePrioriteDeLaRequete(row.dateStatut)}
      aria-hidden={true}
    >
      <LabelIcon className={prioriteDeLaRequete(row.dateStatut)} />
    </Box>
  );
}

export const MesRequetesPage: React.FC = () => {
  const [sortOrderState, setSortOrderState] = React.useState<SortOrder>("ASC");
  const [sortOrderByState, setSortOrderByState] = React.useState<string>(
    "dateStatut"
  );

  // TODO : unmock nomOec, prenomOec
  const [linkParameters, setLinkParameters] = React.useState<
    IQueryParametersPourRequetes
  >({
    nomOec: "CAFFERINI",
    prenomOec: "Lionel",
    statut: StatutRequete.ASigner,
    tri: sortOrderByState,
    sens: sortOrderState,
  });

  const {
    dataState = [],
    rowsNumberState = 0,
    nextDataLinkState = "",
  } = useRequeteApi(linkParameters);

  function goToLink(link: string) {
    let queryParameters: IQueryParametersPourRequetes;
    if (link.indexOf("range") > 0) {
      let params = [];
      params = link.split("requetes?")[1].split("&");
      queryParameters = {
        nomOec: params[0].split("=")[1],
        prenomOec: params[1].split("=")[1],
        statut: params[2].split("=")[1] as StatutRequete,
        tri: params[3].split("=")[1],
        sens: params[4].split("=")[1] as SortOrder,
        range: params[5].split("=")[1],
      };
      setLinkParameters(queryParameters);
    }
  }

  return (
    <>
      <h3 id="TableauRequetesTitre" hidden={true}>
        <Text messageId="pages.delivrance.mesRequetes.tableau.titre" />
      </h3>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={getUrlBack}
        sortOrderByState={sortOrderByState}
        sortOrderState={sortOrderState}
        columnHeaders={columnsTableau}
        dataState={dataState}
        rowsNumberState={rowsNumberState}
        nextDataLinkState={nextDataLinkState}
        goToLink={goToLink}
        setSortOrderState={setSortOrderState}
        setSortOrderByState={setSortOrderByState}
      />
      <BoutonRetour />
    </>
  );
};

function getUrlBack(identifiantRequete: string): string {
  return `${AppUrls.ctxMesRequetesUrl}/${identifiantRequete}`;
}
