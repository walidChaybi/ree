import MenuSaisirRequeteCreation from "@pages/requeteCreation/espaceCreation/contenu/MenuSaisirRequeteCreation";
import {
  URL_LES_REQUETE_CREATION_SERVICE,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_SAISIR_RCTC,
  URL_REQUETES_CREATION_SERVICE_SAISIR_RCTC
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

const history = createMemoryHistory();
window.alert = jest.fn();
const HookConsummerSaisirRequeteCreation: React.FC = () => {
  history.push(URL_MES_REQUETES_CREATION);

  return (
    <Router history={history}>
      <MenuSaisirRequeteCreation indexTabPanel={0} />
    </Router>
  );
};

const HookConsummerSaisirRequeteMesRequeteDeService: React.FC = () => {
  history.push(URL_LES_REQUETE_CREATION_SERVICE);

  return (
    <Router history={history}>
      <MenuSaisirRequeteCreation indexTabPanel={1} />
    </Router>
  );
};

test("DOIT rendre le menu pour saisir une requete de creation transcription", async () => {
  render(<HookConsummerSaisirRequeteCreation />);

  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)
  ).toBeTruthy();

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RCTC = screen.getByText("Création suite Transcription Courrier");

  await waitFor(() => {
    expect(RCTC).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(RCTC);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(
      URL_MES_REQUETES_CREATION_SAISIR_RCTC
    );
  });
});

test("DOIT rendre le menu pour saisir une requete de creation transcription sur Mes Requete Service", async () => {
  render(<HookConsummerSaisirRequeteMesRequeteDeService />);

  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)
  ).toBeTruthy();

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RCTC = screen.getByText("Création suite Transcription Courrier");

  await waitFor(() => {
    expect(RCTC).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(RCTC);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(
      URL_REQUETES_CREATION_SERVICE_SAISIR_RCTC
    );
  });
});
