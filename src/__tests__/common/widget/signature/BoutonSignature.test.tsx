import React from "react";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
  createEvent
} from "@testing-library/react";
import { BoutonSignature } from "../../../../views/common/widget/signature/BoutonSignature";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import request from "superagent";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
const superagentMock = require("superagent-mock")(request, configRequetes);

test("renders titre bouton signature", () => {
  render(
    <BoutonSignature
      libelle={"pages.delivrance.action.signature"}
      requetes={[
        {
          idRequete: "id1",
          statut: StatutRequete.ASigner,
          reponse: {
            idReponse: "d2ec498c-5d2b-11ea-bc55-0242ac130003",
            numeroRequete: 123,
            dateTraitementDemat: 1581721200.0,
            dateDelivrance: 1581721200.0,
            natureActe: "NAISSANCE",
            jourEvenement: 1,
            moisEvenement: 1,
            anneeEvenement: 1983,
            villeEvenement: "fez",
            paysEvenement: "maroc",
            nomOec: "Garisson",
            prenomOec: "Juliette",
            documentsDelivres: [
              {
                idDocumentDelivre: "f9279c00-5d2b-11ea-bc55-0242ac130004",
                nom: "Naissance mock copie plurilingue",
                conteneurSwift: "",
                contenu: "",
                typeDocument: "EXTRAIT_PLURILINGUE",
                mimeType: "application/pdf",
                taille: 12,
                identifiantSwift: "b9bc2637eb612d9e0cd5d7bfb1a94207",
                reponse: null,
                avecCtv: true
              }
            ]
          }
        }
      ]}
      reloadData={() => {
        return null;
      }}
    />
  );
  const linkElement = screen.getByText(/Signer le lot/i);
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(linkElement);
  expect(screen.getByText(/Signature des documents/i)).toBeDefined();
});

test("renders titre bouton signature", () => {
  render(
    <BoutonSignature
      libelle={"pages.delivrance.action.signature"}
      requetes={[
        {
          idRequete: "id1",
          statut: StatutRequete.ASigner,
          reponse: {
            idReponse: "d2ec498c-5d2b-11ea-bc55-0242ac130003",
            numeroRequete: 123,
            dateTraitementDemat: 1581721200.0,
            dateDelivrance: 1581721200.0,
            natureActe: "NAISSANCE",
            jourEvenement: 1,
            moisEvenement: 1,
            anneeEvenement: 1983,
            villeEvenement: "fez",
            paysEvenement: "maroc",
            nomOec: "Garisson",
            prenomOec: "Juliette",
            documentsDelivres: [
              {
                idDocumentDelivre: "f9279c00-5d2b-11ea-bc55-0242ac130004",
                nom: "Naissance mock copie plurilingue",
                conteneurSwift: "",
                contenu: "",
                typeDocument: "EXTRAIT_PLURILINGUE",
                mimeType: "application/pdf",
                taille: 12,
                identifiantSwift: "b9bc2637eb612d9e0cd5d7bfb1a94207",
                reponse: null,
                avecCtv: true
              }
            ]
          }
        }
      ]}
      reloadData={() => {
        return null;
      }}
    />
  );
  const linkElement = screen.getByText(/Signer le lot/i);
  expect(linkElement).toBeInTheDocument();
  act(() => {
    fireEvent.click(linkElement);
  });
  expect(screen.getByText(/Signature des documents/i)).toBeDefined();
  act(() => {
    const pinCodeInput = document.getElementById("pinCode");

    fireEvent.change(pinCodeInput, {
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
    expect(screen.getByText(/Valider/i)).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
