import { mappingOfficier } from "@core/login/LoginHook";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic,
  userDroitCreerActeTranscritPerimetreMEAE
} from "@mock/data/connectedUserAvecDroit";
import { serviceEtablissement } from "@mock/data/serviceEtablissement";
import { mapHabilitationsUtilisateur } from "@model/agent/IUtilisateur";
import { ApercuReqCreationTranscriptionPriseEnChargePage } from "@pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionPriseEnChargePage";
import { SaisirRCTCPage } from "@pages/requeteCreation/saisirRequete/SaisirRCTCPage";
import {
  URL_MES_REQUETES_CREATION_SAISIR_RCTC,
  URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
import { expectEstBoutonDisabled } from "../../../../__tests__utils__/expectUtils";
import {
  createTestingRouter,
  renseigneChampsRecherche
} from "../../../../__tests__utils__/testsUtil";

beforeAll(() => {
  storeRece.utilisateurCourant = mappingOfficier(
    resultatHeaderUtilistateurLeBiannic,
    resultatRequeteUtilistateurLeBiannic.data
  );
  storeRece.utilisateurCourant.habilitations = mapHabilitationsUtilisateur(
    resultatRequeteUtilistateurLeBiannic.data.habilitations
  );
});

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

  await act(async () => {
    render(<RouterProvider router={router} />);
  });
}

const getInput = (label: string): HTMLInputElement =>
  screen.getByLabelText(label) as HTMLInputElement;

test("DOIT ajouter un parent QUAND on clique sur le bouton 'Ajouter un parent'", async () => {
  await afficheSaisirRCTCForm();

  await waitFor(() => {
    expect(screen.queryByText("Parent 2")).not.toBeInTheDocument();
  });

  fireEvent.click(screen.getByText("Ajouter un parent"));

  await waitFor(() => {
    expect(screen.getByText("Retirer un parent")).toBeInTheDocument();
    expect(screen.getByText("Parent 2")).toBeInTheDocument();
  });
});

test("DOIT retirer un parent QUAND on clique sur le bouton 'Retirer un parent'", async () => {
  await afficheSaisirRCTCForm();

  fireEvent.click(screen.getByText("Ajouter un parent"));
  fireEvent.click(screen.getByText("Retirer un parent"));

  await waitFor(() => {
    expect(screen.queryByText("Parent 2")).not.toBeInTheDocument();
  });
});

test("DOIT afficher la popin de transfert vers les services fils (triés) du département Etablissement QUAND l'utilisateur clique sur le bouton de transmission", async () => {
  storeRece.utilisateurCourant = userDroitCreerActeTranscritPerimetreMEAE;

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

  await act(async () => {
    render(<RouterProvider router={router} />);
  });

  /////////////////////////Saisie des données///////////////////////////////
  // Nature acte et lien requérant
  fireEvent.change(screen.getByTestId("requete.natureActe"), {
    target: { value: "NAISSANCE_MINEUR" }
  });
  fireEvent.change(screen.getByTestId("requete.lienRequerant"), {
    target: { value: "PERE_MERE" }
  });

  // Saisie de "TUNIS" pour le registre (pocopa)
  await renseigneChampsRecherche(screen, "requete.registre", "TUNIS");

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
  fireEvent.click(
    getInput("parents.parent1.pasdeprenomconnu.pasdeprenomconnu")
  );

  /////////////////////////////////////////////////////////////////////////

  const boutonTransmettre = screen.queryByText(
    "Transmettre au service compétent"
  );

  await waitFor(() => {
    expect(boutonTransmettre).toBeInTheDocument();
    expect(screen.queryByText("Choisissez un service")).not.toBeInTheDocument();
  });

  fireEvent.click(boutonTransmettre!);

  await waitFor(() => {
    expect(screen.queryByText("Choisissez un service")).toBeInTheDocument();
  });

  const selectElement = screen.getByLabelText(
    "Choix des services"
  ) as HTMLSelectElement;

  await waitFor(() => {
    expect(screen.queryByText("BTE Genève")).toBeInTheDocument();
  });

  const options: HTMLOptionsCollection = selectElement.options;
  const serviceEtablissementTriees = serviceEtablissement.data.sort(
    (service1: any, service2: any) =>
      service1.libelleService.localeCompare(service2.libelleService)
  );

  // Vérification de la liste des services
  for (let i = 0; i < options.length; i++) {
    const libelleOtion = options.item(i)?.text;
    if (i === 0) {
      // Première option vide (Placeholder)
      expect(libelleOtion).toEqual("Services");
    } else {
      expect(libelleOtion).toEqual(
        serviceEtablissementTriees[i - 1].libelleService
      );
    }
  }

  await waitFor(() => {
    expectEstBoutonDisabled("Valider");
  });

  // Choix d'un service
  fireEvent.change(selectElement, {
    target: {
      value: "6737c8a6-9d23-4fd0-97ec-1ebe3d079373"
    }
  });

  const boutonValider = screen.getByLabelText("Valider") as HTMLButtonElement;
  await waitFor(() => {
    expect(boutonValider.disabled).toBeFalsy();
  });

  fireEvent.click(boutonValider);

  await waitFor(() => {
    expect(router.state.location.pathname).toBe("/page1");
  });
});

test("DOIT activer le bouton 'Prendre en charge' QUAND je modifie au moins un champ du formulaire", async () => {
  await afficheSaisirRCTCForm();

  const boutonPrendreEnCharge = screen.getByText(/Prendre en charge/i);

  await waitFor(() => {
    expect(boutonPrendreEnCharge).toBeDisabled();
  });

  await act(async () => {
    fireEvent.change(getInput("titulaire.noms.nomActeEtranger"), {
      target: { value: "Nom acte etranger" }
    });
  });

  await waitFor(() => {
    expect(boutonPrendreEnCharge).not.toBeDisabled();
  });
});

test("DOIT rediriger vers l'apercu requête en prise en charge QUAND je clique sur le bouton 'Prendre en charge'", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION_SAISIR_RCTC,
        element: <SaisirRCTCPage />
      },
      {
        path: getUrlWithParam(
          URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
          "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
        ),
        element: <ApercuReqCreationTranscriptionPriseEnChargePage />
      }
    ],
    [URL_MES_REQUETES_CREATION_SAISIR_RCTC]
  );

  await act(async () => {
    render(<RouterProvider router={router} />);
  });

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

  await renseigneChampsRecherche(screen, "requete.registre", "TUNIS");

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

  await waitFor(() => {
    expect(router.state.location.pathname).toBe(
      getUrlWithParam(
        URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
        "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
      )
    );
  });
});
