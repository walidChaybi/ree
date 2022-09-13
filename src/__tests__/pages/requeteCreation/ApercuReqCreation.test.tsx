import { render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import request from "superagent";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic
} from "../../../mock/data/connectedUserAvecDroit";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";
import { mapHabilitationsUtilisateur } from "../../../model/agent/IUtilisateur";
import { getUrlWithParam } from "../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../views/common/util/storeRece";
import { mappingOfficier } from "../../../views/core/login/LoginHook";
import ApercuReqCreationPage from "../../../views/pages/requeteCreation/EspaceCreation/apercuReqCreation/ApercuReqCreationPage";
import { URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID } from "../../../views/router/ReceUrls";

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

  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID,
      "a4cefb71-8457-4f6b-937e-34b49335d404"
    )
  );

  render(
    <>
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID}>
          <ApercuReqCreationPage />
        </Route>
      </Router>
    </>
  );

  await waitFor(() => {});
});

afterAll(() => {
  superagentMock.unset();
});
