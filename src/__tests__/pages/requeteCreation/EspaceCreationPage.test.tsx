import { act, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic
} from "../../../mock/data/connectedUserAvecDroit";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";
import { mapHabilitationsUtilisateur } from "../../../model/agent/IUtilisateur";
import { storeRece } from "../../../views/common/util/storeRece";
import { OfficierContext } from "../../../views/core/contexts/OfficierContext";
import { mappingOfficier } from "../../../views/core/login/LoginHook";
import EspaceCreationPage from "../../../views/pages/requeteCreation/EspaceCreation/EspaceCreationPage";
import { URL_ACCUEIL } from "../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetes);

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
  /*const requetesService = screen.getByText(
    /Les requêtes de délivrance de mon service/i
  );*/

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(mesRequetes).toBeDefined();
  });

  /*act(() => {
    fireEvent.click(requetesService);
  });

  const attribueA = screen.getByText(/Attribuée à/i);

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(mesRequetes).toBeDefined();
    expect(requetesService).toBeDefined();
    expect(attribueA).toBeDefined();
  });*/
});

afterAll(() => {
  superagentMock.unset();
});
