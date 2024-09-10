import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import {
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { useSignatureDocumentHookDelivrance } from "@widget/signature/hook/SignatureDocumentHookDelivrance";
import { DocumentsByRequete } from "@widget/signature/hook/SignatureDocumentHookUtilDelivrance";
import React from "react";
import { expect, test } from "vitest";

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
    sousTypeRequete: SousTypeDelivrance.RDC,
    acte: {
      id: "19c0d767-64e5-4376-aa1f-6d781a2a235b",
      titulaires: [{ nom: "" }, { nom: "" }]
    } as any as IFicheActe
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
    sousTypeRequete: SousTypeDelivrance.RDC,
    acte: {
      id: "19c0d767-64e5-4376-aa1f-6d781a2a235b",
      titulaires: [{ nom: "" }, { nom: "" }]
    } as any as IFicheActe
  }
};

const HookConsummer: React.FC = () => {
  const { idRequetesToSign = [] } = useSignatureDocumentHookDelivrance(
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

test.skip("Signature document hook", () => {
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

  waitFor(() => {
    expect(screen.getAllByText("length1")).toBeDefined();
  });
});
