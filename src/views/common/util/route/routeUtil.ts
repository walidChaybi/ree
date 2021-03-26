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
  const lastPathElem = getLastPathElem(url);
  return isPathElemId(lastPathElem);
}

/**
 * Renvoie une url sans le dernier élément si c'est un ID (UUID ou un nombre)
 */
export function getUrlWithoutIdParam(url: string): string {
  const validUrl = cleanUrl(url);
  return isLastPathElemIsId(validUrl)
    ? validUrl.substring(0, validUrl.lastIndexOf(URL_SEPARATEUR))
    : validUrl;
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
