import { act } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import request from "superagent";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { useUpdateRequeteDelivranceRDCSC } from "../../../../views/pages/saisirRequete/hook/UpdateRDCSCApiHook";
import { UpdateRequeteRDCSC } from "../../../../views/pages/saisirRequete/modelForm/ISaisirRDCSCPageModel";
import {
  RequeteRDCSCInstitutionnel,
  RequeteRDCSCInteresse,
  RequeteRDCSCMandataire,
  RequeteRDCSCParticulier
} from "../data/DataRDCSC";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

let container: Element | null;
const func = jest.fn();

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  if (container instanceof Element) {
    document.body.removeChild<Element>(container);
  }
  container = null;
});

const HookConsummerInteresse: React.FC = () => {
  useUpdateRequeteDelivranceRDCSC(
    func,
    RequeteRDCSCInteresse as UpdateRequeteRDCSC
  );
  return <>{""}</>;
};

test("Maj requête délivrance hook", async () => {
  await act(async () => {
    ReactDOM.render(<HookConsummerInteresse />, container);
  });
  expect(container).toBeInstanceOf(Element);
  if (container instanceof Element) {
    expect(container.querySelector).toBeTruthy();
  }
  expect(func).toBeCalled();
});

const HookConsummerMandataire: React.FC = () => {
  useUpdateRequeteDelivranceRDCSC(
    func,
    RequeteRDCSCMandataire as UpdateRequeteRDCSC
  );
  return <>{""}</>;
};

test("Maj requête délivrance hook", async () => {
  await act(async () => {
    ReactDOM.render(<HookConsummerMandataire />, container);
  });
  expect(container).toBeInstanceOf(Element);
  if (container instanceof Element) {
    expect(container.querySelector).toBeTruthy();
  }
  expect(func).toBeCalled();
});

const HookConsummerInstitutionnel: React.FC = () => {
  useUpdateRequeteDelivranceRDCSC(
    func,
    RequeteRDCSCInstitutionnel as UpdateRequeteRDCSC
  );
  return <>{""}</>;
};

test("Maj requête délivrance hook", async () => {
  await act(async () => {
    ReactDOM.render(<HookConsummerInstitutionnel />, container);
  });
  expect(container).toBeInstanceOf(Element);
  if (container instanceof Element) {
    expect(container.querySelector).toBeTruthy();
  }
  expect(func).toBeCalled();
});

const HookConsummerParticulier: React.FC = () => {
  useUpdateRequeteDelivranceRDCSC(
    func,
    RequeteRDCSCParticulier as UpdateRequeteRDCSC
  );
  return <>{""}</>;
};

test("Maj requête délivrance hook", async () => {
  await act(async () => {
    ReactDOM.render(<HookConsummerParticulier />, container);
  });
  expect(container).toBeInstanceOf(Element);
  if (container instanceof Element) {
    expect(container.querySelector).toBeTruthy();
  }
  expect(func).toBeCalled();
});
