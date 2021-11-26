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
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "../../../../model/requete/v2/IRequeteTableauDelivrance";
import { BoutonSignature } from "../../../../views/common/widget/signature/BoutonSignature";
const superagentMock = require("superagent-mock")(request, configRequetesV2);

const requete: IRequeteTableauDelivrance = {
  idRequete: "id1",
  statut: StatutRequete.A_SIGNER.libelle,
  documentsReponses: [
    {
      id: "123",
      nom: "aaa",
      typeDocument: "456", // UUID nomenclature
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
      libelle={"pages.delivrance.action.signature"}
      requetes={[requete]}
      reloadData={() => {
        return null;
      }}
    />
  );
  const linkElement = screen.getByText(/Signer le lot/i);
  //@ts-ignore
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(linkElement);
  expect(screen.getByText(/Signature des documents/i)).toBeDefined();
});

test("renders titre bouton signature", async () => {
  render(
    <BoutonSignature
      libelle={"pages.delivrance.action.signature"}
      requetes={[requete]}
      reloadData={() => {
        return null;
      }}
    />
  );
  const linkElement = screen.getByText(/Signer le lot/i);
  //@ts-ignore
  expect(linkElement).toBeInTheDocument();
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
