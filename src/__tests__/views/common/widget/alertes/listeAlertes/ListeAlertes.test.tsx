import { Alertes } from "@mock/data/Alertes";
import {
  userDroitCOMEDEC,
  userDroitConsulterPerimetreTUNIS
} from "@mock/data/connectedUserAvecDroit";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { ListeAlertes } from "@widget/alertes/listeAlertes/ListeAlertes";
import React from "react";

storeRece.utilisateurCourant = userDroitCOMEDEC;

test("render ListeAlertes avec droit suppression alerte : test ouverture / fermeture popin", async () => {
  await act(async () => {
    render(
      <ListeAlertes
        alertes={Alertes}
        displayReference={false}
        supprimerAlerteCallBack={jest.fn()}
        idTypeRegistre={"salut"}
      />
    );
  });

  const boutonsSupprimerAlerte = screen.getAllByTitle(
    "Supprimer l'alerte"
  ) as HTMLButtonElement[];

  await waitFor(() => {
    expect(boutonsSupprimerAlerte).toHaveLength(2);
  });

  await act(async () => {
    fireEvent.click(boutonsSupprimerAlerte[0]);
  });

  const popinSupprimerAlerte = screen.getByRole("dialog", {
    hidden: true
  });

  await waitFor(() => {
    expect(popinSupprimerAlerte).toBeInTheDocument();
    expect(popinSupprimerAlerte.textContent).toContain(
      "Etes-vous sur de vouloir supprimer cette alerte ?"
    );
  });

  const boutonAnnuler = screen.getByText("Annuler") as HTMLButtonElement;

  await act(async () => {
    fireEvent.click(boutonAnnuler);
  });

  await waitFor(() => {
    expect(popinSupprimerAlerte).not.toBeInTheDocument();
  });
});

test("render ListeAlertes avec droit suppression alerte : test soumission formulaire", async () => {
  await act(async () => {
    render(
      <ListeAlertes
        idTypeRegistre="salut"
        alertes={Alertes}
        displayReference={false}
        supprimerAlerteCallBack={jest.fn()}
      />
    );
  });

  const boutonsSupprimerAlerte = screen.getAllByTitle(
    "Supprimer l'alerte"
  ) as HTMLButtonElement[];

  await waitFor(() => {
    expect(boutonsSupprimerAlerte).toHaveLength(2);
  });

  await act(async () => {
    fireEvent.click(boutonsSupprimerAlerte[0]);
  });

  const popinSupprimerAlerte = screen.getByRole("dialog", {
    hidden: true
  });

  await waitFor(() => {
    expect(popinSupprimerAlerte).toBeInTheDocument();
    expect(popinSupprimerAlerte.textContent).toContain(
      "Etes-vous sur de vouloir supprimer cette alerte ?"
    );
  });

  const boutonValider = screen.getByText("Valider") as HTMLButtonElement;

  await act(async () => {
    fireEvent.click(boutonValider);
  });

  await waitFor(() => {
    expect(popinSupprimerAlerte).not.toBeInTheDocument();
  });
});

test("render ListeAlertes sans droit suppression alerte", async () => {
  storeRece.utilisateurCourant = userDroitConsulterPerimetreTUNIS;
  await act(async () => {
    render(
      <ListeAlertes
        idTypeRegistre="saluts"
        alertes={Alertes}
        displayReference={false}
        supprimerAlerteCallBack={jest.fn()}
      />
    );
  });

  const boutonsSupprimerAlerte = screen.getAllByTitle(
    "Supprimer l'alerte"
  ) as HTMLButtonElement[];

  await waitFor(() => {
    expect(boutonsSupprimerAlerte).toHaveLength(2);
  });

  await act(async () => {
    fireEvent.click(boutonsSupprimerAlerte[1]);
  });

  const popinConfirmation = screen.getByRole("dialog", {
    hidden: true
  });

  await waitFor(() => {
    expect(popinConfirmation).toBeInTheDocument();
    expect(popinConfirmation.textContent).toContain(
      "Vous n'avez pas les droits pour supprimer une alerte."
    );
  });

  const boutonOK = screen.getByText("OK") as HTMLButtonElement;

  await act(async () => {
    fireEvent.click(boutonOK);
  });

  await waitFor(() => {
    expect(popinConfirmation).not.toBeInTheDocument();
  });
});
