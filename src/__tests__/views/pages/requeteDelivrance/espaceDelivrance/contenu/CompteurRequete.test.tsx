import { CompteurRequete } from "@pages/requeteDelivrance/espaceDelivrance/contenu/CompteurRequete";
import { render, screen, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";

test("render composant compteur requete", () => {
  render(<CompteurRequete reloadCompteur={true} />);

  waitFor(() => {
    expect(screen.getByText(/Total de requêtes à signer/i)).toBeDefined();
  });
});


