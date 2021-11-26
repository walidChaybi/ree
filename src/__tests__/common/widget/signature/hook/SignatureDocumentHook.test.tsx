import {
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetesV2 } from "../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import {
  DocumentsByRequete,
  useSignatureDocumentHook
} from "../../../../../views/common/widget/signature/hook/SignatureDocumentHook";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

const documentsByRequete: DocumentsByRequete = {
  id1: {
    documentsToSign: [
      {
        infos: [],
        id: "f9279c00-5d2b-11ea-bc55-0242ac130004",
        mimeType: "",
        nomDocument: "nom",
        conteneurSwift: "",
        idRequete: "id1",
        numeroRequete: "123"
      }
    ],
    documentsToSave: [],
    sousTypeRequete: SousTypeDelivrance.RDC
  },
  id2: {
    documentsToSign: [
      {
        infos: [],
        id: "f9279c00-5d2b-11ea-bc55-0242ac130004",
        mimeType: "",
        nomDocument: "nom",
        conteneurSwift: "",
        idRequete: "id2",
        numeroRequete: "123"
      }
    ],
    documentsToSave: [],
    sousTypeRequete: SousTypeDelivrance.RDC
  }
};

const HookConsummer: React.FC = () => {
  const { idRequetesToSign = [] } = useSignatureDocumentHook(
    documentsByRequete,
    "1324"
  );
  return (
    <>
      {idRequetesToSign.map(id => {
        return <div key={id}>{`length${idRequetesToSign.length}`}</div>;
      })}
    </>
  );
};

test("Signature document hook", async () => {
  render(<HookConsummer />);

  fireEvent(
    window,
    //@ts-ignore
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
    expect(screen.getAllByText("length1")).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
