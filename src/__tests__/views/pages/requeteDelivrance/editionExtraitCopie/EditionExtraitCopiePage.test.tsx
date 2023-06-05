import {
  userDroitCOMEDEC,
  userDroitnonCOMEDEC
} from "@mock/data/connectedUserAvecDroit";
import { requeteAvecCopieIntegraleActeImage } from "@mock/data/DetailRequeteDelivrance";
import { idFicheActeMariage } from "@mock/data/ficheActe";
import { imagePngVideBase64 } from "@mock/data/ImagePng";
import { EditionExtraitCopiePage } from "@pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopiePage";
import {
  PATH_EDITION,
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_EDITION_ID
} from "@router/ReceUrls";
import {
  act,
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory, MemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import { MimeType } from "../../../../../ressources/MimeType";
import { mockFenetreFicheTestFunctions } from "../../../../__tests__utils__/testsUtil";

let history: MemoryHistory;

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});

beforeEach(async () => {
  storeRece.utilisateurCourant = userDroitCOMEDEC;

  history = createMemoryHistory();
  history.push(URL_MES_REQUETES_DELIVRANCE);
});

test("DOIT afficher un loader TANT QUE la requete n'est pas encore chargée.", async () => {
  history.push(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f0f/19c0d767-64e5-4376-aa1f-6d781a2a235a`
  );

  const { container } = render(
    <Router history={history}>
      <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
        <EditionExtraitCopiePage />
      </Route>
    </Router>
  );

  await waitFor(() => {
    expect(
      container.getElementsByClassName("OperationLocaleEnCoursSimple").length
    ).toBe(1);
  });

  setTimeout(() => {
    act(() => {
      expect(
        container.getElementsByClassName("OperationLocaleEnCoursSimple").length
      ).toBe(0);
    });
  }, 3000);
});

test("Test affichage Edition Extrait", async () => {
  history.push(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f0f/19c0d767-64e5-4376-aa1f-6d781a2a235a`
  );

  await act(async () => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });

  await waitFor(() => {
    expect(screen.getAllByText("Extrait avec filiation")).toBeDefined();
    expect(screen.getAllByText("Requête")).toBeDefined();
    expect(screen.getAllByText("Acte registre")).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getAllByText("Extrait avec filiation")[0]);
  });

  await waitFor(() => {
    expect(screen.getAllByText("Gérer les mentions")).toBeDefined();
    expect(screen.getAllByText("Saisir l'extrait")).toBeDefined();
  });

  // Afficher acte registre
  act(() => {
    fireEvent.click(screen.getAllByText("Acte registre")[0]);
  });

  await waitFor(() => {
    expect(screen.getByText("Alertes et informations")).toBeDefined();
  });

  // Afficher Document édité
  act(() => {
    fireEvent.click(screen.getByText("Document édité"));
  });

  await waitFor(() => {
    expect(document).toBeDefined();
  });

  // Afficher Courrier
  act(() => {
    fireEvent.click(screen.getByText("Courrier"));
  });
  await waitFor(() => {
    expect(screen.getByText("Modifier le courrier")).toBeDefined();
  });
});

