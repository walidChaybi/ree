import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Route, MemoryRouter } from "react-router";
import { useHistory } from "react-router-dom";
import { Categorie } from "./Categorie";
import {
  URL_SEPARATEUR,
  URL_CONTEXT_APP,
  URL_ACCUEIL
} from "../../../router/ReceUrls";
import { UUID } from "../../../../ressources/Regex";
import { getLibelle } from "../Text";
import { IRoute } from "../../util/route/IRoute";
import { urlWithParamPatern } from "../../util/route/routeUtil";

interface FilArianeProps {
  setRetourState?: (retourUrl: string) => void;
  routes: IRoute[];
}
export const fildarianeLabel = getLibelle("Navigation par fil d'ariane");
export const FilAriane: React.FC<FilArianeProps> = ({
  setRetourState,
  routes
}) => {
  const history = useHistory();

  const pagesInfos = buildPagesInfos(history.location.pathname, routes);

  if (setRetourState !== undefined) {
    setRetourContextValue(pagesInfos, setRetourState);
  }
  const routeAccueil = getRoute(URL_ACCUEIL, routes);
  return (
    <MemoryRouter initialEntries={[URL_SEPARATEUR]} initialIndex={0}>
      <Route>
        {estUnCheminReceUi(history.location.pathname) && (
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label={fildarianeLabel}
          >
            <Categorie
              url={URL_ACCUEIL}
              message={routeAccueil ? routeAccueil.libelle : "Accueil"}
              last={pagesInfos.length === 0}
              key={URL_ACCUEIL}
            />

            {pagesInfos.map((pageInfo: IPageInfo, index: number) => {
              return (
                <Categorie
                  url={pageInfo.url}
                  message={pageInfo.libelle}
                  last={pageInfo.derniere}
                  key={pageInfo.url}
                />
              );
            })}
          </Breadcrumbs>
        )}
      </Route>
    </MemoryRouter>
  );
};

export function setRetourContextValue(
  pagesInfos: IPageInfo[],
  setRetourState: (retourUrl: string) => void
) {
  if (pagesInfos.length === 1) {
    setRetourState(URL_ACCUEIL);
  } else {
    let retourUrl: string = URL_CONTEXT_APP;
    pagesInfos.forEach((pageInfo: IPageInfo, index: number) => {
      if (index !== pagesInfos.length - 1) {
        retourUrl = pageInfo.url;
      }
    });
    setRetourState(retourUrl);
  }
}

function estUnCheminReceUi(path: string) {
  // certains chemins ne commence pas par /rece/rece-ui (par exemple lors de la déconnexion: /rece/Shibboleth.sso/Logout) alors on retourne un tableau vide
  return path.startsWith(URL_CONTEXT_APP);
}

interface IPageInfo {
  url: string;
  libelle: string;
  derniere: boolean;
}

export function buildPagesInfos(path: string, routes: IRoute[]) {
  const pagesInfos: IPageInfo[] = [];
  const pathElements = getPathElements(path);

  pathElements.forEach((pathElem, idx) => {
    const url = getUrlFromNPathElements(pathElements, idx);
    const route = getRoute(url, routes);
    pagesInfos.push({
      url,
      libelle: route ? route.libelle : pathElem,
      derniere: idx === pathElements.length - 1
    });
  });

  return pagesInfos;
}

export function getUrlFromNPathElements(pathElements: string[], idx: number) {
  return `${URL_CONTEXT_APP}/${pathElements
    .slice(0, idx + 1)
    .join(URL_SEPARATEUR)}`;
}

export function getPathElements(path: string) {
  // cas possibles:
  // /rece/rece-ui/mesrequetes/apercurequete => "mesrequetes/apercurequete"
  // /rece/rece-ui/ => "/""
  // /rece/rece-ui => ""
  // /rece/rece-ui/accueil => ""
  // /rece/rece-ui/accueil/ => ""
  let cleanPath = path.replace(`${URL_ACCUEIL}`, "");
  cleanPath = cleanPath.replace(`${URL_CONTEXT_APP}`, "");
  let pathElements = cleanPath.split(URL_SEPARATEUR);
  // suppression des éléments vides dûs aux "/" de début et de fin potentiels
  pathElements = pathElements.filter(x => x);
  // Suppression de l'éventuel UUID de fin
  if (
    pathElements.length > 0 &&
    UUID.test(pathElements[pathElements.length - 1])
  ) {
    pathElements.pop();
  }
  return pathElements;
}

function getRoute(url: string, routes: IRoute[]) {
  return routes.find(r => {
    // Recherche par url en supprimant les éventuels paramètres (exemple: .../apercurequete/:idRequete => .../apercurequete)
    return r.url.replace(urlWithParamPatern, "$1") === url;
  });
}
