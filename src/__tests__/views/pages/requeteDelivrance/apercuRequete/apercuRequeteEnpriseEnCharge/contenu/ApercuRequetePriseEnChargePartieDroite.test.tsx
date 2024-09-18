import { userDroitnonCOMEDEC } from "@mock/data/mockConnectedUserAvecDroit";
import requeteDelivrance from "@mock/data/requeteDelivrance";
import { DataRMCActeAvecResultat, DataTableauActe } from "@mock/data/RMCActe";
import {
  DataRMCInscriptionAvecResultat,
  DataTableauInscription
} from "@mock/data/RMCInscription";
import { NORESULT } from "@mock/superagent-config/superagent-mock-etatcivil";
import { TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import { DataRMCAuto } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/ApercuRequetePriseEnChargePage";
import { ApercuRequetePriseEnChargePartieDroite } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/ApercuRequetePriseEnChargePartieDroite";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import {
  COMPLEMENT_DESCRIPTION,
  ID_TYPE_ALERTE
} from "@widget/alertes/ajouterAlerte/contenu/PopinAjouterAlertes";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, expect, test } from "vitest";

const dataHistory: DataRMCAuto = {
  dataRMCAutoActe: DataRMCActeAvecResultat,
  dataTableauRMCAutoActe: DataTableauActe,
  dataRMCAutoInscription: DataRMCInscriptionAvecResultat,
  dataTableauRMCAutoInscription: DataTableauInscription
};

beforeEach(() => {
  TypeAlerte.init();
});

test.skip("render ApercuRequetePriseEnChargePartieDroite : RMC état civil manuelle ", () => {
  render(
    <MemoryRouter>
      <ApercuRequetePriseEnChargePartieDroite
        detailRequete={requeteDelivrance}
        dataHistory={dataHistory}
      />
    </MemoryRouter>
  );

  const linkElement = screen.getByText("Nouvelle recherche multi-critères");
  waitFor(() => {
    expect(linkElement).toBeDefined();
  });
  fireEvent.click(linkElement);

  const dialog = screen.getByRole("dialog");
  const nomTitulaire = screen.getByLabelText(
    "titulaire.nom"
  ) as HTMLInputElement;
  const boutonRechercher = screen.getByText("Rechercher") as HTMLButtonElement;

  waitFor(() => {
    expect(dialog).toBeDefined();
    expect(nomTitulaire).toBeDefined();
    expect(boutonRechercher).toBeDefined();
    expect(boutonRechercher.disabled).toBeTruthy();
  });

  fireEvent.change(nomTitulaire, {
    target: { value: NORESULT }
  });

  waitFor(() => {
    expect(nomTitulaire.value).toEqual(NORESULT);
    expect(boutonRechercher.disabled).toBeFalsy();
  });

  fireEvent.click(boutonRechercher);

  waitFor(() => {
    expect(dialog).not.toBeDefined();
    expect(screen.getByText("")).toBeDefined();
    expect(screen.getByText("DUPE")).toBeDefined();
    expect(screen.getByText("ROSE")).toBeDefined();
    expect(screen.getByText("Jean-pierre, Mick")).toBeDefined();
    expect(screen.getByText("Tunisie")).toBeDefined();
    expect(screen.getByText("Reconnaissance")).toBeDefined();
  });
});

