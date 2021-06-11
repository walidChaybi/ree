import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import request from "superagent";
import { configRequetesV2 } from "../../../mock/superagent-config/superagent-mock-requetes-v2";
import { SousTypeDelivrance } from "../../../model/requete/v2/enum/SousTypeDelivrance";
import { SaisirRDCSCPage } from "../../../views/pages/saisirRequete/SaisirRDCSCPage";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

beforeEach(async () => {
  render(
    <MemoryRouter>
      <SaisirRDCSCPage />)
    </MemoryRouter>
  );
});

test("renders formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier", async () => {
  const titre = SousTypeDelivrance.getEnumFor("RDCSC").libelle;
  await waitFor(() => {
    expect(screen.getAllByText(titre)).toHaveLength(2);
  });
});

test("test du OnSubmit du formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier", async () => {
  const inputDocumentDemande = screen.getByLabelText(
    "document"
  ) as HTMLSelectElement;
  const inputPaysNaissance = screen.getByLabelText(
    "interesse.naissance.paysEvenement"
  ) as HTMLInputElement;
  const inputVilleNaissance = screen.getByLabelText(
    "interesse.naissance.villeEvenement"
  ) as HTMLInputElement;
  const inputAnneeNaissance = screen.getByLabelText(
    "interesse.naissance.dateEvenement.annee"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputPaysNaissance, {
      target: {
        value: "mockPaysNaissance"
      }
    });
    fireEvent.change(inputVilleNaissance, {
      target: {
        value: "mockVilleNaissance"
      }
    });
    fireEvent.change(inputAnneeNaissance, {
      target: {
        value: "1990"
      }
    });
  });

  await waitFor(() => {
    expect(screen.getByText("Certificat de situation au pacs"));
  });

  const submit = screen.getByText(/Enregistrer et valider/i);

  await act(async () => {
    fireEvent.change(inputDocumentDemande, {
      target: {
        value: "34da88e2-c5c7-4324-ac8e-b35193352e64"
      }
    });
    fireEvent.blur(inputPaysNaissance);
    fireEvent.blur(inputVilleNaissance);
  });

  await waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "34da88e2-c5c7-4324-ac8e-b35193352e64"
    );
  });

  await act(async () => {
    fireEvent.click(submit);
  });
});

test("test du OnSubmit du formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier => sans éléments de naissance & pop-in OUI", async () => {
  const inputDocumentDemande = screen.getByLabelText(
    "document"
  ) as HTMLSelectElement;
  const inputPaysNaissance = screen.getByLabelText(
    "interesse.naissance.paysEvenement"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputPaysNaissance, {
      target: {
        value: "mockPaysNaissance"
      }
    });
  });

  await waitFor(() => {
    expect(screen.getByText("Certificat de situation au pacs"));
  });

  const submit = screen.getByText(/Enregistrer et valider/i);

  await act(async () => {
    fireEvent.change(inputDocumentDemande, {
      target: {
        value: "34da88e2-c5c7-4324-ac8e-b35193352e64"
      }
    });
    fireEvent.blur(inputPaysNaissance);
  });

  await waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "34da88e2-c5c7-4324-ac8e-b35193352e64"
    );
  });

  await act(async () => {
    fireEvent.click(submit);
  });

  const btnOui = screen.getByRole("button", { name: /Oui/i });

  await act(async () => {
    fireEvent.click(btnOui);
  });
});

test("test du OnSubmit du formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier => sans éléments de naissance & pop-in NON", async () => {
  const inputDocumentDemande = screen.getByLabelText(
    "document"
  ) as HTMLSelectElement;
  const inputPaysNaissance = screen.getByLabelText(
    "interesse.naissance.paysEvenement"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputPaysNaissance, {
      target: {
        value: "mockPaysNaissance"
      }
    });
  });

  await waitFor(() => {
    expect(screen.getByText("Certificat de situation au pacs"));
  });

  const submit = screen.getByText(/Enregistrer et valider/i);

  await act(async () => {
    fireEvent.change(inputDocumentDemande, {
      target: {
        value: "34da88e2-c5c7-4324-ac8e-b35193352e64"
      }
    });
    fireEvent.blur(inputPaysNaissance);
  });

  await waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "34da88e2-c5c7-4324-ac8e-b35193352e64"
    );
  });

  await act(async () => {
    fireEvent.click(submit);
  });

  const btnNon = screen.getByRole("button", { name: /Non/i });

  await act(async () => {
    fireEvent.click(btnNon);
  });
});

afterAll(() => {
  superagentMock.unset();
});
