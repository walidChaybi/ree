import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render, act } from "@testing-library/react";
import officier from "../../../mock/data/connectedUser.json";
import { URL_MES_REQUETES } from "../../../views/router/ReceUrls";

import {
  traiteAppelRequeteASigner,
  appelRequetesASigner,
  GestionnaireFermeture
} from "../../../views/common/util/GestionnaireFermeture";

const xhrMockObj = {
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn(),
  readyState: 4,
  status: 200,
  response: JSON.stringify({ data: 3 })
};

const xhrMockClass = () => xhrMockObj;

// @ts-ignore
window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

test("renders GestionnaireFermeture", async () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES);

  const fctAAppeler = jest.fn(data => 3);
  const fctTraitementResultat = traiteAppelRequeteASigner;
  appelRequetesASigner({});

  await act(async () => {
    render(
      <Router history={history}>
        <GestionnaireFermeture
          urlRedirection={URL_MES_REQUETES}
          fctTraitementResultat={fctTraitementResultat}
          fctAAppeler={fctAAppeler}
          paramsFctAAppler={officier}
        ></GestionnaireFermeture>
      </Router>
    );
  });

  const event = new CustomEvent("beforeunload");
  window.top.dispatchEvent(event);
});
