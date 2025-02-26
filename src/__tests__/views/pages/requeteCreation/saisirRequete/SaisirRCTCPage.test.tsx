import { mappingOfficier } from "@model/agent/IOfficier";

import { mapHabilitationsUtilisateur } from "@model/agent/IUtilisateur";
import { ApercuReqCreationTranscriptionPriseEnChargePage } from "@pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionPriseEnChargePage";
import { URL_MES_REQUETES_CREATION_SAISIR_RCTC, URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import IHabilitationDto from "../../../../../dto/etatcivil/agent/IHabilitationDto";
import { SaisirRCTCPage } from "../../../../../pages/requetesConsulaire/contenu/SaisirRCTCPage";
import { expectEstBoutonDisabled } from "../../../../__tests__utils__/expectUtils";
import { createTestingRouter, elementAvecContexte, renseigneChampsRecherche } from "../../../../__tests__utils__/testsUtil";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic,
  userDroitCreerActeTranscritPerimetreTousRegistres
} from "../../../../mock/data/mockConnectedUserAvecDroit";
import { serviceEtablissement } from "../../../../mock/data/serviceEtablissement";

const utilisateurConnecte = mappingOfficier(resultatHeaderUtilistateurLeBiannic, resultatRequeteUtilistateurLeBiannic.data);
utilisateurConnecte.habilitations = mapHabilitationsUtilisateur(
  resultatRequeteUtilistateurLeBiannic.data.habilitations as unknown as IHabilitationDto[]
);

async function afficheSaisirRCTCForm() {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION_SAISIR_RCTC,
        element: <SaisirRCTCPage />
      }
    ],
    [URL_MES_REQUETES_CREATION_SAISIR_RCTC]
  );

  render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte));
}

const getInput = (label: string): HTMLInputElement => screen.getByLabelText(label) as HTMLInputElement;

test("DOIT ajouter un parent QUAND on clique sur le bouton 'Ajouter un parent'", () => {
  afficheSaisirRCTCForm();

  waitFor(() => {
    expect(screen.queryByText("Parent 2")).toBeNull();
  });

  fireEvent.click(screen.getByText("Ajouter un parent"));

  waitFor(() => {
    expect(screen.getByText("Retirer un parent")).toBeDefined();
    expect(screen.getByText("Parent 2")).toBeDefined();
  });
});

test("DOIT retirer un parent QUAND on clique sur le bouton 'Retirer un parent'", () => {
  afficheSaisirRCTCForm();

  fireEvent.click(screen.getByText("Ajouter un parent"));
  fireEvent.click(screen.getByText("Retirer un parent"));

  waitFor(() => {
    expect(screen.queryByText("Parent 2")).toBeNull();
  });
});

test.skip("DOIT afficher la popin de transfert vers les services fils (triés) du département Etablissement QUAND l'utilisateur clique sur le bouton de transmission", () => {
  const router = createTestingRouter(
    [
      {
        path: "/page1",
        element: <div>Page1</div>
      },
      {
        path: URL_MES_REQUETES_CREATION_SAISIR_RCTC,
        element: <SaisirRCTCPage />
      }
    ],
    ["/page1", URL_MES_REQUETES_CREATION_SAISIR_RCTC]
  );

  render(elementAvecContexte(elementAvecContexte(<RouterProvider router={router} />, userDroitCreerActeTranscritPerimetreTousRegistres)));

  /////////////////////////Saisie des données///////////////////////////////
  // Nature acte et lien requérant
  fireEvent.change(screen.getByTestId("requete.natureActe"), {
    target: { value: "NAISSANCE_MINEUR" }
  });
  fireEvent.change(screen.getByTestId("requete.lienRequerant"), {
    target: { value: "PERE_MERE" }
  });

  // Saisie de "TUNIS" pour le registre (pocopa)
  renseigneChampsRecherche(screen, "requete.registre", "TUNIS");

  // Titulaire
  fireEvent.change(getInput("titulaire.noms.nomActeEtranger"), {
    target: { value: "Nom acte etranger" }
  });
  fireEvent.change(getInput("titulaire.noms.nomSouhaiteActeFR"), {
    target: { value: "Nom souhaite acte FR" }
  });
  fireEvent.change(getInput("titulaire.prenoms.prenom1"), {
    target: { value: "Prenom Un" }
  });

  // Parent 1
  fireEvent.click(getInput("parents.parent1.pasdenomconnu.pasdenomconnu"));
  fireEvent.click(getInput("parents.parent1.pasdeprenomconnu.pasdeprenomconnu"));

  const boutonTransmettre = screen.queryByText("Transmettre au service compétent");

  waitFor(() => {
    expect(boutonTransmettre).toBeDefined();
    expect(screen.queryByText("Choisissez un service")).not.toBeDefined();
  });

  fireEvent.click(boutonTransmettre!);

  waitFor(() => {
    expect(screen.queryByText("Choisissez un service")).toBeDefined();
  });

  const selectElement = screen.getByLabelText("Choix des services") as HTMLSelectElement;

  waitFor(() => {
    expect(screen.queryByText("BTE Genève")).toBeDefined();
  });

  const options: HTMLOptionsCollection = selectElement.options;
  const serviceEtablissementTriees = serviceEtablissement.data.sort((service1: any, service2: any) =>
    service1.libelleService.localeCompare(service2.libelleService)
  );

  // Vérification de la liste des services
  for (let i = 0; i < options.length; i++) {
    const libelleOtion = options.item(i)?.text;
    if (i === 0) {
      // Première option vide (Placeholder)
      expect(libelleOtion).toEqual("Services");
    } else {
      expect(libelleOtion).toEqual(serviceEtablissementTriees[i - 1].libelleService);
    }
  }

  waitFor(() => {
    expectEstBoutonDisabled("Valider");
  });

  // // Choix d'un service
  fireEvent.change(selectElement, {
    target: {
      value: "6737c8a6-9d23-4fd0-97ec-1ebe3d079373"
    }
  });

  const boutonValider = screen.getByLabelText("Valider") as HTMLButtonElement;
  waitFor(() => {
    expect(boutonValider.disabled).toBeFalsy();
  });

  fireEvent.click(boutonValider);

  waitFor(() => {
    expect(router.state.location.pathname).toBe("/page1");
  });
});

