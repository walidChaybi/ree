import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { Text } from "../../common/widget/Text";
import { SortOrder } from "./tableau/TableUtils";
import classNames from "classnames";
import "../../../sass/_library.scss";
import "../requete/sass/RequeteTableau.scss";
import { IRequerantApi, IReponseApi } from "./DonneesRequeteHook";
import { ITitulaire } from "./visualisation/RequeteType";
import { NatureActe } from "../../../model/requete/NatureActe";
import { Canal } from "../../../model/Canal";

export type DataTable =
  | "idSagaDila"
  | "sousTypeRequete"
  | "provenance"
  | "natureActe"
  | "requerant"
  | "dateCreation"
  | "dateStatut"
  | "statut"
  | "prioriteRequete";

export interface IDataTable {
  idRequete: string;
  idSagaDila: number;
  sousTypeRequete: string;
  provenance: string;
  natureActe: NatureActe;
  dateCreation: string;
  dateStatut: string;
  statut: string;
  prioriteRequete: string;
  villeEvenement: string;
  paysEvenement: string;
  canal: Canal;
  requerant: IRequerantApi;
  titulaires: ITitulaire[];
  reponse: IReponseApi;
}

interface RequeteTableauHeaderCellProps {
  order: SortOrder;
  orderBy: DataTable;
  column: DataTable;
  sortHandler: (
    property: DataTable
  ) => (event: React.MouseEvent<unknown>) => void;
}

export const RequeteTableauHeaderCell: React.FC<RequeteTableauHeaderCellProps> = ({
  order,
  orderBy,
  column,
  sortHandler
}) => {
  const styles = classNames({
    OrderedHeaderCell: orderBy === column,
    tableauFontHeader: true
  });
  return (
    <TableCell
      align="center"
      sortDirection={orderBy === column ? order : false}
      className="ColonneTableauRequete"
    >
      <TableSortLabel
        className={styles}
        active={orderBy === column}
        direction={orderBy === column ? order : "asc"}
        onClick={sortHandler(column)}
      >
        <Text messageId={`pages.requetes.tableau.header.${column}`} />
      </TableSortLabel>
    </TableCell>
  );
};
