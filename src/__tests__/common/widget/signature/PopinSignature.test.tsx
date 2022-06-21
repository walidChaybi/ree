import {
  createEvent,
  fireEvent,
  render,
  waitFor
} from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configParamsBaseRequete } from "../../../../mock/superagent-config/superagent-mock-params";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { DocumentDelivrance } from "../../../../model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "../../../../model/requete/enum/SousTypeDelivrance";
import { storeRece } from "../../../../views/common/util/storeRece";
import { PopinSignature } from "../../../../views/common/widget/signature/PopinSignature";

const superagentMock = require("superagent-mock")(request, [
  configRequetes[0],
  configParamsBaseRequete[0]
]);

beforeAll(() => {
  DocumentDelivrance.init();
});

test("renders PopinSignature, signature event is received and success displayed", async () => {
  const { getByText } = render(
    <PopinSignature
      documentsByRequete={{
        "104b8563-c7f8-4748-9daa-f26558985894": {
          documentsToSign: [
            {
              infos: [],
              id: "f9279c00-5d2b-11ea-bc55-0242ac130004",
              mimeType: "application/pdf",
              nomDocument: "Naissance copie",
              conteneurSwift: "b9bc2637eb612d9e0cd5d7bfb1a94207",
              idRequete: "104b8563-c7f8-4748-9daa-f26558985894",
              numeroRequete: "1"
            }
          ],
          documentsToSave: [],
          sousTypeRequete: SousTypeDelivrance.RDD
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
    // @ts-ignore
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
  // Désactivation de la log car l'erreur loguée est normale
  storeRece.logErrorOff = true;
  const { getByText } = render(
    <PopinSignature
      documentsByRequete={{
        "104b8563-c7f8-4748-9daa-f26558985894": {
          documentsToSign: [
            {
              infos: [],
              id: "f9279c00-5d2b-11ea-bc55-0242ac130004",
              mimeType: "application/pdf",
              nomDocument: "Naissance copie",
              conteneurSwift: "b9bc2637eb612d9e0cd5d7bfb1a94207",
              idRequete: "104b8563-c7f8-4748-9daa-f26558985894",
              numeroRequete: "1"
            }
          ],
          documentsToSave: [],
          sousTypeRequete: SousTypeDelivrance.RDD
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
    // @ts-ignore
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
  storeRece.logErrorOff = false;
});

test("renders PopinSignature, code erroné", async () => {
  // Désactivation de la log car l'erreur loguée est normale
  storeRece.logErrorOff = true;
  storeRece.codePin = "0121";
  const { getByText } = render(
    <PopinSignature
      documentsByRequete={{
        "104b8563-c7f8-4748-9daa-f26558985894": {
          documentsToSign: [
            {
              infos: [],
              id: "f9279c00-5d2b-11ea-bc55-0242ac130004",
              mimeType: "application/pdf",
              nomDocument: "Naissance copie",
              conteneurSwift: "b9bc2637eb612d9e0cd5d7bfb1a94207",
              idRequete: "104b8563-c7f8-4748-9daa-f26558985894",
              numeroRequete: "1"
            }
          ],
          documentsToSave: [],
          sousTypeRequete: SousTypeDelivrance.RDD
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
    // @ts-ignore
    createEvent(
      "signWebextResponse",
      window,
      {
        detail: {
          direction: "to-call-app",
          erreurs: [
            {
              code: "FONC_3"
            }
          ]
        }
      },
      { EventType: "CustomEvent" }
    )
  );
  await waitFor(() => {
    expect(storeRece.codePin).toBeUndefined();
  });
  storeRece.logErrorOff = false;
});

afterAll(() => {
  superagentMock.unset();
});
