import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Route, MemoryRouter } from "react-router";
import { useHistory } from "react-router-dom";
import { Categorie } from "./Categorie";
import { getText } from "../Text";
import {
  URL_SEPARATEUR,
  URL_CONTEXT_APP,
  URL_ACCUEIL
} from "../../../router/ReceUrls";

interface FilArianeProps {
  setRetourState?: (retourUrl: string) => void;
}
export const FilAriane: React.FC<FilArianeProps> = ({ setRetourState }) => {
  const history = useHistory();
  const pathSupprimer = 2;
  const pathnames = history.location.pathname
    .split(URL_SEPARATEUR)
    .filter(x => x);
  pathnames.splice(0, pathSupprimer);
  const accueilString = getText("fildariane.accueil").toLowerCase();
  const accueilFirst = pathnames[0] === accueilString;

  const deconnexionString = getText("fildariane.deconnexion");
  const deconnexionPath = pathnames[0] === deconnexionString;

  if (setRetourState !== undefined) {
    setRetourContextValue(pathnames, setRetourState);
  }

  return (
    <MemoryRouter initialEntries={[URL_SEPARATEUR]} initialIndex={0}>
      <Route>
        {deconnexionPath === false && (
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Categorie
              url={"/accueil"}
              messageId={accueilString}
              last={accueilFirst}
            />
            {accueilFirst === false &&
              pathnames.map((value: string, index: number) => {
                const to = `/${pathnames
                  .slice(0, index + 1)
                  .join(URL_SEPARATEUR)}`;
                return (
                  <Categorie
                    url={to}
                    messageId={value}
                    last={index === pathnames.length - 1}
                    key={`${value}${index}`}
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
  pathnames: string[],
  setRetourState: (retourUrl: string) => void
) {
  if (pathnames.length === 1) {
    setRetourState(URL_ACCUEIL);
  } else {
    let retourUrl: string = URL_CONTEXT_APP;
    pathnames.forEach((element: string, index: number) => {
      if (index !== pathnames.length - 1) {
        retourUrl = `${retourUrl}/${element}`;
      }
    });
    setRetourState(retourUrl);
  }
}
