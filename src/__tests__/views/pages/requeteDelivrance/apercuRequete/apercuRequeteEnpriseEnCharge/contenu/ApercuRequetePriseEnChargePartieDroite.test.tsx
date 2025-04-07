import { TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import { ApercuRequetePriseEnChargePartieDroite } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/ApercuRequetePriseEnChargePartieDroite";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { COMPLEMENT_DESCRIPTION, ID_TYPE_ALERTE } from "@widget/alertes/ajouterAlerte/contenu/PopinAjouterAlertes";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { elementAvecContexte } from "../../../../../../__tests__utils__/testsUtil";
import { userDroitnonCOMEDEC } from "../../../../../../mock/data/mockConnectedUserAvecDroit";
import { ReponseAppelNomenclatureTypeAlerte } from "../../../../../../mock/data/nomenclatures";
import requeteDelivrance from "../../../../../../mock/data/requeteDelivrance";

describe("Test ApercuRequetePriseEnChargePartieDroite", () => {
  TypeAlerte.init(ReponseAppelNomenclatureTypeAlerte.data);

  test("render ApercuRequetePriseEnChargePartieDroite : RMC état civil manuelle ", async () => {
    render(
      <MemoryRouter>
        <ApercuRequetePriseEnChargePartieDroite detailRequete={requeteDelivrance} />
      </MemoryRouter>
    );

    const linkElement = screen.getByText("Nouvelle recherche multi-critères");
    await waitFor(() => {
      expect(linkElement).toBeDefined();
    });
    fireEvent.click(linkElement);

    const dialog = screen.getByRole("dialog");
    const nomTitulaire: HTMLInputElement = screen.getByLabelText("titulaire.nom");
    const boutonRechercher: HTMLButtonElement = screen.getByText("Rechercher");

    await waitFor(() => {
      expect(dialog).toBeDefined();
      expect(nomTitulaire).toBeDefined();
      expect(boutonRechercher).toBeDefined();
      expect(boutonRechercher.disabled).toBeTruthy();
    });

    fireEvent.change(nomTitulaire, {
      target: { value: "Test" }
    });

    await waitFor(() => {
      expect(nomTitulaire.value).toEqual("Test");
      expect(boutonRechercher.disabled).toBeFalsy();
    });

    act(() => fireEvent.click(boutonRechercher));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
      expect(screen.getAllByText("DUPE")[0]).toBeDefined();
      expect(screen.getAllByText("ROSE")[0]).toBeDefined();
      expect(screen.getAllByText("Jean-Pierre, Michel")[0]).toBeDefined();
      expect(screen.getAllByText("Tunisie")[0]).toBeDefined();
      expect(screen.getAllByText("Reconnaissance")[0]).toBeDefined();
    });
  });

  test("render ApercuRequetePriseEnChargePartieDroite : gestion des alertes acte", async () => {
    render(
      elementAvecContexte(
        <MemoryRouter>
          <ApercuRequetePriseEnChargePartieDroite detailRequete={requeteDelivrance} />
        </MemoryRouter>,
        userDroitnonCOMEDEC
      )
    );

    const checkboxColumns: HTMLElement[] = screen.getAllByRole("checkbox");
    const accordionAlertes: HTMLElement = screen.getByTitle("Alertes et informations");

    await waitFor(() => {
      expect(accordionAlertes).toBeDefined();
      expect(accordionAlertes.classList.contains("Mui-expanded")).toBeFalsy();
    });

    fireEvent.click(checkboxColumns[0]);

    await waitFor(() => {
      const elementsCoches = screen.getAllByText("1 élément(s) coché(s)");
      expect(elementsCoches).toBeDefined();

      expect(accordionAlertes.classList.contains("Mui-expanded")).toBeTruthy();

      const boutonsSupprimerAlerte = screen.getAllByTitle("Supprimer l'alerte");

      expect(boutonsSupprimerAlerte).toBeDefined();
      expect(boutonsSupprimerAlerte).toHaveLength(2);
    });

    await waitFor(() => {
      expect(screen.getByTitle("Ajouter une alerte")).toBeDefined();
    });

    fireEvent.click(screen.getByTitle("Ajouter une alerte"));

    const popinAjouterAlertes = screen.getByRole("dialog", {
      hidden: true
    });

    await waitFor(() => {
      expect(popinAjouterAlertes).toBeDefined();
    });

    const boutonValiderAjoutAlerte: HTMLButtonElement = screen.getByText("Valider");
    const selectTypeAlerte: HTMLSelectElement = screen.getByTestId(ID_TYPE_ALERTE);
    const textareaComplementDescription: HTMLInputElement = screen.getByLabelText(COMPLEMENT_DESCRIPTION);

    fireEvent.change(textareaComplementDescription, {
      target: { value: "Test saisie complément description" }
    });
    fireEvent.change(selectTypeAlerte, {
      target: { value: "058a436b-330d-4c3c-83e0-d49c27390aa1" }
    });

    await waitFor(() => {
      expect(textareaComplementDescription.value).toEqual("Test saisie complément description");
      expect(selectTypeAlerte.value).toEqual("058a436b-330d-4c3c-83e0-d49c27390aa1");
    });

    await waitFor(() => {
      expect(boutonValiderAjoutAlerte.disabled).toBeFalsy();
    });

    fireEvent.click(boutonValiderAjoutAlerte);

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", {
          hidden: true
        })
      ).toBeNull();

      const boutonsSupprimerAlerte: HTMLButtonElement[] = screen.getAllByTitle("Supprimer l'alerte");
      expect(boutonsSupprimerAlerte).toHaveLength(3);
    });

    const boutonsSupprimerAlerte: HTMLButtonElement[] = screen.getAllByTitle("Supprimer l'alerte");
    fireEvent.click(boutonsSupprimerAlerte[0]);

    const popinSupprimerAlerte = screen.getByRole("dialog", {
      hidden: true
    });

    await waitFor(() => {
      expect(popinSupprimerAlerte).toBeDefined();
      expect(popinSupprimerAlerte.textContent).toContain("Etes-vous sûr de vouloir supprimer cette alerte ?");
    });

    const boutonValiderSuppressionAlerte: HTMLButtonElement = screen.getByText("Valider");

    fireEvent.click(boutonValiderSuppressionAlerte);

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", {
          hidden: true
        })
      ).toBeNull();

      const boutonsSupprimerAlerte: HTMLButtonElement[] = screen.getAllByTitle("Supprimer l'alerte");
      expect(boutonsSupprimerAlerte).toHaveLength(2);
    });
  });

  test("render ApercuRequetePriseEnChargePartieDroite : relance RMC Auto ", async () => {
    render(
      <MemoryRouter>
        <ApercuRequetePriseEnChargePartieDroite detailRequete={requeteDelivrance} />
      </MemoryRouter>
    );

    const resultatRMCActe = screen.queryByText("Aucun acte n'a été trouvé.");
    const resultatRMCInscription = screen.queryByText("Aucune inscription n'a été trouvée.");
    await waitFor(() => {
      expect(resultatRMCActe).toBeNull();
      expect(resultatRMCInscription).toBeNull();
    });
  });
});
