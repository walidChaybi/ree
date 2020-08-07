import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Route, MemoryRouter } from "react-router";
import { useHistory } from "react-router-dom";
import { Categorie } from "./Categorie";
import { AccueilUrl, SeparateurUrl, AppUrls } from "../../../router/UrlManager";
import { getText } from "../Text";

interface FilArianeProps {
  setRetourState?: (retourUrl: string) => void;
}
export const FilAriane: React.FC<FilArianeProps> = ({ setRetourState }) => {
  const history = useHistory();
  const pathnames = history.location.pathname
    .split(SeparateurUrl)
    .filter(x => x);
  pathnames.splice(0, 2);
  const accueilString = getText("fildariane.accueil").toLowerCase();
  const accueilFirst = pathnames[0] === accueilString;
  if (setRetourState !== undefined) {
    setRetourContextValue(pathnames, setRetourState);
  }

  return (
    <MemoryRouter initialEntries={[SeparateurUrl]} initialIndex={0}>
      <Route>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Categorie
            url={AccueilUrl}
            messageId={accueilString}
            last={accueilFirst}
          />
          {!accueilFirst &&
            pathnames.map((value: string, index: number) => {
              const to = `/${pathnames
                .slice(0, index + 1)
                .join(SeparateurUrl)}`;
              return (
                <Categorie
                  url={to}
                  messageId={value}
                  last={index === pathnames.length - 1}
                  key={value + index}
                />
              );
            })}
        </Breadcrumbs>
      </Route>
    </MemoryRouter>
  );
};

export function setRetourContextValue(
  pathnames: string[],
  setRetourState: (retourUrl: string) => void
) {
  if (pathnames.length === 1) {
    setRetourState(AppUrls.ctxAccueilUrl);
  } else {
    let retourUrl: string = AppUrls.contextApp;
    pathnames.forEach((element: string, index: number) => {
      if (index !== pathnames.length - 1) {
        retourUrl = `${retourUrl}/${element}`;
      }
    });
    setRetourState(retourUrl);
  }
}
