const name = "/rece-ui";

export const SeparateurUrl = "/";
export const AccueilUrl = "/accueil";
export const MesRequetesUrl = "/mesrequetes";
export const RequetesUrl = "/requetes";
export const IdRequeteUrl = `${MesRequetesUrl}/:idRequete`;

export const AppUrls = {
  SeparateurUrl:
    process.env.NODE_ENV === "production"
      ? `${name}${SeparateurUrl}`
      : SeparateurUrl,
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
