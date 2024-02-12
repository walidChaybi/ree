import {
  DataRMCRequeteAvecResultat,
  DataTableauRequete
} from "@mock/data/RMCRequete";
import { RMCRequeteResultats } from "@pages/rechercheMultiCriteres/requete/resultats/RMCRequeteResultats";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { act, render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../../__tests__utils__/testsUtil";

test("renders Fielset Recherche Multi Critères Requêtes", () => {
  act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_RECHERCHE_REQUETE,
          element: (
            <RMCRequeteResultats
              dataRMCRequete={DataRMCRequeteAvecResultat}
              dataTableauRMCRequete={DataTableauRequete}
              setRangeRequete={jest.fn()}
              resetRMC={true}
            />
          )
        }
      ],
      [URL_RECHERCHE_REQUETE]
    );

    const { container } = render(<RouterProvider router={router} />);

    const titre = container.getElementsByClassName("Titre").item(0)
      ?.firstElementChild?.innerHTML;
    expect(titre).toEqual("Résultats de la recherche multi-critères");

    expect(screen.getByText(/Liste des requêtes/i)).toBeDefined();
  });
});
