import {
  RMCArchivePage,
  titreForm
} from "@pages/rechercheMultiCriteres/acteArchive/RMCArchivePage";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";

test("renders formulaire Recherche Multi Critères archives", () => {
  render(<RMCArchivePage />);
  waitFor(() => {
    expect(document.title).toBe(titreForm);
    expect(screen.getByText(titreForm)).toBeDefined();
  });
});

test("Bouton réinitialisation des champs", () => {
  render(<RMCArchivePage />);

  const inputNom = screen.getByLabelText("Nom") as HTMLInputElement;
  const inputJour = screen.getByLabelText(
    "datesDebutFinAnnee.dateDebut.jour"
  ) as HTMLInputElement;

  waitFor(() => {
    expect(inputNom).toBeDefined();
    expect(inputJour).toBeDefined();
  });

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

  waitFor(() => {
    expect(inputNom.value).toBe("mock Nom");
    expect(inputJour.value).toBe("10");
  });

  const reset = screen.getByText(/Réinitialiser les critères/i);
  fireEvent.click(reset);

  waitFor(() => {
    expect(inputNom.value).toBe("");
    expect(inputJour.value).toBe("");
  });
});

test("Bouton Rechercher du Formulaire Recherche Multi Critères archives", () => {
  render(<RMCArchivePage />);

  const inputNom = screen.getByLabelText("Nom") as HTMLInputElement;

  waitFor(() => {
    expect(inputNom).toBeDefined();
  });

  fireEvent.change(inputNom, {
    target: {
      value: "mockNom"
    }
  });

  const submit = screen.getByText(/Rechercher/i);

  waitFor(() => {
    expect(submit).toBeDefined();
  });

  fireEvent.click(submit);
});


