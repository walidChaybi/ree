import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { Text } from "../../common/widget/Text";

export type SortOrder = "asc" | "desc";

export type DataTable =
  | "identifiant"
  | "sousTypeRequete"
  | "canalProvenance"
  | "natureActe"
  | "requerant"
  | "dateCreation"
  | "dateStatut"
  | "statutRequete"
  | "prioriteRequete";

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
    >
      <TableSortLabel
        active={orderBy === column}
        direction={orderBy === column ? order : "asc"}
        onClick={sortHandler(column)}
      >
        <Text messageId={`pages.requetes.tableau.header.${column}`} />
      </TableSortLabel>
    </TableCell>
  );
};
