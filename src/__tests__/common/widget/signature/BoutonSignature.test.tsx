import { Orientation } from "@model/composition/enum/Orientation";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { createEvent, fireEvent, screen, waitFor } from "@testing-library/dom";
import { act, render } from "@testing-library/react";
import { BoutonSignature } from "@widget/signature/BoutonSignature";
import React from "react";
import request from "superagent";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { configTeleverification } from "../../../../mock/superagent-config/superagent-mock-televerification";
import { acte } from "../../../pages/fiche/data/ficheActe";
const superagentMock = require("superagent-mock")(request, [
  configEtatcivil[0],
  configRequetes[0],
  configTeleverification[0]
]);

beforeAll(() => {
  DocumentDelivrance.init();
});

const requete: IRequeteTableauDelivrance = {
  idRequete: "id1",
  statut: StatutRequete.A_SIGNER.libelle,
  documentsReponses: [
    {},
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
      idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
      contenu: ""
    }
  ],
  sousType: "Délivrance E/C (d)"
} as IRequeteTableauDelivrance;

const requete2: IRequeteTableauDelivrance = {
  idRequete: "id1",
  statut: StatutRequete.A_SIGNER.libelle,
  documentsReponses: [
    {},
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
      idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
      contenu: ""
    }
  ],
  sousType: "Délivrance E/C (d)"
} as IRequeteTableauDelivrance;

test("renders titre bouton signature par lot", async () => {
  act(() => {
    render(
      <BoutonSignature
        libelle={"Signer le lot"}
        requetesASigner={[{ requete: requete }, { requete: requete2 }]}
        reloadData={() => {
          return null;
        }}
      />
    );
  });
  const linkElement = screen.getByText(/Signer le lot/i);
  await waitFor(() => {
    expect(linkElement).toBeDefined();
  });
  act(() => {
    fireEvent.click(linkElement);
  });
  await waitFor(() => {
    expect(screen.getByText(/Signature des documents/i)).toBeDefined();
  });
});

test("renders titre bouton signature", () => {
  render(
    <BoutonSignature
      libelle={"Signer"}
      requetesASigner={[{ requete: requete, acte: acte }]}
      reloadData={() => {
        return null;
      }}
    />
  );
  const linkElement = screen.getByText(/Signer/i);
  expect(linkElement).toBeDefined();
  act(() => {
    fireEvent.click(linkElement);
  });
  expect(screen.getByText(/Signature des documents/i)).toBeDefined();
});

test("renders titre bouton signature 2", async () => {
  render(
    <BoutonSignature
      libelle={"Signer"}
      requetesASigner={[{ requete: requete, acte: acte }]}
      reloadData={() => {
        return null;
      }}
    />
  );
  const linkElement = screen.getByText(/Signer/i);
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
