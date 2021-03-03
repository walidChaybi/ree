import React from "react";
import {
  fireEvent,
  render,
  waitFor,
  act,
  screen
} from "@testing-library/react";
import {
  titreForm,
  RMCActeInscriptionPage
} from "../../../../views/pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionPage";

test("renders formulaire Recherche Multi Critères Actes et Inscriptions", async () => {
  await act(async () => {
    render(<RMCActeInscriptionPage />);
  });
  await waitFor(() => {
    expect(screen.getAllByText(titreForm)).toHaveLength(2);
  });
});

test("Bouton réinitialisation des champs", async () => {
  await act(async () => {
    render(<RMCActeInscriptionPage />);
  });

  const inputNom = screen.getByLabelText("Nom") as HTMLInputElement;

  const inputAnneeSeule = screen.getByLabelText(
    "datesDebutFinAnnee année"
  ) as HTMLInputElement;
  const inputJour = screen.getByLabelText(
    "datesDebutFinAnnee.dateDebut jour"
  ) as HTMLInputElement;

  await waitFor(() => {
    expect(inputNom).toBeDefined();
    expect(inputAnneeSeule).toBeDefined();
    expect(inputJour).toBeDefined();
  });

  act(() => {
    fireEvent.change(inputNom, {
      target: {
        value: "mock Nom"
      }
    });
    fireEvent.change(inputJour, {
      target: {
        value: "10"
      }
    });
  });

  await waitFor(() => {
    expect(inputNom.value).toBe("mock Nom");
    expect(inputJour.value).toBe("10");
  });

  const reset = screen.getByText(/Réinitialiser les critères/i);
  await act(async () => {
    fireEvent.click(reset);
  });

  await waitFor(() => {
    expect(inputNom.value).toBe("");
    expect(inputJour.value).toBe("");
    expect(inputAnneeSeule).not.toBeDisabled();
  });
});

test("Bouton Rechercher du Formulaire Recherche Multi Critères Actes et Inscriptions", async () => {
  await act(async () => {
    render(<RMCActeInscriptionPage />);
  });

  const inputNom = screen.getByLabelText("Nom") as HTMLInputElement;
  const inputAnnee = screen.getByLabelText(
    "datesDebutFinAnnee année"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputNom, {
      target: {
        value: "mockNom"
      }
    });
    fireEvent.change(inputAnnee, {
      target: {
        value: "1990"
      }
    });
  });

  const submit = screen.getByText(/Rechercher/i);
  await act(async () => {
    fireEvent.click(submit);
  });
});
