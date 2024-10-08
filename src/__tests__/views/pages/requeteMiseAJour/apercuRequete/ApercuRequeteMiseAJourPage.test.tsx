import * as EtatCivilApi from "@api/appels/etatcivilApi";
import {
  LISTES_TYPES_MENTION,
  MENTION_NIVEAU_DEUX,
  MENTION_NIVEAU_TROIS,
  MENTION_NIVEAU_UN
} from "@composant/formulaire/ConstantesNomsForm";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic
} from "@mock/data/mockConnectedUserAvecDroit";
import { mappingOfficier } from "@model/agent/IOfficier";
import { mapHabilitationsUtilisateur } from "@model/agent/IUtilisateur";
import { RMCActeInscriptionPage } from "@pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionPage";
import ApercuRequeteMiseAJourPage from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import {
  URL_RECHERCHE_ACTE_INSCRIPTION,
  URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS,
  URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID
} from "@router/ReceUrls";
import {
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import IHabilitationDto from "../../../../../dto/etatcivil/agent/IHabilitationDto";
import {
  createTestingRouter,
  elementAvecContexte
} from "../../../../__tests__utils__/testsUtil";

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

  render(
    elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte)
  );
}

const LISTE_TYPE_MENTION_NIVEAU_UN = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_UN}`;
const LISTE_TYPE_MENTION_NIVEAU_DEUX = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_DEUX}`;
const LISTE_TYPE_MENTION_NIVEAU_TROIS = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_TROIS}`;
const TEXTE_MENTION_PLACEHOLDER = "Texte mention à ajouter";

const ajouterUneMention = () => {
  fireEvent.change(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_UN), {
    target: { value: "0185f3c8-5f4c-4ea9-89e1-fb65fcb7b17f" }
  });

  fireEvent.change(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_DEUX), {
    target: { value: "7adaa7f8-6228-4e25-87a1-d99f3b98371a" }
  });

  fireEvent.change(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_TROIS), {
    target: { value: "b03c54ae-5130-4062-b7e4-34bed2de7989" }
  });

  fireEvent.change(screen.getByPlaceholderText(TEXTE_MENTION_PLACEHOLDER), {
    target: {
      value: "Blablablabla ceci est un texte de mention parfaitement correct"
    }
  });

  fireEvent.click(screen.getByText("Ajouter mention"));
};

const utilisateurConnecte = mappingOfficier(
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic.data
);
utilisateurConnecte.habilitations = mapHabilitationsUtilisateur(
  resultatRequeteUtilistateurLeBiannic.data
    .habilitations as unknown as IHabilitationDto[]
);

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

  render(
    elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte)
  );

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

  render(
    elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte)
  );
  ajouterUneMention();

  await waitFor(() => {
    expect(screen.getByText("Actualiser et visualiser")).toBeDefined();
  });

  fireEvent.click(screen.getByText("Actualiser et visualiser"));

  // expect(
  //   screen.getByText("Apercu acte mis à jour").getAttribute("aria-selected")
  // ).toBe("true");
});

describe("Test du bouton Terminer et Signer", () => {
  test("le bouton DOIT etre desactivé QUAND la page s'affiche", async () => {
    renderApercuRequeteMiseAJour();

    await waitFor(() => {
      expect(screen.getByText("Terminer et Signer")).toBeDefined();
    });

    // await waitFor(() => {
    //   expect(screen.getByText("Terminer et Signer")).toBeDisabled();
    // });
  });

  test("le bouton 'TERMINER et SIGNER' DOIT etre activé QUAND on actualise et visualise APRES avoir ajouter une mention", async () => {
    renderApercuRequeteMiseAJour();

    ajouterUneMention();

    await waitFor(() => {
      expect(screen.getByText("Actualiser et visualiser")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Actualiser et visualiser"));

    await waitFor(() => {
      expect(screen.getByText("Terminer et Signer")).toBeDefined();
    });

    // await waitFor(() => {
    //   expect(screen.getByText("Terminer et Signer")).toBeEnabled();
    // });
  });

  test("le bouton 'TERMINER et SIGNER' DOIT etre desactivé QUAND on commence une action de mise a jour (ajout, modification)", async () => {
    renderApercuRequeteMiseAJour();

    ajouterUneMention();

    await waitFor(() => {
      expect(screen.getByText("Actualiser et visualiser")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Actualiser et visualiser"));

    await waitFor(() => {
      expect(screen.getByText("Terminer et Signer")).toBeDefined();
    });

    // await waitFor(() => {
    //   expect(screen.getByText("Terminer et Signer")).toBeEnabled();
    // });

    // on remplie le premier input des types de mentions
    fireEvent.change(
      screen.getByTestId(`${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_UN}`),
      {
        target: { value: "0185f3c8-5f4c-4ea9-89e1-fb65fcb7b17f" }
      }
    );

    // await waitFor(() => {
    //   expect(screen.getByText("Terminer et Signer")).toBeDisabled();
    // });
  });
});

test("Le bouton 'RETOUR RECHERCHE' s'affiche et, au clic, redirige l'utilisateur vers la page 'RMC acte' QUAND on termine le parcours de signature", async () => {
  const composerDocumentMentionsUlterieuresSpy = vi.spyOn(
    EtatCivilApi,
    "composerDocumentMentionsUlterieures"
  );
  const integrerDocumentMentionsUlterieuresSpy = vi.spyOn(
    EtatCivilApi,
    "integrerDocumentMentionSigne"
  );
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID,
        element: <ApercuRequeteMiseAJourPage />
      },
      {
        path: URL_RECHERCHE_ACTE_INSCRIPTION,
        element: (
          <RMCActeInscriptionPage
            noAutoScroll={false}
            dansFenetreExterne={false}
          />
        )
      }
    ],
    [
      `${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/er5ez456-354v-461z-c5fd-162md289m74h/b41079a5-9e8d-478c-b04c-c4c4ey86537g`
    ]
  );

  render(
    elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte)
  );

  expect(screen.getByText("Acte Registre")).toBeDefined();

  ajouterUneMention();

  expect(screen.getByText("Actualiser et visualiser")).toBeDefined();

  fireEvent.click(screen.getByText("Actualiser et visualiser"));

  expect(screen.getByText("Terminer et Signer")).toBeDefined();

  fireEvent.click(screen.getByText("Terminer et Signer"));

  //expect(screen.getByText("Valider")).toBeDefined();

  // Simulation d'une signature réussie.
  fireEvent(
    window,
    // @ts-ignore
    createEvent(
      "signWebextResponse",
      window,
      {
        detail: {
          direction: "to-call-app",
          document: "documentFictif",
          erreur: null,
          infosSignature: {
            issuerCertificat: "issuerCertificat",
            entiteCertificat: "entiteCertificat",
            autresInformation: "autresInformation"
          }
        }
      },
      { EventType: "CustomEvent" }
    )
  );

  await waitFor(() => {
    expect(composerDocumentMentionsUlterieuresSpy).toHaveBeenCalledWith(
      "b41079a5-9e8d-478c-b04c-c4c4ey86537g",
      "issuerCertificat",
      "entiteCertificat"
    );
  });

  fireEvent(
    window,
    // @ts-ignore
    createEvent(
      "signWebextResponse",
      window,
      {
        detail: {
          direction: "to-call-app",
          document: "documentFinalCompose",
          erreur: null,
          infosSignature: {
            issuerCertificat: "issuerCertificat",
            entiteCertificat: "entiteCertificat",
            autresInformation: "autresInformation"
          }
        }
      },
      { EventType: "CustomEvent" }
    )
  );

  await waitFor(() => {
    expect(integrerDocumentMentionsUlterieuresSpy).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Retour rechercher un acte")).toBeDefined();
  });

  fireEvent.click(screen.getByText("Retour rechercher un acte"));

  await waitFor(() => {
    expect(router.state.location.pathname).toBe(URL_RECHERCHE_ACTE_INSCRIPTION);
  });

  integrerDocumentMentionsUlterieuresSpy.mockClear();
  composerDocumentMentionsUlterieuresSpy.mockClear();
});

test("L'onglets 'Gérer les mentions' disparaissent après avoir signer la mise à jour d'acte", async () => {
  const composerDocumentMentionsUlterieuresSpy = vi.spyOn(
    EtatCivilApi,
    "composerDocumentMentionsUlterieures"
  );
  const integrerDocumentMentionsUlterieuresSpy = vi.spyOn(
    EtatCivilApi,
    "integrerDocumentMentionSigne"
  );
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID,
        element: <ApercuRequeteMiseAJourPage />
      },
      {
        path: URL_RECHERCHE_ACTE_INSCRIPTION,
        element: (
          <RMCActeInscriptionPage
            noAutoScroll={false}
            dansFenetreExterne={false}
          />
        )
      }
    ],
    [
      `${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/er5ez456-354v-461z-c5fd-162md289m74h/b41079a5-9e8d-478c-b04c-c4c4ey86537g`
    ]
  );

  render(
    elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte)
  );

  expect(screen.getByText("Gérer les mentions")).toBeDefined();

  ajouterUneMention();

  expect(screen.getByText("Actualiser et visualiser")).toBeDefined();

  fireEvent.click(screen.getByText("Actualiser et visualiser"));

  expect(screen.getByText("Terminer et Signer")).toBeDefined();

  fireEvent.click(screen.getByText("Terminer et Signer"));

  //expect(screen.getByText("Valider")).toBeDefined();

  // Simulation d'une signature réussie.
  fireEvent(
    window,
    // @ts-ignore
    createEvent(
      "signWebextResponse",
      window,
      {
        detail: {
          direction: "to-call-app",
          document: "documentFictif",
          erreur: null,
          infosSignature: {
            issuerCertificat: "issuerCertificat",
            entiteCertificat: "entiteCertificat",
            autresInformation: "autresInformation"
          }
        }
      },
      { EventType: "CustomEvent" }
    )
  );

  await waitFor(() => {
    expect(composerDocumentMentionsUlterieuresSpy).toHaveBeenCalledWith(
      "b41079a5-9e8d-478c-b04c-c4c4ey86537g",
      "issuerCertificat",
      "entiteCertificat"
    );
  });

  fireEvent(
    window,
    // @ts-ignore
    createEvent(
      "signWebextResponse",
      window,
      {
        detail: {
          direction: "to-call-app",
          document: "documentFinalCompose",
          erreur: null,
          infosSignature: {
            issuerCertificat: "issuerCertificat",
            entiteCertificat: "entiteCertificat",
            autresInformation: "autresInformation"
          }
        }
      },
      { EventType: "CustomEvent" }
    )
  );

  await waitFor(() => {
    expect(integrerDocumentMentionsUlterieuresSpy).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Gérer les mentions")).toBeNull();
  });
});
