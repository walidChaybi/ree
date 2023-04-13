import { userDroitCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import { TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { BoutonAjouterAlerte } from "@widget/alertes/ajouterAlerte/BoutonAjouterAlerte";
import {
  COMPLEMENT_DESCRIPTION,
  ID_TYPE_ALERTE
} from "@widget/alertes/ajouterAlerte/contenu/PopinAjouterAlertes";
import React from "react";

beforeEach(async () => {
  storeRece.utilisateurCourant = userDroitCOMEDEC;

  TypeAlerte.init();
});

test("render BoutonAjouterAlerte avec ajout alerte possible : test ouverture / fermeture popin", async () => {
  await act(async () => {
    render(
      <BoutonAjouterAlerte
        ajouterAlerteCallBack={jest.fn()}
        idTypeRegistre="salut"
      />
    );
  });

  const boutonAjouterAlerte = screen.getByTitle(
    "Ajouter une alerte"
  ) as HTMLButtonElement;

  await waitFor(() => {
    expect(boutonAjouterAlerte).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.click(boutonAjouterAlerte);
  });

  const popinAjouterAlertes = screen.getByRole("dialog", {
    hidden: true
  });

  await waitFor(() => {
    expect(popinAjouterAlertes).toBeInTheDocument();
  });

  const boutonAnnuler = screen.getByText("Annuler") as HTMLButtonElement;

  await act(async () => {
    fireEvent.click(boutonAnnuler);
  });

  await waitFor(() => {
    expect(popinAjouterAlertes).not.toBeInTheDocument();
  });
});

test("render BoutonAjouterAlerte avec ajout alerte possible : test soumission formulaire", async () => {
  await act(async () => {
    render(
      <BoutonAjouterAlerte
        ajouterAlerteCallBack={jest.fn()}
        idTypeRegistre="salut"
      />
    );
  });

  const boutonAjouterAlerte = screen.getByTitle(
    "Ajouter une alerte"
  ) as HTMLButtonElement;

  await waitFor(() => {
    expect(boutonAjouterAlerte).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.click(boutonAjouterAlerte);
  });

  const popinAjouterAlertes = screen.getByRole("dialog", {
    hidden: true
  });

  await waitFor(() => {
    expect(popinAjouterAlertes).toBeInTheDocument();
  });

  const boutonValider = screen.getByText("Valider") as HTMLButtonElement;
  const selectTypeAlerte = screen.getByTestId(
    ID_TYPE_ALERTE
  ) as HTMLSelectElement;
  const textareaComplementDescription = screen.getByLabelText(
    COMPLEMENT_DESCRIPTION
  ) as HTMLInputElement;

  await waitFor(() => {
    expect(boutonValider).toBeDefined();
    expect(boutonValider.disabled).toBeTruthy();
    expect(selectTypeAlerte).toBeDefined();
    expect(textareaComplementDescription).toBeDefined();
  });

  await act(async () => {
    fireEvent.change(textareaComplementDescription, {
      target: { value: "Test saisie complément description" }
    });
    fireEvent.change(selectTypeAlerte, {
      target: { value: "058a436b-330d-4c3c-83e0-d49c27390aa6" }
    });
  });

  await waitFor(() => {
    expect(textareaComplementDescription.value).toEqual(
      "Test saisie complément description"
    );
    expect(selectTypeAlerte.value).toEqual(
      "058a436b-330d-4c3c-83e0-d49c27390aa6"
    );
  });

  await act(async () => {
    expect(boutonValider.disabled).toBeFalsy();
    fireEvent.click(boutonValider);
  });

  await waitFor(() => {
    expect(popinAjouterAlertes).not.toBeInTheDocument();
  });
});
