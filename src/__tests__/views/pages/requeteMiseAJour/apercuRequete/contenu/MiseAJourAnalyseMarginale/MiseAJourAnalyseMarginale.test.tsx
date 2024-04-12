import {
  LISTES_TYPES_MENTION,
  MENTION_NIVEAU_DEUX,
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

const LISTE_TYPE_MENTION_NIVEAU_UN = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_UN}`;
const LISTE_TYPE_MENTION_NIVEAU_DEUX = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_DEUX}`;
const TEXTE_MENTION_PLACEHOLDER = "Texte mention à ajouter";

const ajouterMentionQuiModifieAnalyseMarginale = () => {
  fireEvent.change(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_UN), {
    target: { value: "62569b32-666e-4a9f-9204-643d18ad2a6b" }
  });

  fireEvent.change(screen.getByTestId(LISTE_TYPE_MENTION_NIVEAU_DEUX), {
    target: { value: "b0489bb0-6516-46a4-bbf3-22678749197d" }
  });

  fireEvent.change(screen.getByPlaceholderText(TEXTE_MENTION_PLACEHOLDER), {
    target: {
      value: "Blablablabla ceci est un texte de mention parfaitement correct"
    }
  });

  fireEvent.click(screen.getByText("Ajouter mention"));
};

beforeEach(() => {
  window.alert = jest.fn();
});

test("DOIT afficher le bloc 'Nom Sécable' QUAND on navigue vers l'onglet 'Analyse Marginale' et que l'analyse marginale possède 2 vocables et nomPartie1 et nomPartie2 ", async () => {
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

  ajouterMentionQuiModifieAnalyseMarginale();

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalled();
  });

  await waitFor(() => {
    expect(screen.getByText("Analyse marginale")).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText("Analyse marginale"));

  const input1erePartie = screen.getByPlaceholderText(
    "1re partie"
  ) as HTMLInputElement;
  const input2emePartie = screen.getByPlaceholderText(
    "2nde partie"
  ) as HTMLInputElement;

  await waitFor(() => {
    expect(
      screen.getByText("Gestion nom sécable pour la délivrance des extraits")
    ).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(input1erePartie.value).toBe("Schlosser");
    expect(input2emePartie.value).toBe("Nahed");
  });
});

test("DOIT afficher le bloc 'Nom Sécable' QUAND on navigue vers l'onglet 'Analyse Marginale' et que l'analyse marginale possède 1 vocable et nomPartie1 et nomPartie2 ", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID,
        element: <ApercuRequeteMiseAJourPage />
      }
    ],
    [
      `${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/er5ez456-354v-461z-c5fd-162md289m74h/a5187320-d722-4673-abd7-a73ed41ad8c1`
    ]
  );

  render(<RouterProvider router={router} />);

  ajouterMentionQuiModifieAnalyseMarginale();

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalled();
  });

  await waitFor(() => {
    expect(screen.getByText("Analyse marginale")).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText("Analyse marginale"));

  await waitFor(() => {
    expect(
      screen.getByText("Gestion nom sécable pour la délivrance des extraits")
    ).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });
});

test("DOIT afficher le bloc 'Nom Sécable' QUAND on navigue vers l'onglet 'Analyse Marginale' et que l'analyse marginale possède 2 vocables et nomPartie1 seulement", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID,
        element: <ApercuRequeteMiseAJourPage />
      }
    ],
    [
      `${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/er5ez456-354v-461z-c5fd-162md289m74h/b51079a5-9e8d-478c-b04c-c4c4ey86537g`
    ]
  );

  render(<RouterProvider router={router} />);

  ajouterMentionQuiModifieAnalyseMarginale();

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalled();
  });

  await waitFor(() => {
    expect(screen.getByText("Analyse marginale")).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText("Analyse marginale"));

  await waitFor(() => {
    expect(
      screen.getByText("Gestion nom sécable pour la délivrance des extraits")
    ).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByRole("checkbox")).toBeEnabled();
  });
});
