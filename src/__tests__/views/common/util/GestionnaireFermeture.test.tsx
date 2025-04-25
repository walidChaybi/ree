import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { render } from "@testing-library/react";
import { GestionnaireFermeture, appelRequetesASigner } from "@util/GestionnaireFermeture";
import { MemoryRouter } from "react-router";
import { test, vi } from "vitest";

const xhrMockObj = {
  open: vi.fn(),
  send: vi.fn(),
  setRequestHeader: vi.fn(),
  readyState: 4,
  status: 200,
  response: JSON.stringify({ data: 3 })
};

const xhrMockClass = () => xhrMockObj;

// @ts-ignore
window.XMLHttpRequest = vi.fn().mockImplementation(xhrMockClass);

test("renders GestionnaireFermeture", () => {
  appelRequetesASigner();

  render(
    <MemoryRouter>
      <GestionnaireFermeture urlRedirection={URL_MES_REQUETES_DELIVRANCE}></GestionnaireFermeture>
    </MemoryRouter>
  );

  const event = new CustomEvent("beforeunload");
  window?.top?.dispatchEvent(event);
});
