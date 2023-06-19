import {
  URL_MES_REQUETES_DELIVRANCE,
  URL_RECHERCHE_REQUETE,
  URL_REQUETES_DELIVRANCE_SERVICE
} from "@router/ReceUrls";
import { render, screen } from "@testing-library/react";
import { BoutonRetour, getLibelleEtUrl } from "@widget/navigation/BoutonRetour";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

let history: any;
beforeEach(() => {
  history = createMemoryHistory();
});

test("Retour accueil", () => {
  history.push(URL_MES_REQUETES_DELIVRANCE);
  render(
    <Router history={history}>
      <BoutonRetour />
    </Router>
  );
  const linkElement = screen.getByText(/<< RETOUR ACCUEIL/i);
  expect(linkElement).toBeDefined();
});

test("retour name", () => {
  expect(getLibelleEtUrl(URL_MES_REQUETES_DELIVRANCE)).toStrictEqual([
    "mes requêtes de délivrance",
    URL_MES_REQUETES_DELIVRANCE
  ]);
  expect(getLibelleEtUrl(URL_REQUETES_DELIVRANCE_SERVICE)).toStrictEqual([
    "requête de service",
    URL_REQUETES_DELIVRANCE_SERVICE
  ]);
  expect(getLibelleEtUrl(URL_RECHERCHE_REQUETE)).toStrictEqual([
    "recherche requête",
    URL_RECHERCHE_REQUETE
  ]);
});
