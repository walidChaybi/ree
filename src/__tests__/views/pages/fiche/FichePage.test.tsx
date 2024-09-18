import { mappingOfficier } from "@core/login/LoginHook";
import { idFicheActe1 } from "@mock/data/ficheActe";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic,
  userDroitConsulterPerimetreTUNIS
} from "@mock/data/mockConnectedUserAvecDroit";
import { mapHabilitationsUtilisateur } from "@model/agent/IUtilisateur";
import { TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { FichePage } from "@pages/fiche/FichePage";
import ApercuRequeteMiseAJourPage from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import { URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DEUX, UN, ZERO } from "@util/Utils";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
import { afterEach, beforeAll, beforeEach, expect, test, vi } from "vitest";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

const fct = vi.fn();

beforeAll(() => {
  window.addEventListener("refreshStyles", fct);
});

beforeEach(() => {
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES)
  ).toBeTruthy();
});

test("Le render d'une RC via fichePage se fait correctement", async () => {
  const router = createTestingRouter(
    [
      {
        path: "/",
        element: (
          <FichePage
            index={{ value: ZERO }}
            dataFicheIdentifiant={"7566e16c-2b0e-11eb-adc1-0242ac120002"}
            nbLignesTotales={UN}
            nbLignesParAppel={UN}
            datasFiches={[
              {
                identifiant: "7566e16c-2b0e-11eb-adc1-0242ac120002",
                categorie: TypeFiche.RC
              }
            ]}
          />
        )
      }
    ],
    ["/"]
  );

  render(<RouterProvider router={router} />);
  await waitFor(() => {
    expect(fct).toHaveBeenCalledTimes(UN);
  });
});

test.skip("Le render d'un ACTE via fichePage se fait correctement", async () => {
  storeRece.utilisateurCourant = mappingOfficier(
    resultatHeaderUtilistateurLeBiannic,
    resultatRequeteUtilistateurLeBiannic.data
  );

  storeRece.utilisateurCourant.habilitations = mapHabilitationsUtilisateur(
    resultatRequeteUtilistateurLeBiannic.data.habilitations
  );

  await TypeAlerte.init();
  const router = createTestingRouter(
    [
      {
        path: "/",
        element: (
          <FichePage
            index={{ value: ZERO }}
            dataFicheIdentifiant={"2748bb45-22cd-41ea-90db-0483b8ffc8a9"}
            nbLignesTotales={UN}
            nbLignesParAppel={UN}
            datasFiches={[
              {
                identifiant: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
                categorie: TypeFiche.ACTE
              }
            ]}
          />
        )
      },
      {
        path: `${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/6e89c1c1-16c4-4e40-9b72-7b567270b26f/b41079a5-9e8d-478c-b04c-c4c2ac67134f`,
        element: <ApercuRequeteMiseAJourPage />
      }
    ],
    ["/"]
  );

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    // fct est appelé une fois quand le test est lancé tt seul
    // et est appelé 2 fois lorsque les test sont successifs
    expect(fct).toHaveBeenCalledTimes(DEUX);
    expect(screen.getByText("Apposer mention(s) suite à avis")).toBeDefined();
    expect(screen.getByText("Apposer mention(s) autre")).toBeDefined();
  });

  fireEvent.click(screen.getByText("Apposer mention(s) suite à avis"));

  await waitFor(() => {
    expect(router.state.location.pathname).toBe(
      `${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/6e89c1c1-16c4-4e40-9b72-7b567270b26f/b41079a5-9e8d-478c-b04c-c4c2ac67134f`
    );
  });
});

test("Attendu: le bouton 'demander la délivrance' est affiché et au clique effectue le traitement demandé'", async () => {
  const router = createTestingRouter(
    [
      {
        path: "/",
        element: (
          <FichePage
            index={{ value: ZERO }}
            dataFicheIdentifiant={idFicheActe1}
            nbLignesTotales={UN}
            nbLignesParAppel={UN}
            datasFiches={[
              {
                identifiant: idFicheActe1,
                categorie: TypeFiche.ACTE
              }
            ]}
          />
        )
      }
    ],
    ["/"]
  );

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(screen.getByText("Demander la délivrance")).toBeDefined();
  });
  fireEvent.click(screen.getByLabelText("Demander la délivrance"));

  let okButton: HTMLElement | null;
  waitFor(() => {
    okButton = screen.getByText(/Oui/);
    expect(okButton).toBeDefined();
  });

  fireEvent.click(okButton!);

  waitFor(() => {
    okButton = screen.queryByText(/Oui/);
    expect(okButton).toBeNull();
  });
});

test("Attendu: le bouton 'demander la délivrance' n'est pas affiché lorsque l'utilisateur est habilité", () => {
  storeRece.utilisateurCourant = userDroitConsulterPerimetreTUNIS;

  const router = createTestingRouter(
    [
      {
        path: "/",
        element: (
          <FichePage
            index={{ value: ZERO }}
            dataFicheIdentifiant={idFicheActe1}
            nbLignesTotales={UN}
            nbLignesParAppel={UN}
            datasFiches={[
              {
                identifiant: idFicheActe1,
                categorie: TypeFiche.ACTE
              }
            ]}
          />
        )
      }
    ],
    ["/"]
  );

  render(<RouterProvider router={router} />);

  const boutonDemanderDelivrance = screen.queryByLabelText(
    "Demander la délivrance"
  ) as HTMLButtonElement;

  waitFor(() => {
    expect(boutonDemanderDelivrance).toBeNull();
  });
});

afterEach(() => {
  storeRece.utilisateurCourant = undefined;
});
