import {
  act,
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { DocumentDelivrance } from "../../../../model/requete/enum/DocumentDelivrance";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "../../../../model/requete/IRequeteTableauDelivrance";
import { BoutonSignature } from "../../../../views/common/widget/signature/BoutonSignature";
const superagentMock = require("superagent-mock")(request, configRequetes);

beforeAll(() => {
  DocumentDelivrance.init();
});

const requete: IRequeteTableauDelivrance = {
  idRequete: "id1",
  statut: StatutRequete.A_SIGNER.libelle,
  documentsReponses: [
    {
      id: "123",
      nom: "aaa",
      typeDocument: "0e1e909f-f74c-4b16-9c03-b3733354c6ce", // UUID nomenclature
      taille: 100,
      avecCtv: true,
      conteneurSwift: "chemin",
      mimeType: "pdf"
    }
  ],
  sousType: "Délivrance E/C (d)"
};

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

test("renders titre bouton signature", async () => {
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
  act(() => {
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
  });
  await waitFor(() => {
    expect(screen.getByText(/Valider/i)).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
