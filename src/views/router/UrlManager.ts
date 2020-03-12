import { name } from "../../../package.json";

export const SeparateurUrl = "/";
export const AccueilUrl = "/accueil";
export const MesRequetesUrl = "/mesrequetes";
export const IdRequeteUrl = "/mesrequetes/:idRequete";

export const AppUrls = {
  SeparateurUrl: SeparateurUrl,
  AccueilUrl: AccueilUrl,
  MesRequetesUrl: MesRequetesUrl,
  IdRequeteUrl: IdRequeteUrl
};

export function getAppUrl(path: string): string {
  return `/${name}${path}`;
}
