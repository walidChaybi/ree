import {
  DataRMCRequeteAvecResultat,
  DataTableauRequete
} from "@mock/data/RMCRequete";
import { userDroitConsulterPerimetreTousRegistres } from "@mock/data/connectedUserAvecDroit";
import { RMCTableauRequetes } from "@pages/rechercheMultiCriteres/requete/resultats/RMCTableauRequetes";
import { ApercuRequetePage } from "@pages/requeteDelivrance/apercuRequete/apercuRequete/ApercuRequetePage";
import {
  URL_RECHERCHE_REQUETE,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_INFORMATION_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getLastPathElem, getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { createTestingRouter } from "../../../../../__tests__utils__/testsUtil";

describe.skip("RMCTableauRequetes - ", () => {
  test("renders Resultat Requetes Recherche Multi Critères => Avec résultat", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_RECHERCHE_REQUETE,
          element: (
            <RMCTableauRequetes
              dataRMCRequete={DataRMCRequeteAvecResultat}
              dataTableauRMCRequete={DataTableauRequete}
              setRangeRequete={vi.fn()}
              resetTableauRequete={true}
            />
          )
        }
      ],
      [URL_RECHERCHE_REQUETE]
    );

    const { getAllByText } = render(<RouterProvider router={router} />);

    const numero1 = getAllByText("1234");
    expect(numero1).toHaveLength(1);
    const numero2 = getAllByText("2090860");
    expect(numero2).toHaveLength(1);
    const numero3 = getAllByText("9876");
    expect(numero3).toHaveLength(1);
    const numero4 = getAllByText("9012");
    expect(numero4).toHaveLength(1);
  });

  test("Clic sur une Requête du tableau avec un idUtilisateur", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_RECHERCHE_REQUETE,
          element: (
            <RMCTableauRequetes
              dataRMCRequete={DataRMCRequeteAvecResultat}
              dataTableauRMCRequete={DataTableauRequete}
              setRangeRequete={vi.fn()}
              resetTableauRequete={true}
            />
          )
        },
        {
          path: getUrlWithParam(
            URL_RECHERCHE_REQUETE_APERCU_REQUETE_ID,
            "8ef11b8b-652c-4c6a-ad27-a544fce635d0"
          ),
          element: <ApercuRequetePage />
        }
      ],
      [URL_RECHERCHE_REQUETE]
    );

    const { getByTestId } = render(<RouterProvider router={router} />);

    const ligne = getByTestId("8ef11b8b-652c-4c6a-ad27-a544fce635d0");

    fireEvent.click(ligne);

    waitFor(() => {
      expect(getLastPathElem(router.state.location.pathname)).toEqual(
        "8ef11b8b-652c-4c6a-ad27-a544fce635d0"
      );
    });
  });

  test("Clic sur une Requête du tableau sans un idUtilisateur", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_RECHERCHE_REQUETE,
          element: (
            <RMCTableauRequetes
              dataRMCRequete={DataRMCRequeteAvecResultat}
              dataTableauRMCRequete={DataTableauRequete}
              setRangeRequete={vi.fn()}
              resetTableauRequete={true}
            />
          )
        },
        {
          path: getUrlWithParam(
            URL_RECHERCHE_REQUETE_APERCU_REQUETE_INFORMATION_ID,
            "4578e56c-421c-4e6a-b587-a238a665daf8"
          ),
          element: <ApercuRequetePage />
        }
      ],
      [URL_RECHERCHE_REQUETE]
    );

    const { getByTestId } = render(<RouterProvider router={router} />);

    const ligne = getByTestId("4578e56c-421c-4e6a-b587-a238a665daf8");

    fireEvent.click(ligne);

    waitFor(() => {
      expect(router.state.location.pathname).toEqual(
        "/rece/rece-ui/rechercherequete/apercurequeteinformation/4578e56c-421c-4e6a-b587-a238a665daf8"
      );
    });
  });

  test("renders Resultat Requetes Recherche Multi Critères => Sans résultat", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_RECHERCHE_REQUETE,
          element: (
            <RMCTableauRequetes
              dataRMCRequete={[]}
              dataTableauRMCRequete={{}}
              setRangeRequete={vi.fn()}
              resetTableauRequete={true}
            />
          )
        }
      ],
      [URL_RECHERCHE_REQUETE]
    );

    const { getByText } = render(<RouterProvider router={router} />);

    expect(getByText(/Aucune requête n'a été trouvée/i)).toBeDefined();
  });

  test("Clic sur une Requête Délivrance au statut 'Prise en charge'", () => {
    userDroitConsulterPerimetreTousRegistres.idUtilisateur =
      "d49e7b2d-7cec-4f6a-854c-3cbd6148dc7a";

    storeRece.utilisateurCourant = userDroitConsulterPerimetreTousRegistres;

    const router = createTestingRouter(
      [
        {
          path: URL_RECHERCHE_REQUETE,
          element: (
            <RMCTableauRequetes
              dataRMCRequete={DataRMCRequeteAvecResultat}
              dataTableauRMCRequete={DataTableauRequete}
              setRangeRequete={vi.fn()}
              resetTableauRequete={true}
            />
          )
        },
        {
          path: getUrlWithParam(
            URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
            "8ef11b8b-652c-4c6a-ad27-a544fce635d1"
          ),
          element: <ApercuRequetePage />
        }
      ],
      [URL_RECHERCHE_REQUETE]
    );

    const { getByTestId } = render(<RouterProvider router={router} />);

    const ligne = getByTestId("8ef11b8b-652c-4c6a-ad27-a544fce635d1");

    fireEvent.click(ligne);

    waitFor(() => {
      expect(router.state.location.pathname).toEqual(
        "/rece/rece-ui/rechercherequete/apercurequetepriseencharge/8ef11b8b-652c-4c6a-ad27-a544fce635d1"
      );
      expect(getLastPathElem(router.state.location.pathname)).toEqual(
        "8ef11b8b-652c-4c6a-ad27-a544fce635d1"
      );
    });
  });

  test("Clic sur une Requête avec des titulaire", () => {
    userDroitConsulterPerimetreTousRegistres.idUtilisateur =
      "d49e7b2d-7cec-4f6a-854c-3cbd6148dc7a";

    storeRece.utilisateurCourant = userDroitConsulterPerimetreTousRegistres;

    const router = createTestingRouter(
      [
        {
          path: URL_RECHERCHE_REQUETE,
          element: (
            <RMCTableauRequetes
              dataRMCRequete={DataRMCRequeteAvecResultat}
              dataTableauRMCRequete={DataTableauRequete}
              setRangeRequete={vi.fn()}
              resetTableauRequete={true}
            />
          )
        },
        {
          path: getUrlWithParam(
            URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
            "4578e56c-421c-4e6a-b587-a238a665daf9"
          ),
          element: <ApercuRequetePage />
        }
      ],
      [URL_RECHERCHE_REQUETE]
    );

    const { getByTestId } = render(<RouterProvider router={router} />);

    const ligne = getByTestId("4578e56c-421c-4e6a-b587-a238a665daf9");

    fireEvent.click(ligne);

    waitFor(() => {
      expect(router.state.location.pathname).toEqual(
        "/rece/rece-ui/rechercherequete/apercurequetepriseencharge/4578e56c-421c-4e6a-b587-a238a665daf9"
      );
      expect(getLastPathElem(router.state.location.pathname)).toEqual(
        "4578e56c-421c-4e6a-b587-a238a665daf9"
      );
    });
  });

  test("Changement de page", () => {
    userDroitConsulterPerimetreTousRegistres.idUtilisateur =
      "d49e7b2d-7cec-4f6a-854c-3cbd6148dc7a";

    storeRece.utilisateurCourant = userDroitConsulterPerimetreTousRegistres;

    const router = createTestingRouter(
      [
        {
          path: URL_RECHERCHE_REQUETE,
          element: (
            <RMCTableauRequetes
              dataRMCRequete={DataRMCRequeteAvecResultat}
              dataTableauRMCRequete={DataTableauRequete}
              setRangeRequete={vi.fn()}
              resetTableauRequete={true}
            />
          )
        }
      ],
      [URL_RECHERCHE_REQUETE]
    );

    const { getByTestId } = render(<RouterProvider router={router} />);

    const pageSuivante = screen.getByTitle("Page suivante");

    fireEvent.click(pageSuivante);

    expect(getByTestId("54ddf213-d9b7-4747-8e92-68c220f66de3")).toBeDefined();
  });
});
