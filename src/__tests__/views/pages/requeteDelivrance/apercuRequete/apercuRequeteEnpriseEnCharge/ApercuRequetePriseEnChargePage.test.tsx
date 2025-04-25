import { ApercuRequetePriseEnChargePage } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/ApercuRequetePriseEnChargePage";
import { MOTIF_IGNORE } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/IgnoreRequetePopin";
import {
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_DELIVRANCE_EDITION_ID
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { Navigate, RouterProvider } from "react-router";
import { beforeAll, expect, test } from "vitest";
import PageEditionRequeteDelivrance from "../../../../../../pages/requetesDelivrance/PageEditionRequeteDelivrance";
import { createTestingRouter, mockFenetreFicheTestFunctions } from "../../../../../__tests__utils__/testsUtil";
import MockRECEContextProvider from "../../../../../mock/context/MockRECEContextProvider";
import { LISTE_UTILISATEURS } from "../../../../../mock/data/ListeUtilisateurs";
import { DataRMCActeAvecResultat, DataTableauActe } from "../../../../../mock/data/RMCActe";
import { DataRMCInscriptionAvecResultat, DataTableauInscription } from "../../../../../mock/data/RMCInscription";

beforeAll(() => {
  mockFenetreFicheTestFunctions();
});

const routerAvecContexte = (router: any): any => {
  return (
    <MockRECEContextProvider utilisateurs={LISTE_UTILISATEURS}>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );
};

test.skip("DOIT afficher un loader TANT QUE la requete n'est pas encore chargée.", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        element: <ApercuRequetePriseEnChargePage />
      }
    ],
    [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, "a4cefb71-8457-4f6b-937e-34b49335d884")]
  );

  const { container } = render(routerAvecContexte(router));

  await waitFor(() => {
    expect(container.getElementsByClassName("OperationLocaleEnCoursSimple").length).toBe(1);
  });

  await waitFor(() => {
    expect(container.getElementsByClassName("OperationLocaleEnCoursSimple").length).toBe(0);
  });
});

test.skip("renders ApercuRequetePriseEnChargePage", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        element: <ApercuRequetePriseEnChargePage />
      },
      {
        path: "/",
        // passer un state
        element: (
          <Navigate
            to={getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, "a4cefb71-8457-4f6b-937e-34b49335d884")}
            state={{
              dataRMCAutoActe: DataRMCActeAvecResultat,
              dataTableauRMCAutoActe: { DataTableauActe },
              dataRMCAutoInscription: DataRMCInscriptionAvecResultat,
              dataTableauRMCAutoInscription: { DataTableauInscription }
            }}
          />
        )
      }
    ],
    [
      // ici, on passe "/" comme initialEntries afin d'arriver sur la route "/" pour etre redirigé vers la route qu'on souhaite
      // tester avec le bon navigation state passé via la props state du <Navigate />
      "/"
    ]
  );

  render(routerAvecContexte(router));

  await waitFor(() => {
    expect(document.title).toBe("Aperçu de la requête en prise en charge");
    expect(screen.getByText("Requête prise en charge par : Ashley YOUNG - Le : 14/07/2020")).toBeDefined();
    expect(screen.getByText(/Suivi requête/i)).toBeDefined();
    expect(screen.getByText(/Saisie de la requête/i)).toBeDefined();
    expect(screen.getByText(/À traiter - 10\/03\/2020 - Dylan Bob/i)).toBeDefined();
    expect(screen.getByText(/C'est vraiment dur de pouvo... - 02\/01\/1970/i)).toBeDefined();
    expect(screen.getByText(/Je fais pas 30 charactères - 02\/01\/1970 - Dylan Bob/i)).toBeDefined();
  });

  const checkboxColumns: HTMLElement[] = screen.getAllByRole("checkbox");
  await waitFor(() => {
    expect(checkboxColumns).toBeDefined();
  });

  // Tableau Acte
  fireEvent.click(checkboxColumns[0]);

  await waitFor(() => {
    expect(screen.getAllByText("1 élément(s) coché(s)")).toBeDefined();
  });

  fireEvent.click(checkboxColumns[0]);

  await waitFor(() => {
    const elementsCoches = screen.getAllByText("0 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });

  // Tableau inscription
  fireEvent.click(checkboxColumns[9]);

  await waitFor(() => {
    expect(screen.getAllByText("1 élément(s) coché(s)")).toBeDefined();
  });

  fireEvent.click(checkboxColumns[9]);

  await waitFor(() => {
    expect(screen.getAllByText("0 élément(s) coché(s)")).toBeDefined();
  });
});

test.skip("redirection requete RDD", async () => {
  // duplica de AfficheComposant() pour avoir acces au router au sein du test
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        element: <ApercuRequetePriseEnChargePage />
      },
      {
        path: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
        element: <PageEditionRequeteDelivrance />
      },
      {
        path: "/",
        // passer un state
        element: (
          <Navigate
            to={getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, "a4cefb71-8457-4f6b-937e-34b49335d884")}
            state={{
              dataRMCAutoActe: DataRMCActeAvecResultat,
              dataTableauRMCAutoActe: { DataTableauActe },
              dataRMCAutoInscription: DataRMCInscriptionAvecResultat,
              dataTableauRMCAutoInscription: { DataTableauInscription }
            }}
          />
        )
      }
    ],
    ["/"]
  );

  render(routerAvecContexte(router));

  const checkboxColumns: HTMLElement[] = screen.getAllByRole("checkbox");

  // Tableau Acte
  fireEvent.click(checkboxColumns[0]);

  fireEvent.click(screen.getByText("Délivrer"));

  fireEvent.click(screen.getByText(/Copie intégrale/i));

  fireEvent.click(screen.getByText(/Oui/i));

  await waitFor(() => {
    expect(router.state.location.pathname).toBe(
      "/rece/rece-ui/mesrequetes/Edition/a4cefb71-8457-4f6b-937e-34b49335d666/b41079a5-9e8d-478c-b04c-c4c2ac67134f"
    );
  });
});

