import {
  LISTES_TYPES_MENTION,
  MENTION_NIVEAU_UN
} from "@composant/formulaire/ConstantesNomsForm";
import { mappingOfficier } from "@core/login/LoginHook";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic
} from "@mock/data/connectedUserAvecDroit";
import { mapHabilitationsUtilisateur } from "@model/agent/IUtilisateur";
import ApercuRequeteMiseAJourPage from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import {
  URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS,
  URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID
} from "@router/ReceUrls";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";
import { ajouterUneMention } from "./contenu/MiseAJourMentions/MiseAJourMentions.test";

function renderApercuRequeteMiseAJour() {
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
}

beforeEach(() => {
  storeRece.utilisateurCourant = mappingOfficier(
    resultatHeaderUtilistateurLeBiannic,
    resultatRequeteUtilistateurLeBiannic.data
  );
  storeRece.utilisateurCourant.habilitations = mapHabilitationsUtilisateur(
    resultatRequeteUtilistateurLeBiannic.data.habilitations
  );
});

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

describe("Test du bouton Terminer et Signer", () => {
  test("le bouton DOIT etre desactivé QUAND la page s'affiche", async () => {
    renderApercuRequeteMiseAJour();

    await waitFor(() => {
      expect(screen.getByText("Terminer et Signer")).toBeDefined();
    });

    await waitFor(() => {
      expect(screen.getByText("Terminer et Signer")).toBeDisabled();
    });
  });

  test("le bouton DOIT etre activé QUAND on actualise et visualise APRES avoir ajouter une mention", async () => {
    renderApercuRequeteMiseAJour();

    ajouterUneMention();

    await waitFor(() => {
      expect(screen.getByText("Actualiser et visualiser")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Actualiser et visualiser"));

    await waitFor(() => {
      expect(screen.getByText("Terminer et Signer")).toBeDefined();
    });

    await waitFor(() => {
      expect(screen.getByText("Terminer et Signer")).toBeEnabled();
    });
  });

  test("le bouton DOIT etre desactivé QUAND on commence une action de mise a jour (ajout, modification)", async () => {
    renderApercuRequeteMiseAJour();

    ajouterUneMention();

    await waitFor(() => {
      expect(screen.getByText("Actualiser et visualiser")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Actualiser et visualiser"));

    await waitFor(() => {
      expect(screen.getByText("Terminer et Signer")).toBeDefined();
    });

    await waitFor(() => {
      expect(screen.getByText("Terminer et Signer")).toBeEnabled();
    });

    // on remplie le premier input des types de mentions
    fireEvent.change(
      screen.getByTestId(`${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_UN}`),
      {
        target: { value: "0185f3c8-5f4c-4ea9-89e1-fb65fcb7b17f" }
      }
    );

    await waitFor(() => {
      expect(screen.getByText("Terminer et Signer")).toBeDisabled();
    });
  });
});
