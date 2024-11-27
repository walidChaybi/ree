import { RECEContextActions, RECEContextData } from "@core/contexts/RECEContext";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { URL_CONTEXT_APP } from "@router/ReceUrls";
import { IRoute } from "@util/route/IRoute";
import { URL_SEPARATEUR, getUrlWithoutIdParam, getUrlWithoutParam, isPathElemId } from "@util/route/UrlUtil";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useContext } from "react";
import { useBlocker, useLocation } from "react-router-dom";
import { Categorie } from "./Categorie";

// Gère l'empilement des urls visités par l'utilisateur
class GestionnaireNavigation {
  private urls: string[] = [];

  urlStartsWith(url1: string, url2: string) {
    return getPathElements(url1).join().startsWith(getPathElements(url2).join());
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
}

export const fildarianeLabel = "Navigation par fil d'ariane";

export const FilAriane: React.FC<FilArianeProps> = ({ routes }) => {
  const location = useLocation();
  const { isDirty } = useContext(RECEContextData);
  const { setIsDirty } = useContext(RECEContextActions);
  const blocker = useBlocker(() => isDirty);

  gestionnaireNavigation.addUrl(location.pathname);
  const pagesInfos = buildPagesInfos(location.pathname, routes, gestionnaireNavigation);
  const routeAccueil = getRoute("", routes);

  return (
    <div>
      {estUnCheminReceUi(location.pathname) && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label={fildarianeLabel}
        >
          <Categorie
            url={URL_CONTEXT_APP}
            message={routeAccueil ? routeAccueil.libelle : "Accueil"}
            last={pagesInfos.length === 0}
            key={URL_CONTEXT_APP}
          />

          {pagesInfos.map((pageInfo: IPageInfo) => {
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
      <ConfirmationPopin
        boutons={[
          {
            label: "OK",
            action: () => {
              setIsDirty(false);
              blocker.proceed?.();
            }
          },
          {
            label: "Annuler",
            action: () => {
              blocker.reset?.();
            }
          }
        ]}
        estOuvert={blocker.state === "blocked"}
        messages={[
          "Vous n'avez pas validé vos modifications. Si vous continuez, celles-ci seront perdues et les données réinitialisées.",
          "Voulez-vous continuer ?"
        ]}
      />
    </div>
  );
};

function estUnCheminReceUi(path: string) {
  // certains chemins ne commence pas par /rece/rece-ui (par exemple lors de la déconnexion: /rece/Shibboleth.sso/Logout) alors on retourne un tableau vide
  return path.startsWith(URL_CONTEXT_APP);
}

interface IPageInfo {
  url: string;
  libelle: string;
  derniere: boolean;
}

export function buildPagesInfos(path: string, routes: IRoute[], gestNavigation: GestionnaireNavigation) {
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
    const indexDansUrlsGestionnaireNavigation = navigationUrls.length - indexAPartirDeLaFinDePathElements - 1;
    // Si la navigation est classique à partir de la page d'accueil alors c'est toujours l'url du gestionnaire de navigation qui est utilisée
    // Si la navigation s'effectue par "favoris" alors c'est l'url reconstruite à partir de l'url entrée via "favoris" qui est utilisée
    const utiliserUrlGestionnaireNavigation =
      indexDansUrlsGestionnaireNavigation >= 0 && indexDansUrlsGestionnaireNavigation < navigationUrls.length;
    url = utiliserUrlGestionnaireNavigation ? gestNavigation.getUrl(indexDansUrlsGestionnaireNavigation) : url;

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
  return `${URL_CONTEXT_APP}/${pathElements.slice(0, idx + 1).join(URL_SEPARATEUR)}`;
}

export function getPathElements(path: string) {
  // cas possibles:
  // /rece/rece-ui/mesrequetes/apercurequetedelivrance => "mesrequetes/apercurequetedelivrance"
  // /rece/rece-ui/ => "/""
  // /rece/rece-ui => ""
  let cleanPath = path.replace(`${URL_CONTEXT_APP}`, "");
  let pathElements = cleanPath.split(URL_SEPARATEUR);
  // suppression des éléments vides dûs aux "/" de début et de fin potentiels
  pathElements = pathElements.filter(x => x);
  // Suppression des éventuel Nombre ou UUID de fin
  while (pathElements.length > 0 && isPathElemId(pathElements[pathElements.length - 1])) {
    pathElements.pop();
  }
  return pathElements;
}

function getRoute(url: string, routes: IRoute[]) {
  const urlWithoutId = getUrlWithoutIdParam(url);
  return routes.find(r => {
    return getUrlWithoutParam(r.url) === urlWithoutId;
  });
}