test("DOIT activer le bouton 'Prendre en charge' QUAND je modifie au moins un champ du formulaire", async () => {
  await afficheSaisirRCTCForm();

  await waitFor(() => {
    expect(screen.getByText(/Prendre en charge/i)).toBeDefined();
  });

  const boutonPrendreEnCharge = screen.getByText(/Prendre en charge/i) as HTMLInputElement;

  expect(boutonPrendreEnCharge.disabled).toBe(false);

  fireEvent.change(getInput("titulaire.noms.nomActeEtranger"), {
    target: { value: "Nom acte etranger" }
  });

  await waitFor(
    () => {
      expect(boutonPrendreEnCharge.disabled).toBe(false);
    },
    {
      timeout: 3000
    }
  );
});

test.skip("DOIT rediriger vers l'apercu requête en prise en charge QUAND je clique sur le bouton 'Prendre en charge'", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION_SAISIR_RCTC,
        element: <SaisirRCTCPage />
      },
      {
        path: getUrlWithParam(URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID, "3ed9aa4e-921b-489f-b8fe-531dd703c60c"),
        element: <ApercuReqCreationTranscriptionPriseEnChargePage />
      }
    ],
    [URL_MES_REQUETES_CREATION_SAISIR_RCTC]
  );

  render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte));

  const boutonPrendreEnCharge = screen.getByText(/Prendre en charge/i);

  // Nature acte et lien requérant
  fireEvent.change(screen.getByTestId("requete.natureActe"), {
    target: { value: "NAISSANCE_MINEUR" }
  });
  fireEvent.change(screen.getByTestId("requete.lienRequerant"), {
    target: { value: "PERE_MERE" }
  });
  fireEvent.change(screen.getByLabelText("requete.registre"), {
    target: { value: "RABAT" }
  });

  const autocomplete = screen.getByTestId("autocomplete");
  const champRecherche = screen.getByLabelText("requete.registre") as HTMLInputElement;
  autocomplete.focus();

  fireEvent.change(champRecherche, {
    target: { value: "TUNIS" }
  });

  waitFor(() => {
    expect(screen.getByText("TUNIS")).toBeDefined();
  });

  fireEvent.click(screen.getByText("TUNIS"));

  // Titulaire
  fireEvent.change(getInput("titulaire.noms.nomActeEtranger"), {
    target: { value: "Nom acte etranger" }
  });
  fireEvent.change(getInput("titulaire.noms.nomSouhaiteActeFR"), {
    target: { value: "Nom souhaite acte FR" }
  });
  fireEvent.change(getInput("titulaire.prenoms.prenom1"), {
    target: { value: "Prenom Un" }
  });

  // Parent 1
  fireEvent.click(getInput("parents.parent1.pasdenomconnu.pasdenomconnu"));
  fireEvent.change(getInput("parents.parent1.prenoms.prenom1"), {
    target: { value: "Prenom Un" }
  });

  fireEvent.click(boutonPrendreEnCharge);

  waitFor(() => {
    expect(router.state.location.pathname).toBe(
      getUrlWithParam(URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID, "3ed9aa4e-921b-489f-b8fe-531dd703c60c")
    );
  });
});
