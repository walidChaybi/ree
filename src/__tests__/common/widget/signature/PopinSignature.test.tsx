import React from "react";
import { PopinSignature } from "../../../../views/common/widget/signature/PopinSignature";
import {
  fireEvent,
  render,
  createEvent,
  waitFor
} from "@testing-library/react";

import request from "superagent";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, configRequetes);

test("renders PopinSignature, signature event is received and success displayed", async () => {
  const { getByText } = render(
    <PopinSignature
      documentsByRequete={{
        "104b8563-c7f8-4748-9daa-f26558985894": {
          documentsToSign: [
            {
              infos: [],
              idDocumentDelivre: "f9279c00-5d2b-11ea-bc55-0242ac130004",
              mimeType: "application/pdf",
              nomDocument: "Naissance copie",
              conteneurSwift: "b9bc2637eb612d9e0cd5d7bfb1a94207",
              idRequete: "104b8563-c7f8-4748-9daa-f26558985894",
              numeroRequete: 1
            }
          ],
          documentsToSave: []
        }
      }}
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
          erreurs: []
        }
      },
      { EventType: "CustomEvent" }
    )
  );
  await waitFor(() => {
    const successMsg = getByText(
      "Le(s) document(s) de la requête n°1 a (ont) été signé(s) le",
      { exact: false }
    );
    expect(successMsg).toBeDefined();
  });
});

test("renders PopinSignature, signature event is received and error displayed", async () => {
  const { getByText } = render(
    <PopinSignature
      documentsByRequete={{
        "104b8563-c7f8-4748-9daa-f26558985894": {
          documentsToSign: [
            {
              infos: [],
              idDocumentDelivre: "f9279c00-5d2b-11ea-bc55-0242ac130004",
              mimeType: "application/pdf",
              nomDocument: "Naissance copie",
              conteneurSwift: "b9bc2637eb612d9e0cd5d7bfb1a94207",
              idRequete: "104b8563-c7f8-4748-9daa-f26558985894",
              numeroRequete: 1
            }
          ],
          documentsToSave: []
        }
      }}
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
              code: "TECH_1"
            }
          ]
        }
      },
      { EventType: "CustomEvent" }
    )
  );
  await waitFor(() => {
    const errorCode = getByText("Requête n°1");
    const errorMsg = getByText("Erreur technique inconnue");
    expect(errorCode).toBeDefined();
    expect(errorMsg).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
