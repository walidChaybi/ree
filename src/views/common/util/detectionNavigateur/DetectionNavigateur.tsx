import * as React from "react";

export const FIREFOX = "Mozilla Firefox";
const CHROME = "Google Chrome ou Chromium";

type Navigateur = "Mozilla Firefox" | "Google Chrome ou Chromium";
/**
 * Code provenant du site MSDN
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator
 */
// Prise en compte uniquement de FIREFOX et CHROME
class DetectionNavigateur {
  public static getNomNavigateur() {
    const sUsrAg = navigator.userAgent;

    let sBrowser = "unknown";

    // The order matters here, and this may report false positives for unlisted browsers.
    if (sUsrAg.indexOf("Firefox") > -1) {
      sBrowser = FIREFOX;
      // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
    } else if (sUsrAg.indexOf("Chrome") > -1) {
      sBrowser = CHROME;
      // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
    }
    return sBrowser;
  }
}

interface SeulementNavigateurProps {
  navigateurs: Navigateur[];
}

export const SeulementNavigateur: React.FC<React.PropsWithChildren<SeulementNavigateurProps>> = ({ children, navigateurs }) => {
  const navigateurCourant = DetectionNavigateur.getNomNavigateur();
  const estNavigateurAutorise = navigateurs.find(navigateur => navigateur === navigateurCourant);

  return estNavigateurAutorise ? (
    <>{children}</>
  ) : (
    <>
      <p>{getMessageNavigateursSupportes(navigateurs)}</p>
      <span>{"Veuillez lancez l'applicatoin RECE via le menu Windows"}</span>
    </>
  );

  function getMessageNavigateursSupportes(navigateursNames: Navigateur[]) {
    let message = "Navigateur non autorisé ";
    if (navigateursNames.length > 1) {
      message += `(seuls ${navigateursNames.join(", ")} sont supportés)`;
    } else {
      message += `(seul ${navigateursNames.join(", ")} est supporté)`;
    }

    return message;
  }
};
