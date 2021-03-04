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
  RMCRequetePage
} from "../../../../views/pages/rechercheMultiCriteres/requete/RMCRequetePage";

test("renders formulaire Recherche Multi Critères Actes et Inscriptions", async () => {
  await act(async () => {
    render(<RMCRequetePage />);
  });
  await waitFor(() => {
    expect(screen.getAllByText(titreForm)).toHaveLength(2);
  });
});

test("Bouton réinitialisation des champs", async () => {
  await act(async () => {
    render(<RMCRequetePage />);
  });

  const numeroRequete = screen.getByLabelText(
    "requete.numeroRequete"
  ) as HTMLInputElement;
  const typeRequete = screen.getByLabelText(
    "requete.typeRequete"
  ) as HTMLInputElement;
  const sousTypeRequete = screen.getByLabelText(
    "requete.sousTypeRequete"
  ) as HTMLInputElement;
  const statutRequete = screen.getByLabelText(
    "requete.statutRequete"
  ) as HTMLInputElement;

  await waitFor(() => {
    expect(numeroRequete).toBeDefined();
    expect(typeRequete).toBeDefined();
    expect(statutRequete).toBeDefined();
  });

  act(() => {
    fireEvent.change(numeroRequete, {
      target: {
        value: "1234ABCD"
      }
    });
    fireEvent.change(typeRequete, {
      target: {
        value: "INFORMATION"
      }
    });
    fireEvent.input(typeRequete);
    fireEvent.change(statutRequete, {
      target: {
        value: "A_TRAITER"
      }
    });
  });

  await waitFor(() => {
    act(() => {
      fireEvent.change(sousTypeRequete, {
        target: {
          value: "COMPLETION_REQUETE"
        }
      });
    });
    expect(numeroRequete.value).toBe("1234ABCD");
    expect(typeRequete.value).toBe("INFORMATION");
    expect(sousTypeRequete.value).toBe("COMPLETION_REQUETE");
    expect(statutRequete.value).toBe("A_TRAITER");
  });

  const submit = screen.getByText(/Rechercher/i);
  await act(async () => {
    fireEvent.click(submit);
  });

  const reset = screen.getByText(/Réinitialiser les critères/i);
  await act(async () => {
    fireEvent.click(reset);
  });

  await waitFor(() => {
    expect(numeroRequete.value).toBe("");
    expect(typeRequete.value).toBe("");
    expect(sousTypeRequete.value).toBe("");
    expect(statutRequete.value).toBe("");
  });
});
