import { LISTE_UTILISATEURS } from "@mock/data/ListeUtilisateurs";
import { DataRMCActeAvecResultat, DataTableauActe } from "@mock/data/RMCActe";
import {
  DataRMCInscriptionAvecResultat,
  DataTableauInscription
} from "@mock/data/RMCInscription";
import { ApercuRequetePriseEnChargePage } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/ApercuRequetePriseEnChargePage";
import { MOTIF_IGNORE } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/IgnoreRequetePopin";
import {
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { Navigate, RouterProvider } from "react-router-dom";
import {
  createTestingRouter,
  mockFenetreFicheTestFunctions
} from "../../../../../__tests__utils__/testsUtil";

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});

beforeAll(() => {
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS;
});

async function afficheComposantTest(idRequete: string) {
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
            to={getUrlWithParam(
              URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
              idRequete
            )}
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

  await act(async () => {
    render(<RouterProvider router={router} />);
  });
}

test("DOIT afficher un loader TANT QUE la requete n'est pas encore chargée.", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        element: <ApercuRequetePriseEnChargePage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d884"
      )
    ]
  );

  const { container } = render(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(
      container.getElementsByClassName("OperationLocaleEnCoursSimple").length
    ).toBe(1);
  });

  setTimeout(() => {
    act(() => {
      expect(
        container.getElementsByClassName("OperationLocaleEnCoursSimple").length
      ).toBe(0);
    });
  }, 0);
});

test("renders ApercuRequetePriseEnChargePage", async () => {
  await afficheComposantTest("a4cefb71-8457-4f6b-937e-34b49335d884");

  const bandeau = screen.getByText(
    "Requête prise en charge par : Ashley YOUNG - Le : 14/07/2020"
  );
  const actions = screen.getByText(/Suivi requête/i);

  const listeAction1 = screen.getByText(
    /Saisie de la requête - 10\/03\/2020 - APP/i
  );
  const listeAction2 = screen.getByText(/À traiter - 10\/03\/2020 - BOB/i);

  const listeObservation1 = screen.getByText(
    /C'est vraiment dur de pouvo... - 02\/01\/1970/i
  );
  const listeObservation2 = screen.getByText(
    /Je fais pas 30 charactères - 02\/01\/1970 - BOB/i
  );
  const checkboxColumns: HTMLElement[] = screen.getAllByRole("checkbox");

  await waitFor(() => {
    expect(document.title).toBe("Aperçu de la requête en prise en charge");
    expect(bandeau).toBeDefined();
    expect(actions).toBeDefined();
    expect(listeAction1).toBeDefined();
    expect(listeAction2).toBeDefined();
    expect(listeObservation1).toBeDefined();
    expect(listeObservation2).toBeDefined();
    expect(checkboxColumns).toBeDefined();
  });

  // Tableau Acte
  await act(async () => {
    fireEvent.click(checkboxColumns[0]);
  });

  await waitFor(() => {
    const elementsCoches = screen.getAllByText("1 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(checkboxColumns[0]);
  });

  await waitFor(() => {
    const elementsCoches = screen.getAllByText("0 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });

  // Tableau inscription
  await act(async () => {
    fireEvent.click(checkboxColumns[9]);
  });

  await waitFor(() => {
    const elementsCoches = screen.getAllByText("1 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(checkboxColumns[9]);
  });

  await waitFor(() => {
    const elementsCoches = screen.getAllByText("0 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });
});

test("redirection requete RDD", async () => {
  // duplica de AfficheComposant() pour avoir acces au router au sein du test
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
            to={getUrlWithParam(
              URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
              "a4cefb71-8457-4f6b-937e-34b49335d884"
            )}
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

  await act(async () => {
    render(<RouterProvider router={router} />);
  });

  const checkboxColumns: HTMLElement[] = screen.getAllByRole("checkbox");

  // Tableau Acte
  await act(async () => {
    fireEvent.click(checkboxColumns[0]);
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Délivrer"));
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Copie intégrale/i));
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Oui/i));
  });

  expect(router.state.location.pathname).toBe(
    "/rece/rece-ui/mesrequetes/Edition/a4cefb71-8457-4f6b-937e-34b49335d666/b41079a5-9e8d-478c-b04c-c4c2ac67134f"
  );
});

test("redirection requete RDC", async () => {
  // duplica de AfficheComposant() pour avoir acces au router au sein du test
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        element: <ApercuRequetePriseEnChargePage />
      },
      {
        path: "/",
        // element de navigation qui permet de passer un state
        element: (
          <Navigate
            to={getUrlWithParam(
              URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
              "a4cefb71-8457-4f6b-937e-34b49335d884"
            )}
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

  await act(async () => {
    render(<RouterProvider router={router} />);
  });

  const checkboxColumns: HTMLElement[] = screen.getAllByRole("checkbox");

  // Tableau Acte
  await act(async () => {
    fireEvent.click(checkboxColumns[0]);
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Délivrer"));
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Copie intégrale/i));
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Oui/i));
  });

  expect(router.state.location.pathname).toBe(
    "/rece/rece-ui/mesrequetes/Edition/a4cefb71-8457-4f6b-937e-34b49335d666/b41079a5-9e8d-478c-b04c-c4c2ac67134f"
  );
});

test("ignorer requete", async () => {
  // duplica de AfficheComposant() pour avoir acces au router au sein du test
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        element: <ApercuRequetePriseEnChargePage />
      },
      {
        path: "/",
        // element de navigation qui permet de passer un state
        element: (
          <Navigate
            to={getUrlWithParam(
              URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
              "a4cefb71-8457-4f6b-937e-34b49335d666"
            )}
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

  await act(async () => {
    render(<RouterProvider router={router} />);
  });

  await waitFor(() => {
    expect(screen.getByText(/Documents à délivrer/i)).toBeDefined();
    expect(screen.getByText(/Certificat d'inscription au RCA/i)).toBeDefined();
  });

  fireEvent.click(screen.getByText(/Certificat d'inscription au RCA/i));

  const bontonIgnore = screen.getByText(/Ignorer+/);
  await waitFor(() => {
    expect(bontonIgnore).toBeInTheDocument();
  });

  fireEvent.click(bontonIgnore);

  const select = screen.getByTestId(MOTIF_IGNORE) as HTMLSelectElement;

  await act(async () => {
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
