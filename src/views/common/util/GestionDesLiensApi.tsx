import { SortOrder } from "@widget/tableau/TableUtils";

export interface IParametresLienApi {
  tri: string;
  sens: SortOrder;
  range?: string;
}

export interface IParamsTableau {
  previousDataLinkState?: string;
  nextDataLinkState?: string;
  rowsNumberState?: number;
  minRangeState?: number;
  maxRangeState?: number;
}

export function parseLink(linkHeader: string) {
  let nextLink = "";
  let prevLink = "";
  if (linkHeader && linkHeader.indexOf(`rel="next"`) > 0) {
    nextLink = linkHeader
      .split(`;rel="next"`)[0]
      .replace("<", "")
      .replace(">", "");
    nextLink = `${nextLink}`;
  }
  if (linkHeader && linkHeader.indexOf(`rel="prev"`) > 0) {
    prevLink = linkHeader
      .replace(`<${nextLink}>;rel="next",`, "")
      .split(`;rel="prev"`)[0]
      .replace("<", "")
      .replace(">", "");
    prevLink = `${prevLink}`; // FIXME suppressin de ${api.url}:${api.ports} (à vérifier)
  }
  return { nextLink, prevLink };
}

const contentRange = "content-range";

export function getRowsNumber(result: any) {
  return result.headers[contentRange]
    ? +(result.headers[contentRange] as string).split("/")[1]
    : undefined;
}

export function getMinRange(result: any) {
  return getRange(result, 0);
}

export function getMaxRange(result: any) {
  return getRange(result, 1);
}

function getRange(result: any, nb: number) {
  return result.headers[contentRange]
    ? +(result.headers[contentRange] as string).split("/")[0].split("-")[nb]
    : undefined;
}

export function getParamsTableau(result: any): IParamsTableau {
  const { nextLink, prevLink } = parseLink(result.headers["link"]);
  return {
    previousDataLinkState: prevLink,
    nextDataLinkState: nextLink,
    rowsNumberState: getRowsNumber(result),
    minRangeState: getMinRange(result),
    maxRangeState: getMaxRange(result)
  };
}
