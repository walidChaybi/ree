import { IOfficier } from "@model/agent/IOfficier";
import { AccueilPage } from "@pages/accueil/AccueilPage";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router";
import { expect, test } from "vitest";
import MockRECEContextProvider from "../../../mock/context/MockRECEContextProvider";
import mockConnectedUser from "../../../mock/data/connectedUser.json";

const u: any = mockConnectedUser;

test("renders page d'accueil", async () => {
  render(
    <Router>
      <MockRECEContextProvider utilisateurConnecte={u as IOfficier}>
        <AccueilPage />
      </MockRECEContextProvider>
    </Router>
  );

  await waitFor(() => {
    expect(document.title).toBe("Accueil");
    const textElements = screen.getByText(/Bienvenue*/i);
    expect(textElements).toBeDefined();
  });

  await waitFor(() => {
    expect(screen.getByText("Délivrance")).toBeDefined();
    expect(screen.getByText("Création")).toBeDefined();
    expect(screen.getByText("Consulaire")).toBeDefined();
    expect(screen.getAllByText("Tableau de bord")[0]).toBeDefined();
  });
});
