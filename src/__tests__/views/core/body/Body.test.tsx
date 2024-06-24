import { Body } from "@core/body/Body";
import { OfficierContext } from "@core/contexts/OfficierContext";
import officier from "@mock/data/connectedUser.json";
import { AccueilPage } from "@pages/accueil/AccueilPage";
import { URL_CONTEXT_APP } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

test("renders BoutonDeconnexion", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_CONTEXT_APP,
        element: (
          <OfficierContext.Provider
            value={{
              officierDataState: { idSSO: officier.id_sso, ...officier }
            }}
          >
            <AccueilPage />
          </OfficierContext.Provider>
        )
      }
    ],
    [URL_CONTEXT_APP]
  );

  render(<RouterProvider router={router} />);
  await waitFor(() => {
    const boutonElement = screen.getByText(
      /prenomConnectedUser nomConnectedUser/i
    );
    expect(boutonElement).toBeInTheDocument();
  });
});

test("renders Body", async () => {
  const off = { ...officier };
  off.profils = [...off.profils];
  off.profils.push("RECE_ADMIN");

  const router = createTestingRouter(
    [
      {
        path: URL_CONTEXT_APP,
        element: (
          <OfficierContext.Provider
            value={{
              officierDataState: {
                idSSO: off.id_sso,
                ...off
              }
            }}
          >
            <AccueilPage />
          </OfficierContext.Provider>
        )
      }
    ],
    [URL_CONTEXT_APP]
  );

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(document.title).toBe("Accueil");
    expect(screen.getByText("Délivrance")).toBeInTheDocument();
  });
});

test("renders Body Connexion en cours", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_CONTEXT_APP,
        element: (
          <OfficierContext.Provider
            value={{
              officierDataState: undefined
            }}
          >
            <Body />
          </OfficierContext.Provider>
        )
      }
    ],
    [URL_CONTEXT_APP]
  );

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    const titre = screen.getByText(/Connexion en cours/i);
    expect(titre).toBeInTheDocument();
  });
});

test("renders Body erreurSysteme", async () => {
  storeRece.logErrorOff = true;
  const off = { ...officier };
  off.profils = [...off.profils];
  off.profils.push("RECE_ADMIN");

  const router = createTestingRouter(
    [
      {
        path: URL_CONTEXT_APP,
        element: (
          <OfficierContext.Provider
            value={{
              officierDataState: {
                ...off
              },
              erreurState: {
                status: "Autre (console.error LogManager)"
              }
            }}
          >
            <Body />
          </OfficierContext.Provider>
        )
      }
    ],
    [URL_CONTEXT_APP]
  );

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    const titre = screen.getByText(/Erreur Système/i);
    expect(titre).toBeDefined();
  });
  storeRece.logErrorOff = false;
});

test("renders Body 403", async () => {
  const off = { ...officier };

  const router = createTestingRouter(
    [
      {
        path: URL_CONTEXT_APP,
        element: (
          <OfficierContext.Provider
            value={{
              officierDataState: {
                ...off
              },
              erreurState: {
                status: 403
              }
            }}
          >
            <Body />
          </OfficierContext.Provider>
        )
      }
    ],
    [URL_CONTEXT_APP]
  );

  render(<RouterProvider router={router} />);

  const titre = screen.getByText(
    /Vous n'avez pas les droits pour utiliser RECE, veuillez contacter le service BIMO/i
  );
  await waitFor(() => {
    expect(titre).toBeDefined();
  });
});
