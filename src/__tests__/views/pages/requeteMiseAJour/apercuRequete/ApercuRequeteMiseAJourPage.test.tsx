import ApercuRequeteMiseAJourPage from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import {
  URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS,
  URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID
} from "@router/ReceUrls";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";
import { ajouterUneMention } from "./contenu/MiseAJourMentions/MiseAJourMentions.test";

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

  await waitFor(() => {
    expect(screen.getByText("Acte Registre")).toBeDefined();
    expect(screen.getByText("Gérer les mentions")).toBeDefined();
    expect(
      screen.getByText("Gérer les mentions").getAttribute("aria-selected")
    ).toBe("true");
    expect(screen.getByText("Abandonner")).toBeDefined();
    expect(screen.getByTitle("Visionneuse PDF")).toBeDefined();
  });
});

test("DOIT naviguer vers l'onglet Acte Mis A Jour QUAND on actualise et visualise la modification des mentions", async () => {
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

  ajouterUneMention();

  await waitFor(() => {
    expect(screen.getByText("Actualiser et visualiser")).toBeDefined();
  });

  fireEvent.click(screen.getByText("Actualiser et visualiser"));

  await waitFor(() => {
    expect(
      screen.getByText("Apercu acte mis à jour").getAttribute("aria-selected")
    ).toBe("true");
  });
});