test.skip("render ApercuRequetePriseEnChargePartieDroite : gestion des alertes acte", () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;

  render(
    <MemoryRouter>
      <ApercuRequetePriseEnChargePartieDroite
        detailRequete={requeteDelivrance}
        dataHistory={dataHistory}
      />
    </MemoryRouter>
  );

  const checkboxColumns: HTMLElement[] = screen.getAllByRole("checkbox");
  const accordionAlertes: HTMLElement = screen.getByTitle(
    "Alertes et informations"
  );

  waitFor(() => {
    expect(accordionAlertes).toBeDefined();
    expect(accordionAlertes.classList.contains("Mui-expanded")).toBeFalsy();
  });

  fireEvent.click(checkboxColumns[0]);

  waitFor(() => {
    const elementsCoches = screen.getAllByText("1 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();

    expect(accordionAlertes.classList.contains("Mui-expanded")).toBeTruthy();

    const boutonsSupprimerAlerte = screen.getAllByTitle(
      "Supprimer l'alerte"
    ) as HTMLButtonElement[];

    expect(boutonsSupprimerAlerte).toBeDefined();
    expect(boutonsSupprimerAlerte).toHaveLength(2);
  });

  waitFor(() => {
    expect(screen.getByTitle("Ajouter une alerte")).toBeDefined();
  });

  fireEvent.click(screen.getByTitle("Ajouter une alerte"));

  const popinAjouterAlertes = screen.getByRole("dialog", {
    hidden: true
  });

  waitFor(() => {
    expect(popinAjouterAlertes).toBeDefined();
  });

  const boutonValiderAjoutAlerte = screen.getByText(
    "Valider"
  ) as HTMLButtonElement;
  const selectTypeAlerte = screen.getByTestId(
    ID_TYPE_ALERTE
  ) as HTMLSelectElement;
  const textareaComplementDescription = screen.getByLabelText(
    COMPLEMENT_DESCRIPTION
  ) as HTMLInputElement;

  fireEvent.change(textareaComplementDescription, {
    target: { value: "Test saisie complément description" }
  });
  fireEvent.change(selectTypeAlerte, {
    target: { value: "058a436b-330d-4c3c-83e0-d49c27390aa1" }
  });

  waitFor(() => {
    expect(textareaComplementDescription.value).toEqual(
      "Test saisie complément description"
    );
    expect(selectTypeAlerte.value).toEqual(
      "058a436b-330d-4c3c-83e0-d49c27390aa1"
    );
  });

  waitFor(() => {
    expect(boutonValiderAjoutAlerte.disabled).toBeFalsy();
  });

  fireEvent.click(boutonValiderAjoutAlerte);

  waitFor(() => {
    expect(popinAjouterAlertes).not.toBeDefined();

    const boutonsSupprimerAlerte = screen.getAllByTitle(
      "Supprimer l'alerte"
    ) as HTMLButtonElement[];
    expect(boutonsSupprimerAlerte).toHaveLength(3);
  });

  const boutonsSupprimerAlerte = screen.getAllByTitle(
    "Supprimer l'alerte"
  ) as HTMLButtonElement[];
  fireEvent.click(boutonsSupprimerAlerte[0]);

  const popinSupprimerAlerte = screen.getByRole("dialog", {
    hidden: true
  });

  waitFor(() => {
    expect(popinSupprimerAlerte).toBeDefined();
    expect(popinSupprimerAlerte.textContent).toContain(
      "Etes-vous sur de vouloir supprimer cette alerte ?"
    );
  });

  const boutonValiderSuppressionAlerte = screen.getByText(
    "Valider"
  ) as HTMLButtonElement;

  fireEvent.click(boutonValiderSuppressionAlerte);

  waitFor(() => {
    expect(popinSupprimerAlerte).not.toBeDefined();

    const boutonsSupprimerAlerte = screen.getAllByTitle(
      "Supprimer l'alerte"
    ) as HTMLButtonElement[];
    expect(boutonsSupprimerAlerte).toHaveLength(2);
  });
});

test("render ApercuRequetePriseEnChargePartieDroite : relance RMC Auto ", () => {
  render(
    <MemoryRouter>
      <ApercuRequetePriseEnChargePartieDroite
        detailRequete={requeteDelivrance}
      />
    </MemoryRouter>
  );

  const resultatRMCActe = screen.queryByText("Aucun acte n'a été trouvé.");
  const resultatRMCInscription = screen.queryByText(
    "Aucune inscription n'a été trouvée."
  );
  waitFor(() => {
    expect(resultatRMCActe).toBeNull();
    expect(resultatRMCInscription).toBeNull();
  });
});
