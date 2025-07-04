import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import ObservationsRequete from "../../../../../../composants/pages/requetesDelivrance/commun/requete/ObservationsRequete";

import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import request from "superagent";
import { afterAll, describe, expect, test } from "vitest";
import { ConteneurParentModales } from "../../../../../../composants/commun/conteneurs/modale/ConteneurModale";
import MockRECEContextProvider from "../../../../../mock/context/MockRECEContextProvider";

describe("ObservationsRequete", () => {
  const UTILISATEUR_CONNECTE = MockUtilisateurBuilder.utilisateurConnecte().generer();
  const PRENOM_NOM_UTILISATEUR = UTILISATEUR_CONNECTE.prenomNom;
  const TEXTE_OBSERVATION = "coucou test";

  const requeteMock: IRequeteDelivrance = {
    id: "testIdRequete",
    observations: [
      {
        id: "7ea061e0-c2f6-4ed3-87d9-ff3cce677ba8",
        numeroOrdre: 1,
        texte: TEXTE_OBSERVATION,
        dateObservation: 1732095376916,
        idUtilisateur: UTILISATEUR_CONNECTE.id,
        trigramme: PRENOM_NOM_UTILISATEUR
      }
    ]
  } as IRequeteDelivrance;

  const superagentMock = require("superagent-mock")(request, [
    {
      pattern: `http://localhost/rece/rece-requete-api/v2/requetes/observation`,

      fixtures: function (match: any, params: any, headers: any, context: any) {
        if (match) {
          return { data: "OK" };
        }
      },

      post: function (_: any, data: any) {
        return {
          body: data
        };
      },

      delete: function (_: any, data: any) {
        return {
          body: data
        };
      }
    }
  ]);

  afterAll(() => superagentMock.unset());

  test("Affiche l'observation, la date et l'observateur", async () => {
    render(
      <MockRECEContextProvider utilisateurConnecte={UTILISATEUR_CONNECTE}>
        <ObservationsRequete requete={requeteMock} />
      </MockRECEContextProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(TEXTE_OBSERVATION)).toBeDefined();
      expect(screen.getByText("- 20/11/2024")).toBeDefined();
      expect(screen.getByText(`- ${PRENOM_NOM_UTILISATEUR}`)).toBeDefined();
    });
  });

  test("Suppression et modification impossible si agent différent", async () => {
    render(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecAttributs({ id: "idAutreAgent" }).generer()}
      >
        <ObservationsRequete requete={requeteMock} />
      </MockRECEContextProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTitle("Supprimer l'observation")).toBeNull();
      expect(screen.queryByTitle("Modifier l'observation")).toBeNull();
    });
  });

  test("Ajout d'une observation", async () => {
    render(
      <MockRECEContextProvider utilisateurConnecte={UTILISATEUR_CONNECTE}>
        <ObservationsRequete requete={requeteMock} />
        <ConteneurParentModales />
      </MockRECEContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByTitle("Ajouter une observation")).toBeDefined();
    });

    fireEvent.click(screen.getByTitle("Ajouter une observation"));

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Description")).toBeDefined();
    });

    const MESSAGE = "salut";
    await act(() => userEvent.type(screen.getByPlaceholderText("Description"), MESSAGE));

    fireEvent.click(screen.getByText("Valider"));

    await waitFor(() => {
      expect(screen.queryByText(MESSAGE)).toBeDefined();
      expect(screen.queryByText(`- ${PRENOM_NOM_UTILISATEUR}`)).toBeDefined();
    });
  });

  test("Suppression d'une observation", async () => {
    render(
      <MockRECEContextProvider utilisateurConnecte={UTILISATEUR_CONNECTE}>
        <ObservationsRequete requete={requeteMock} />
        <ConteneurParentModales />
      </MockRECEContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByTitle("Supprimer l'observation")).toBeDefined();
    });

    fireEvent.click(screen.getByTitle("Supprimer l'observation"));
    fireEvent.click(screen.getByText("Valider"));

    await waitFor(() => {
      expect(screen.queryByText(TEXTE_OBSERVATION)).toBeNull();
      expect(screen.queryByText("- 20/11/2024")).toBeNull();
      expect(screen.queryByText(`- ${PRENOM_NOM_UTILISATEUR}`)).toBeNull();
    });
  });

  test("Modification d'une observation", async () => {
    render(
      <MockRECEContextProvider utilisateurConnecte={UTILISATEUR_CONNECTE}>
        <ObservationsRequete requete={requeteMock} />
        <ConteneurParentModales />
      </MockRECEContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByTitle("Modifier l'observation")).toBeDefined();
    });

    fireEvent.click(screen.getByTitle("Modifier l'observation"));

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Description")).toBeDefined();
    });

    const MESSAGE = "salut";
    await waitFor(() => userEvent.type(screen.getByPlaceholderText("Description"), MESSAGE));

    fireEvent.click(screen.getByText("Valider"));

    await waitFor(() => {
      expect(screen.queryByText(`${TEXTE_OBSERVATION}${MESSAGE}`)).toBeDefined();
      expect(screen.queryByText(`- ${PRENOM_NOM_UTILISATEUR}`)).toBeDefined();
    });
  });
});
