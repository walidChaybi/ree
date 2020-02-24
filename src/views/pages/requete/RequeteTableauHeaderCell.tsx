import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { Text } from "../../common/widget/Text";
import { SortOrder } from "./tableau/TableUtils";
import "../../../sass/_library.scss";
import "../requete/sass/RequeteTableau.scss";

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
  idSagaDila: number;
  sousTypeRequete: string;
  provenance: string;
  natureActe: string;
  requerant: string;
  dateCreation: string;
  dateStatut: string;
  statut: string;
  prioriteRequete: string;
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
  return (
    <TableCell
      align="center"
      sortDirection={orderBy === column ? order : false}
      className="ColonneTableauRequete"
    >
      <TableSortLabel
        className="tableauFontHeader"
        active={orderBy === column}
        direction={orderBy === column ? order : "asc"}
        onClick={sortHandler(column)}
      >
        <Text messageId={`pages.requetes.tableau.header.${column}`} />
      </TableSortLabel>
    </TableCell>
  );
};
