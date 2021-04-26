import React from "react";
import {
  render,
  waitFor,
  act,
  screen,
  fireEvent
} from "@testing-library/react";
import MenuSaisirRequete from "../../../../views/pages/espaceDelivrance/contenu/MenuSaisirRequete";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import {
  URL_MES_REQUETES_SAISIR_RDCSC,
  URL_REQUETES_SERVICE_SAISIR_RDCSC,
  URL_MES_REQUETES_SAISIR_RDAPC,
  URL_REQUETES_SERVICE_SAISIR_RDAPC,
  URL_MES_REQUETES_SAISIR_RDC,
  URL_REQUETES_SERVICE_SAISIR_RDC,
  URL_MES_REQUETES_SAISIR_RDLFC,
  URL_REQUETES_SERVICE_SAISIR_RDLFC
} from "../../../../views/router/ReceUrls";

test("renders menu 'Saisir une requête' RDCSC dans Mes requetes de Délivrance", async () => {
  const history = createMemoryHistory();
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <MenuSaisirRequete indexTabPanel={0} />
        </Router>
      </>
    );
  });

  const boutonMenu = screen.getByText(/Saisir une requête/i);

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
  const history = createMemoryHistory();
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <MenuSaisirRequete indexTabPanel={0} />
        </Router>
      </>
    );
  });

  const boutonMenu = screen.getByText(/Saisir une requête/i);

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
  const history = createMemoryHistory();
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <MenuSaisirRequete indexTabPanel={0} />
        </Router>
      </>
    );
  });

  const boutonMenu = screen.getByText(/Saisir une requête/i);

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
  const history = createMemoryHistory();
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <MenuSaisirRequete indexTabPanel={0} />
        </Router>
      </>
    );
  });

  const boutonMenu = screen.getByText(/Saisir une requête/i);

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
  const history = createMemoryHistory();
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <MenuSaisirRequete indexTabPanel={1} />
        </Router>
      </>
    );
  });

  const boutonMenu = screen.getByText(/Saisir une requête/i);

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
  const history = createMemoryHistory();
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <MenuSaisirRequete indexTabPanel={1} />
        </Router>
      </>
    );
  });

  const boutonMenu = screen.getByText(/Saisir une requête/i);

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
  const history = createMemoryHistory();
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <MenuSaisirRequete indexTabPanel={1} />
        </Router>
      </>
    );
  });

  const boutonMenu = screen.getByText(/Saisir une requête/i);

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
  const history = createMemoryHistory();
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <MenuSaisirRequete indexTabPanel={1} />
        </Router>
      </>
    );
  });

  const boutonMenu = screen.getByText(/Saisir une requête/i);

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
