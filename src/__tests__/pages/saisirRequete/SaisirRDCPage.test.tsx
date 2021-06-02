import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React from "react";
import { SousTypeDelivrance } from "../../../model/requete/v2/enum/SousTypeDelivrance";
import { SaisirRDCPage } from "../../../views/pages/saisirRequete/SaisirRDCPage";

test("renders formulaire de saisie d'une Requête de Délivrance Attestation PACS", async () => {
  act(() => {
    render(<SaisirRDCPage />);
  });
  const titre = SousTypeDelivrance.getEnumFor("RDC").libelle;

  await waitFor(() => {
    expect(screen.getAllByText(titre)).toHaveLength(2);
  });
});

test("test onChangeNature", async () => {
  act(() => {
    render(<SaisirRDCPage />);
  });

  const inputNatureActe = screen.getByLabelText(
    "requete.natureActe"
  ) as HTMLInputElement;

  await waitFor(() => {
    expect(inputNatureActe).toBeDefined();
  });

  await act(async () => {
    fireEvent.change(inputNatureActe, {
      target: {
        value: "NAISSANCE"
      }
    });
  });

  await waitFor(() => {
    expect(inputNatureActe.value).toBe("NAISSANCE");
  });

  await act(async () => {
    fireEvent.change(inputNatureActe, {
      target: {
        value: "MARIAGE"
      }
    });
  });

  await waitFor(() => {
    expect(inputNatureActe.value).toBe("MARIAGE");
  });
});
