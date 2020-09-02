import React from "react";
import { PopinSignature } from "../PopinSignature";
import {
  fireEvent,
  screen,
  render,
  waitFor,
  createEvent,
} from "@testing-library/react";
import config from "../../../../../views/pages/requete/__tests__/superagent-mock-config";
import request from "superagent";

const superagentMock = require("superagent-mock")(request, config);

test("renders PopinSignature, signature event is received and success displayed", () => {
  render(
    <PopinSignature
      documentsToSign={[
        {
          conteneurSwift: "b9bc2637eb612d9e0cd5d7bfb1a94207",
          idDocumentDelivre: "f9279c00-5d2b-11ea-bc55-0242ac130004",
          idRequete: "104b8563-c7f8-4748-9daa-f26558985894",
          infos: [],
          mimeType: "application/pdf",
          nomDocument: "Naissance copie",
        },
      ]}
      open={true}
      onClose={() => {
        return;
      }}
    />
  );

  fireEvent(
    window,
    createEvent(
      "signWebextResponse",
      window,
      {
        detail: {
          direction: "to-call-app",
          erreurs: [],
        },
      },
      { EventType: "CustomEvent" }
    )
  );
  const successMsg = screen.getByText(
    "Tous les documents ont été signés avec succès"
  );
  expect(successMsg).toBeDefined();
});

test("renders PopinSignature, signature event is received and error displayed", () => {
  render(
    <PopinSignature
      documentsToSign={[
        {
          conteneurSwift: "b9bc2637eb612d9e0cd5d7bfb1a94207",
          idDocumentDelivre: "f9279c00-5d2b-11ea-bc55-0242ac130004",
          idRequete: "104b8563-c7f8-4748-9daa-f26558985894",
          infos: [],
          mimeType: "application/pdf",
          nomDocument: "Naissance copie",
        },
      ]}
      open={true}
      onClose={() => {
        return;
      }}
    />
  );

  fireEvent(
    window,
    createEvent(
      "signWebextResponse",
      window,
      {
        detail: {
          direction: "to-call-app",
          erreurs: [
            {
              code: "Error1",
              libelle: "ErrorLibelle1",
              detail: "ErrorDetail1",
            },
          ],
        },
      },
      { EventType: "CustomEvent" }
    )
  );
  const errorCode = screen.getByText("ErrorLibelle1");
  const errorMsg = screen.getByText("ErrorLibelle1");
  expect(errorCode).toBeDefined();
  expect(errorMsg).toBeDefined();
});

afterAll(() => {
  superagentMock.unset();
});
