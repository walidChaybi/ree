import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { act, render } from "@testing-library/react";
import {
  GestionnaireFermeture,
  appelRequetesASigner
} from "@util/GestionnaireFermeture";
import { MemoryRouter } from "react-router-dom";

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
  appelRequetesASigner();

  await act(async () => {
    render(
      <MemoryRouter>
        <GestionnaireFermeture
          urlRedirection={URL_MES_REQUETES_DELIVRANCE}
        ></GestionnaireFermeture>
      </MemoryRouter>
    );
  });

  const event = new CustomEvent("beforeunload");
  window?.top?.dispatchEvent(event);
});
