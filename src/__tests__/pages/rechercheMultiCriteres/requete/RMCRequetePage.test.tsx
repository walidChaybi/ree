import { titreForm } from "@pages/rechercheMultiCriteres/requete/RMCRequeteForm";
import { RMCRequetePage } from "@pages/rechercheMultiCriteres/requete/RMCRequetePage";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React from "react";

const globalAny: any = global;
globalAny.scroll = jest.fn();

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
  const typeRequete = screen.getByTestId("requete.typeRequete")
    .childNodes[0] as HTMLInputElement;

  const sousTypeRequete = screen.getByTestId("requete.sousTypeRequete")
    .childNodes[0] as HTMLInputElement;

  const statutRequete = screen.getByTestId("requete.statutRequete")
    .childNodes[0] as HTMLInputElement;

  const reset = screen.getByText(/Réinitialiser les critères/i);

  await waitFor(() => {
    expect(numeroRequete).toBeDefined();
    expect(typeRequete).toBeDefined();
    expect(sousTypeRequete).toBeDefined();
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
  });

  await act(async () => {
    fireEvent.change(sousTypeRequete, {
      target: {
        value: "COMPLETION_REQUETE_EN_COURS"
      }
    });
  });

  await act(async () => {
    fireEvent.change(statutRequete, {
      target: {
        value: "A_TRAITER"
      }
    });
  });  

  await waitFor(() => {
    expect(numeroRequete.value).toBe("1234ABCD");
    expect(typeRequete.value).toBe("INFORMATION");
    expect(sousTypeRequete.value).toBe("COMPLETION_REQUETE_EN_COURS");
    expect(statutRequete.value).toBe("A_TRAITER");
  });

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
