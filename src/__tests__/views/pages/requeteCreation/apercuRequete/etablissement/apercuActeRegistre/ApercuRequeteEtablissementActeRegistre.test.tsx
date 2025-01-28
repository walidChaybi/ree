import { ApercuRequeteEtablissementActeRegistrePage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuActeRegistre/ApercuRequeteEtablissementActeRegistrePage";
import { URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import { createTestingRouter } from "../../../../../../__tests__utils__/testsUtil";

describe("Test de la page Aperçu requête etablissement Acte Registre", () => {
  test("DOIT afficher les onglet RMC, PJ et ActeRegistre QUAND on arrive sur la page", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID,
          element: <ApercuRequeteEtablissementActeRegistrePage />
        }
      ],
      [
        URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID.replace(
          ":idRequeteParam",
          "er5ez456-354v-461z-c5fd-162md289m74h"
        ).replace(":idActeParam", "885bdb13-d995-4dbd-93cb-a7a3b2eee5c8")
      ]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("RMC")).toBeDefined();
      expect(screen.getByText("Pièces justificatives / Annexes")).toBeDefined();
      expect(screen.getByText("Acte Registre")).toBeDefined();
      expect(screen.getByText("Acte Registre").getAttribute("aria-selected")).toBe("true");
    });
  });
});
