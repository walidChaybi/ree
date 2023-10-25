import { ApercuRequeteCreationEtablissementSaisieDeProjetPage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/ApercuRequeteCreationEtablissementSaisieDeProjetPage";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Route, Router } from "react-router";
import "../../../../../../../mock/element/IntersectionObserver";

describe("Test de la page Aperçu requête etablissement sasie projet", () => {
  test("DOIT afficher l'onglet pièces justificatives et postulant QUAND on arrive sur la page", async () => {
    afficherPageRequeteCreationEtablissment();

    await waitFor(async () => {
      expect(
        screen
          .getByText("Description de la requête")
          .closest(".ResumeRequeteCreation")
      ).toHaveClass("is-closed");
      expect(screen.getByText("RMC")).toBeInTheDocument();
      expect(
        screen
          .getByText("Pièces justificatives / Annexes")
          .getAttribute("aria-selected")
      ).toBe("true");
      expect(screen.getByText("Apercu du projet")).toBeInTheDocument();
      expect(
        screen.getAllByText("Postulant")[0].getAttribute("aria-selected")
      ).toBe("true");
      expect(screen.getByText("Echanges")).toBeInTheDocument();
      expect(screen.getByText("Apercu du projet")).toBeInTheDocument();
    });
  });

  test("DOIT changer d'onglet selectionner QUAND on clique sur le bouton actualiser & visualiser", async () => {
    afficherPageRequeteCreationEtablissment();

    await waitFor(() => {
      expect(screen.getByText("Apercu du projet")).toBeInTheDocument();
      expect(screen.getByText("Actualiser et visualiser")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Actualiser et visualiser"));

    await waitFor(() => {
      expect(
        screen.getByText("Apercu du projet").getAttribute("aria-selected")
      ).toBe("true");
    });
  });
});

function afficherPageRequeteCreationEtablissment() {
  const history = createMemoryHistory();
  history.push(
    `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/er5ez456-354v-461z-c5fd-162md289m74h/a272ec8a-1351-4edd-99b8-03004292a9d2`
  );
  render(
    <Router history={history}>
      <Route
        exact={true}
        path={URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID}
      >
        <ApercuRequeteCreationEtablissementSaisieDeProjetPage />
      </Route>
    </Router>
  );
}
