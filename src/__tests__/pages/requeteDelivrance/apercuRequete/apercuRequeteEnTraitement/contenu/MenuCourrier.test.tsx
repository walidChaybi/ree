import { act, fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import {
  documentReponseCopieIntegrale,
  documentReponseCopieNonSigne
} from "../../../../../../mock/data/DocumentReponse";
import requeteDelivrance from "../../../../../../mock/data/requeteDelivrance";
import { ChoixDelivrance } from "../../../../../../model/requete/enum/ChoixDelivrance";
import { getUrlWithParam } from "../../../../../../views/common/util/route/routeUtil";
import { MenuCourrier } from "../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequeteEnTraitement/contenu/MenuCourrier";
import { URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID } from "../../../../../../views/router/ReceUrls";

const history = createMemoryHistory();
history.push(
  getUrlWithParam(
    URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID,
    "a4cefb71-8457-4f6b-937e-34b49335d494"
  )
);

test("renders informations sur l'état de la requete", async () => {
  const requete = requeteDelivrance;
  requete.choixDelivrance = ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE;
  requete.documentsReponses = [
    documentReponseCopieIntegrale,
    documentReponseCopieNonSigne
  ];

  render(
    <>
      <Router history={history}>
        <Route
          exact={true}
          path={URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID}
        >
          <MenuCourrier requete={requeteDelivrance} />
        </Route>
      </Router>
    </>
  );

  await act(async () => {
    fireEvent.click(screen.getByText(/Actions/i));
  });

  expect(screen.getByText(/Modifier le courrier/i));
  expect(screen.getByText("Afficher l'extrait/copie"));
  expect(screen.getByText("Ouvrir l'acte"));
  expect(screen.getByText("Afficher E/C complémentaire"));
});
