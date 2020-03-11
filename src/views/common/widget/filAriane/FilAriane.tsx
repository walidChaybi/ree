import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Route, MemoryRouter } from "react-router";
import { useHistory } from "react-router-dom";
import { Categorie } from "./Categorie";

export const FilAriane: React.FC = () => {
  const history = useHistory();
  let pathnames = history.location.pathname.split("/").filter(x => x);

  return (
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      <Route>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Categorie
            url={"/"}
            messageId={"accueil"}
            last={pathnames.length === 0}
          />
          {pathnames.length > 0 &&
            pathnames.map((value: string, index: number) => {
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
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
