import React from "react";

import {
  TableauRece,
  TableauTypeColumn,
} from "../../common/widget/tableau/TableauRece";
import {
  useRequeteApi,
  IRequerantApi,
  IReponseApi,
  IQueryParametersPourRequetes,
  TypeAppelRequete,
} from "./DonneesRequeteHook";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import { SortOrder } from "../../common/widget/tableau/TableUtils";
import { NatureActe } from "../../../model/requete/NatureActe";
import { Canal } from "../../../model/Canal";
import {
  IPieceJustificative,
  ITitulaire,
  IDocumentDelivre,
} from "./visualisation/RequeteType";
import { AppUrls } from "../../router/UrlManager";
import { Box } from "@material-ui/core";
import { BoutonRetour } from "../../common/widget/BoutonRetour";
import "./sass/RequeteTableau.scss";
import {
  getMessagePrioriteDeLaRequete,
  prioriteDeLaRequete,
  tableauHeader,
  indexParamsReq,
} from "./RequetesUtils";
import LabelIcon from "@material-ui/icons/Label";
import { HeaderTableauRequete } from "../../../model/requete/HeaderTableauRequete";
import { MotifRequete } from "../../../model/requete/MotifRequete";
import { CanalProvenance } from "../../../model/requete/CanalProvenance";
import { SousTypeRequete } from "../../../model/requete/SousTypeRequete";
import { TypeRequete } from "../../../model/requete/TypeRequete";
import { IUtilisateurSSOApi } from "../../core/LoginHook";

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
  motifRequete: MotifRequete;
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
  documentsDelivres: IDocumentDelivre[];
}

const columnsTableau = [
  new TableauTypeColumn(
    [HeaderTableauRequete.IdSagaDila],
    false,
    tableauHeader
  ),
  new TableauTypeColumn(
    [HeaderTableauRequete.SousTypeRequete],
    true,
    tableauHeader,
    "referentiel.sousTypeRequete.court"
  ),
  new TableauTypeColumn(
    [HeaderTableauRequete.Canal],
    true,
    tableauHeader,
    "referentiel.canal"
  ),
  new TableauTypeColumn(
    [HeaderTableauRequete.NatureActe],
    true,
    tableauHeader,
    "referentiel.natureActe"
  ),
  new TableauTypeColumn(
    [HeaderTableauRequete.Requerant, HeaderTableauRequete.LibelleRequerant],
    false,
    tableauHeader
  ),
  new TableauTypeColumn(
    [HeaderTableauRequete.DateCreation],
    false,
    tableauHeader
  ),
  new TableauTypeColumn(
    [HeaderTableauRequete.DateStatut],
    false,
    tableauHeader
  ),
  new TableauTypeColumn(
    [HeaderTableauRequete.Statut],
    true,
    tableauHeader,
    "referentiel.statutRequete"
  ),
  new TableauTypeColumn(
    [HeaderTableauRequete.PrioriteRequete],
    false,
    tableauHeader,
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
interface MesRequetesPageProps {
  officier?: IUtilisateurSSOApi;
}

export const MesRequetesPage: React.FC<MesRequetesPageProps> = (props) => {
  const [sortOrderState, setSortOrderState] = React.useState<SortOrder>("ASC");
  const [sortOrderByState, setSortOrderByState] = React.useState<string>(
    "dateStatut"
  );

  const [linkParameters, setLinkParameters] = React.useState<
    IQueryParametersPourRequetes
  >({
    statut: StatutRequete.ASigner,
    tri: sortOrderByState,
    sens: sortOrderState,
  });

  const {
    dataState = [],
    rowsNumberState = 0,
    nextDataLinkState = "",
  } = useRequeteApi(
    linkParameters,
    TypeAppelRequete.MES_REQUETES,
    props.officier
  );

  function goToLink(link: string) {
    let queryParameters: IQueryParametersPourRequetes;
    if (link.indexOf("range") > 0) {
      let params = [];
      params = link.split("requetes?")[1].split("&");
      queryParameters = {
        statut: params[indexParamsReq.Statut].split("=")[1] as StatutRequete,
        tri: params[indexParamsReq.Tri].split("=")[1],
        sens: params[indexParamsReq.Sens].split("=")[1] as SortOrder,
        range: params[indexParamsReq.Range].split("=")[1],
      };
      setLinkParameters(queryParameters);
    }
  }

  return (
    <>
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
