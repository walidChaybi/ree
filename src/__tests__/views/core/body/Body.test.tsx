import { Body } from "@core/body/Body";
import { ILoginApi } from "@core/login/LoginHook";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import officier from "@mock/data/connectedUser.json";
import { AccueilPage } from "@pages/accueil/AccueilPage";
import { URL_CONTEXT_APP } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

const routerAvecContexte = (
  router: any,
  infosLoginOfficier?: ILoginApi
): any => {
  return (
    <MockRECEContextProvider infosLoginOfficier={infosLoginOfficier}>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );
};
test("renders BoutonDeconnexion", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_CONTEXT_APP,
        element: <AccueilPage />
      }
    ],
    [URL_CONTEXT_APP]
  );
  const off = { idSSO: officier.id_sso, ...officier };
  off.profils = [...off.profils];
  off.profils.push("RECE_ADMIN");
  const infosLoginOfficier = { officierDataState: off };
  render(
    routerAvecContexte(router, infosLoginOfficier as unknown as ILoginApi)
  );
  await waitFor(() => {
    const boutonElement = screen.getByText(
      /prenomConnectedUser nomConnectedUser/i
    );
    expect(boutonElement).toBeInTheDocument();
  });
});

test("renders Body", async () => {
  officier.profils.push("RECE_ADMIN");
  const infosLoginOfficier = {
    officierDataState: { idSSO: officier.id_sso, ...officier }
  };
  const router = createTestingRouter(
    [
      {
        path: URL_CONTEXT_APP,
        element: <AccueilPage />
      }
    ],
    [URL_CONTEXT_APP]
  );

  render(
    routerAvecContexte(router, infosLoginOfficier as unknown as ILoginApi)
  );

  await waitFor(() => {
    expect(document.title).toBe("Accueil");
    expect(screen.getByText("Délivrance")).toBeInTheDocument();
  });
});

// TODO: fix test
test("renders Body Connexion en cours", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_CONTEXT_APP,
        element: <Body />
      }
    ],
    [URL_CONTEXT_APP]
  );

  render(
    <MockRECEContextProvider>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );

  await waitFor(() => {
    const titre = screen.getByText(/Connexion en cours/i);
    expect(titre).toBeInTheDocument();
  });
});

test("renders Body avec erreur de login", async () => {
  storeRece.logErrorOff = true;
  officier.profils.push("RECE_ADMIN");

  const infosLoginOfficier = {
    officierDataState: { ...officier },
    erreurState: {
      status: "Autre (console.error LogManager)"
    }
  };
  const router = createTestingRouter(
    [
      {
        path: URL_CONTEXT_APP,
        element: <Body />
      }
    ],
    [URL_CONTEXT_APP]
  );

  render(
    routerAvecContexte(router, infosLoginOfficier as unknown as ILoginApi)
  );

  screen.debug(undefined, Infinity);

  await waitFor(() => {
    const titre = screen.getByText(/Erreur Système/i);
    expect(titre).toBeDefined();
  });
  storeRece.logErrorOff = false;
});

test("renders Body 403", async () => {
  const infosLoginOfficier = {
    officierDataState: { ...officier },
    erreurState: {
      status: 403
    }
  };
  const router = createTestingRouter(
    [
      {
        path: URL_CONTEXT_APP,
        element: <Body />
      }
    ],
    [URL_CONTEXT_APP]
  );

  render(
    routerAvecContexte(router, infosLoginOfficier as unknown as ILoginApi)
  );

  const titre = screen.getByText(
    /Vous n'avez pas les droits pour utiliser RECE, veuillez contacter le service BIMO/i
  );
  await waitFor(() => {
    expect(titre).toBeDefined();
  });
});
