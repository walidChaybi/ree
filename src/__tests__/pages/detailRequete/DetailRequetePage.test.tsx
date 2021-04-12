import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import request from "superagent";
import { configRequetesV2 } from "../../../mock/superagent-config/superagent-mock-requetes-v2";
import { getUrlWithParam } from "../../../views/common/util/route/routeUtil";
import { DetailRequetePage } from "../../../views/pages/detailRequete/DetailRequetePage";
import { URL_MES_REQUETES_ID } from "../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

test("renders Page requete with all elements", async () => {
  act(() => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d404"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_ID}>
            <DetailRequetePage />
          </Route>
        </Router>
      </>
    );
  });
  await waitFor(() => {
    expect(screen.getAllByText("Détails de requête")).toHaveLength(1);
  });
});

afterAll(() => {
  superagentMock.unset();
});
