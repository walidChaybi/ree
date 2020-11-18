import React, { useCallback } from "react";
import {
  TableauRece,
  TableauTypeColumn,
  NB_LIGNES_PAR_APPEL
} from "../../common/widget/tableau/TableauRece";
import {
  useRequeteApi,
  IRequerantApi,
  IReponseApi
} from "./hook/DonneesRequeteHook";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import { SortOrder } from "../../common/widget/tableau/TableUtils";
import { NatureActe } from "../../../model/requete/NatureActe";
import { Canal } from "../../../model/Canal";
import { AppUrls } from "../../router/UrlManager";
import { Box } from "@material-ui/core";
import { BoutonRetour } from "../../common/widget/BoutonRetour";
import "./sass/RequeteTableau.scss";
import LabelIcon from "@material-ui/icons/Label";
import { HeaderTableauRequete } from "../../../model/requete/HeaderTableauRequete";
import { MotifRequete } from "../../../model/requete/MotifRequete";
import { CanalProvenance } from "../../../model/requete/CanalProvenance";
import { SousTypeRequete } from "../../../model/requete/SousTypeRequete";
import { TypeRequete } from "../../../model/requete/TypeRequete";
import { IOfficierSSOApi } from "../../core/login/LoginHook";
import {
  IDocumentDelivre,
  ITitulaire,
  IPieceJustificative
} from "../../common/types/RequeteType";
import {
  getMessagePrioriteDeLaRequete,
  prioriteDeLaRequete,
  indexParamsReq
} from "../../common/util/RequetesUtils";
import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "../../../api/appels/requeteApi";

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
const style = {
  width: "7.6em"
};
const columnsTableau = [
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.IdSagaDila],
    colLibelle: "pages.delivrance.mesRequetes.tableau.header.idSagaDila",
    align: "center",
    style
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.SousTypeRequete],
    colLibelle: "pages.delivrance.mesRequetes.tableau.header.sousTypeRequete",
    getTextRefentiel: true,
    rowLibelle: "referentiel.sousTypeRequete.court",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Canal],
    colLibelle: "pages.delivrance.mesRequetes.tableau.header.canal",
    getTextRefentiel: true,
    rowLibelle: "referentiel.canal",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.NatureActe],
    colLibelle: "pages.delivrance.mesRequetes.tableau.header.natureActe",
    getTextRefentiel: true,
    rowLibelle: "referentiel.natureActe",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [
      HeaderTableauRequete.Requerant,
      HeaderTableauRequete.LibelleRequerant
    ],
    colLibelle: "pages.delivrance.mesRequetes.tableau.header.requerant",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.DateCreation],
    colLibelle: "pages.delivrance.mesRequetes.tableau.header.dateCreation",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.DateStatut],
    colLibelle: "pages.delivrance.mesRequetes.tableau.header.dateStatut",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.Statut],
    colLibelle: "pages.delivrance.mesRequetes.tableau.header.statut",
    getTextRefentiel: true,

    rowLibelle: "referentiel.statutRequete",
    align: "center"
  }),
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.PrioriteRequete],
    colLibelle: "pages.delivrance.mesRequetes.tableau.header.prioriteRequete",
    getIcon: getIconPrioriteMesRequetes,
    align: "center"
  })
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
  officier?: IOfficierSSOApi;
}

export const MesRequetesDelivrancePage: React.FC<MesRequetesPageProps> = props => {
  const [linkParameters, setLinkParameters] = React.useState<
    IQueryParametersPourRequetes
  >({
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
  } = useRequeteApi(
    linkParameters,
    TypeAppelRequete.MES_REQUETES,
    props.officier
  );

  const goToLink = useCallback((link: string) => {
    let queryParameters: IQueryParametersPourRequetes;
    if (link.indexOf("range") > 0) {
      let params = [];
      params = link.split("requetes?")[1].split("&");
      queryParameters = {
        statuts: [params[indexParamsReq.Statut].split("=")[1] as StatutRequete],
        tri: params[indexParamsReq.Tri].split("=")[1],
        sens: params[indexParamsReq.Sens].split("=")[1] as SortOrder,
        range: params[indexParamsReq.Range].split("=")[1]
      };
      setLinkParameters(queryParameters);
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

  const handleReload = useCallback(() => {
    setLinkParameters({ ...linkParameters });
  }, [linkParameters]);

  return (
    <>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={getUrlBack}
        sortOrderByState={linkParameters.tri}
        sortOrderState={linkParameters.sens}
        columnHeaders={columnsTableau}
        dataState={dataState}
        rowsNumberState={rowsNumberState}
        nextDataLinkState={nextDataLinkState}
        previousDataLinkState={previousDataLinkState}
        goToLink={goToLink}
        canUseSignature={true}
        handleChangeSort={handleChangeSort}
        handleReload={handleReload}
      />
      <BoutonRetour />
    </>
  );
};

function getUrlBack(identifiantRequete: string): string {
  return `${AppUrls.ctxMesRequetesUrl}/${identifiantRequete}`;
}
