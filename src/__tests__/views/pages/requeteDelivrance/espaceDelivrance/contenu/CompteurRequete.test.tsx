import { CompteurRequete } from "@pages/requeteDelivrance/espaceDelivrance/contenu/CompteurRequete";
import { render, screen, waitFor } from "@testing-library/react";

test("render composant compteur requete", async () => {
  render(<CompteurRequete reloadCompteur={true} />);

  await waitFor(() => {
    expect(screen.getByText(/Total de requêtes à signer/i)).toBeDefined();
  });
});


