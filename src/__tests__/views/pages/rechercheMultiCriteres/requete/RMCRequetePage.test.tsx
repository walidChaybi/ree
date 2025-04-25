import { titreForm } from "@pages/rechercheMultiCriteres/requete/RMCRequeteForm";
import { RMCRequetePage } from "@pages/rechercheMultiCriteres/requete/RMCRequetePage";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { beforeAll, expect, test } from "vitest";
import { createTestingRouter, mockFenetreFicheTestFunctions } from "../../../../__tests__utils__/testsUtil";
import MockRECEContextProvider from "../../../../mock/context/MockRECEContextProvider";

beforeAll(() => {
  mockFenetreFicheTestFunctions();
});

test("renders formulaire Recherche Multi Critères Actes et Inscriptions", async () => {
  render(<RMCRequetePage />);

  await waitFor(() => {
    expect(document.title).toBe(titreForm);
    expect(screen.getByText(titreForm)).toBeDefined();
  });
});

test("Bouton réinitialisation des champs", async () => {
  render(<RMCRequetePage />);

  const numeroRequete: HTMLInputElement = screen.getByLabelText("requete.numeroRequete");

  const typeRequete: HTMLSelectElement = screen.getByTestId("requete.typeRequete");
  const sousTypeRequete: HTMLSelectElement = screen.getByTestId("requete.sousTypeRequete");
  const statutRequete: HTMLSelectElement = screen.getByTestId("requete.statutRequete");

  const reset = screen.getByText(/Réinitialiser les critères/i);

  await waitFor(() => {
    expect(numeroRequete).toBeDefined();
    expect(typeRequete).toBeDefined();
    expect(sousTypeRequete).toBeDefined();
    expect(statutRequete).toBeDefined();
  });

  fireEvent.change(numeroRequete, {
    target: {
      value: "1234ABCD"
    }
  });

  fireEvent.change(typeRequete, {
    target: {
      value: "INFORMATION"
    }
  });

  fireEvent.change(sousTypeRequete, {
    target: {
      value: "COMPLETION_REQUETE_EN_COURS"
    }
  });

  fireEvent.change(statutRequete, {
    target: {
      value: "A_TRAITER"
    }
  });

  await waitFor(() => {
    expect(numeroRequete.value).toBe("1234ABCD");
    expect(typeRequete.value).toBe("INFORMATION");
    expect(sousTypeRequete.value).toBe("COMPLETION_REQUETE_EN_COURS");
    expect(statutRequete.value).toBe("A_TRAITER");
  });

  fireEvent.click(reset);

  await waitFor(() => {
    expect(numeroRequete.value).toBe("");
    expect(typeRequete.value).toBe("");
    expect(sousTypeRequete.value).toBe("");
    expect(statutRequete.value).toBe("");
  });
});

test("DOIT pouvoir rechercher une requete par son N° SDANF / numeroDossierNational", async () => {
  const router = createTestingRouter(
    [
      {
        path: "/",
        element: <RMCRequetePage />
      }
    ],
    ["/"]
  );

  render(
    <MockRECEContextProvider>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );

  const numeroDossierNational: HTMLInputElement = screen.getByLabelText("requete.numeroDossierNational");
  fireEvent.change(numeroDossierNational, {
    target: {
      value: "2022X 200156"
    }
  });

  fireEvent.click(screen.getByText("Rechercher"));

  await waitFor(() => {
    expect(numeroDossierNational.value).toBe("2022X 200156");
    expect(screen.getByText("2022X 200156")).toBeDefined();
  });
});
