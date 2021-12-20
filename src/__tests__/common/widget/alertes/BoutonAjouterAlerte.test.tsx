import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { TypeAlerte } from "../../../../model/etatcivil/enum/TypeAlerte";
import { BoutonAjouterAlerte } from "../../../../views/common/widget/alertes/ajouterAlerte/BoutonAjouterAlerte";
import {
  COMPLEMENT_DESCRIPTION,
  ID_TYPE_ALERTE
} from "../../../../views/common/widget/alertes/ajouterAlerte/contenu/PopinAjouterAlertes";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

beforeEach(async () => {
  TypeAlerte.init();
});

test("render BoutonAjouterAlerte avec ajout alerte possible : test ouverture / fermeture popin", async () => {
  await act(async () => {
    render(
      <BoutonAjouterAlerte
        ajoutAlertePossible={true}
        ajouterAlerteCallBack={jest.fn()}
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
        ajoutAlertePossible={true}
        ajouterAlerteCallBack={jest.fn()}
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
  const selectTypeAlerte = screen.getByTestId(ID_TYPE_ALERTE)
    .childNodes[0] as HTMLInputElement;
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
      target: { value: "6cc42860-9421-4224-be49-2c91309199cd" }
    });
  });

  await waitFor(() => {
    expect(textareaComplementDescription.value).toEqual(
      "Test saisie complément description"
    );
    expect(selectTypeAlerte.value).toEqual(
      "6cc42860-9421-4224-be49-2c91309199cd"
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

test("render BoutonAjouterAlerte avec ajout alerte impossible", async () => {
  await act(async () => {
    render(
      <BoutonAjouterAlerte
        ajoutAlertePossible={false}
        ajouterAlerteCallBack={jest.fn()}
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

  const popinAjouterAlertes = screen.queryByRole("dialog", {
    hidden: true
  });

  await waitFor(() => {
    expect(popinAjouterAlertes).not.toBeInTheDocument();
  });
});

afterAll(() => {
  superagentMock.unset();
});
