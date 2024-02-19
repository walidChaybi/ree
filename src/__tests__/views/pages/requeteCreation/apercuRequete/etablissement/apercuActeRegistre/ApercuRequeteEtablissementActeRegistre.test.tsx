import { ApercuRequeteEtablissementActeRegistrePage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuActeRegistre/ApercuRequeteEtablissementActeRegistrePage";
import {
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID,
  URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID
} from "@router/ReceUrls";
import { waitFor } from "@testing-library/dom";
import { act, render, screen } from "@testing-library/react";
import {} from "react-dom";
import { RouterProvider } from "react-router";
import { createTestingRouter } from "../../../../../../__tests__utils__/testsUtil";

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
  const url =
    URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID.replace(
      ":idRequeteParam",
      "er5ez456-354v-461z-c5fd-162md289m74h"
    ).replace(":idActeParam", "885bdb13-d995-4dbd-93cb-a7a3b2eee5c8");

  act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID,
          element: <ApercuRequeteEtablissementActeRegistrePage />
        }
      ],
      [url]
    );

    render(<RouterProvider router={router} />);
  });
}
