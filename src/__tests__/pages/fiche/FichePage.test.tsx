import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import request from "superagent";
import { userDroitConsulterPerimetreTUNIS } from "../../../mock/data/connectedUserAvecDroit";
import { idFicheActe1 } from "../../../mock/data/ficheActe";
import { configEtatcivil } from "../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";
import { TypeAlerte } from "../../../model/etatcivil/enum/TypeAlerte";
import { TypeFiche } from "../../../model/etatcivil/enum/TypeFiche";
import { FeatureFlag } from "../../../views/common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../../views/common/util/featureFlag/gestionnaireFeatureFlag";
import { storeRece } from "../../../views/common/util/storeRece";
import { FichePage } from "../../../views/pages/fiche/FichePage";

const superagentMock = require("superagent-mock")(request, [
  configEtatcivil[0],
  configRequetes[0]
]);

const fct = jest.fn();

beforeAll(() => {
  window.addEventListener("refreshStyles", fct);
});

beforeEach(() => {
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)
  ).toBeTruthy();
});

test("rendersFichePage render RC correcty", async () => {
  render(
    <FichePage
      index={{ value: 0 }}
      dataFicheIdentifiant={"7566e16c-2b0e-11eb-adc1-0242ac120002"}
      nbLignesTotales={1}
      nbLignesParAppel={1}
      datasFiches={[
        {
          identifiant: "7566e16c-2b0e-11eb-adc1-0242ac120002",
          categorie: TypeFiche.RC
        }
      ]}
    />
  );

  await waitFor(() => {
    expect(fct).toHaveBeenCalledTimes(1);
  });
});

test("rendersFichePage render ACTE correcty", async () => {
  await TypeAlerte.init();
  render(
    <FichePage
      index={{ value: 0 }}
      dataFicheIdentifiant={"2748bb45-22cd-41ea-90db-0483b8ffc8a9"}
      nbLignesTotales={1}
      nbLignesParAppel={1}
      datasFiches={[
        {
          identifiant: "7566e16c-2b0e-11eb-adc1-0242ac120002",
          categorie: TypeFiche.RC
        }
      ]}
    />
  );

  await waitFor(() => {
    expect(fct).toHaveBeenCalledTimes(1);
  });
});

test("Attendu: le bouton 'demander la délivrance' est affiché et au clique effectue le traitement demandé'", async () => {
  await act(async () => {
    render(
      <FichePage
        index={{ value: 0 }}
        dataFicheIdentifiant={idFicheActe1}
        nbLignesTotales={1}
        nbLignesParAppel={1}
        datasFiches={[
          {
            identifiant: idFicheActe1,
            categorie: TypeFiche.ACTE
          }
        ]}
      />
    );
  });

  //screen.debug();

  const boutonDemanderDelivrance = screen.getByLabelText(
    "Demander la délivrance"
  ) as HTMLButtonElement;

  await act(async () => {
    fireEvent.click(boutonDemanderDelivrance);
  });

  let okButton: HTMLElement | null;
  await waitFor(() => {
    okButton = screen.getByText(/Oui/);
    expect(okButton).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.click(okButton!);
  });

  await waitFor(() => {
    okButton = screen.queryByText(/Oui/);
    expect(okButton).not.toBeInTheDocument();
  });
});

test("Attendu: le bouton 'demander la délivrance' n'est pas affiché lorsque l'utilisateur est habilité", async () => {
  storeRece.utilisateurCourant = userDroitConsulterPerimetreTUNIS;

  await act(async () => {
    render(
      <FichePage
        index={{ value: 0 }}
        dataFicheIdentifiant={idFicheActe1}
        nbLignesTotales={1}
        nbLignesParAppel={1}
        datasFiches={[
          {
            identifiant: idFicheActe1,
            categorie: TypeFiche.ACTE
          }
        ]}
      />
    );
  });

  const boutonDemanderDelivrance = screen.queryByLabelText(
    "Demander la délivrance"
  ) as HTMLButtonElement;

  await waitFor(() => {
    expect(boutonDemanderDelivrance).not.toBeInTheDocument();
  });
});

afterAll(() => {
  superagentMock.unset();
});

afterEach(() => {
  storeRece.utilisateurCourant = undefined;
});
