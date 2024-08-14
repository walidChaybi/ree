import { ILoginApi, mappingOfficier } from "@core/login/LoginHook";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic
} from "@mock/data/connectedUserAvecDroit";
import { mapHabilitationsUtilisateur } from "@model/agent/IUtilisateur";
import EspaceCreationPage from "@pages/requeteCreation/espaceCreation/EspaceCreationPage";
import { URL_REQUETES_CREATION_SERVICE } from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
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

test("renders creationPage", async () => {
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

  await waitFor(() => {
    expect(document.title).toBe(title);
    expect(mesRequetes).toBeDefined();
  });

  act(() => {
    fireEvent.click(requetesService);
  });

  setTimeout(() => {
    act(() => {
      const attribueA = screen.getByText(/Attribuée à/i);

      waitFor(() => {
        expect(document.title).toBe(title);
        expect(mesRequetes).toBeDefined();
        expect(requetesService).toBeDefined();
        expect(attribueA).toBeDefined();
      });
    });
  }, 0);
});
