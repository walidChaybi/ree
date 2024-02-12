import { userDroitnonCOMEDEC } from "@mock/data/connectedUserAvecDroit";
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
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import {
  COMPLEMENT_DESCRIPTION,
  ID_TYPE_ALERTE
} from "@widget/alertes/ajouterAlerte/contenu/PopinAjouterAlertes";
import { MemoryRouter } from "react-router-dom";

const dataHistory: DataRMCAuto = {
  dataRMCAutoActe: DataRMCActeAvecResultat,
  dataTableauRMCAutoActe: DataTableauActe,
  dataRMCAutoInscription: DataRMCInscriptionAvecResultat,
  dataTableauRMCAutoInscription: DataTableauInscription
};

beforeEach(async () => {
  TypeAlerte.init();
});

test("render ApercuRequetePriseEnChargePartieDroite : RMC état civil manuelle ", async () => {
  render(
    <MemoryRouter>
      <ApercuRequetePriseEnChargePartieDroite
        detailRequete={requeteDelivrance}
        dataHistory={dataHistory}
      />
    </MemoryRouter>
  );

  const linkElement = screen.getByText("Nouvelle recherche multi-critères");
  await waitFor(() => {
    expect(linkElement).toBeInTheDocument();
  });
  fireEvent.click(linkElement);

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

  fireEvent.change(nomTitulaire, {
    target: { value: NORESULT }
  });

  await waitFor(() => {
    expect(nomTitulaire.value).toEqual(NORESULT);
    expect(boutonRechercher.disabled).toBeFalsy();
  });

  await act(async () => {
    fireEvent.click(boutonRechercher);
  });

  const resultatRMCActe = screen.getByText("Aucun acte n'a été trouvé.");
  const resultatRMCInscription = screen.getByText(
    "Aucune inscription n'a été trouvée."
  );
  await waitFor(() => {
    expect(dialog).not.toBeInTheDocument();
    expect(resultatRMCActe).toBeInTheDocument();
    expect(resultatRMCInscription).toBeInTheDocument();
  });
});

test("render ApercuRequetePriseEnChargePartieDroite : gestion des alertes acte", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;

  await act(async () => {
    render(
      <MemoryRouter>
        <ApercuRequetePriseEnChargePartieDroite
          detailRequete={requeteDelivrance}
          dataHistory={dataHistory}
        />
      </MemoryRouter>
    );
  });

  const checkboxColumns: HTMLElement[] = screen.getAllByRole("checkbox");
  const accordionAlertes: HTMLElement = screen.getByTitle(
    "Alertes et informations"
  );

  await act(async () => {
    expect(accordionAlertes).toBeDefined();
    expect(accordionAlertes.classList.contains("Mui-expanded")).toBeFalsy();

    fireEvent.click(checkboxColumns[0]);
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
  const selectTypeAlerte = screen.getByTestId(
    ID_TYPE_ALERTE
  ) as HTMLSelectElement;
  const textareaComplementDescription = screen.getByLabelText(
    COMPLEMENT_DESCRIPTION
  ) as HTMLInputElement;

  await act(async () => {
    fireEvent.change(textareaComplementDescription, {
      target: { value: "Test saisie complément description" }
    });
    fireEvent.change(selectTypeAlerte, {
      target: { value: "058a436b-330d-4c3c-83e0-d49c27390aa1" }
    });
  });

  await waitFor(() => {
    expect(textareaComplementDescription.value).toEqual(
      "Test saisie complément description"
    );
    expect(selectTypeAlerte.value).toEqual(
      "058a436b-330d-4c3c-83e0-d49c27390aa1"
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

test("render ApercuRequetePriseEnChargePartieDroite : relance RMC Auto ", async () => {
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
  await waitFor(() => {
    expect(resultatRMCActe).not.toBeInTheDocument();
    expect(resultatRMCInscription).not.toBeInTheDocument();
  });
});
