import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { IOfficier } from "@model/agent/IOfficier";
import { ApercuRequeteEtablissementSaisieDeProjetPage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/ApercuRequeteEtablissementSaisieDeProjetPage";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import "../../../../../../../mock/element/IntersectionObserver";
import { createTestingRouter } from "../../../../../../__tests__utils__/testsUtil";

describe("Test de la page Aperçu requête etablissement saisie projet", () => {
  test("DOIT afficher l'onglet pièces justificatives et postulant QUAND on arrive sur la page", async () => {
    afficherPageRequeteCreationEtablissment();

    await waitFor(() => {
      expect(screen.getByText("RMC")).toBeDefined();
      expect(
        screen
          .getByText("Pièces justificatives / Annexes")
          .getAttribute("aria-selected")
      ).toBe("true");
      expect(screen.getByText("Apercu du projet")).toBeDefined();
      expect(
        screen.getAllByText("Postulant")[0].getAttribute("aria-selected")
      ).toBe("true");
      expect(screen.getByText("Echanges")).toBeDefined();
      expect(screen.getByText("Apercu du projet")).toBeDefined();
    });
  });

  test("DOIT changer d'onglet selectionner QUAND on clique sur le bouton actualiser & visualiser", async () => {
     afficherPageRequeteCreationEtablissment("7a091a3b-6835-4824-94fb-527d68926d55");

     await waitFor(() => {
      expect(screen.getByText("Apercu du projet")).toBeDefined();
      expect(
        screen.getByText("Apercu du projet").getAttribute("aria-selected")
      ).toBe("false");
      expect(screen.getByText("Actualiser et visualiser")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Actualiser et visualiser"));

    await waitFor(() => {
      expect(
        screen.getByText("Apercu du projet").getAttribute("aria-selected")
      ).toBe("true");
    });
  });

  test("NE DOIT PAS afficher les boutons de modification du formulaire lorsque la requete ne nous est PAS attribué", async () => {
    afficherPageRequeteCreationEtablissment();

    await waitFor(() => {
     expect(screen.getByText("Apercu du projet")).toBeDefined();
     expect(screen.queryByText("Actualiser et visualiser")).toBeNull();
     expect(screen.queryByText("Valider le projet d'acte")).toBeNull();
     expect(screen.queryByText("SIGNER")).toBeNull();
   });
 });

});

  // on donne l'idUtilisateur au RECEContext pour simuler que la requete appartient a l'utilisateur connecté
function afficherPageRequeteCreationEtablissment(idUtilisateur?: string) {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
        element: <ApercuRequeteEtablissementSaisieDeProjetPage />
      }
    ],
    [
      `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/er5ez456-354v-461z-c5fd-162md289m74h/a272ec8a-1351-4edd-99b8-03004292a9d2`
    ]
  );

  render(
    <MockRECEContextProvider utilisateurConnecte={idUtilisateur ? {idUtilisateur} as IOfficier : undefined}>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );
}
