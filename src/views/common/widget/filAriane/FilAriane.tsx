import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { URL_ACCUEIL, URL_CONTEXT_APP } from "@router/ReceUrls";
import { IRoute } from "@util/route/IRoute";
import {
  getUrlWithoutIdParam,
  isPathElemId,
  urlWithParamPatern,
  URL_SEPARATEUR
} from "@util/route/routeUtil";
import { getLibelle } from "@util/Utils";
import React from "react";
import { Route } from "react-router";
import { useHistory } from "react-router-dom";
import { Categorie } from "./Categorie";

// Gère l'empilement des urls visités par l'utilisateur
class GestionnaireNavigation {
  private urls: string[] = [];

  urlStartsWith(url1: string, url2: string) {
    return getPathElements(url1)
      .join()
      .startsWith(getPathElements(url2).join());
  }

  addUrl(url: string) {
    const newUrls: string[] = [];
    let idx = 0;
    while (idx < this.urls.length && !this.urlStartsWith(this.urls[idx], url)) {
      newUrls.push(this.urls[idx]);
      idx++;
    }
    newUrls.push(url);
    this.urls = newUrls;
  }

  deleteLastUrl() {
    this.urls.pop();
  }

  getUrl(index: number) {
    return this.urls[index];
  }

  getUrls() {
    return this.urls;
  }
}

export const gestionnaireNavigation = new GestionnaireNavigation();

/******** Fil d'ariane *******/
interface FilArianeProps {
  routes: IRoute[];
  isDirty: boolean;
  setIsDirty: (isDirty: boolean) => void;
}

export const fildarianeLabel = getLibelle("Navigation par fil d'ariane");

export const FilAriane: React.FC<FilArianeProps> = ({
  routes,
  isDirty,
  setIsDirty
}) => {
  const history = useHistory();

  const locationPathName = history.location.pathname;
  gestionnaireNavigation.addUrl(locationPathName);
  const pagesInfos = buildPagesInfos(
    history.location.pathname,
    routes,
    gestionnaireNavigation
  );
  const routeAccueil = getRoute(URL_ACCUEIL, routes);
  return (
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
            isDirty={isDirty}
            setIsDirty={setIsDirty}
          />

          {pagesInfos.map((pageInfo: IPageInfo, index: number) => {
            return (
              <Categorie
                url={pageInfo.url}
                message={pageInfo.libelle}
                last={pageInfo.derniere}
                key={pageInfo.url}
                isDirty={isDirty}
                setIsDirty={setIsDirty}
              />
            );
          })}
        </Breadcrumbs>
      )}
    </Route>
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

export function buildPagesInfos(
  path: string,
  routes: IRoute[],
  gestNavigation: GestionnaireNavigation
) {
  const pagesInfos: IPageInfo[] = [];
  const pathElements = getPathElements(path);
  const navigationUrls = gestNavigation.getUrls();

  // Pour chaque partie de l'url (/a/b/c => a, a/b, a/b/c) on construit un objet IPageInfo
  pathElements.forEach((pathElem, idx) => {
    let url = getUrlFromNPathElements(pathElements, idx);
    // Gère le cas ou l'utilisateur navigue d'une page avec un identifiant dans l'url vers une autre page (avec identifiant dans l'url ou pas)
    // Dans ce cas le gestionnaire de navigation permet de retrouver l'url avec le bon identifiant
    const indexAPartirDeLaFinDePathElements = pathElements.length - 1 - idx;
    // Dans le cas d'un accès par favoris puis d'une navigation,
    // les urls dans le gestionnaire de navigation peuvent être [a/b/c, a/b/c/d] et dans pathElements: [a, a/b, a/b/c, a/b/c/d]
    // Donc on voit que les urls du gestionnaire de navigation correspondent aux deux dernières urls de pathElements
    // (le code ci-dessous traite ce cas en faisant correspndent les urls du gestionnaires de navigation à celles de pathElements
    // pour construire la bonne url pour l'objet IPageInfo)
    const indexDansUrlsGestionnaireNavigation =
      navigationUrls.length - indexAPartirDeLaFinDePathElements - 1;
    // Si la navigation est classique à partir de la page d'accueil alors c'est toujours l'url du gestionnaire de navigation qui est utilisée
    // Si la navigation s'effectue par "favoris" alors c'est l'url reconstruite à partir de l'url entrée via "favoris" qui est utilisée
    const utiliserUrlGestionnaireNavigation =
      indexDansUrlsGestionnaireNavigation >= 0 &&
      indexDansUrlsGestionnaireNavigation < navigationUrls.length;
    url = utiliserUrlGestionnaireNavigation
      ? gestNavigation.getUrl(indexDansUrlsGestionnaireNavigation)
      : url;

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
  // /rece/rece-ui/mesrequetes/apercurequetedelivrance => "mesrequetes/apercurequetedelivrance"
  // /rece/rece-ui/ => "/""
  // /rece/rece-ui => ""
  // /rece/rece-ui/accueil => ""
  // /rece/rece-ui/accueil/ => ""
  let cleanPath = path.replace(`${URL_ACCUEIL}`, "");
  cleanPath = cleanPath.replace(`${URL_CONTEXT_APP}`, "");
  let pathElements = cleanPath.split(URL_SEPARATEUR);
  // suppression des éléments vides dûs aux "/" de début et de fin potentiels
  pathElements = pathElements.filter(x => x);
  // Suppression des éventuel Nombre ou UUID de fin
  while (
    pathElements.length > 0 &&
    isPathElemId(pathElements[pathElements.length - 1])
  ) {
    pathElements.pop();
  }
  return pathElements;
}

function getRoute(url: string, routes: IRoute[]) {
  const urlWithoutId = getUrlWithoutIdParam(url);
  return routes.find(r => {
    // Recherche par url en supprimant les éventuels paramètres (exemple: .../apercurequete/:idRequete => .../apercurequete)
    return r.url.replace(urlWithParamPatern, "$1") === urlWithoutId;
  });
}