test.skip("redirection requete RDC", async () => {
  // duplica de AfficheComposant() pour avoir acces au router au sein du test
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        element: <ApercuRequetePriseEnChargePage />
      },

      {
        path: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
        element: <PageEditionRequeteDelivrance />
      },
      {
        path: "/",
        // element de navigation qui permet de passer un state
        element: (
          <Navigate
            to={getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, "a4cefb71-8457-4f6b-937e-34b49335d884")}
            state={{
              dataRMCAutoActe: DataRMCActeAvecResultat,
              dataTableauRMCAutoActe: { DataTableauActe },
              dataRMCAutoInscription: DataRMCInscriptionAvecResultat,
              dataTableauRMCAutoInscription: { DataTableauInscription }
            }}
          />
        )
      }
    ],
    ["/"]
  );

  render(routerAvecContexte(router));

  const checkboxColumns: HTMLElement[] = screen.getAllByRole("checkbox");

  // Tableau Acte
  fireEvent.click(checkboxColumns[0]);

  fireEvent.click(screen.getByText("Délivrer"));

  fireEvent.click(screen.getByText(/Copie intégrale/i));

  fireEvent.click(screen.getByText(/Oui/i));

  await waitFor(() => {
    expect(router.state.location.pathname).toBe(
      "/rece/rece-ui/mesrequetes/Edition/a4cefb71-8457-4f6b-937e-34b49335d666/b41079a5-9e8d-478c-b04c-c4c2ac67134f"
    );
  });
});

test.skip("ignorer requete", async () => {
  // duplica de AfficheComposant() pour avoir acces au router au sein du test
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        element: <ApercuRequetePriseEnChargePage />
      },
      {
        path: URL_MES_REQUETES_DELIVRANCE,
        element: <PageEditionRequeteDelivrance />
      },
      {
        path: "/",
        // element de navigation qui permet de passer un state
        element: (
          <Navigate
            to={getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, "a4cefb71-8457-4f6b-937e-34b49335d666")}
            state={{
              dataRMCAutoActe: DataRMCActeAvecResultat,
              dataTableauRMCAutoActe: { DataTableauActe },
              dataRMCAutoInscription: DataRMCInscriptionAvecResultat,
              dataTableauRMCAutoInscription: { DataTableauInscription }
            }}
          />
        )
      }
    ],
    [
      // ici, on passe "/" comme initialEntries afin d'arriver sur la route "/" pour etre redirigé vers la route qu'on souhaite
      // testé avec le bon navigation state passé via la props state du <Navigate />
      "/"
    ]
  );

  render(routerAvecContexte(router));

  await waitFor(() => {
    expect(screen.getByText(/Documents à délivrer/i)).toBeDefined();
    expect(screen.getByText(/Certificat d'inscription au RCA/i)).toBeDefined();
  });

  fireEvent.click(screen.getByText(/Certificat d'inscription au RCA/i));

  const bontonIgnore = screen.getByText(/Ignorer+/);
  await waitFor(() => {
    expect(bontonIgnore).toBeDefined();
  });

  fireEvent.click(bontonIgnore);

  const select: HTMLSelectElement = screen.getByTestId(MOTIF_IGNORE);

  await waitFor(() => {
    expect(select).toBeDefined();
  });

  fireEvent.change(select, {
    target: {
      value: "Adresse incomplète"
    }
  });

  const valider = screen.getByText("Valider");
  await waitFor(() => {
    expect(valider).toBeDefined();
  });

  fireEvent.click(valider);

  await waitFor(() => {
    expect(router.state.location.pathname).toBe(URL_MES_REQUETES_DELIVRANCE);
  });
});
