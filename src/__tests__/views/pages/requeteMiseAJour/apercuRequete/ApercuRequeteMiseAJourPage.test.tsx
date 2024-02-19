import ApercuRequeteMiseAJourPage from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import {
  URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS,
  URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID
} from "@router/ReceUrls";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

test("DOIT afficher correctement la page apercu de Mise A Jour QUAND on arrive sur la page", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID,
        element: <ApercuRequeteMiseAJourPage />
      }
    ],
    [
      `${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/er5ez456-354v-461z-c5fd-162md289m74h/b41079a5-9e8d-478c-b04c-c4c4ey86537g`
    ]
  );

  render(<RouterProvider router={router} />);

  waitFor(() => {
    expect(screen.getByText("Acte registre")).toBeDefined();
    expect(screen.getByText("Gérer les mentions")).toBeDefined();
    expect(
      screen.getByText("Gérer les mentions").getAttribute("aria-selected")
    ).toBe("true");
    expect(screen.getByText("Analyse marginale")).toBeDefined();
    expect(screen.getByText("Abandonner")).toBeDefined();
  });

  fireEvent.click(screen.getByText("Analyse marginale"));

  waitFor(() => {
    expect(
      screen.getByText("Analyse marginale").getAttribute("aria-selected")
    ).toBe("true");
  });
});
