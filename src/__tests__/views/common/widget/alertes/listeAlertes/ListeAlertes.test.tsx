import { Alertes } from "@mock/data/Alertes";
import {
  userDroitCOMEDEC,
  userDroitConsulterPerimetreTUNIS
} from "@mock/data/mockConnectedUserAvecDroit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { ListeAlertes } from "@widget/alertes/listeAlertes/ListeAlertes";
import { expect, test, vi } from "vitest";

storeRece.utilisateurCourant = userDroitCOMEDEC;

test("render ListeAlertes avec droit suppression alerte : test ouverture / fermeture popin", () => {
  render(
    <ListeAlertes
      alertes={Alertes}
      displayReference={false}
      supprimerAlerteCallBack={vi.fn()}
      idTypeRegistre={"salut"}
    />
  );

  waitFor(() => {
    expect(screen.getAllByTitle("Supprimer l'alerte")).toHaveLength(2);
  });

  fireEvent.click(screen.getAllByTitle("Supprimer l'alerte")[0]);

  const popinSupprimerAlerte = screen.getByRole("dialog", {
    hidden: true
  });

  waitFor(() => {
    expect(popinSupprimerAlerte).toBeDefined();
    expect(popinSupprimerAlerte.textContent).toContain(
      "Etes-vous sur de vouloir supprimer cette alerte ?"
    );
  });

  fireEvent.click(screen.getByText("Annuler"));

  waitFor(() => {
    expect(popinSupprimerAlerte).not.toBeDefined();
  });
});

test("render ListeAlertes avec droit suppression alerte : test soumission formulaire", () => {
  render(
    <ListeAlertes
      idTypeRegistre="salut"
      alertes={Alertes}
      displayReference={false}
      supprimerAlerteCallBack={vi.fn()}
    />
  );

  waitFor(() => {
    expect(screen.getAllByTitle("Supprimer l'alerte")).toHaveLength(2);
  });

  fireEvent.click(screen.getAllByTitle("Supprimer l'alerte")[0]);

  const popinSupprimerAlerte = screen.getByRole("dialog", {
    hidden: true
  });

  waitFor(() => {
    expect(popinSupprimerAlerte).toBeDefined();
    expect(popinSupprimerAlerte.textContent).toContain(
      "Etes-vous sur de vouloir supprimer cette alerte ?"
    );
  });

  fireEvent.click(screen.getByText("Valider"));

  waitFor(() => {
    expect(popinSupprimerAlerte).not.toBeDefined();
  });
});

test("render ListeAlertes sans droit suppression alerte", () => {
  storeRece.utilisateurCourant = userDroitConsulterPerimetreTUNIS;
  render(
    <ListeAlertes
      idTypeRegistre="saluts"
      alertes={Alertes}
      displayReference={false}
      supprimerAlerteCallBack={vi.fn()}
    />
  );

  waitFor(() => {
    expect(screen.getAllByTitle("Supprimer l'alerte")).toHaveLength(2);
  });

  fireEvent.click(screen.getAllByTitle("Supprimer l'alerte")[1]);

  const popinConfirmation = screen.getByRole("dialog", {
    hidden: true
  });

  waitFor(() => {
    expect(popinConfirmation).toBeDefined();
    expect(popinConfirmation.textContent).toContain(
      "Vous n'avez pas les droits pour supprimer une alerte."
    );
  });

  fireEvent.click(screen.getByText("OK"));

  waitFor(() => {
    expect(popinConfirmation).not.toBeDefined();
  });
});
