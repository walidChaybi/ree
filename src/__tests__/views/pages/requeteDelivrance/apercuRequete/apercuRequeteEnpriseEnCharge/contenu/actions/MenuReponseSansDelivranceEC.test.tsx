import { idRequeteRDC, requeteRDC } from "@mock/data/requeteDelivrance";
import { MenuReponseSansDelivranceEC } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuReponseSansDelivranceEC";
import {
  PATH_EDITION,
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_DELIVRANCE_EDITION_ID
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../../../../__tests__utils__/testsUtil";

test("renders du bloc Menu Reponse sans délivrance", async () => {
  act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          element: <MenuReponseSansDelivranceEC requete={requeteRDC} />
        }
      ],
      [
        getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          idRequeteRDC
        )
      ]
    );

    render(<RouterProvider router={router} />);
  });
  expect(screen.getByText(/Requête incomplète+/)).toBeDefined();
  expect(screen.getByText(/Acte non détenu au SCEC+/)).toBeDefined();
  expect(screen.getByText(/Divers+/)).toBeDefined();
  expect(screen.getByText(/Ignorer la requête+/)).toBeDefined();
});

test("Réponse requête incomplète", async () => {
  await act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
          element: <></>
        },
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          element: <MenuReponseSansDelivranceEC requete={requeteRDC} />
        }
      ],
      [
        getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          idRequeteRDC
        )
      ]
    );

    render(<RouterProvider router={router} />);
    await waitFor(async () => {
      fireEvent.click(screen.getByText(/Requête incomplète+/));
    });

    setTimeout(() => {
      act(() => {
        expect(router.state.location.pathname).toBe(
          `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/${idRequeteRDC}/`
        );
      });
    }, 0);
  });
});

test("Réponse acte non détenu", async () => {
  await act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
          element: <></>
        },
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          element: <MenuReponseSansDelivranceEC requete={requeteRDC} />
        }
      ],
      [
        getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          idRequeteRDC
        )
      ]
    );

    render(<RouterProvider router={router} />);
    await act(async () => {
      fireEvent.click(screen.getByText(/Acte non détenu+/));
    });

    setTimeout(() => {
      act(() => {
        expect(router.state.location.pathname).toBe(
          `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/${idRequeteRDC}/`
        );
      });
    }, 0);
  });
});

test("Réponse divers", async () => {
  await act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
          element: <></>
        },
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          element: <MenuReponseSansDelivranceEC requete={requeteRDC} />
        }
      ],
      [
        getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          idRequeteRDC
        )
      ]
    );

    render(<RouterProvider router={router} />);
    await act(async () => {
      fireEvent.click(screen.getByText(/Divers+/));
    });

    setTimeout(() => {
      act(() => {
        expect(router.state.location.pathname).toBe(
          `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/${idRequeteRDC}/`
        );
      });
    }, 0);
  });
});

test("Réponse ignorer", async () => {
  await act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
          element: <></>
        },
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          element: <MenuReponseSansDelivranceEC requete={requeteRDC} />
        }
      ],
      [
        getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          idRequeteRDC
        )
      ]
    );

    render(<RouterProvider router={router} />);

    await act(async () => {
      fireEvent.click(screen.getByText("Réponse sans délivrance"));
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Ignorer+/));
    });

    setTimeout(() => {
      act(() => {
        const valider = screen.getByText("Valider") as HTMLButtonElement;

        expect(valider.disabled).toBeTruthy();
      });
    }, 0);
  });
});
