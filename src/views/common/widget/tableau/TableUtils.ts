import moment from "moment";
import { FormatDate } from "../../util/DateUtils";

export type SortOrder = "ASC" | "DESC";

export function descendingDateComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (
    moment(b[orderBy], FormatDate.DDMMYYYY).isBefore(
      moment(a[orderBy], FormatDate.DDMMYYYY)
    )
  ) {
    return -1;
  }
  if (
    moment(b[orderBy], FormatDate.DDMMYYYY).isAfter(
      moment(a[orderBy], FormatDate.DDMMYYYY)
    )
  ) {
    return 1;
  }
  return 0;
}

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const isDate =
    moment(a[orderBy], FormatDate.DDMMYYYY).isValid() &&
    moment(b[orderBy], FormatDate.DDMMYYYY).isValid();
  if (isDate) {
    return descendingDateComparator(a, b, orderBy);
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
}

export function getComparator<Key extends keyof any>(
  order: SortOrder,
  orderBy: Key
): (
  a: { [key in Key]: number | Date | string },
  b: { [key in Key]: number | Date | string }
) => number {
  return order === "DESC"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(
  array: T[],
  comparator: (a: T, b: T) => number
): T[] {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function processDataStorting<Key extends keyof any>(
  array: any[],
  sortOrder: SortOrder,
  sortOrderBy: Key
): any[] {
  const dataTriee = stableSort(
    array,
    getComparator<Key>(sortOrder, sortOrderBy)
  );
  return dataTriee;
}

export function getPaginatedData<T>(
  data: T[],
  currentPage: number,
  rowsPerPage: number,
  numberOfPagesPerRequetes: number
): T[] {
  return data.slice(
    (currentPage % numberOfPagesPerRequetes) * rowsPerPage,
    (currentPage % numberOfPagesPerRequetes) * rowsPerPage + rowsPerPage
  );
}
