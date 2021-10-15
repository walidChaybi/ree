import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import { userDroitnonCOMEDEC } from "../../../../../mock/data/connectedUserAvecDroit";
import requeteDelivrance from "../../../../../mock/data/requeteDelivrance";
import {
  DataRMCActeAvecResultat,
  DataTableauActe
} from "../../../../../mock/data/RMCActe";
import {
  DataRMCInscriptionAvecResultat,
  DataTableauInscription
} from "../../../../../mock/data/RMCInscription";
import {
  configEtatcivil,
  NORESULT
} from "../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { TypeAlerte } from "../../../../../model/etatcivil/enum/TypeAlerte";
import { storeRece } from "../../../../../views/common/util/storeRece";
import {
  COMPLEMENT_DESCRIPTION,
  ID_TYPE_ALERTE
} from "../../../../../views/common/widget/alertes/ajouterAlerte/contenu/PopinAjouterAlertes";
import { ApercuRequetePriseEnChargePartieDroite } from "../../../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/ApercuRequetePriseEnChargePartieDroite";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

beforeEach(async () => {
  TypeAlerte.init();
});

test("render ApercuRequetePriseEnChargePartieDroite : RMC état civil manuelle ", async () => {
  const history = createMemoryHistory();

  await act(async () => {
    render(
      <Router history={history}>
        <ApercuRequetePriseEnChargePartieDroite
          detailRequete={requeteDelivrance}
          dataRMCAutoActe={DataRMCActeAvecResultat}
          dataTableauRMCAutoActe={DataTableauActe}
          dataRMCAutoInscription={DataRMCInscriptionAvecResultat}
          dataTableauRMCAutoInscription={DataTableauInscription}
        />
      </Router>
    );
  });

  await act(async () => {
    const linkElement = screen.getByText("Nouvelle recherche multi-critères");
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
  });

  const dialog = screen.getByRole("dialog");
  const nomTitulaire = screen.getByLabelText(
    "titulaire.nom"
  ) as HTMLInputElement;
  const boutonRechercher = screen.getByText("Rechercher") as HTMLButtonElement;

  await waitFor(() => {
    expect(dialog).toBeInTheDocument();
    expect(nomTitulaire).toBeInTheDocument();
    expect(boutonRechercher).toBeInTheDocument();
    expect(boutonRechercher.disabled).toBeTruthy();
  });

  await act(async () => {
    fireEvent.change(nomTitulaire, {
      target: { value: NORESULT }
    });
  });

  await waitFor(() => {
    expect(nomTitulaire.value).toEqual(NORESULT);
  });

  await act(async () => {
    expect(boutonRechercher.disabled).toBeFalsy();
    fireEvent.click(boutonRechercher);
  });

  await waitFor(() => {
    expect(dialog).not.toBeInTheDocument();
    const resultatRMCActe = screen.getByText("Aucun acte n'a été trouvé");
    const resultatRMCInscription = screen.getByText(
      "Aucune inscription n'a été trouvée"
    );
    expect(resultatRMCActe).toBeInTheDocument();
    expect(resultatRMCInscription).toBeInTheDocument();
  });
});

test("render ApercuRequetePriseEnChargePartieDroite : gestion des alertes acte", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;

  const history = createMemoryHistory();

  await act(async () => {
    render(
      <Router history={history}>
        <ApercuRequetePriseEnChargePartieDroite
          detailRequete={requeteDelivrance}
          dataRMCAutoActe={DataRMCActeAvecResultat}
          dataTableauRMCAutoActe={DataTableauActe}
          dataRMCAutoInscription={DataRMCInscriptionAvecResultat}
          dataTableauRMCAutoInscription={DataTableauInscription}
        />
      </Router>
    );
  });

  const checkboxColumns: HTMLElement[] = screen.getAllByRole("checkbox");
  const accordionAlertes: HTMLElement = screen.getByText("Alertes");

  await act(async () => {
    expect(accordionAlertes).toBeDefined();
    expect(accordionAlertes.classList.contains("Mui-expanded")).toBeFalsy();

    fireEvent.click(checkboxColumns[0], { target: { checked: true } });
  });

  await waitFor(() => {
    const elementsCoches = screen.getAllByText("1 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();

    expect(accordionAlertes.classList.contains("Mui-expanded")).toBeTruthy();

    const boutonsSupprimerAlerte = screen.getAllByTitle(
      "Supprimer l'alerte"
    ) as HTMLButtonElement[];

    expect(boutonsSupprimerAlerte).toBeDefined();
    expect(boutonsSupprimerAlerte).toHaveLength(2);
  });

  await act(async () => {
    const boutonAjouterAlerte = screen.getByTitle(
      "Ajouter une alerte"
    ) as HTMLButtonElement;

    expect(boutonAjouterAlerte).toBeDefined();
    fireEvent.click(boutonAjouterAlerte);
  });

  const popinAjouterAlertes = screen.getByRole("dialog", {
    hidden: true
  });

  await waitFor(() => {
    expect(popinAjouterAlertes).toBeInTheDocument();
  });

  const boutonValiderAjoutAlerte = screen.getByText(
    "Valider"
  ) as HTMLButtonElement;
  const selectTypeAlerte = screen.getByLabelText(
    ID_TYPE_ALERTE
  ) as HTMLInputElement;
  const textareaComplementDescription = screen.getByLabelText(
    COMPLEMENT_DESCRIPTION
  ) as HTMLInputElement;

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
    expect(boutonValiderAjoutAlerte.disabled).toBeFalsy();
    fireEvent.click(boutonValiderAjoutAlerte);
  });

  await waitFor(() => {
    expect(popinAjouterAlertes).not.toBeInTheDocument();

    const boutonsSupprimerAlerte = screen.getAllByTitle(
      "Supprimer l'alerte"
    ) as HTMLButtonElement[];
    expect(boutonsSupprimerAlerte).toHaveLength(3);
  });

  await act(async () => {
    const boutonsSupprimerAlerte = screen.getAllByTitle(
      "Supprimer l'alerte"
    ) as HTMLButtonElement[];
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

  const boutonValiderSuppressionAlerte = screen.getByText(
    "Valider"
  ) as HTMLButtonElement;

  await act(async () => {
    fireEvent.click(boutonValiderSuppressionAlerte);
  });

  await waitFor(() => {
    expect(popinSupprimerAlerte).not.toBeInTheDocument();

    const boutonsSupprimerAlerte = screen.getAllByTitle(
      "Supprimer l'alerte"
    ) as HTMLButtonElement[];
    expect(boutonsSupprimerAlerte).toHaveLength(2);
  });
});

afterAll(() => {
  superagentMock.unset();
});
