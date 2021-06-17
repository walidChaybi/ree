import * as React from "react";
import { getLibelle } from "../../widget/Text";

export const FIREFOX = "Mozilla Firefox";
export const SAMSUNG = "Samsung Internet";
export const OPERA = "Opera";
export const IE = "Microsoft Internet Explorer";
export const EDGE = "Microsoft Edge";
export const CHROME = "Google Chrome ou Chromium";
export const SAFARI = "Apple Safari";

export type Navigateur =
  | "Mozilla Firefox"
  | "Samsung Internet"
  | "Opera"
  | "Microsoft Internet Explorer"
  | "Microsoft Edge"
  | "Google Chrome ou Chromium"
  | "Apple Safari"
  | "unknown";

/**
 * Code provenant du site MSDN
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator
 */
export class DetectionNavigateur {
  public static getNomNavigateur() {
    const sUsrAg = navigator.userAgent;
    let sBrowser = "unknown";

    // The order matters here, and this may report false positives for unlisted browsers.
    if (sUsrAg.indexOf("Firefox") > -1) {
      sBrowser = FIREFOX;
      // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
    } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
      sBrowser = SAMSUNG;
      // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
    } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
      sBrowser = OPERA;
      // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
    } else if (sUsrAg.indexOf("Trident") > -1) {
      sBrowser = IE;
      // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
    } else if (sUsrAg.indexOf("Edge") > -1) {
      sBrowser = EDGE;
      // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    } else if (sUsrAg.indexOf("Chrome") > -1) {
      sBrowser = CHROME;
      // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
    } else if (sUsrAg.indexOf("Safari") > -1) {
      sBrowser = SAFARI;
      // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
    }
    return sBrowser;
  }

  public static isFireFox() {
    return DetectionNavigateur.getNomNavigateur() === FIREFOX;
  }

  public static isChrome() {
    return DetectionNavigateur.getNomNavigateur() === CHROME;
  }
}

interface SeulementNavigateurProps {
  navigateurs: Navigateur[];
}

export const SeulementNavigateur: React.FC<SeulementNavigateurProps> = ({
  children,
  navigateurs
}) => {
  const navigateurCourant = DetectionNavigateur.getNomNavigateur();
  const estNavigateurAutorise = navigateurs.find(
    navigateur => navigateur === navigateurCourant
  );

  return estNavigateurAutorise ? (
    <>{children}</>
  ) : (
    <>
      <p>{getMessageNavigateursSupportes(navigateurs)}</p>
      <span>
        {getLibelle("Veuillez lancez l'applicatoin RECE via le menu Windows")}
      </span>
    </>
  );

  function getMessageNavigateursSupportes(navigateursNames: Navigateur[]) {
    let message = "Navigateur non autorisé ";
    if (navigateursNames.length > 0) {
      message += getLibelle(
        `(seuls ${navigateursNames.join(", ")} sont supportés)`
      );
    } else {
      message += getLibelle(
        `(seul ${navigateursNames.join(", ")} est supporté)`
      );
    }

    return message;
  }
};
