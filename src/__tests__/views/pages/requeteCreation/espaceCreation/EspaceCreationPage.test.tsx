import { OfficierContext } from "@core/contexts/OfficierContext";
import { mappingOfficier } from "@core/login/LoginHook";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic
} from "@mock/data/connectedUserAvecDroit";
import { mapHabilitationsUtilisateur } from "@model/agent/IUtilisateur";
import EspaceCreationPage from "@pages/requeteCreation/espaceCreation/EspaceCreationPage";
import { URL_ACCUEIL } from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

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
  const history = createMemoryHistory();
  history.push(URL_ACCUEIL);

  await act(async () => {
    render(
      <>
        <Router history={history}>
          <OfficierContext.Provider
            value={{
              officierDataState: storeRece.utilisateurCourant
            }}
          >
            <EspaceCreationPage selectedTab={0} />
          </OfficierContext.Provider>
        </Router>
      </>
    );
  });

  const title = screen.getByText(/Espace création/i);
  const mesRequetes = screen.getByText(/Mes requêtes de création/i);
  const requetesService = screen.getByText(
    /Les requêtes de création de mon service/i
  );

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(mesRequetes).toBeDefined();
  });

  act(() => {
    fireEvent.click(requetesService);
  });

  const attribueA = screen.getByText(/Attribuée à/i);

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(mesRequetes).toBeDefined();
    expect(requetesService).toBeDefined();
    expect(attribueA).toBeDefined();
  });
});