test("Test édition mentions Edition Extrait copie", async () => {
  history.push(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f0f/19c0d767-64e5-4376-aa1f-6d781a2a235a`
  );

  await act(async () => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });

  // Gestion des mentions
  act(() => {
    fireEvent.click(screen.getAllByText("Extrait avec filiation")[0]);
  });

  await waitFor(() => {
    expect(screen.getByText("Gérer les mentions")).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getAllByText("Gérer les mentions")[0]);
  });

  await waitFor(() => {
    expect(screen.getByText("Ajout d'une mention")).toBeDefined();
    expect(
      screen.getAllByText("Deuxième mention Nantes, le 25 juin 2012")
    ).toBeDefined();
  });

  // Changement d'une mention
  const textarea1 = screen.getAllByText(
    "Deuxième mention Nantes, le 25 juin 2012"
  )[1];

  act(() => {
    fireEvent.change(textarea1, {
      target: {
        value: "Deuxième mention changée"
      }
    });
  });

  await waitFor(() => {
    expect(screen.getByText("Deuxième mention changée")).toBeDefined();
    expect(screen.getByLabelText("Nature sélectionnée")).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getByText("Première mention"));
  });

  await waitFor(() => {
    expect(screen.getAllByText("Première mention")).toHaveLength(1);
  });
});

test("Ajout mention et réinitialisation", async () => {
  history.push(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f0f/19c0d767-64e5-4376-aa1f-6d781a2a235a`
  );

  await act(async () => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });

  // Gestion des mentions
  act(() => {
    fireEvent.click(screen.getAllByText("Extrait avec filiation")[0]);
  });

  await waitFor(() => {
    expect(screen.getByText("Gérer les mentions")).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getAllByText("Gérer les mentions")[0]);
  });

  // Ajout d'une mention
  await waitFor(() => {
    expect(
      screen.getAllByText("Deuxième mention Nantes, le 25 juin 2012")
    ).toBeDefined();
  });

  act(() => {
    fireEvent.change(screen.getByPlaceholderText("Texte mention à ajouter"), {
      target: {
        value: "Troisième mention ajoutée"
      }
    });
  });

  await waitFor(() => {
    expect(
      (
        screen.getByPlaceholderText(
          "Texte mention à ajouter"
        ) as HTMLTextAreaElement
      ).value
    ).toBe("Troisième mention ajoutée");
    expect(
      (screen.getByTitle("Ajouter la mention") as HTMLButtonElement).disabled
    ).toBeTruthy();
  });

  act(() => {
    fireEvent.change(screen.getByLabelText("Nature ajoutée"), {
      target: {
        value: "b03c5992-d421-4aa1-a4cf-f97f22b267f9"
      }
    });
  });

  await waitFor(() => {
    expect(
      (screen.getByTitle("Ajouter la mention") as HTMLButtonElement).disabled
    ).toBeFalsy();
    expect(
      (screen.getByLabelText("Nature ajoutée") as HTMLSelectElement).value
    ).toBe("b03c5992-d421-4aa1-a4cf-f97f22b267f9");
  });

  act(() => {
    fireEvent.click(screen.getByTitle("Ajouter la mention"));
  });

  await waitFor(() => {
    expect(screen.getAllByText("Troisième mention ajoutée")).toBeDefined();
    expect(screen.getByLabelText("Nature sélectionnée")).toBeDefined();
    expect(
      (screen.getByText("Réinitialiser") as HTMLButtonElement).disabled
    ).toBeFalsy();
  });

  act(() => {
    fireEvent.click(screen.getAllByTitle("Supprimer la mention")[0]);
  });

  act(() => {
    fireEvent.click(screen.getByText("Réinitialiser"));
  });

  await waitFor(() => {
    expect(
      screen.getAllByText("Deuxième mention Nantes, le 25 juin 2012")
    ).toBeDefined();
  });
});

test("clic sur mention et sur checkbox et valider", async () => {
  history.push(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f0f/19c0d767-64e5-4376-aa1f-6d781a2a235a`
  );

  await act(async () => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });

  // Gestion des mentions
  act(() => {
    fireEvent.click(screen.getAllByText("Extrait avec filiation")[0]);
  });

  await waitFor(() => {
    expect(screen.getByText("Gérer les mentions")).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getAllByText("Gérer les mentions")[0]);
  });

  await waitFor(() => {
    expect(
      (screen.getByText("Réinitialiser") as HTMLButtonElement).disabled
    ).toBeTruthy();
  });

  // Changement d'une mention
  const textarea1 = screen.getAllByText(
    "Deuxième mention Nantes, le 25 juin 2012"
  )[1];

  act(() => {
    fireEvent.change(textarea1, {
      target: {
        value: "Deuxième mention changée"
      }
    });
  });

  act(() => {
    fireEvent.change(screen.getByLabelText("Nature sélectionnée"), {
      target: {
        value: "b03c5992-d421-4aa1-a4cf-f97f22b267f9"
      }
    });
  });

  act(() => {
    fireEvent.blur(textarea1);
  });

  await waitFor(() => {
    expect(screen.getAllByText("Deuxième mention changée")).toBeDefined();
    expect(
      (screen.getByText("Valider et terminer") as HTMLButtonElement).disabled
    ).toBeFalsy();
  });

  act(() => {
    fireEvent.click(screen.getAllByTitle("Cliquer pour sélectionner")[0]);
  });

  await waitFor(() => {
    expect(
      screen.getAllByTitle("Cliquer pour sélectionner")[0] as HTMLInputElement
    ).not.toBeChecked();
  });

  act(() => {
    fireEvent.click(screen.getByText("Valider"));
  });

  await waitFor(() => {
    expect(
      (screen.getByText("Valider et terminer") as HTMLButtonElement).disabled
    ).toBeFalsy();
  });

  act(() => {
    fireEvent.click(screen.getByText("Valider et terminer"));
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(URL_MES_REQUETES_DELIVRANCE);
  });
});

// Copie Intégral
test("Test affichage Edition Copie", async () => {
  history.push(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f0f/19c0d767-64e5-4376-aa1f-6d781a2a235a`
  );

  await act(async () => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });

  await waitFor(() => {
    expect(screen.getAllByText("Copie intégrale")).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getByText("Copie intégrale"));
  });

  await waitFor(() => {
    expect(screen.getAllByText("Acte registre")).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getAllByText("Gérer les mentions")[0]);
  });

  await waitFor(() => {
    expect(
      screen.getByText("Déverrouiller les mentions de la copie intégrale")
    ).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getByTitle("Cliquer pour déverrouiller"));
  });

  await waitFor(() => {
    expect(
      screen.getByText(
        /Désélectionner les mentions qui ne doivent pas être éditées/i
      )
    ).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getAllByTitle("Cliquer pour sélectionner")[0]);
  });

  await waitFor(() => {
    expect(
      (screen.getByText("Réinitialiser") as HTMLButtonElement).disabled
    ).toBeFalsy();
  });

  act(() => {
    fireEvent.click(screen.getByText("Valider"));
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f0f/19c0d767-64e5-4376-aa1f-6d781a2a235a`
    );
  });
});

test("Attendu: la modification d'une copie acte image s'effectue correctement", async () => {
  history.push(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/${requeteAvecCopieIntegraleActeImage.id}/${idFicheActeMariage}`
  );

  await act(async () => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("Modifier la copie à délivrer")).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Modifier la copie à délivrer"));
  });

  const detail = {
    fichiersModifies: [
      {
        contenuBase64: imagePngVideBase64,
        typeMime: MimeType.IMAGE_TIFF
      }
    ]
  };

  // Simulation du retour de l'application native retouche d'image (web extension)
  await fireCustomEvent(detail);

  await waitFor(() => {
    expect(screen.getByText("Modifier la copie à délivrer")).toBeDefined();
  });
});

