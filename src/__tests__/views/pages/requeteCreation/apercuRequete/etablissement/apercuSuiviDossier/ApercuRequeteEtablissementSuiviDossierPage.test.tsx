import { ApercuRequeteEtablissementSuiviDossierPage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuPriseEnCharge/ApercuRequeteEtablissementSuiviDossierPage";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID
} from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { createMemoryHistory } from "history";
import { Route, Router } from "react-router";

describe("Test de la page Aperçu requête etablissement suivi dossier", () => {
  test("DOIT afficher les onglets avec pièce justificative active QUAND on arrive sur la page", async () => {
    afficherPageRequeteCreationEtablissment();

    await waitFor(async () => {
      expect(
        screen.getByText("Pièces justificatives / Annexes")
      ).toBeInTheDocument();
      expect(screen.getByText("RMC")).toBeInTheDocument();
      expect(
        screen.getByText("Suivi dossier").getAttribute("aria-selected")
      ).toBe("true");
      expect(screen.getByText("Echanges")).toBeInTheDocument();
    });
  });
});

function afficherPageRequeteCreationEtablissment() {
  const history = createMemoryHistory();
  history.push(
    getUrlWithParam(
      `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER}/:idRequete`,
      "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
    )
  );
  render(
    <Router history={history}>
      <Route
        exact={true}
        path={URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID}
      >
        <ApercuRequeteEtablissementSuiviDossierPage />
      </Route>
    </Router>
  );
}
