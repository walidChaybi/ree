import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import request from "superagent";
import { userDroitCOMEDEC } from "../../../../mock/data/connectedUserAvecDroit";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { NatureMention } from "../../../../model/etatcivil/enum/NatureMention";
import { DocumentDelivrance } from "../../../../model/requete/enum/DocumentDelivrance";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../../views/common/util/storeRece";
import { EditionExtraitCopiePage } from "../../../../views/pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopiePage";
import {
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_EDITION_ID,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID
} from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, [
  configEtatcivil[0],
  configRequetes[0]
]);

const history = createMemoryHistory();
const globalAny: any = global;
globalAny.URL.createObjectURL = jest.fn();

beforeEach(async () => {
  DocumentDelivrance.init();
  NatureMention.init();
  storeRece.utilisateurCourant = userDroitCOMEDEC;
  history.push(URL_MES_REQUETES_DELIVRANCE);
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
      "9bfa282d-1e66-4538-b242-b9de4f683f0f"
    )
  );
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_EDITION_ID,
      "9bfa282d-1e66-4538-b242-b9de4f683f0f"
    ),
    "9bfa865e-6d7a-4d66-900e-b548178854db"
  );
  await act(async () => {
    render(
      <Router history={history}>
        <Route
          exact={true}
          path={
            URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_EDITION_ID
          }
        >
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });
});

test("Test affichage Edition Extrait", async () => {
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
    expect(screen.getByText("Édition courrier")).toBeDefined();
  });
});

test("Test édition mentions Edition Extrait copie", async () => {
  // Gestion des mentions
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
    expect(screen.getByPlaceholderText("Nature sélectionnée")).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getByText("Première mention"));
  });

  await waitFor(() => {
    expect(screen.getAllByText("Première mention")).toHaveLength(2);
  });
});

test("Ajout mention et réinitialisation", async () => {
  // Gestion des mentions
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
    ).toBeFalsy();
  });

  act(() => {
    fireEvent.change(screen.getByPlaceholderText("Nature ajoutée"), {
      target: {
        value: "b03c5992-d421-4aa1-a4cf-f97f22b267f9"
      }
    });
  });

  await waitFor(() => {
    expect(
      (screen.getByPlaceholderText("Nature ajoutée") as HTMLSelectElement).value
    ).toBe("b03c5992-d421-4aa1-a4cf-f97f22b267f9");
  });

  act(() => {
    fireEvent.click(screen.getByTitle("Ajouter la mention"));
  });

  await waitFor(() => {
    expect(screen.getAllByText("Troisième mention ajoutée")).toBeDefined();
    expect(screen.getByPlaceholderText("Nature sélectionnée")).toBeDefined();
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
  // Gestion des mentions
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
    fireEvent.change(screen.getByPlaceholderText("Nature sélectionnée"), {
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
      (screen.getByText("Terminer") as HTMLButtonElement).disabled
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
    fireEvent.click(screen.getByText("Terminer"));
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(URL_MES_REQUETES_DELIVRANCE);
  });
});

// Copie Intégral
test("Test affichage Edition Copie", async () => {
  await waitFor(() => {
    expect(screen.getAllByText("Copie intégrale")).toBeDefined();
    expect(screen.getAllByText("Requête")).toBeDefined();
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
      screen.getByText("Déverouillage des mentions de la copie intégrale")
    ).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getByTitle("Cliquer pour déverouiller"));
  });

  await waitFor(() => {
    expect(
      screen.getByText(
        /Désélectionner les mentions qui ne doivent pas être éditées/i
      )
    ).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getByTitle("Première mention null null}"));
  });

  await waitFor(() => {
    expect(
      (screen.getByText("Réinitialiser") as HTMLButtonElement).disabled
    ).toBeFalsy();
  });
});


afterAll(() => {
  superagentMock.unset();
});
