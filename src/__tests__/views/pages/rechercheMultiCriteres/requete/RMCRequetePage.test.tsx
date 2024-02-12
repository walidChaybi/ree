import { titreForm } from "@pages/rechercheMultiCriteres/requete/RMCRequeteForm";
import { RMCRequetePage } from "@pages/rechercheMultiCriteres/requete/RMCRequetePage";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import {
  createTestingRouter,
  mockFenetreFicheTestFunctions
} from "../../../../__tests__utils__/testsUtil";

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});

test("renders formulaire Recherche Multi Critères Actes et Inscriptions", async () => {
  await act(async () => {
    render(<RMCRequetePage />);
  });
  await waitFor(() => {
    expect(document.title).toBe(titreForm);
    expect(screen.getByText(titreForm)).toBeInTheDocument();
  });
});

test("Bouton réinitialisation des champs", async () => {
  await act(async () => {
    render(<RMCRequetePage />);
  });

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

  await waitFor(() => {
    expect(numeroRequete).toBeDefined();
    expect(typeRequete).toBeDefined();
    expect(sousTypeRequete).toBeDefined();
    expect(statutRequete).toBeDefined();
  });

  act(() => {
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
  });

  await act(async () => {
    fireEvent.change(sousTypeRequete, {
      target: {
        value: "COMPLETION_REQUETE_EN_COURS"
      }
    });
  });

  await act(async () => {
    fireEvent.change(statutRequete, {
      target: {
        value: "A_TRAITER"
      }
    });
  });

  await waitFor(() => {
    expect(numeroRequete.value).toBe("1234ABCD");
    expect(typeRequete.value).toBe("INFORMATION");
    expect(sousTypeRequete.value).toBe("COMPLETION_REQUETE_EN_COURS");
    expect(statutRequete.value).toBe("A_TRAITER");
  });

  await act(async () => {
    fireEvent.click(reset);
  });

  await waitFor(() => {
    expect(numeroRequete.value).toBe("");
    expect(typeRequete.value).toBe("");
    expect(sousTypeRequete.value).toBe("");
    expect(statutRequete.value).toBe("");
  });
});

test("DOIT pouvoir rechercher une requete par son N° SDANF / numeroDossierNational", async () => {
  act(async () => {
    const router = createTestingRouter(
      [
        {
          path: "/",
          element: <RMCRequetePage />
        }
      ],
      ["/"]
    );

    render(<RouterProvider router={router} />);
  });

  act(() => {
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
});
