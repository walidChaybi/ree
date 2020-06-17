const name = "/rece-ui";

export const SeparateurUrl = "/";
export const ctxSeparateurUrl = `${name}/`;
export const AccueilUrl = "/accueil";
export const MesRequetesUrl = "/mesrequetes";
export const RequetesUrl = "/requetes";
export const IdRequeteUrl = `${MesRequetesUrl}/:idRequete`;

export const AppUrls = {
  SeparateurUrl: SeparateurUrl,
  ctxSeparateurUrl: ctxSeparateurUrl,
  AccueilUrl: AccueilUrl,
  MesRequetesUrl: MesRequetesUrl,
  IdRequeteUrl: IdRequeteUrl
};

export function getAppUrl(path: string): string {
  return `/${name}${path}`;
}

export const ApiEndpoints = {
  RequetesUrl: RequetesUrl
};
