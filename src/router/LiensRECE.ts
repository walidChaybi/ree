import { To, generatePath } from "react-router";
import { FIN_URL_CONSULTATION, URL_ACCUEIL } from "./infoPages/InfoPagesBase";

type TAjoutParametre<TParam extends string> = TParam extends `${infer ParamOptionnel}?`
  ? { [Cle in ParamOptionnel]?: string }
  : { [Cle in TParam]: string };

type TExtraireAutreParametresLien<Uri extends string> = Uri extends `${string}/:${infer Param1}/${infer Reste}`
  ? TAjoutParametre<Param1> & TExtraireAutreParametresLien<Reste>
  : Uri extends `${string}/:${infer Param2}`
    ? TAjoutParametre<Param2>
    : {};

type TExtraireParametresLien<Uri extends string> = Uri extends `${string}/:${infer Param1}/${infer Reste}`
  ? TAjoutParametre<Param1> & TExtraireAutreParametresLien<Reste>
  : Uri extends `${string}/:${infer Param2}`
    ? TAjoutParametre<Param2>
    : string;

const LiensRECE = {
  genererLien: <TUrl extends string>(
    ...[url, parametres]: TExtraireParametresLien<TUrl> extends string
      ? [url: TUrl, parametres?: never]
      : [url: TUrl, parametres: TExtraireParametresLien<TUrl>]
  ) => {
    const urlLien = url.startsWith(URL_ACCUEIL) ? url : `${URL_ACCUEIL}${url}`;
    const lienGenere = `/${generatePath(urlLien, parametres).split("/").filter(Boolean).join("/")}`;

    return lienGenere === URL_ACCUEIL.slice(0, -1) ? URL_ACCUEIL : lienGenere;
  },

  retourArriere: (): To => ((window.history.state?.idx ?? 0) > 0 ? (-1 as To) : URL_ACCUEIL),

  estPageConsultation: (): boolean => window.location.pathname.endsWith(`/${FIN_URL_CONSULTATION}`)
} as const;

export default LiensRECE;
