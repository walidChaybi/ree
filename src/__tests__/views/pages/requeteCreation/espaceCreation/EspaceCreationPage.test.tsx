import { ILoginApi, mappingOfficier } from "@core/login/LoginHook";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic
} from "@mock/data/mockConnectedUserAvecDroit";
import { mapHabilitationsUtilisateur } from "@model/agent/IUtilisateur";
import EspaceCreationPage from "@pages/requeteCreation/espaceCreation/EspaceCreationPage";
import { URL_REQUETES_CREATION_SERVICE } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
import { beforeAll, expect, test } from "vitest";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

beforeAll(() => {
  storeRece.utilisateurCourant = mappingOfficier(
    resultatHeaderUtilistateurLeBiannic,
    resultatRequeteUtilistateurLeBiannic.data
  );
  storeRece.utilisateurCourant.habilitations = mapHabilitationsUtilisateur(
    resultatRequeteUtilistateurLeBiannic.data.habilitations
  );
});

test.skip("renders creationPage", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES_CREATION_SERVICE,
        element: (
          <MockRECEContextProvider
            infosLoginOfficier={
              {
                officierDataState: storeRece.utilisateurCourant
              } as ILoginApi
            }
          >
            <EspaceCreationPage selectedTab={0} />
          </MockRECEContextProvider>
        )
      }
    ],
    [URL_REQUETES_CREATION_SERVICE]
  );

  render(<RouterProvider router={router} />);
  const title = "Espace création";
  const mesRequetes = screen.getByText(/Mes requêtes de création/i);
  const requetesService = screen.getByText(
    /Les requêtes de création de mon service/i
  );

  waitFor(() => {
    expect(document.title).toBe(title);
    expect(mesRequetes).toBeDefined();
  });

  fireEvent.click(requetesService);

  const attribueA = screen.getByText(/Attribuée à/i);

  waitFor(() => {
    expect(document.title).toBe(title);
    expect(mesRequetes).toBeDefined();
    expect(requetesService).toBeDefined();
    expect(attribueA).toBeDefined();
  });
});
