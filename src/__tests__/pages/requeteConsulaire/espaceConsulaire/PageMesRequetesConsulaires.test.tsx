import { IOfficier } from "@model/agent/IOfficier";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { URL_MES_REQUETES_CONSULAIRE } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import PageMesRequetesConsulaires from "../../../../pages/requetesConsulaire/PageMesRequetesConsulaires";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";
import MockRECEContextProvider from "../../../mock/context/MockRECEContextProvider";
import mockConnectedUser from "../../../mock/data/connectedUser.json";

describe("Test PageMesRequetesConsulaires", () => {
  let u: any = mockConnectedUser;

  const mockRouterPageRequetesConsulaire = () => {
    const utilisateurConnecte = u as IOfficier;

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CONSULAIRE,
          element: (
            <MockRECEContextProvider
              utilisateurConnecte={{ ...utilisateurConnecte } as IOfficier}
              utilisateurs={[{} as IUtilisateur]}
            >
              <PageMesRequetesConsulaires />
            </MockRECEContextProvider>
          )
        }
      ],
      [URL_MES_REQUETES_CONSULAIRE]
    );
    return <RouterProvider router={router} />;
  };
  test("DOIT afficher correctement la page PageMesRequetesConsulaires", async () => {
    render(mockRouterPageRequetesConsulaire());
    await waitFor(() => {
      expect(screen.getByText("Mes requêtes consulaires")).toBeDefined();
    });
  });
  test.skip("DOIT afficher le tableau", async () => {
    render(mockRouterPageRequetesConsulaire());

    await waitFor(() => {
      expect(screen.getByText("N°")).toBeDefined();
      expect(screen.getByTitle("Trier par n°")).toBeDefined();
      expect(screen.getByText("Sous-type")).toBeDefined();
      expect(screen.getByText("Nature acte")).toBeDefined();
      expect(screen.getByText("Titulaire(s)")).toBeDefined();
      expect(screen.getByText("Requérant")).toBeDefined();
      expect(screen.getByText("Initialisation")).toBeDefined();
      expect(screen.getByText("Dernière action")).toBeDefined();
      expect(screen.getByText("Statut")).toBeDefined();
    });
  });
  test.skip("Le taleau doit contenir", async () => {
    render(mockRouterPageRequetesConsulaire());
    await waitFor(() => {
      expect(screen.getByRole("table")).toBeDefined();
      expect(screen.getAllByText("99999")).toBeDefined();
      expect(screen.getAllByText("Acte Transcrit (c)")).toBeDefined();
      expect(screen.getAllByText("PATAMOB Julie")).toBeDefined();
      expect(screen.getAllByText("Greenwald Ambassadeur")).toBeDefined();
      expect(screen.getAllByText("08/01/2025")).toBeDefined();
      expect(screen.getAllByText("08/01/2025")).toBeDefined();
      expect(screen.getAllByText("Prise en charge")).toBeDefined();
    });
  });
});
