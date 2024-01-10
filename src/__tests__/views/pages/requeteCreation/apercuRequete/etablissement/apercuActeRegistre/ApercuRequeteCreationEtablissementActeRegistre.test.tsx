import { ApercuRequeteCreationEtablissementActeRegistre } from "@pages/requeteCreation/apercuRequete/etablissement/apercuActeRegistre/ApercuRequeteCreationEtablissementActeRegistre";
import {
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID,
  URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID
} from "@router/ReceUrls";
import { waitFor } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import {} from "react-dom";
import { Route, Router } from "react-router";

describe("Test de la page Aperçu requête etablissement Acte Registre", () => {
  test("DOIT afficher les onglet RMC, PJ et ActeRegistre QUAND on arrive sur la page", async () => {
    afficherPageRequeteCreationEtablissmentActeRegistre();

    waitFor(async () => {
      expect(
        screen
          .getByText("Description de la requête")
          .closest(".ResumeRequeteCreation")
      ).toHaveClass("is-closed");
      expect(screen.getByText("RMC")).toBeInTheDocument();
      expect(
        screen.getByText("Pièces justificatives / Annexes")
      ).toBeInTheDocument();
      expect(screen.getByText("Acte Registre")).toBeInTheDocument();
      expect(
        screen.getByText("Acte Registre").getAttribute("aria-selected")
      ).toBe("true");
    });
  });
});

function afficherPageRequeteCreationEtablissmentActeRegistre() {
  const history = createMemoryHistory();
  const url =
    URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID.replace(
      ":idRequeteParam",
      "er5ez456-354v-461z-c5fd-162md289m74h"
    ).replace(":idActeParam", "885bdb13-d995-4dbd-93cb-a7a3b2eee5c8");
  history.push(url);
  render(
    <Router history={history}>
      <Route
        exact={true}
        path={URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID}
      >
        <ApercuRequeteCreationEtablissementActeRegistre />
      </Route>
    </Router>
  );
}
