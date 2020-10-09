export const contextApp = "/rece/rece-ui";
export const DeconnexionAppUrl = "/rece/Shibboleth.sso/Logout";

// Url de navigation dans l'application
export const SeparateurUrl = "/";
export const ctxSeparateurUrl = `${contextApp}/`;
export const AccueilUrl = "/accueil";
export const ctxAccueilUrl = `${contextApp}${AccueilUrl}`;
export const MesRequetesUrl = "/mesrequetes";
export const ctxMesRequetesUrl = `${contextApp}${MesRequetesUrl}`;
export const RequetesServiceUrl = "/requetesservice";
export const ctxRequetesServiceUrl = `${contextApp}${RequetesServiceUrl}`;
export const IdRequeteUrl = `${MesRequetesUrl}/:idRequete`;
export const ctxIdRequeteUrl = `${contextApp}${IdRequeteUrl}`;
export const IdRequeteServiceUrl = `${RequetesServiceUrl}/:idRequete`;
export const ctxIdRequeteServiceUrl = `${contextApp}${IdRequeteServiceUrl}`;

export const AppUrls = {
  contextApp,
  DeconnexionAppUrl,
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
  ctxIdRequeteServiceUrl,
};

// Url APIs
export const SecuriteUrl = "/utilisateurs/login";
export const RequetesUrl = "/requetes";
export const RequetesCountUrl = `${RequetesUrl}/count`;
export const ReponsesUrl = "/reponses";
export const DocumentsdelivresUrl = "/documentsdelivres";
export const UtilisateursUrl = "/utilisateurs";

export const ApiEndpoints = {
  RequetesUrl,
  RequetesCountUrl,
  RequetesServiceUrl: "/requetes/requetesService",
  UtilisateursUrl,
  DocumentsdelivresUrl,
  SecuriteUrl,
  ReponsesUrl,
};

/** Attention à l'usage, la construction d'URL dynamique passant par une function pose des problèmes d'anti pattern */
export function getAppUrl(path: string): string {
  return `${contextApp}${path}`;
}
