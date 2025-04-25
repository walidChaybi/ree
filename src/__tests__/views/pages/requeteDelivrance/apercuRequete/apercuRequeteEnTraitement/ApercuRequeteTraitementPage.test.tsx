import { ApercuRequeteTraitementPage } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnTraitement/ApercuRequeteTraitementPage";
import { URL_MES_REQUETES_DELIVRANCE, URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router";
import { afterAll, beforeAll, beforeEach, expect, test } from "vitest";
import { createTestingRouter, elementAvecContexte, mockFenetreFicheTestFunctions } from "../../../../../__tests__utils__/testsUtil";
import { LISTE_UTILISATEURS } from "../../../../../mock/data/ListeUtilisateurs";
import { userDroitnonCOMEDEC } from "../../../../../mock/data/mockConnectedUserAvecDroit";

beforeAll(() => {
  mockFenetreFicheTestFunctions();
});

const sauvFonctionEstActive = gestionnaireFeatureFlag.estActif;

beforeEach(() => {
  gestionnaireFeatureFlag.estActif = function () {
    return true;
  };
});

afterAll(() => {
  gestionnaireFeatureFlag.estActif = sauvFonctionEstActive;
});

test.skip("DOIT afficher un loader TANT QUE la requete n'est pas encore chargée.", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
        element: <ApercuRequeteTraitementPage />
      }
    ],
    [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID, "a4cefb71-8457-4f6b-937e-34b49335d494")]
  );

  const { container } = render(elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC, LISTE_UTILISATEURS));

  waitFor(() => {
    expect(container.getElementsByClassName("OperationLocaleEnCoursSimple").length).toBe(1);
  });

  waitFor(() => {
    expect(container.getElementsByClassName("OperationLocaleEnCoursSimple").length).toBe(0);
  });
});

test.skip("renders ApercuRequeteTraitementPage", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
        element: <ApercuRequeteTraitementPage />
      }
    ],
    [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID, "a4cefb71-8457-4f6b-937e-34b49335d494")]
  );

  render(elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC, LISTE_UTILISATEURS));

  const bandeau = screen.getByText("Requête à signer le 14/07/2020 par Ashley YOUNG");
  const actions = screen.getByText(/Suivi requête/i);

  const listeAction1 = screen.getByText(/Saisie de la requête - 10\/03\/2020 - Lennon John/i);
  const listeAction2 = screen.getByText(/À traiter - 10\/03\/2020 - Dylan Bob/i);

  const listeObservation1 = screen.getByText(/C'est vraiment dur de pouvo... - 02\/01\/1970/i);
  const listeObservation2 = screen.getByText(/Je fais pas 30 charactères - 02\/01\/1970 - Dylan Bob/i);

  waitFor(() => {
    expect(document.title).toBe("Aperçu de la requête en traitement");
    expect(bandeau).toBeDefined();
    expect(actions).toBeDefined();
    expect(listeAction1).toBeDefined();
    expect(listeAction2).toBeDefined();
    expect(listeObservation1).toBeDefined();
    expect(listeObservation2).toBeDefined();
  });
});

test.skip("renders document réponses", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
        element: <ApercuRequeteTraitementPage />
      }
    ],
    [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID, "a4cefb71-8457-4f6b-937e-34b49335d494")]
  );

  render(elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC, LISTE_UTILISATEURS));

  const title = screen.getByText(/Documents à délivrer/i);
  const doc1 = screen.getByText(/^Courrier$/);
  const doc2 = screen.getByText(/Certificat d'inscription au RCA/i);

  waitFor(() => {
    expect(title).toBeDefined();
    expect(doc1).toBeDefined();
    expect(doc2).toBeDefined();
  });

  fireEvent.click(doc1);
});
test.skip("transmettre à valideur", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
        element: <ApercuRequeteTraitementPage />
      },
      {
        path: URL_MES_REQUETES_DELIVRANCE,
        element: <ApercuRequeteTraitementPage />
      }
    ],
    [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID, "a4cefb71-8457-4f6b-937e-34b49335d494")]
  );

  render(elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC, LISTE_UTILISATEURS));

  waitFor(() => {
    expect(screen.getByText("Transmettre à valideur")).toBeDefined();
  });

  fireEvent.click(screen.getByText("Transmettre à valideur"));
  const autocomplete = screen.getByTestId("autocomplete");
  const inputChampRecherche = screen.getByLabelText("TransfertPopin") as HTMLInputElement;
  autocomplete.focus();
  fireEvent.change(inputChampRecherche, {
    target: {
      value: "d"
    }
  });

  waitFor(() => {
    expect(screen.getByText("Dylan Bob")).toBeDefined();
  });

  fireEvent.click(screen.getByText("Dylan Bob"));
  fireEvent.change(screen.getByPlaceholderText("Pour vérification"), {
    target: {
      value: "salut"
    }
  });

  waitFor(() => {
    expect((screen.getByText("Valider") as HTMLButtonElement).disabled).toBeFalsy();
  });

  fireEvent.click(screen.getByText("Valider"));

  waitFor(() => {
    expect(router.state.location.pathname).toStrictEqual(URL_MES_REQUETES_DELIVRANCE);
  });
});

test.skip("retour approuvé", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
        element: <ApercuRequeteTraitementPage />
      },
      {
        path: URL_MES_REQUETES_DELIVRANCE,
        element: <ApercuRequeteTraitementPage />
      }
    ],
    [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID, "a4cefb71-8457-4f6b-937e-34b49335d495")]
  );

  render(elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC, LISTE_UTILISATEURS));

  waitFor(() => {
    expect(screen.getByText("Relecture commentée")).toBeDefined();
  });

  fireEvent.click(screen.getByText("Relecture commentée"));

  fireEvent.change(screen.getByPlaceholderText("En retour"), {
    target: {
      value: "c'est nul"
    }
  });

  waitFor(() => {
    expect((screen.getByText("Valider") as HTMLButtonElement).disabled).toBeFalsy();
  });

  fireEvent.click(screen.getByText("Valider"));

  waitFor(() => {
    expect(router.state.location.pathname).toStrictEqual(URL_MES_REQUETES_DELIVRANCE);
  });
});

test.skip("reprendre traitement", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
        element: <ApercuRequeteTraitementPage />
      }
    ],
    [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID, "a4cefb71-8457-4f6b-937e-34b49335d495")]
  );

  render(elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC, LISTE_UTILISATEURS));

  waitFor(() => {
    expect(screen.getByText("Reprendre le traitement")).toBeDefined();
  });

  fireEvent.click(screen.getByText("Reprendre le traitement"));
});
