import React from "react";
import ReactDOM from "react-dom";
import request from "superagent";
import { act } from "@testing-library/react";
import { configRequetes } from "../../../../../mock/superagent-config/superagent-mock-requetes";
import { useUpdateDocumentApi } from "../../../../../views/common/widget/signature/hook/UpdateDocumentHook";

const superagentMock = require("superagent-mock")(request, configRequetes);

let container: Element | null;

const callBack = jest.fn();

const HookConsummer: React.FC = () => {
  const { errorUpdateDocument } = useUpdateDocumentApi(
    [{ contenu: "", nom: "", conteneurSwift: "" }],
    callBack
  );
  return <div>{errorUpdateDocument}</div>;
};

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

test("UpdateDocumentHook works", async () => {
  await act(async () => {
    ReactDOM.render(<HookConsummer />, container);
  });
  expect(container).toBeInstanceOf(Element);
  if (container instanceof Element) {
    expect(container.querySelector).toBeTruthy();
    expect(callBack).toBeCalled();
  }
});

afterAll(() => {
  superagentMock.unset();
});
