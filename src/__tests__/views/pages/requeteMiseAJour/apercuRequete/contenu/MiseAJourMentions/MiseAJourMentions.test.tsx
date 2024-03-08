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
import { createTestingRouter } from "../../../../../../__tests__utils__/testsUtil";

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

  const inputNiveauUn = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_UN}`;
  const inputNiveauDeux = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_DEUX}`;
  const inputNiveauTrois = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_TROIS}`;
  const inputTexteMentionsPlaceholder = "Texte mention à ajouter";

  fireEvent.change(screen.getByTestId(inputNiveauUn), {
    target: { value: "2 Divorce/Séparation/Annulation mariage" }
  });

  fireEvent.change(screen.getByTestId(inputNiveauDeux), {
    target: { value: "2-1 & 2-2 divorce/séparation de corps en France" }
  });

  fireEvent.change(screen.getByTestId(inputNiveauTrois), {
    target: { value: "2-1 notarié" }
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

test("DOIT desafficher le tableau de mentions de l'onglet de Mise A Jour QUAND on supprime une mention via le formulaire", async () => {
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

  const inputNiveauUn = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_UN}`;
  const inputNiveauDeux = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_DEUX}`;
  const inputNiveauTrois = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_TROIS}`;
  const inputTexteMentionsPlaceholder = "Texte mention à ajouter";

  fireEvent.change(screen.getByTestId(inputNiveauUn), {
    target: { value: "2 Divorce/Séparation/Annulation mariage" }
  });

  fireEvent.change(screen.getByTestId(inputNiveauDeux), {
    target: { value: "2-1 & 2-2 divorce/séparation de corps en France" }
  });

  fireEvent.change(screen.getByTestId(inputNiveauTrois), {
    target: { value: "2-1 notarié" }
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
    expect(
      screen.queryByTitle(
        "Blablablabla ceci est un texte de mention parfaitement correct"
      )
    ).toBeNull();
  });
});
