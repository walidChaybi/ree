import {
  RMCArchivePage,
  titreForm
} from "@pages/rechercheMultiCriteres/acteArchive/RMCArchivePage";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";

test("renders formulaire Recherche Multi Critères archives", async () => {
  await act(async () => {
    render(<RMCArchivePage />);
  });
  await waitFor(() => {
    expect(document.title).toBe(titreForm);
    expect(screen.getByText(titreForm)).toBeInTheDocument();
  });
});

test("Bouton réinitialisation des champs", async () => {
  await act(async () => {
    render(<RMCArchivePage />);
  });

  const inputNom = screen.getByLabelText("Nom") as HTMLInputElement;
  const inputJour = screen.getByLabelText(
    "datesDebutFinAnnee.dateDebut.jour"
  ) as HTMLInputElement;

  await waitFor(() => {
    expect(inputNom).toBeDefined();
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
  });
});

test("Bouton Rechercher du Formulaire Recherche Multi Critères archives", async () => {
  await act(async () => {
    render(<RMCArchivePage />);
  });

  const inputNom = screen.getByLabelText("Nom") as HTMLInputElement;

  act(() => {
    fireEvent.change(inputNom, {
      target: {
        value: "mockNom"
      }
    });
  });

  const submit = screen.getByText(/Rechercher/i);
  await act(async () => {
    fireEvent.click(submit);
  });
});


