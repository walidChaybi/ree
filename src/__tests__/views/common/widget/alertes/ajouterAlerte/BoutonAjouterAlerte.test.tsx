import { userDroitCOMEDEC } from "@mock/data/mockConnectedUserAvecDroit";
import { TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BoutonAjouterAlerte } from "@widget/alertes/ajouterAlerte/BoutonAjouterAlerte";
import { COMPLEMENT_DESCRIPTION, ID_TYPE_ALERTE } from "@widget/alertes/ajouterAlerte/contenu/PopinAjouterAlertes";
import { beforeEach, expect, test, vi } from "vitest";
import { elementAvecContexte } from "../../../../../__tests__utils__/testsUtil";

beforeEach(() => {
  TypeAlerte.init();
});

test("render BoutonAjouterAlerte avec ajout alerte possible : test ouverture / fermeture popin", async () => {
  render(
    elementAvecContexte(
      <BoutonAjouterAlerte
        ajouterAlerteCallBack={vi.fn()}
        idTypeRegistre="salut"
      />,
      userDroitCOMEDEC
    )
  );

  expect(screen.getByTitle("Ajouter une alerte")).toBeDefined();

  fireEvent.click(screen.getByTitle("Ajouter une alerte"));

  await waitFor(() => {
    expect(
      screen.getByRole("dialog", {
        hidden: true
      })
    ).toBeDefined();
  });

  fireEvent.click(screen.getByText("Annuler"));

  // TOFIX comportement attendu non testable
  // await waitFor(() => {
  //   expect(screen.getByTitle("Ajouter une alerte")).not.toBeDefined();
  // });
});

test("render BoutonAjouterAlerte avec ajout alerte possible : test soumission formulaire", async () => {
  render(
    elementAvecContexte(
      <BoutonAjouterAlerte
        ajouterAlerteCallBack={vi.fn()}
        idTypeRegistre="salut"
      />,
      userDroitCOMEDEC
    )
  );

  expect(screen.getByTitle("Ajouter une alerte")).toBeDefined();

  fireEvent.click(screen.getByTitle("Ajouter une alerte"));

  await waitFor(() => {
    expect(
      screen.getByRole("dialog", {
        hidden: true
      })
    ).toBeDefined();
  });

  const boutonValider: HTMLButtonElement = screen.getByText("Valider");
  const selectTypeAlerte: HTMLSelectElement = screen.getByTestId(ID_TYPE_ALERTE);
  const textareaComplementDescription: HTMLInputElement = screen.getByLabelText(COMPLEMENT_DESCRIPTION);

  expect(boutonValider).toBeDefined();
  expect(boutonValider.disabled).toBeTruthy();
  expect(selectTypeAlerte).toBeDefined();
  expect(textareaComplementDescription).toBeDefined();

  fireEvent.change(textareaComplementDescription, {
    target: { value: "Test saisie complément description" }
  });
  fireEvent.change(selectTypeAlerte, {
    target: { value: "058a436b-330d-4c3c-83e0-d49c27390aa6" }
  });

  expect(textareaComplementDescription.value).toEqual("Test saisie complément description");
  expect(selectTypeAlerte.value).toEqual("058a436b-330d-4c3c-83e0-d49c27390aa6");
  expect(boutonValider.disabled).toBeFalsy();

  fireEvent.click(boutonValider);

  // TOFIX comportement attendu non testable
  // await waitFor(() => {
  //   expect(
  //     screen.getByRole("dialog", {
  //       hidden: true
  //     })
  //   ).not.toBeDefined();
  // });
});
