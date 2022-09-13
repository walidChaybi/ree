import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import {
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import {
  DocumentsByRequete,
  useSignatureDocumentHook
} from "@widget/signature/hook/SignatureDocumentHook";
import React from "react";
import request from "superagent";
import { configRequetes } from "../../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, configRequetes);

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
