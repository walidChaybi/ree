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
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { NatureMention } from "../../../../model/etatcivil/enum/NatureMention";
import { DocumentDelivrance } from "../../../../model/requete/enum/DocumentDelivrance";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";
import { EditionExtraitCopiePage } from "../../../../views/pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopiePage";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_EDITION_ID } from "../../../../views/router/ReceUrls";

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

test("Test affichage Edition Extrait copie", async () => {
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

  // Suppression d'une mention
  act(() => {
    fireEvent.click(screen.getAllByTitle("Supprimer la mention")[0]);
  });
});

test("Ajout mention et réinitialisation", async () => {
  // Ajout d'une mention
  await waitFor(() => {
    expect(
      screen.getAllByText("Deuxième mention Nantes, le 25 juin 2012")
    ).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getAllByTitle("Supprimer la mention")[0]);
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
    fireEvent.click(screen.getAllByText("Troisième mention ajoutée")[0]);
    fireEvent.click(screen.getByText("Réinitialiser"));
  });

  await waitFor(() => {
    expect(
      screen.getAllByText("Deuxième mention Nantes, le 25 juin 2012")
    ).toBeDefined();
  });
});

test("clic sur mention et sur checkbox", () => {
  // Gestion des mentions
  act(() => {
    fireEvent.click(screen.getAllByText("Gérer les mentions")[0]);
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

  /*await waitFor(() => {
      expect(screen.getByText("Ajout d'une mention")).toBeDefined();
      expect(
        screen.getAllByText("Deuxième mention Nantes, le 25 juin 2012")
      ).toBeDefined();
    });*/
});

afterAll(() => {
  superagentMock.unset();
});
