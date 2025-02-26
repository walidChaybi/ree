import { IOfficier } from "@model/agent/IOfficier";
import { ApercuRequeteEtablissementSaisieDeProjetPage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/ApercuRequeteEtablissementSaisieDeProjetPage";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET,
  PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { createTestingRouter } from "../../../../../../__tests__utils__/testsUtil";
import MockRECEContextProvider from "../../../../../../mock/context/MockRECEContextProvider";
import "../../../../../../mock/element/IntersectionObserver";

describe("Test de la page Aperçu requête etablissement saisie projet", () => {
  test("DOIT afficher l'onglet pièces justificatives et postulant QUAND on arrive sur la page", async () => {
    afficherPageRequeteCreationEtablissment("7a091a3b-6835-4824-94fb-527d68926d55");

    await waitFor(() => {
      expect(screen.getByText("RMC")).toBeDefined();
      expect(screen.getByText("Pièces justificatives / Annexes").getAttribute("aria-selected")).toBe("true");
      expect(screen.getByText("Apercu du projet")).toBeDefined();
      expect(screen.getAllByText("Postulant")[0].getAttribute("aria-selected")).toBe("true");
      expect(screen.getByText("Echanges")).toBeDefined();
      expect(screen.getByText("Apercu du projet")).toBeDefined();
    });
  });

  test("DOIT changer d'onglet selectionner QUAND on clique sur le bouton actualiser & visualiser", async () => {
    afficherPageRequeteCreationEtablissment("7a091a3b-6835-4824-94fb-527d68926d55");

    await waitFor(() => {
      expect(screen.getByText("Apercu du projet")).toBeDefined();
      expect(screen.getByText("Apercu du projet").getAttribute("aria-selected")).toBe("false");
      expect(screen.getByText("Actualiser et visualiser")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Actualiser et visualiser"));

    await waitFor(() => {
      expect(screen.getByText("Apercu du projet").getAttribute("aria-selected")).toBe("true");
    });
  });

  test("NE DOIT PAS afficher les boutons de modification du formulaire lorsque la requete ne nous est PAS attribué", async () => {
    afficherPageRequeteCreationEtablissment("7a091a3b-6835-4824-94fb-527d68926d55");

    await waitFor(() => {
      expect(screen.getByText("Apercu du projet")).toBeDefined();
      expect(screen.queryByText("Actualiser et visualiser")).toBeNull();
      expect(screen.queryByText("Valider le projet d'acte")).toBeNull();
      expect(screen.queryByText("SIGNER")).toBeNull();
    });
  });

  test("DOIT afficher la popin de confirmation QUAND je clique sur 'valider le projet' en saisieDeProjet ET que les données sont à jour", async () => {
    afficherPageRequeteCreationEtablissment("7a091a3b-6835-4824-94fb-527d68926d55", "er5ez456-354v-461z-c5fd-162md289m75v");

    await waitFor(() => {
      expect(screen.getByText("Apercu du projet")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Apercu du projet"));

    await waitFor(() => {
      expect(screen.getByText("Valider le projet d'acte")).toBeDefined();
    });
    fireEvent.click(screen.getByText("Valider le projet d'acte"));

    await waitFor(() => {
      expect(screen.getByText("Confirmez-vous la validation du projet pour envoi du BI à la SDANF ?")).toBeDefined();
      expect(screen.getByText("OK")).toBeDefined();
      expect(screen.getByText("Annuler")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Annuler"));

    await waitFor(() => {
      expect(screen.queryByText("Confirmez-vous la validation du projet pour envoi du BI à la SDANF ?")).toBeNull();
      expect(screen.queryByText("OK")).toBeNull();
      expect(screen.queryByText("Annuler")).toBeNull();
    });
  });

  test("DOIT afficher la popin de confirmation QUAND je clique sur 'valider le projet' en saisieDeProjet ET que les données NE SONT PAS à jour", async () => {
    afficherPageRequeteCreationEtablissment("7a091a3b-6835-4824-94fb-527d68926d55", "er5ez456-354v-461z-c5fd-162md289m75v");

    await waitFor(() => {
      expect(screen.getByText("Apercu du projet")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Apercu du projet"));

    await waitFor(() => {
      expect(screen.getByText("Valider le projet d'acte")).toBeDefined();
    });

    // on change le formulaire pour que les données Formik ne soient pas a jour
    const champNom: HTMLInputElement[] = screen.getAllByLabelText("Nom");
    fireEvent.input(champNom[0], {
      target: {
        value: "Jiraya"
      }
    });

    fireEvent.click(screen.getByText("Valider le projet d'acte"));

    await waitFor(() => {
      expect(screen.getByText("Des modifications du projet d'acte ne sont pas enregistrées.")).toBeDefined();
      expect(screen.getByText("Veuillez actualiser le projet d'acte avant sa validation.")).toBeDefined();
      expect(screen.getByText("OK")).toBeDefined();
    });

    fireEvent.click(screen.getByText("OK"));

    // on verifie que la popin se desaffiche
    await waitFor(() => {
      expect(screen.queryByText("Des modifications du projet d'acte ne sont pas enregistrées.")).toBeNull();
      expect(screen.queryByText("Veuillez actualiser le projet d'acte avant sa validation.")).toBeNull();
      expect(screen.queryByText("OK")).toBeNull();
    });
  });
});

test("DOIT rediriger l'utilisateur vers l'apercuSimple QUAND la requete ne nous appartient pas et qu'on accede a l'apercu saisie de projet", async () => {
  const router = afficherPageRequeteCreationEtablissment("7a091a3b-6835-4824-94fb-527d68926d59", "er5ez456-354v-461z-c5fd-162md289m75v");

  await waitFor(() => {
    expect(router.state.location.pathname).toBe(
      `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}/er5ez456-354v-461z-c5fd-162md289m75v`
    );
  });
});

// on donne l'idUtilisateur au RECEContext pour simuler que la requete appartient a l'utilisateur connecté
function afficherPageRequeteCreationEtablissment(idUtilisateur?: string, idRequete?: string) {
  const url = idRequete
    ? `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/${idRequete}/a272ec8a-1351-4edd-99b8-03004292a9d2`
    : `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/er5ez456-354v-461z-c5fd-162md289m74h/a272ec8a-1351-4edd-99b8-03004292a9d2`;
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
        element: <ApercuRequeteEtablissementSaisieDeProjetPage />
      }
    ],
    [url]
  );

  render(
    <MockRECEContextProvider utilisateurConnecte={idUtilisateur ? ({ idUtilisateur } as IOfficier) : undefined}>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );

  return router;
}