async function fireCustomEvent(detail: any) {
  await act(async () => {
    fireEvent(
      window,
      //@ts-ignore
      createEvent(
        "retoucheimageWebextResponse",
        window,
        {
          detail,
          erreurs: []
        },
        { EventType: "CustomEvent" }
      )
    );
  });
}

// Modifier Corps extrait
test("Test modifier corps extrait", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  history.push(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f0f/19c0d767-64e5-4376-aa1f-6d781a2a235a`
  );

  await act(async () => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });

  await act(async () => {
    fireEvent.click(screen.getAllByText("Extrait avec filiation")[0]);
  });

  await waitFor(() => {
    expect(screen.getByText("Modifier le corps de l'extrait")).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(screen.getAllByText("Modifier le corps de l'extrait")[0]);
  });

  const textarea = screen.getByPlaceholderText("Corps de l'extrait");

  await waitFor(() => {
    expect(
      (screen.getByText("Réinitialiser") as HTMLButtonElement).disabled
    ).toBeTruthy();
    expect(textarea).toBeDefined();
  });

  await act(async () => {
    fireEvent.change(textarea, { target: { value: "salut toi" } });
  });
  await waitFor(() => {
    expect(screen.getByText("salut toi")).toBeDefined();
    expect(
      (screen.getByText("Réinitialiser") as HTMLButtonElement).disabled
    ).toBeFalsy();
  });

  await waitFor(() => {
    expect(
      (screen.getByText("Valider") as HTMLButtonElement).disabled
    ).toBeFalsy();
  });

  await act(async () => {
    fireEvent.click(screen.getByLabelText("Valider"));
  });

  await waitFor(() => {
    expect(screen.getByText("salut toi")).toBeDefined();
  });
});

// Ajout mention nationalité auto
test("Test ajout nationalité auto", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  history.push(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/7b448d64-add5-4dbd-8041-b7081ea7bc86/b41079a5-9e8d-478c-b04c-c4c2ac67134a`
  );

  await act(async () => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Valider"));
  });

  await waitFor(() => {
    expect(screen.getAllByText("Courrier")).toBeDefined();
  });
});

test("Test création extrait plurilingue", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  history.push(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/3f52370d-14ed-4c55-8cf4-afe006d9aa38/19c0d767-64e5-4376-aa1f-6d781a2a235e`
  );

  await act(async () => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });

  await waitFor(() => {
    expect(
      screen.getByText("Extrait avec filiation plurilingue")
    ).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getByText("Extrait avec filiation plurilingue"));
  });

  await waitFor(() => {
    expect(screen.getByText("Gérer les mentions")).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getByText("Gérer les mentions"));
  });

  await waitFor(() => {
    expect(screen.getByText("Sc 31-01-92 Nantes Jenmi")).toBeDefined();
    expect(
      screen.getByText(
        "Mar 15-06-2021 nantes (Pays de Loire) LES BRONZÉES-FONT'DU SKI Jean-Claude, Popeye Bernard"
      )
    ).toBeDefined();
  });
});

test("Test reprendre traitement", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  history.push(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/3f52370d-14ed-4c55-8cf4-afe006d9aa39/19c0d767-64e5-4376-aa1f-6d781a2a235e`
  );

  await act(async () => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("Reprendre le traitement")).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Reprendre le traitement"));
  });
});
