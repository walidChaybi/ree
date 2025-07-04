import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import { Courrier } from "../../../../../../composants/pages/requetesDelivrance/editionRequete/partieDocument/voletCourrier/Courrier";
import { LISTE_UTILISATEURS } from "../../../../../mock/data/ListeUtilisateurs";
import { requeteDelivranceRDC } from "../../../../../mock/data/requeteDelivrance";

test("renders courrier", async () => {
  render(
    <MockRECEContextProvider
      utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.DELIVRER).generer()}
      utilisateurs={LISTE_UTILISATEURS}
    >
      <Courrier requete={requeteDelivranceRDC} />
    </MockRECEContextProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/Numéro, type et nom de la voie/i)).toBeDefined();
    expect(screen.getByText(/Nombre d'exemplaires/i)).toBeDefined();
    expect(screen.getByText(/Valider/i)).toBeDefined();
    expect(screen.getByText(/Réinitialiser/i)).toBeDefined();
    expect(screen.getByTestId("choixCourrier.courrier")).toBeDefined();
    expect(screen.getByText<HTMLButtonElement>(/Valider/i).disabled).toBeFalsy();
  });
});

test("créer courrier", () => {
  render(
    <MockRECEContextProvider
      utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.DELIVRER).generer()}
      utilisateurs={LISTE_UTILISATEURS}
    >
      <Courrier requete={requeteDelivranceRDC} />
    </MockRECEContextProvider>
  );

  const adresseInput = screen.getByLabelText<HTMLInputElement>("Numéro, type et nom de la voie");
  fireEvent.change(adresseInput, { target: { value: "123 rue de l'exemple" } });

  const nombreExemplairesInput = screen.getByLabelText<HTMLInputElement>("Nombre d'exemplaires");
  fireEvent.change(nombreExemplairesInput, { target: { value: "2" } });

  fireEvent.click(screen.getByText("Valider"));

  waitFor(() => {
    expect(screen.queryByText("Le choix d'une option standard est obligatoire pour ce courrier")).toBeNull();
  });
});
