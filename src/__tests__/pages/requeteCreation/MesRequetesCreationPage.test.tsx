import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import { IQueryParametersPourRequetes } from "../../../api/appels/requeteApi";
import { configRequetesCreation } from "../../../mock/superagent-config/superagent-mock-requetes-creation";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "../../../views/common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { StatutsRequetesCreation } from "../../../views/pages/requeteCreation/EspaceCreation/EspaceCreationParams";
import { MesRequetesCreationPage } from "../../../views/pages/requeteCreation/EspaceCreation/MesRequetesCreation";
import { URL_MES_REQUETES_CREATION } from "../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(
  request,
  configRequetesCreation
);
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
    expect(screen.getByText("Sous-type")).toBeDefined();
    expect(screen.getByText("Postulant/Titulaire")).toBeDefined();
    expect(screen.getByText("Requérant")).toBeDefined();
    expect(screen.getByText("Initialisation")).toBeDefined();
    expect(screen.getByText("Dernière action")).toBeDefined();
    expect(screen.getByText("Statut")).toBeDefined();
  });

  // act(() => {
  //   fireEvent.click(screen.getByText("N°"));
  // });

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
