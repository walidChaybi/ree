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
import { NatureActe } from "../../../model/etatcivil/enum/NatureActe";
import { Canal } from "../../../model/Canal";
import { BoutonRetour } from "../../common/widget/navigation/BoutonRetour";
import "./sass/RequeteTableau.scss";
import { HeaderTableauRequete } from "../../../model/requete/HeaderTableauRequete";
import { MotifRequete } from "../../../model/requete/MotifRequete";
import { CanalProvenance } from "../../../model/requete/CanalProvenance";
import { SousTypeRequete } from "../../../model/requete/SousTypeRequete";
import { TypeRequete } from "../../../model/requete/TypeRequete";
import {
  IDocumentDelivre,
  ITitulaire,
  IPieceJustificative
} from "../../common/types/RequeteType";
import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "../../../api/appels/requeteApi";
import {
  goToLinkRequete,
  commonHeaders,
  getIconPrioriteRequete
} from "./espaceDelivranceUtils";
import { BoutonSignature } from "../../common/widget/signature/BoutonSignature";
import { URL_MES_REQUETES_ID } from "../../router/ReceUrls";

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
  ...commonHeaders,
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.PrioriteRequete],
    colLibelle: "pages.delivrance.mesRequetes.tableau.header.prioriteRequete",
    getIcon: getIconPrioriteRequete,
    align: "center"
  })
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
        onClickOnLine={onClickOnLine}
        sortOrderByState={linkParameters.tri}
        sortOrderState={linkParameters.sens}
        columnHeaders={columnsTableau}
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
