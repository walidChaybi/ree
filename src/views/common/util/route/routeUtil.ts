import { UUID } from "../../../../ressources/Regex";

export const URL_SEPARATEUR = "/";

// Fontions utilitaires de résolution d'url
export const urlWithParamPatern = /^(.+)\/:[^/]+$/;
/**
 * Remplace le paramètre dans une url, exemple:
 * /xxx/yyy/zzz/:id => /xxx/yyy/zzz/123456
 * @param path
 * @param param
 */
export function getUrlWithParam(path: string, param: string) {
  return path.replace(urlWithParamPatern, `$1/${param}`);
}

export function isPathElemId(elem: string): boolean {
  return !isNaN(Number(elem)) || UUID.test(elem);
}

export function isLastPathElemIsId(url: string): boolean {
  return Boolean(getUrlParamId(url));
}

/**
 * Renvoie une url sans les derniers éléments si ils sont des ID (UUID ou un nombre)
 */
export function getUrlWithoutIdParam(url: string): string {
  let validUrl = cleanUrl(url);
  while (isLastPathElemIsId(validUrl)) {
    validUrl = validUrl.substring(0, validUrl.lastIndexOf(URL_SEPARATEUR));
  }
  return validUrl;
}

export function getUrlParamId(url: string): string | undefined {
  const lastPathElem = getLastPathElem(url);
  return isPathElemId(lastPathElem) ? lastPathElem : undefined;
}

export function getLastPathElem(url: string) {
  const validUrl = cleanUrl(url);
  return validUrl.substring(validUrl.lastIndexOf(URL_SEPARATEUR) + 1);
}

const regex = /\/+/g;
export function cleanUrl(url: string) {
  let validUrl = url.replace(regex, "/");
  if (validUrl.endsWith(URL_SEPARATEUR)) {
    validUrl = validUrl.substring(0, validUrl.length - 1);
  }
  return validUrl;
}

export function getUrlPrecedente(url: string) {
  const urlWithoutIdParam = getUrlWithoutIdParam(url);
  const idxLastUrlSep = urlWithoutIdParam.lastIndexOf(URL_SEPARATEUR);
  return urlWithoutIdParam.substring(0, idxLastUrlSep);
}
