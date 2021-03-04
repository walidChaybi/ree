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
