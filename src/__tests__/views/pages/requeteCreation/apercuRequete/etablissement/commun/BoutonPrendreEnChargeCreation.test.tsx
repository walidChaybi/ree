import { BoutonPrendreEnChargeCreation } from "@pages/requeteCreation/apercuRequete/etablissement/commun/BoutonPrendreEnChargeCreation";
import { URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { expect, test, vi } from "vitest";
import { createTestingRouter, elementAvecContexte } from "../../../../../../__tests__utils__/testsUtil";
import { userDroitCreerActeEtabliPerimetreTousRegistres } from "../../../../../../mock/data/mockConnectedUserAvecDroit";
import { requeteCreationATraiter } from "../../../../../../mock/data/requeteCreation";

const mockedRedirection = vi.fn();

test("DOIT rediriger sur l'appercu prise en charge QUAND on clique sur le bouton prendre en charge", () => {
  const ID = "54ddf213-d9b7-4747-8e92-68c220f66de3";

  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        element: (
          <BoutonPrendreEnChargeCreation
            requete={requeteCreationATraiter}
            onClick={() => {
              mockedRedirection();
            }}
          ></BoutonPrendreEnChargeCreation>
        )
      }
    ],
    [getUrlWithParam(URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID, ID)]
  );

  render(elementAvecContexte(<RouterProvider router={router} />, userDroitCreerActeEtabliPerimetreTousRegistres));

  const boutonPrendreEnCharge = screen.getByText("Prendre en charge") as HTMLButtonElement;

  waitFor(() => {
    expect(boutonPrendreEnCharge.disabled).toBeFalsy();
  });

  fireEvent.click(boutonPrendreEnCharge);

  waitFor(() => {
    // La redirection se fait dans le composant parent, on test ici que la redirection du parent soit bien appelée
    // TODO: Ce test cause un 'No routes matched location', voir FIXME dans BoutonsApercuCreationEtablissement.tsx.
    expect(mockedRedirection).toBeCalled();
  });
});
