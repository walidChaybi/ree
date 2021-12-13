import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { act } from "react-dom/test-utils";
import { Route, Router } from "react-router-dom";
import request from "superagent";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";
import { DetailRequetePage } from "../../../../views/pages/requeteDelivrance/detailRequete/DetailRequetePage";
import { URL_MES_REQUETES_APERCU_REQUETE_ID } from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetes);

test("renders Page requete with all elements", async () => {
  act(() => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_APERCU_REQUETE_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d404"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_APERCU_REQUETE_ID}>
            <DetailRequetePage />
          </Route>
        </Router>
      </>
    );
  });
  await waitFor(() => {
    expect(screen.getAllByText("Détails requête")).toHaveLength(1);
  });
});

afterAll(() => {
  superagentMock.unset();
});
