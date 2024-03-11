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
import { RouterProvider } from "react-router-dom";
import { act } from "react-test-renderer";
import { createTestingRouter } from "../../../../../../__tests__utils__/testsUtil";

const inputNiveauUn = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_UN}`;
const inputNiveauDeux = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_DEUX}`;
const inputNiveauTrois = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_TROIS}`;
const inputTexteMentionsPlaceholder = "Texte mention à ajouter";

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

  fireEvent.change(screen.getByTestId(inputNiveauUn), {
    target: { value: "0185f3c8-5f4c-4ea9-89e1-fb65fcb7b17f" }
  });

  fireEvent.change(screen.getByTestId(inputNiveauDeux), {
    target: { value: "7adaa7f8-6228-4e25-87a1-d99f3b98371a" }
  });

  fireEvent.change(screen.getByTestId(inputNiveauTrois), {
    target: { value: "b03c54ae-5130-4062-b7e4-34bed2de7989" }
  });

  fireEvent.change(screen.getByPlaceholderText(inputTexteMentionsPlaceholder), {
    target: {
      value: "Blablablabla ceci est un texte de mention parfaitement correct"
    }
  });

  fireEvent.click(screen.getByText("Ajouter mention"));

  await waitFor(() => {
    expect(
      screen.getByTitle(
        "Blablablabla ceci est un texte de mention parfaitement correct"
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

  fireEvent.change(screen.getByTestId(inputNiveauUn), {
    target: { value: "0185f3c8-5f4c-4ea9-89e1-fb65fcb7b17f" }
  });

  fireEvent.change(screen.getByTestId(inputNiveauDeux), {
    target: { value: "7adaa7f8-6228-4e25-87a1-d99f3b98371a" }
  });

  fireEvent.change(screen.getByTestId(inputNiveauTrois), {
    target: { value: "b03c54ae-5130-4062-b7e4-34bed2de7989" }
  });

  fireEvent.change(screen.getByPlaceholderText(inputTexteMentionsPlaceholder), {
    target: {
      value: "Blablablabla ceci est un texte de mention parfaitement correct"
    }
  });

  fireEvent.click(screen.getByText("Ajouter mention"));

  await waitFor(() => {
    expect(
      screen.getByTitle(
        "Blablablabla ceci est un texte de mention parfaitement correct"
      )
    ).toBeDefined();
  });

  fireEvent.click(screen.getByText("Supprimer la mention"));

  fireEvent.click(screen.getByText("OK"));

  await waitFor(() => {
    expect(screen.queryByTestId(inputNiveauUn)).toBeDefined();
    expect(screen.queryByTestId(inputNiveauDeux)).toBeNull();
    expect(screen.queryByTestId(inputNiveauTrois)).toBeNull();
    expect(screen.queryByTitle(inputTexteMentionsPlaceholder)).toBeNull();
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

  act(() => {
    ////// ajout d'une mention
    fireEvent.change(screen.getByTestId(inputNiveauUn), {
      target: { value: "0185f3c8-5f4c-4ea9-89e1-fb65fcb7b17f" }
    });

    fireEvent.change(screen.getByTestId(inputNiveauDeux), {
      target: { value: "7adaa7f8-6228-4e25-87a1-d99f3b98371a" }
    });

    fireEvent.change(screen.getByTestId(inputNiveauTrois), {
      target: { value: "b03c54ae-5130-4062-b7e4-34bed2de7989" }
    });

    fireEvent.change(
      screen.getByPlaceholderText(inputTexteMentionsPlaceholder),
      {
        target: {
          value:
            "Blablablabla ceci est un texte de mention parfaitement correct"
        }
      }
    );
    fireEvent.click(screen.getByText("Ajouter mention"));
  });

  await waitFor(() => {
    expect(
      screen.getByTitle(
        "Blablablabla ceci est un texte de mention parfaitement correct"
      )
    ).toBeDefined();
  });

  // modification de mentions
  act(() => {
    fireEvent.click(screen.getByText("Modifier la mention"));
  });

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
        "Blablablabla ceci est un texte de mention parfaitement correct"
      )
    ).toBeDefined();
  });

  act(() => {
    fireEvent.change(screen.getByTestId(inputNiveauTrois), {
      target: { value: "96189dcf-69f9-41d2-8039-26476b82ee01" }
    });

    fireEvent.change(
      screen.getByPlaceholderText(inputTexteMentionsPlaceholder),
      {
        target: {
          value: "Ceci est une mention de mariage de test"
        }
      }
    );

    fireEvent.click(screen.getByText("Modifier mention"));
  });

  // ajout de la mention modifié
  setTimeout(() => {
    waitFor(() => {
      expect(
        screen.getByTitle("Ceci est une mention de mariage de test")
      ).toBeDefined();
    });
  }, 1000);

  // clique sur la modification de la mention modifié pour afficher les nouveaux inputs
  await act(() => {
    fireEvent.click(screen.getByText("Modifier la mention"));
  });

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
      screen.getByTitle("Ceci est une mention de mariage de test")
    ).toBeDefined();
  });
});