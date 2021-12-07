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
import { FeatureFlag } from "../../../../../views/common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../../../../views/common/util/featureFlag/gestionnaireFeatureFlag";
import MenuSaisirRequete from "../../../../../views/pages/requeteDelivrance/espaceDelivrance/contenu/MenuSaisirRequete";
import {
  URL_MES_REQUETES,
  URL_MES_REQUETES_SAISIR_RDAPC,
  URL_MES_REQUETES_SAISIR_RDC,
  URL_MES_REQUETES_SAISIR_RDCSC,
  URL_MES_REQUETES_SAISIR_RDLFC,
  URL_REQUETES_SERVICE,
  URL_REQUETES_SERVICE_SAISIR_RDAPC,
  URL_REQUETES_SERVICE_SAISIR_RDC,
  URL_REQUETES_SERVICE_SAISIR_RDCSC,
  URL_REQUETES_SERVICE_SAISIR_RDLFC
} from "../../../../../views/router/ReceUrls";
import { localStorageFeatureFlagMock } from "../../../../common/util/featureFlag/gestionnaireFeatureFlag.test";

const history = createMemoryHistory();

const HookConsummerSaisirRequeteMesRequete: React.FC = () => {
  Object.defineProperty(window, "localStorage", {
    value: localStorageFeatureFlagMock
  });

  history.push(URL_MES_REQUETES);

  return (
    <Router history={history}>
      <MenuSaisirRequete indexTabPanel={0} />
    </Router>
  );
};

const HookConsummerSaisirRequeteMesRequeteDeService: React.FC = () => {
  Object.defineProperty(window, "localStorage", {
    value: localStorageFeatureFlagMock
  });

  history.push(URL_REQUETES_SERVICE);

  return (
    <Router history={history}>
      <MenuSaisirRequete indexTabPanel={1} />
    </Router>
  );
};

test("renders menu 'Saisir une requête' RDCSC dans Mes requetes de Délivrance", async () => {
  render(<HookConsummerSaisirRequeteMesRequete />);

  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS)).toBeTruthy();

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDCSC = screen.getByText(
    "Requête de Délivrance Certificat de Situation Courrier"
  );

  await waitFor(() => {
    expect(RDCSC).toBeDefined();
  });

  // Click sur RDCSC
  await act(async () => {
    fireEvent.click(RDCSC);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(URL_MES_REQUETES_SAISIR_RDCSC);
  });
});

test("renders menu 'Saisir une requête' RDAPC dans Mes requetes de Délivrance", async () => {
  render(<HookConsummerSaisirRequeteMesRequete />);

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDAPC = screen.getByText(
    "Requête de Délivrance d'attestation de Pacte Civil de Solidarité"
  );

  await waitFor(() => {
    expect(RDAPC).toBeDefined();
  });

  // Click sur RDAPC
  await act(async () => {
    fireEvent.click(RDAPC);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(URL_MES_REQUETES_SAISIR_RDAPC);
  });
});

test("renders menu 'Saisir une requête' RDC dans Mes requetes de Délivrance", async () => {
  render(<HookConsummerSaisirRequeteMesRequete />);

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDC = screen.getByText("Requête de Délivrance Extrait/Copie Courrier");

  await waitFor(() => {
    expect(RDC).toBeDefined();
  });

  // Click sur RDC
  await act(async () => {
    fireEvent.click(RDC);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(URL_MES_REQUETES_SAISIR_RDC);
  });
});

test("renders menu 'Saisir une requête' RDLFC dans Mes requetes de Délivrance", async () => {
  render(<HookConsummerSaisirRequeteMesRequete />);

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDLFC = screen.getByText(
    "Requête de Délivrance Livret de Famille Courrier"
  );

  await waitFor(() => {
    expect(RDLFC).toBeDefined();
  });

  // Click sur RDLFC
  await act(async () => {
    fireEvent.click(RDLFC);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(URL_MES_REQUETES_SAISIR_RDLFC);
  });
});

test("renders menu 'Saisir une requête' RDCSC dans Mes requetes de Service", async () => {
  render(<HookConsummerSaisirRequeteMesRequeteDeService />);

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDCSC = screen.getByText(
    "Requête de Délivrance Certificat de Situation Courrier"
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
      URL_REQUETES_SERVICE_SAISIR_RDCSC
    );
  });
});

test("renders menu 'Saisir une requête' RDAPC dans Mes requetes de Service", async () => {
  render(<HookConsummerSaisirRequeteMesRequeteDeService />);

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDAPC = screen.getByText(
    "Requête de Délivrance d'attestation de Pacte Civil de Solidarité"
  );

  await waitFor(() => {
    expect(RDAPC).toBeDefined();
  });

  // Click sur RDAPC
  await act(async () => {
    fireEvent.click(RDAPC);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(
      URL_REQUETES_SERVICE_SAISIR_RDAPC
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

  const RDC = screen.getByText("Requête de Délivrance Extrait/Copie Courrier");

  await waitFor(() => {
    expect(RDC).toBeDefined();
  });

  // Click sur RDC
  await act(async () => {
    fireEvent.click(RDC);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(URL_REQUETES_SERVICE_SAISIR_RDC);
  });
});

test("renders menu 'Saisir une requête' RDLFC dans Mes requetes de Service", async () => {
  render(<HookConsummerSaisirRequeteMesRequeteDeService />);

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDLFC = screen.getByText(
    "Requête de Délivrance Livret de Famille Courrier"
  );

  await waitFor(() => {
    expect(RDLFC).toBeDefined();
  });

  // Click sur RDLFC
  await act(async () => {
    fireEvent.click(RDLFC);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(
      URL_REQUETES_SERVICE_SAISIR_RDLFC
    );
  });
});
