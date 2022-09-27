import { Orientation } from "@model/composition/enum/Orientation";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { createEvent, fireEvent, screen, waitFor } from "@testing-library/dom";
import { act, render } from "@testing-library/react";
import { BoutonSignature } from "@widget/signature/BoutonSignature";
import React from "react";
import request from "superagent";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
const superagentMock = require("superagent-mock")(request, configRequetes);

beforeAll(() => {
  DocumentDelivrance.init();
});

const requete: IRequeteTableauDelivrance = {
  idRequete: "id1",
  statut: StatutRequete.A_SIGNER.libelle,
  documentsReponses: [
    {
      id: "f9279c00-5d2b-11ea-bc55-0242ac130004",
      nom: "aaa",
      typeDocument: "0e1e909f-f74c-4b16-9c03-b3733354c6ce", // UUID nomenclature
      taille: 100,
      avecCtv: true,
      conteneurSwift: "chemin",
      mimeType: "application/pdf",
      nbPages: 1,
      orientation: Orientation.PORTRAIT,
      idActe: "19c0d767-64e5-4376-aa1f-6d781a2a235b",
      contenu: ""
    }
  ],
  sousType: "Délivrance E/C (d)"
} as IRequeteTableauDelivrance;

test("renders titre bouton signature", () => {
  render(
    <BoutonSignature
      libelle={"Signer le lot"}
      requetes={[requete]}
      reloadData={() => {
        return null;
      }}
    />
  );
  const linkElement = screen.getByText(/Signer le lot/i);
  expect(linkElement).toBeDefined();
  fireEvent.click(linkElement);
  expect(screen.getByText(/Signature des documents/i)).toBeDefined();
});

test("renders titre bouton signature 2", async () => {
  render(
    <BoutonSignature
      libelle={"Signer le lot"}
      requetes={[requete]}
      reloadData={() => {
        return null;
      }}
    />
  );
  const linkElement = screen.getByText(/Signer le lot/i);
  expect(linkElement).toBeDefined();
  act(() => {
    fireEvent.click(linkElement);
  });
  expect(screen.getByText(/Signature des documents/i)).toBeDefined();
  act(() => {
    const pinCodeInput = document.getElementById("pinCode");

    fireEvent.change(pinCodeInput!, {
      target: { value: "1234" }
    });
  });
  expect(screen.getByText(/Valider/i)).toBeDefined();
  act(() => {
    fireEvent.click(screen.getByText(/Valider/i));
  });

  setTimeout(() => {
    act(() => {
      fireEvent(
        window,
        ////@ts-ignore
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
  }, 1000);

  await waitFor(() => {
    expect(screen.getByText(/Valider/i)).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
