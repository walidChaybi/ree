import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render, act } from "@testing-library/react";
import officier from "../../../api/mock/data/connectedUser.json";
import { AppUrls } from "../../../views/router/UrlManager";
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
  history.push(AppUrls.ctxAccueilUrl);

  const fctAAppeler = jest.fn(data => 3);
  const fctTraitementResultat = traiteAppelRequeteASigner;
  appelRequetesASigner({});

  await act(async () => {
    render(
      <Router history={history}>
        <GestionnaireFermeture
          urlRedirection={AppUrls.ctxMesRequetesUrl}
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
