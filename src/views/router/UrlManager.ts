export const contextApp = "/rece-ui";

export const SeparateurUrl = "/";
export const ctxSeparateurUrl = `${contextApp}/`;
export const AccueilUrl = "/accueil";
export const ctxAccueilUrl = `${contextApp}${AccueilUrl}`;
export const MesRequetesUrl = "/mesrequetes";
export const ctxMesRequetesUrl = `${contextApp}${MesRequetesUrl}`;
export const RequetesServiceUrl = "/requetesservice";
export const ctxRequetesServiceUrl = `${contextApp}${RequetesServiceUrl}`;
export const RequetesUrl = "/requetes";
export const UtilisateursUrl = "/utilisateurs";
export const IdRequeteUrl = `${MesRequetesUrl}/:idRequete`;
export const ctxIdRequeteUrl = `${contextApp}${IdRequeteUrl}`;
export const IdRequeteServiceUrl = `${RequetesServiceUrl}/:idRequete`;
export const ctxIdRequeteServiceUrl = `${contextApp}${IdRequeteServiceUrl}`;
export const SecuriteUrl = "utilisateurs/login";

export const DocumentsdelivresUrl = "/documentsdelivres";

export const AppUrls = {
  contextApp,
  SeparateurUrl,
  ctxSeparateurUrl,
  AccueilUrl,
  ctxAccueilUrl,
  MesRequetesUrl,
  ctxMesRequetesUrl,
  RequetesServiceUrl,
  ctxRequetesServiceUrl,
  IdRequeteUrl,
  ctxIdRequeteUrl,
  IdRequeteServiceUrl,
  ctxIdRequeteServiceUrl
};

/** Attention à l'usage, la construction d'URL dynamique passant par une function pose des problèmes d'anti pattern */
export function getAppUrl(path: string): string {
  return `${contextApp}${path}`;
}

export const ApiEndpoints = {
  RequetesUrl,
  RequetesServiceUrl: "/requetes/requetesService",
  UtilisateursUrl,
  DocumentsdelivresUrl,
  SecuriteUrl
};
