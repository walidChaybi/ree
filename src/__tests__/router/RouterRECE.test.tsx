import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Link, Navigate, Outlet, RouterProvider, createMemoryRouter } from "react-router";
import { describe, expect, test, vi } from "vitest";
import RouterRECE from "../../router/RouterRECE";
import { URL_DECONNEXION } from "../../router/infoPages/InfoPagesBase";

const TITRE = {
  PAGE: {
    ACCUEIL: "Page accueil",
    DECONNEXION: "Page déconnexion"
  },
  BOUTON: {
    DECONNEXION: "Bouton déconnexion",
    N_IMPORTE_QUOI: "Bouton n'importe quoi"
  }
};

vi.doMock("react-router", () => ({ Navigate, RouterProvider, createBrowserRouter: createMemoryRouter }));

vi.mock("../../router/routes/RoutesEspaceConsulaire.tsx", () => ({
  ROUTES_ESPACE_CONSULAIRE: []
}));

vi.mock("../../router/routes/RoutesEspaceDelivrance.tsx", () => ({
  ROUTES_ESPACE_DELIVRANCE: []
}));

vi.mock("../../router/routes/RoutesEspaceEtablissement.tsx", () => ({
  ROUTES_ESPACE_ETABLISSEMENT: []
}));

vi.mock("../../router/routes/RoutesEspaceInformation.tsx", () => ({
  ROUTES_ESPACE_INFORMATION: []
}));

vi.mock("../../router/routes/RoutesEspaceMiseAJour.tsx", () => ({
  ROUTES_ESPACE_MISE_A_JOUR: []
}));

vi.mock("../../router/routes/RoutesEspaceRecherche.tsx", () => ({
  ROUTES_ESPACE_RECHERCHE: []
}));

vi.mock("../../views/core/header/Header.tsx", () => ({
  Header: () => <div>En-tête</div>
}));

vi.mock("../../views/core/body/Body.tsx", () => ({
  Body: () => <Outlet />
}));

vi.mock("../../pages/accueil/PageAccueil.tsx", () => ({
  default: () => (
    <div>
      <h1>{TITRE.PAGE.ACCUEIL}</h1>
      <Link
        title={TITRE.BOUTON.DECONNEXION}
        to={URL_DECONNEXION}
      />
    </div>
  )
}));

vi.mock("../../composants/commun/chargeurs/AppChargeur.tsx", () => ({
  default: () => (
    <div>
      <h1>{TITRE.PAGE.DECONNEXION}</h1>
      <Link
        title={TITRE.BOUTON.N_IMPORTE_QUOI}
        to={"/n-importe-quoi"}
      />
    </div>
  )
}));

describe("Test du router RECE", () => {
  test("Le router fonctionne correctement", async () => {
    render(
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().generer()}>
        <RouterRECE />
      </MockRECEContextProvider>
    );

    await waitFor(() => expect(screen.getByText(TITRE.PAGE.ACCUEIL)).toBeDefined());

    fireEvent.click(screen.getByTitle(TITRE.BOUTON.DECONNEXION));

    await waitFor(() => expect(screen.getByText(TITRE.PAGE.DECONNEXION)).toBeDefined());

    fireEvent.click(screen.getByTitle(TITRE.BOUTON.N_IMPORTE_QUOI));

    await waitFor(() => expect(screen.getByText(TITRE.PAGE.ACCUEIL)).toBeDefined());
  });
});
