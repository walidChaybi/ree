import { MenuReponseSansDelivranceEC } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuReponseSansDelivranceEC";
import {
  PATH_EDITION,
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_DELIVRANCE_EDITION_ID
} from "@router/ReceUrls";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import { createTestingRouter } from "../../../../../../../__tests__utils__/testsUtil";
import { idRequeteRDC, requeteRDC } from "../../../../../../../mock/data/requeteDelivrance";

test("renders du bloc Menu Reponse sans délivrance", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        element: <MenuReponseSansDelivranceEC requete={requeteRDC} />
      }
    ],
    [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, idRequeteRDC)]
  );

  render(<RouterProvider router={router} />);

  expect(screen.getByText(/Requête incomplète+/)).toBeDefined();
  expect(screen.getByText(/Acte non détenu au SCEC+/)).toBeDefined();
  expect(screen.getByText(/Divers+/)).toBeDefined();
  expect(screen.getByText(/Ignorer la requête+/)).toBeDefined();
});

test("Réponse requête incomplète", async () => {
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
    [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, idRequeteRDC)]
  );

  render(<RouterProvider router={router} />);
  await act(() => fireEvent.click(screen.getByText(/Requête incomplète+/)));

  expect(router.state.location.pathname).toBe(`${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/${idRequeteRDC}/`);
});

test("Réponse acte non détenu", async () => {
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
    [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, idRequeteRDC)]
  );

  render(<RouterProvider router={router} />);
  fireEvent.click(screen.getByText(/Acte non détenu+/));

  await waitFor(() => {
    expect(router.state.location.pathname).toBe(`${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/${idRequeteRDC}/`);
  });
});

test("Réponse divers", async () => {
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
    [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, idRequeteRDC)]
  );

  render(<RouterProvider router={router} />);
  fireEvent.click(screen.getByText(/Divers+/));

  await waitFor(() => {
    expect(router.state.location.pathname).toBe(`${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/${idRequeteRDC}/`);
  });
});

test("Réponse ignorer", async () => {
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
    [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, idRequeteRDC)]
  );

  render(<RouterProvider router={router} />);

  fireEvent.click(screen.getByText("Réponse sans délivrance"));

  fireEvent.click(screen.getByText(/Ignorer+/));

  await waitFor(() => {
    const valider: HTMLButtonElement = screen.getByText("Valider");
    expect(valider.disabled).toBeTruthy();
  });
});
