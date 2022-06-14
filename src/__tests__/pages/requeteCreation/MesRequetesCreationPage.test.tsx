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
import request from "superagent";
import { IQueryParametersPourRequetes } from "../../../api/appels/requeteApi";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "../../../views/common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { StatutsRequetesCreation } from "../../../views/pages/requeteCreation/EspaceCreation/EspaceCreationParams";
import { MesRequetesCreationPage } from "../../../views/pages/requeteCreation/EspaceCreation/MesRequetesCreation";
import { URL_MES_REQUETES_CREATION } from "../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetes);
const history = createMemoryHistory();
history.push(URL_MES_REQUETES_CREATION);

const parametresCreation = {
  statuts: StatutsRequetesCreation,
  tri: "dateCreation",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
} as IQueryParametersPourRequetes;

test("renders Page requete création with all elements", async () => {
  render(
    <Router history={history}>
      <MesRequetesCreationPage parametresCreation={parametresCreation} />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("N°")).toBeDefined();
    expect(screen.getByText("N7MMP8 / B-2-8GRZFCS3P")).toBeDefined();
    expect(screen.getByText("Sous-type")).toBeDefined();
    expect(screen.getByText("Acte Transcrit (c)")).toBeDefined();
    expect(screen.getByText("Postulant/Titulaire")).toBeDefined();
    expect(screen.getByText("TREMAYNE Albert")).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getByText("N°"));
  });

  /*act(() => {
    fireEvent.click(pageSuivante);
  });

  await waitFor(() => {
    const numero = screen.getByText("9021");
    expect(numero).toBeDefined();
  });

  act(() => {
    // Clic sur une ligne
    fireEvent.click(screen.getByText("9021"));
  });
  await waitFor(() => {
    expect(screen.getByText("9021")).toBeDefined();
  });

  act(() => {
    // Clic sur un titre de colonne
    fireEvent.click(titreNumero);
  });
  await waitFor(() => {
    expect(screen.getByText("9021")).toBeDefined();
  });*/
});

afterAll(() => {
  superagentMock.unset();
});
