import DateUtils, { FormatDate } from "@util/DateUtils";
import { Dayjs } from "dayjs";
import { MdReport } from "react-icons/md";

export type SortOrder = "ASC" | "DESC";

type DayJsInput = string | number | Date | Dayjs;

const descendingDateComparator = <T extends unknown>(a: T, b: T, orderBy: keyof T) => {
  if (
    DateUtils.dayjsAvecFormat(b[orderBy] as DayJsInput, FormatDate.DDMMYYYY).isBefore(
      DateUtils.dayjsAvecFormat(a[orderBy] as DayJsInput, FormatDate.DDMMYYYY)
    )
  ) {
    return -1;
  }
  if (
    DateUtils.dayjsAvecFormat(b[orderBy] as DayJsInput, FormatDate.DDMMYYYY).isAfter(
      DateUtils.dayjsAvecFormat(a[orderBy] as DayJsInput, FormatDate.DDMMYYYY)
    )
  ) {
    return 1;
  }
  return 0;
};

const descendingComparator = <T extends unknown>(a: T, b: T, orderBy: keyof T) => {
  const isDate =
    DateUtils.dayjsAvecFormat(a[orderBy] as DayJsInput, FormatDate.DDMMYYYY).isValid() &&
    DateUtils.dayjsAvecFormat(b[orderBy] as DayJsInput, FormatDate.DDMMYYYY).isValid();
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
};

const getComparator = <Key extends keyof any>(
  order: SortOrder,
  orderBy: Key
): ((a: { [key in Key]: number | Date | string }, b: { [key in Key]: number | Date | string }) => number) => {
  return order === "DESC" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = <T extends unknown>(array: T[], comparator: (a: T, b: T) => number): T[] => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return order === 0 ? a[1] - b[1] : order;
  });
  return stabilizedThis.map(el => el[0]);
};

export const processDataStorting = <Key extends keyof any>(array: any[], sortOrder: SortOrder, sortOrderBy: Key): any[] => {
  return stableSort(array, getComparator<Key>(sortOrder, sortOrderBy));
};

export const getPaginatedData = <T extends unknown>(
  data: T[] | undefined, // Dans les cas de "timeout de connexion arobas" data est "undefined"
  currentPage: number,
  rowsPerPage: number,
  numberOfPagesPerRequetes: number
): T[] => {
  return (
    data?.slice(
      (currentPage % numberOfPagesPerRequetes) * rowsPerPage,
      (currentPage % numberOfPagesPerRequetes) * rowsPerPage + rowsPerPage
    ) || []
  );
};

/**
 * Regarde si la page d'après qui va s'afficher est en dehors des données stockées actuellement dans props.dataState
 * Si c'est le cas il faudra refaire un appel serveur
 */
export const laProchainePageEstEnDehors = (
  newPage: number,
  pageState: number,
  nbLignesParPage: number,
  nbLignesParAppel: number,
  multiplicateur: number
) => {
  return (
    newPage > pageState &&
    newPage * nbLignesParPage >= nbLignesParAppel * multiplicateur &&
    pageState * nbLignesParPage <= nbLignesParAppel * multiplicateur
  );
};

/**
 * Regarde si la page d'avant qui va s'afficher est en dehors des données stockées actuellement dans props.dataState
 * Si c'est le cas il faudra refaire un appel serveur
 */
export const laPageDAvantEstEnDehors = (
  pageState: number,
  newPage: number,
  nbLignesParPage: number,
  nbLignesParAppel: number,
  multiplicateur: number
) => {
  return (
    pageState > 0 &&
    newPage < pageState &&
    // La numérotation des pages commence à zéro donc c'est newPage+1
    (newPage + 1) * nbLignesParPage <= nbLignesParAppel * (multiplicateur - 1)
  );
};

// TOREFACTO
export const getSortOrder = (columnKey: string, sortOrderBy: string, sortOrder: SortOrder): SortOrder => {
  let result: SortOrder = "ASC";
  if (sortOrderBy !== columnKey) {
    result = "ASC";
  } else if (sortOrder === "ASC") {
    result = "DESC";
  } else if (sortOrder === "DESC") {
    result = "ASC";
  }
  return result;
};

export const getLigneTableauVide = (message: string): JSX.Element => {
  return (
    <>
      <MdReport
        className="text-2xl"
        aria-hidden
      />
      <div>{message}</div>
    </>
  );
};

export const getItemAriaLabel = (type: string, nombreResultats?: number): string => {
  switch (type) {
    case "first":
      return `Retourner au début de la précédente plage de ${nombreResultats} résultats`;
    case "previous":
      return "Page précédente";
    case "next":
      return "Page suivante";
    case "last":
      return `Avancer au début de la prochaine plage de ${nombreResultats} résultats`;
    default:
      return "";
  }
};
