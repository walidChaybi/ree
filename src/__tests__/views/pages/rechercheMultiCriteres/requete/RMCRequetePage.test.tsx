import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { titreForm } from "@pages/rechercheMultiCriteres/requete/RMCRequeteForm";
import { RMCRequetePage } from "@pages/rechercheMultiCriteres/requete/RMCRequetePage";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { beforeAll, expect, test } from "vitest";
import {
  createTestingRouter,
  mockFenetreFicheTestFunctions
} from "../../../../__tests__utils__/testsUtil";

beforeAll(() => {
  mockFenetreFicheTestFunctions();
});

test("renders formulaire Recherche Multi Critères Actes et Inscriptions", () => {
  render(<RMCRequetePage />);
  waitFor(() => {
    expect(document.title).toBe(titreForm);
    expect(screen.getByText(titreForm)).toBeDefined();
  });
});

test("Bouton réinitialisation des champs", () => {
  render(<RMCRequetePage />);

  const numeroRequete = screen.getByLabelText(
    "requete.numeroRequete"
  ) as HTMLInputElement;
  const typeRequete = screen.getByTestId(
    "requete.typeRequete"
  ) as HTMLSelectElement;

  const sousTypeRequete = screen.getByTestId(
    "requete.sousTypeRequete"
  ) as HTMLSelectElement;

  const statutRequete = screen.getByTestId(
    "requete.statutRequete"
  ) as HTMLSelectElement;

  const reset = screen.getByText(/Réinitialiser les critères/i);

  waitFor(() => {
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

  waitFor(() => {
    expect(numeroRequete.value).toBe("1234ABCD");
    expect(typeRequete.value).toBe("INFORMATION");
    expect(sousTypeRequete.value).toBe("COMPLETION_REQUETE_EN_COURS");
    expect(statutRequete.value).toBe("A_TRAITER");
  });

  fireEvent.click(reset);

  waitFor(() => {
    expect(numeroRequete.value).toBe("");
    expect(typeRequete.value).toBe("");
    expect(sousTypeRequete.value).toBe("");
    expect(statutRequete.value).toBe("");
  });
});

test("DOIT pouvoir rechercher une requete par son N° SDANF / numeroDossierNational", () => {
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

  const numeroDossierNational = screen.getByLabelText(
    "requete.numeroDossierNational"
  ) as HTMLInputElement;
  fireEvent.change(numeroDossierNational, {
    target: {
      value: "2022X 200156"
    }
  });

  fireEvent.click(screen.getByText("Rechercher"));

  waitFor(() => {
    expect(numeroDossierNational.value).toBe("2022X 200156");
    expect(screen.getByText("2022X 200156")).toBeDefined();
  });
});
