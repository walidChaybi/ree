import { SortOrder } from "../widget/tableau/TableUtils";

export interface IParametresLienApi {
  tri: string;
  sens: SortOrder;
  range?: string;
}

export function parseLink(linkHeader: string) {
  let nextLink;
  let prevLink;
  if (linkHeader.indexOf(`rel="next"`) > 0) {
    nextLink = linkHeader
      .split(`;rel="next"`)[0]
      .replace("<", "")
      .replace(">", "");
    nextLink = `${nextLink}`;
  }
  if (linkHeader.indexOf(`rel="prev"`) > 0) {
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
  return +(result.headers[contentRange] as string).split("/")[1];
}

export function getMinRange(result: any) {
  return +(result.headers[contentRange] as string).split("/")[0].split("-")[0];
}

export function getMaxRange(result: any) {
  return +(result.headers[contentRange] as string).split("/")[0].split("-")[1];
}
