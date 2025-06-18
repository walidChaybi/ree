export interface IParamsTableau {
  previousDataLinkState?: string;
  nextDataLinkState?: string;
  rowsNumberState?: number;
  minRangeState?: number;
  maxRangeState?: number;
}

export const PARAMS_TABLEAU_VIDE: IParamsTableau = {
  previousDataLinkState: "",
  nextDataLinkState: "",
  rowsNumberState: 0,
  minRangeState: 0,
  maxRangeState: 0
};

export interface IHeadersAvecParamsTableau {
  link?: string;
  "content-range"?: string;
}

export const getParamsTableauDepuisReponseApi = (result: any): IParamsTableau => getParamsTableauDepuisHeaders(result.headers);

export const getParamsTableauDepuisHeaders = (headers: IHeadersAvecParamsTableau): IParamsTableau => ({
  ...parseLink(headers.link),
  ...getRangeTableau(headers["content-range"]),
  rowsNumberState: getRowsNumber(headers["content-range"])
});

const parseLink = (linkHeader: string | undefined): Pick<IParamsTableau, "previousDataLinkState" | "nextDataLinkState"> => {
  const nextLink = linkHeader?.includes(`rel="next"`) ? linkHeader.split(`;rel="next"`)[0].replace("<", "").replace(">", "") : "";
  const prevLink = linkHeader?.includes(`rel="prev"`)
    ? linkHeader.replace(`<${nextLink}>;rel="next",`, "").split(`;rel="prev"`)[0].replace("<", "").replace(">", "")
    : "";
  return { nextDataLinkState: nextLink, previousDataLinkState: prevLink };
};

const getRowsNumber = (contentRange?: string): number | undefined => (contentRange ? +contentRange?.split("/")[1] : undefined);

const getRangeTableau = (contentRange?: string): Pick<IParamsTableau, "minRangeState" | "maxRangeState"> => {
  if (!contentRange) return { minRangeState: undefined, maxRangeState: undefined };

  const ranges = contentRange.split("/")[0].split("-");
  return { minRangeState: +ranges[0], maxRangeState: +ranges[1] };
};
