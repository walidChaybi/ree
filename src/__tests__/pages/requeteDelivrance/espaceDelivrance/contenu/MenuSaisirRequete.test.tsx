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
import { userDroitnonCOMEDEC } from "../../../../../mock/data/connectedUserAvecDroit";
import { FeatureFlag } from "../../../../../views/common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../../../../views/common/util/featureFlag/gestionnaireFeatureFlag";
import { storeRece } from "../../../../../views/common/util/storeRece";
import MenuSaisirRequete from "../../../../../views/pages/requeteDelivrance/espaceDelivrance/contenu/MenuSaisirRequete";
import {
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC,
  URL_REQUETES_DELIVRANCE_SERVICE,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC
} from "../../../../../views/router/ReceUrls";

const history = createMemoryHistory();
window.alert = jest.fn();
const HookConsummerSaisirRequeteMesRequete: React.FC = () => {
  history.push(URL_MES_REQUETES_DELIVRANCE);

  return (
    <Router history={history}>
      <MenuSaisirRequete indexTabPanel={0} />
    </Router>
  );
};

const HookConsummerSaisirRequeteMesRequeteDeService: React.FC = () => {
  history.push(URL_REQUETES_DELIVRANCE_SERVICE);

  return (
    <Router history={history}>
      <MenuSaisirRequete indexTabPanel={1} />
    </Router>
  );
};

test("renders menu 'Saisir une requête' RDCSC dans Mes requetes de Délivrance", async () => {
  render(<HookConsummerSaisirRequeteMesRequete />);

  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)
  ).toBeTruthy();

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDCSC = screen.getByText(
    "Délivrance Certificat & Attestation RC/RCA/PACS courrier"
  );

  await waitFor(() => {
    expect(RDCSC).toBeDefined();
  });

  // Click sur RDCSC
  await act(async () => {
    fireEvent.click(RDCSC);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(
      URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC
    );
  });
});

test("renders menu 'Saisir une requête' RDC dans Mes requetes de Délivrance", async () => {
  render(<HookConsummerSaisirRequeteMesRequete />);

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDC = screen.getByText("Délivrance Extrait/Copie courrier");

  await waitFor(() => {
    expect(RDC).toBeDefined();
  });

  // Click sur RDC
  await act(async () => {
    fireEvent.click(RDC);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(
      URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC
    );
  });
});

test("renders menu 'Saisir une requête' RDLFC dans Mes requetes de Délivrance", async () => {
  render(<HookConsummerSaisirRequeteMesRequete />);

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDLFC = screen.getByText("Délivrance Livret de famille courrier");

  await waitFor(() => {
    expect(RDLFC).toBeDefined();
  });

  // Click sur RDLFC
  await act(async () => {
    fireEvent.click(RDLFC);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(
      URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC
    );
  });
});

test("renders menu 'Saisir une requête' RDCSC dans Mes requetes de Service", async () => {
  render(<HookConsummerSaisirRequeteMesRequeteDeService />);
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDCSC = screen.getByText(
    "Délivrance Certificat & Attestation RC/RCA/PACS courrier"
  );

  await waitFor(() => {
    expect(RDCSC).toBeDefined();
  });

  // Click Items menu
  await act(async () => {
    fireEvent.click(RDCSC);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(
      URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC
    );
  });
});

test("renders menu 'Saisir une requête' RDC dans Mes requetes de Service", async () => {
  render(<HookConsummerSaisirRequeteMesRequeteDeService />);

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDC = screen.getByText("Délivrance Extrait/Copie courrier");

  await waitFor(() => {
    expect(RDC).toBeDefined();
  });

  // Click sur RDC
  await act(async () => {
    fireEvent.click(RDC);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(
      URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC
    );
  });
});

test("renders menu 'Saisir une requête' RDLFC dans Mes requetes de Service", async () => {
  render(<HookConsummerSaisirRequeteMesRequeteDeService />);

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDLFC = screen.getByText("Délivrance Livret de famille courrier");

  await waitFor(() => {
    expect(RDLFC).toBeDefined();
  });

  // Click sur RDLFC
  await act(async () => {
    fireEvent.click(RDLFC);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(
      URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC
    );
  });
});
