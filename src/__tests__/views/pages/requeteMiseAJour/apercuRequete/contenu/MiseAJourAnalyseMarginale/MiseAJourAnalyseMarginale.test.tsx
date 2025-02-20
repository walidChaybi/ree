import { LISTES_TYPES_MENTION, MENTION_NIVEAU_DEUX, MENTION_NIVEAU_UN } from "@composant/formulaire/ConstantesNomsForm";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { NATURE_MENTION } from "@mock/data/NomenclatureNatureMention";
import { TYPE_ALERTE } from "@mock/data/NomenclatureTypeAlerte";
import { TYPE_MENTION } from "@mock/data/NomenclatureTypeMention";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import ApercuRequeteMiseAJourPage from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import { URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS, URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { createTestingRouter } from "../../../../../../__tests__utils__/testsUtil";

describe("Test MiseAJourAnalyseMarginale", () => {
  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);
  TypeAlerte.init(TYPE_ALERTE);

  const LISTE_TYPE_MENTION_NIVEAU_UN = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_UN}`;
  const LISTE_TYPE_MENTION_NIVEAU_DEUX = `${LISTES_TYPES_MENTION}.${MENTION_NIVEAU_DEUX}`;
  const TEXTE_MENTION_PLACEHOLDER = "Texte mention à ajouter";

  const routerAvecContexte = (router: any, utilisateurs?: IUtilisateur[]): any => (
    <MockRECEContextProvider>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );

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
    window.alert = vi.fn();
  });

  test("DOIT afficher le bloc 'Nom Sécable' QUAND on navigue vers l'onglet 'Analyse Marginale' et que l'analyse marginale possède 2 vocables et nomPartie1 et nomPartie2 ", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID,
          element: <ApercuRequeteMiseAJourPage />
        }
      ],
      [`${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/er5ez456-354v-461z-c5fd-162md289m74h/b41079a5-9e8d-478c-b04c-c4c4ey86537g`]
    );

    render(routerAvecContexte(router));

    ajouterMentionQuiModifieAnalyseMarginale();

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText("Analyse marginale")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Analyse marginale"));

    const input1erePartie: HTMLInputElement = screen.getByPlaceholderText("1re partie");
    const input2emePartie: HTMLInputElement = screen.getByPlaceholderText("2nde partie");

    const inputMotif: HTMLInputElement = screen.getByPlaceholderText("Motif");

    await waitFor(() => {
      expect(screen.getByText("Gestion nom sécable pour la délivrance des extraits")).toBeDefined();
      expect(inputMotif.value).toBe("Suite à apposition de mention 14-1");
      expect(screen.getByRole("checkbox")).toBeDefined();
      //expect(screen.getByRole("checkbox")).toBeChecked();
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
      [`${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/er5ez456-354v-461z-c5fd-162md289m74h/a5187320-d722-4673-abd7-a73ed41ad8c1`]
    );

    render(routerAvecContexte(router));

    ajouterMentionQuiModifieAnalyseMarginale();

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText("Analyse marginale")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Analyse marginale"));

    const inputMotif = screen.getByPlaceholderText("Motif") as HTMLInputElement;
    const checkBox: HTMLInputElement = screen.getByRole("checkbox");

    await waitFor(() => {
      expect(screen.getByText("Gestion nom sécable pour la délivrance des extraits")).toBeDefined();
      expect(inputMotif.value).toBe("Suite à apposition de mention 14-1");
      expect(checkBox).toBeDefined();
      expect(checkBox.value).toBeTruthy();
      expect(checkBox).toHaveProperty("disabled");
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
      [`${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/er5ez456-354v-461z-c5fd-162md289m74h/b51079a5-9e8d-478c-b04c-c4c4ey86537g`]
    );

    render(routerAvecContexte(router));

    ajouterMentionQuiModifieAnalyseMarginale();

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText("Analyse marginale")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Analyse marginale"));

    const inputMotif: HTMLInputElement = screen.getByPlaceholderText("Motif");

    await waitFor(() => {
      expect(screen.getByText("Gestion nom sécable pour la délivrance des extraits")).toBeDefined();
      expect(inputMotif.value).toBe("Suite à apposition de mention 14-1");
      expect(screen.getByRole("checkbox")).toBeDefined();
      // expect(screen.getByRole("checkbox")).not.toBeChecked();
      // expect(screen.getByRole("checkbox")).toBeEnabled();
    });
  });

  test("DOIT enregistrer les mentions et l'analyse marginale et rediriger vers l'onglet 'Apercu acte mis a jour' QUAND on clique sur 'Actualiser et Visualiser' apres saisie d'une mention qui modifie l'analyse marginal", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID,
          element: <ApercuRequeteMiseAJourPage />
        }
      ],
      [`${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/er5ez456-354v-461z-c5fd-162md289m74h/b41079a5-9e8d-478c-b04c-c4c4ey86537g`]
    );

    render(routerAvecContexte(router));

    ajouterMentionQuiModifieAnalyseMarginale();

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText("Analyse marginale")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Analyse marginale"));

    const inputNom: HTMLInputElement = screen.getByPlaceholderText("Nom");
    const inputPrenom1: HTMLInputElement = screen.getByPlaceholderText("Prénom 1");
    const inputPrenom2: HTMLInputElement = screen.getByPlaceholderText("Prénom 2");
    const inputPrenom3: HTMLInputElement = screen.getByPlaceholderText("Prénom 3");
    const inputMotif: HTMLInputElement = screen.getByPlaceholderText("Motif");

    const input1erePartie: HTMLInputElement = screen.getByPlaceholderText("1re partie");
    const input2emePartie: HTMLInputElement = screen.getByPlaceholderText("2nde partie");

    await waitFor(() => {
      expect(inputNom.value).toBe("Schlosser Nahed");
      expect(inputPrenom1.value).toBe("Cassandra");
      expect(inputPrenom2.value).toBe("Clara");
      expect(inputPrenom3.value).toBe("Angela");
      expect(inputMotif.value).toBe("Suite à apposition de mention 14-1");
      expect(input1erePartie.value).toBe("Schlosser");
      expect(input2emePartie.value).toBe("Nahed");
    });

    fireEvent.change(inputNom, {
      target: {
        value: "Schlosser Nahedee"
      }
    });

    fireEvent.change(input2emePartie, {
      target: {
        value: "Nahedee"
      }
    });

    await waitFor(() => {
      expect(screen.getByText("Actualiser et visualiser")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Actualiser et visualiser"));

    await waitFor(() => {
      // expect(screen.getByText("Actualiser et visualiser")).toBeDisabled();
      expect(screen.getByText("Apercu acte mis à jour").getAttribute("aria-selected")).toBe("true");
    });
  });
});
