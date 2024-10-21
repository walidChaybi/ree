import { MesRequetesPage } from "@pages/requeteDelivrance/espaceDelivrance/MesRequetesPage";
import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { expect, test, vi } from "vitest";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

const miseAJourCompteur = vi.fn();
const setParamsRMCAuto = vi.fn();

test("renders Page requete with all elements", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE,
        element: (
          <MesRequetesPage
            miseAJourCompteur={miseAJourCompteur}
            setParamsRMCAuto={setParamsRMCAuto}
          />
        )
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE]
  );

  render(<RouterProvider router={router} />);

  const titreNumero = screen.getByText("N°");
  const pageSuivante = screen.getByTitle("Page suivante");

  await waitFor(() => {
    const numero = screen.getByText("1234");
    expect(screen.getByText("Fin consultation")).toBeDefined();
    expect(titreNumero).toBeDefined();
    expect(numero).toBeDefined();
    fireEvent.click(screen.getByText("Fin consultation"));
  });

  fireEvent.click(pageSuivante);

  await waitFor(() => {
    const numero = screen.getByText("9021");
    expect(numero).toBeDefined();
    // Clic sur une ligne
    fireEvent.click(screen.getByText("9021"));
  });

  // Clic sur un titre de colonne
  fireEvent.click(titreNumero);

  await waitFor(() => {
    expect(screen.getByText("9021")).toBeDefined();
  });
});
