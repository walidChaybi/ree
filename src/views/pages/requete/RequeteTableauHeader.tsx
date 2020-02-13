import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  DataTable,
  RequeteTableauHeaderCell
} from "./RequeteTableauHeaderCell";
import { SortOrder } from "./tableau/TableUtils";

export interface RequeteTableauHeaderProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: DataTable
  ) => void;
  order: SortOrder;
  orderBy: DataTable;
}

export const RequeteTableauHeader: React.FC<RequeteTableauHeaderProps> = props => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: DataTable) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <RequeteTableauHeaderCell
          column="identifiant"
          order={order}
          orderBy={orderBy}
          sortHandler={createSortHandler}
        />
        <RequeteTableauHeaderCell
          column="sousTypeRequete"
          order={order}
          orderBy={orderBy}
          sortHandler={createSortHandler}
        />
        <RequeteTableauHeaderCell
          column="canalProvenance"
          order={order}
          orderBy={orderBy}
          sortHandler={createSortHandler}
        />
        <RequeteTableauHeaderCell
          column="natureActe"
          order={order}
          orderBy={orderBy}
          sortHandler={createSortHandler}
        />
        <RequeteTableauHeaderCell
          column="requerant"
          order={order}
          orderBy={orderBy}
          sortHandler={createSortHandler}
        />
        <RequeteTableauHeaderCell
          column="dateCreation"
          order={order}
          orderBy={orderBy}
          sortHandler={createSortHandler}
        />
        <RequeteTableauHeaderCell
          column="dateStatut"
          order={order}
          orderBy={orderBy}
          sortHandler={createSortHandler}
        />
        <RequeteTableauHeaderCell
          column="statutRequete"
          order={order}
          orderBy={orderBy}
          sortHandler={createSortHandler}
        />
        <RequeteTableauHeaderCell
          column="prioriteRequete"
          order={order}
          orderBy={orderBy}
          sortHandler={createSortHandler}
        />
      </TableRow>
    </TableHead>
  );
};
