import { Alertes } from "@mock/data/Alertes";
import { userDroitCOMEDEC, userDroitConsulterPerimetreTUNIS } from "@mock/data/mockConnectedUserAvecDroit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ListeAlertes } from "@widget/alertes/listeAlertes/ListeAlertes";
import { expect, test, vi } from "vitest";
import { elementAvecContexte } from "../../../../../__tests__utils__/testsUtil";

test("render ListeAlertes avec droit suppression alerte : test ouverture / fermeture popin", async () => {
  render(
    elementAvecContexte(
      <ListeAlertes
        idTypeRegistre="salut"
        alertes={Alertes}
        displayReference={false}
        supprimerAlerteCallBack={vi.fn()}
      />,
      userDroitCOMEDEC
    )
  );

  const boutonsSupprimerAlerte: HTMLButtonElement[] = screen.getAllByTitle("Supprimer l'alerte");

  await waitFor(() => {
    expect(boutonsSupprimerAlerte).toHaveLength(2);
  });

  fireEvent.click(screen.getAllByTitle("Supprimer l'alerte")[0]);

  const popinSupprimerAlerte = screen.getByRole("dialog", {
    hidden: true
  });

  await waitFor(() => {
    expect(popinSupprimerAlerte).toBeDefined();
    expect(popinSupprimerAlerte.textContent).toContain("Etes-vous sûr de vouloir supprimer cette alerte ?");
  });

  fireEvent.click(screen.getByText("Annuler"));

  // TOFIX comportement non respecté
  // await waitFor(() => {
  //   expect(popinSupprimerAlerte).not.toBeDefined();
  // });
});

test("render ListeAlertes avec droit suppression alerte : test soumission formulaire", async () => {
  render(
    elementAvecContexte(
      <ListeAlertes
        idTypeRegistre="salut"
        alertes={Alertes}
        displayReference={false}
        supprimerAlerteCallBack={vi.fn()}
      />,
      userDroitCOMEDEC
    )
  );

  await waitFor(() => {
    expect(screen.getAllByTitle("Supprimer l'alerte")).toHaveLength(2);
  });

  fireEvent.click(screen.getAllByTitle("Supprimer l'alerte")[0]);

  const popinSupprimerAlerte = screen.getByRole("dialog", {
    hidden: true
  });

  await waitFor(() => {
    expect(popinSupprimerAlerte).toBeDefined();
    expect(popinSupprimerAlerte.textContent).toContain("Etes-vous sûr de vouloir supprimer cette alerte ?");
  });

  fireEvent.click(screen.getByText("Valider"));

  // TOFIX comportement non respecté
  // await waitFor(() => {
  //   expect(popinSupprimerAlerte).not.toBeDefined();
  // });
});

test("render ListeAlertes sans droit suppression alerte", async () => {
  render(
    elementAvecContexte(
      <ListeAlertes
        idTypeRegistre="salut"
        alertes={Alertes}
        displayReference={false}
        supprimerAlerteCallBack={vi.fn()}
      />,
      userDroitConsulterPerimetreTUNIS
    )
  );

  await waitFor(() => {
    expect(screen.getAllByTitle("Supprimer l'alerte")).toHaveLength(2);
  });

  fireEvent.click(screen.getAllByTitle("Supprimer l'alerte")[1]);

  const popinConfirmation = screen.getByRole("dialog", {
    hidden: true
  });

  await waitFor(() => {
    expect(popinConfirmation).toBeDefined();
    expect(popinConfirmation.textContent).toContain("Vous n'avez pas les droits pour supprimer une alerte.");
  });

  fireEvent.click(screen.getByText("OK"));

  // TOFIX comportement non respecté
  // await waitFor(() => {
  //   expect(popinConfirmation).not.toBeDefined();
  // });
});
