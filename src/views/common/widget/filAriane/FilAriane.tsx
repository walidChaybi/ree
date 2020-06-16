import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Route, MemoryRouter } from "react-router";
import { useHistory } from "react-router-dom";
import { Categorie } from "./Categorie";
import { AccueilUrl, SeparateurUrl } from "../../../router/UrlManager";
import { getText } from "../Text";

export const FilAriane: React.FC = () => {
  const history = useHistory();
  const pathnames = history.location.pathname
    .split(SeparateurUrl)
    .filter(x => x);
  pathnames.shift();
  const accueilString = getText("fildariane.accueil").toLowerCase();
  const accueilFirst = pathnames[0] === accueilString;

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
