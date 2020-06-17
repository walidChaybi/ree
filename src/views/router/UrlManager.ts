export const contextApp = "/rece-ui";

export const SeparateurUrl = "/";
export const ctxSeparateurUrl = `${contextApp}/`;
export const AccueilUrl = "/accueil";
export const ctxAccueilUrl = `${contextApp}${AccueilUrl}`;
export const MesRequetesUrl = "/mesrequetes";
export const ctxMesRequetesUrl = `${contextApp}${MesRequetesUrl}`;
export const RequetesUrl = "/requetes";
export const IdRequeteUrl = `${MesRequetesUrl}/:idRequete`;
export const ctxIdRequeteUrl = `${contextApp}${IdRequeteUrl}`;

export const AppUrls = {
  SeparateurUrl: SeparateurUrl,
  ctxSeparateurUrl: ctxSeparateurUrl,
  AccueilUrl: AccueilUrl,
  ctxAccueilUrl: ctxAccueilUrl,
  MesRequetesUrl: MesRequetesUrl,
  ctxMesRequetesUrl: ctxMesRequetesUrl,
  IdRequeteUrl: IdRequeteUrl,
  ctxIdRequeteUrl: ctxIdRequeteUrl
};

/** Attention à l'usage, la construction d'URL dynamique passant par une function pose des problèmes d'anti pattern */
export function getAppUrl(path: string): string {
  return `/${contextApp}${path}`;
}

export const ApiEndpoints = {
  RequetesUrl: RequetesUrl
};
