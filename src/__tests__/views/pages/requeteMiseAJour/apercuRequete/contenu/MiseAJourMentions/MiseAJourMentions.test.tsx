import {
  LISTES_TYPES_MENTION,
  MENTION_NIVEAU_DEUX,
  MENTION_NIVEAU_TROIS,
  MENTION_NIVEAU_UN
} from "@composant/formulaire/ConstantesNomsForm";
import ApercuRequeteMiseAJourPage from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import {
  URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS,
  URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ZERO } from "@util/Utils";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { createTestingRouter } from "../../../../../../__tests__utils__/testsUtil";

const LISTE_TYPE_MENTION_NIVEAU_UN = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_UN}`;
const LISTE_TYPE_MENTION_NIVEAU_DEUX = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_DEUX}`;
const LISTE_TYPE_MENTION_NIVEAU_TROIS = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_TROIS}`;
const TEXTE_MENTION_PLACEHOLDER = "Texte mention à ajouter";

export const ajouterUneMention = () => {
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

test("DOIT afficher le tableau de mentions de l'onglet de Mise A Jour QUAND on ajoute une mention via le formulaire", async () => {
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
    expect(
      screen.getByTitle(
        "Blablablabla ceci est un texte de mention parfaitement correct."
      )
    ).toBeDefined();
    expect(screen.getByText("Supprimer la mention")).toBeDefined();
    expect(screen.getByText("Modifier la mention")).toBeDefined();
  });
});

test("DOIT desafficher la mention du tableau de mentions de l'onglet de Mise A Jour QUAND on supprime une mention via le formulaire", async () => {
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
    expect(
      screen.getByTitle(
        "Blablablabla ceci est un texte de mention parfaitement correct."
      )
    ).toBeDefined();
  });

  fireEvent.click(screen.getByText("Supprimer la mention"));

  fireEvent.click(screen.getByText("OK"));

  await waitFor(() => {
    expect(screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_UN)).toBeDefined();
    expect(screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_DEUX)).toBeNull();
    expect(screen.queryByTestId(LISTE_TYPE_MENTION_NIVEAU_TROIS)).toBeNull();
    expect(screen.queryByTitle(TEXTE_MENTION_PLACEHOLDER)).toBeNull();
  });
});

test("DOIT editer le tableau de mentions QUAND on modifie une mention via la modification de mention", async () => {
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
    expect(
      screen.getByTitle(
        "Blablablabla ceci est un texte de mention parfaitement correct."
      )
    ).toBeDefined();
  });

  // modification de mentions
  fireEvent.click(screen.getByText("Modifier la mention"));

  // verification du preremplissage des inputs
  await waitFor(() => {
    expect(
      screen.getByText("2 Divorce/Séparation/Annulation mariage")
    ).toBeDefined();
    expect(
      screen.getByText("2-1 & 2-2 divorce/séparation de corps en France")
    ).toBeDefined();
    expect(screen.getByText("2-1 notarié")).toBeDefined();
    expect(
      screen.getByTitle(
        "Blablablabla ceci est un texte de mention parfaitement correct."
      )
    ).toBeDefined();
  });

  fireEvent.change(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_TROIS), {
    target: { value: "96189dcf-69f9-41d2-8039-26476b82ee01" }
  });

  fireEvent.change(screen.getByPlaceholderText(TEXTE_MENTION_PLACEHOLDER), {
    target: {
      value: "Ceci est une mention de mariage de test"
    }
  });

  // await waitFor(() => {
  //   expect(screen.getByText("Modifier mention")).not.toBeDisabled();
  // });

  fireEvent.click(screen.getByText("Modifier mention"));

  // ajout de la mention modifié
  await waitFor(() => {
    expect(
      screen.getByTitle("Ceci est une mention de mariage de test.")
    ).toBeDefined();
  });

  // clique sur la modification de la mention modifié pour afficher les nouveaux inputs
  fireEvent.click(screen.getAllByText("Modifier la mention")[ZERO]);

  // test des nouveaux inputs
  await waitFor(() => {
    expect(
      screen.getByText("2 Divorce/Séparation/Annulation mariage")
    ).toBeDefined();
    expect(
      screen.getByText("2-1 & 2-2 divorce/séparation de corps en France")
    ).toBeDefined();
    expect(screen.getByText("2-2 judiciaire")).toBeDefined();
    expect(
      screen.getByTitle("Ceci est une mention de mariage de test.")
    ).toBeDefined();
  });
});

describe("Verrouillage du bouton 'Actualiser et visualiser'", () => {
  test("A l'affichage initial, le bouton est verrouillé", async () => {
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
      expect(screen.getByText("Actualiser et visualiser")).toBeDefined();
      // expect(screen.getByText("Actualiser et visualiser")).toBeDisabled();
    });
  });

  test.skip("Le bouton est déverrouillé quand une mention a été ajoutée.", async () => {
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

    // await waitFor(() => {
    //   expect(screen.getByText("Actualiser et visualiser")).not.toBeDisabled();
    // });
  });
  test.skip("Le bouton est verrouillé après avoir cliqué dessus.", async () => {
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

    fireEvent.click(screen.getByText("Actualiser et visualiser"));

    // await waitFor(() => {
    //   expect(screen.getByText("Actualiser et visualiser")).toBeDisabled();
    // });
  });

  test.skip("Le bouton est déverrouillé après avoir supprimé une mention enregistrée.", async () => {
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

    // await waitFor(() => {
    //   expect(screen.getByText("Actualiser et visualiser")).not.toBeDisabled();
    // });

    fireEvent.click(screen.getByText("Actualiser et visualiser"));

    await waitFor(() => {
      expect(screen.getByText("Supprimer la mention")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Supprimer la mention"));
    fireEvent.click(screen.getByText("OK"));

    // await waitFor(() => {
    //   expect(screen.getByText("Actualiser et visualiser")).not.toBeDisabled();
    // });
  });
});
