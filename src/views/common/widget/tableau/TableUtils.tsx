import ReportIcon from "@mui/icons-material/Report";
import { FormatDate } from "@util/DateUtils";
import { getLibelle } from "@util/Utils";
import moment from "moment";

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
    return order === 0 ? a[1] - b[1] : order;
  });
  return stabilizedThis.map(el => el[0]);
}

export function processDataStorting<Key extends keyof any>(
  array: any[],
  sortOrder: SortOrder,
  sortOrderBy: Key
): any[] {
  return stableSort(array, getComparator<Key>(sortOrder, sortOrderBy));
}

export function getPaginatedData<T>(
  data: T[] | undefined, // Dans les cas de "timeout de connexion arobas" data est "undefined"
  currentPage: number,
  rowsPerPage: number,
  numberOfPagesPerRequetes: number
): T[] {
  return (
    data?.slice(
      (currentPage % numberOfPagesPerRequetes) * rowsPerPage,
      (currentPage % numberOfPagesPerRequetes) * rowsPerPage + rowsPerPage
    ) || []
  );
}

/**
 * Regarde si la page d'après qui va s'afficher est en dehors des données stockée actuellement dans props.dataState
 * Si c'est le cas il faudra refaire un appel serveur
 */
export function laProchainePageEstEnDehors(
  newPage: number,
  pageState: number,
  nbLignesParPage: number,
  nbLignesParAppel: number,
  multiplicateur: number
) {
  return (
    newPage > pageState &&
    newPage * nbLignesParPage >= nbLignesParAppel * multiplicateur &&
    !(pageState * nbLignesParPage > nbLignesParAppel * multiplicateur)
  );
}

/**
 * Regarde si la page d'avant qui va s'afficher est en dehors des données stockée actuellement dans props.dataState
 * Si c'est le cas il faudra refaire un appel serveur
 */
export function laPageDAvantEstEnDehors(
  pageState: number,
  newPage: number,
  nbLignesParPage: number,
  nbLignesParAppel: number,
  multiplicateur: number
) {
  return (
    pageState > 0 &&
    newPage < pageState &&
    // La numérotation des pages commence à zéro donc c'est newPage+1 qu'il faut tester (= pageState car newPage < pageState)
    pageState * nbLignesParPage <= nbLignesParAppel * (multiplicateur - 1)
  );
}

export function getSortOrder(
  columnKey: string,
  sortOrderBy: string,
  sortOrder: SortOrder
): SortOrder {
  let result: SortOrder = "ASC";
  if (sortOrderBy !== columnKey) {
    result = "ASC";
  } else if (sortOrder === "ASC") {
    result = "DESC";
  } else if (sortOrder === "DESC") {
    result = "ASC";
  }
  return result;
}

export function getLigneTableauVide(message: string): JSX.Element {
  return (
    <>
      <ReportIcon />
      <div>{getLibelle(message)}</div>
    </>
  );
}

export const getItemAriaLabel = (
  type: string,
  nombreResultats?: number
): string => {
  let ariaLabel = "";
  switch (type) {
    case "first":
      ariaLabel = `Rechercher les ${nombreResultats} résultats précédents`;
      break;
    case "previous":
      ariaLabel = "Page précédente";
      break;
    case "next":
      ariaLabel = "Page suivante";
      break;
    case "last":
      ariaLabel = `Rechercher les ${nombreResultats} résultats suivants`;
      break;
    default:
      ariaLabel = "";
  }
  return ariaLabel;
};
