import React from "react";

import request from "superagent";
import { useSignatureDocumentHook } from "../../../../../views/common/widget/signature/hook/SignatureDocumentHook";
import { SousTypeRequete } from "../../../../../model/requete/SousTypeRequete";
import { configRequetes } from "../../../../../mock/superagent-config/superagent-mock-requetes";
import { act, render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { createEvent } from "@testing-library/react";

const superagentMock = require("superagent-mock")(request, configRequetes);

let container: Element | null;

const toto = {
  id1: {
    documentsToSign: [
      {
        infos: [],
        idDocumentDelivre: "f9279c00-5d2b-11ea-bc55-0242ac130004",
        mimeType: "",
        nomDocument: "nom",
        conteneurSwift: "",
        idRequete: "id1",
        numeroRequete: 123
      }
    ],
    documentsToSave: [],
    sousTypeRequete: SousTypeRequete.RequeteDelivranceCourrier
  },
  id2: {
    documentsToSign: [
      {
        infos: [],
        idDocumentDelivre: "f9279c00-5d2b-11ea-bc55-0242ac130004",
        mimeType: "",
        nomDocument: "nom",
        conteneurSwift: "",
        idRequete: "id2",
        numeroRequete: 123
      }
    ],
    documentsToSave: [],
    sousTypeRequete: SousTypeRequete.RequeteDelivranceCourrier
  }
};

const HookConsummer: React.FC = () => {
  const { idRequetesToSign = [] } = useSignatureDocumentHook(toto, "1324");
  return (
    <>
      {idRequetesToSign.map(id => {
        return <div key={id}>{`length${idRequetesToSign.length}`}</div>;
      })}
    </>
  );
};

afterEach(() => {
  if (container instanceof Element) {
    document.body.removeChild<Element>(container);
  }
  container = null;
});

test("Signature document hook", async () => {
  await act(async () => {
    render(<HookConsummer />);
  });

  act(() => {
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
  });
  waitFor(() => {
    expect(screen.getAllByText("length1")).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
