import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import { IQueryParametersPourRequetes } from "../../../api/appels/requeteApi";
import { configRequetesCreation } from "../../../mock/superagent-config/superagent-mock-requetes-creation";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "../../../views/common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { statutsRequetesCreation } from "../../../views/pages/requeteCreation/EspaceCreation/params/EspaceCreationParams";
import { RequetesServiceCreation } from "../../../views/pages/requeteCreation/EspaceCreation/RequetesServiceCreation";
import { URL_REQUETES_CREATION_SERVICE } from "../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(
  request,
  configRequetesCreation
);

const history = createMemoryHistory();

const queryParametersPourRequetes = {
  statuts: statutsRequetesCreation,
  tri: "dateCreation",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
} as IQueryParametersPourRequetes;

const HookConsummer: React.FC = () => {
  history.push(URL_REQUETES_CREATION_SERVICE);

  return (
    <Router history={history}>
      <RequetesServiceCreation
        queryParametersPourRequetes={queryParametersPourRequetes}
      />
    </Router>
  );
};

test("Attendu: les requêtes de service s'affichent correctement", async () => {
  render(<HookConsummer />);

  await waitFor(() => {
    // Attendu: les titres des colonnes sont corrects
    expect(screen.getByText("N°")).toBeDefined();
    expect(screen.getByText("Sous-type")).toBeDefined();
    expect(screen.getByText("Postulant/Titulaire")).toBeDefined();
    expect(screen.getByText("Requérant")).toBeDefined();
    expect(screen.getByText("Initialisation")).toBeDefined();
    expect(screen.getByText("Attribué à")).toBeDefined();
    expect(screen.getByText("Dernière action")).toBeDefined();
    expect(screen.getByText("Statut")).toBeDefined();

    // Attendu: les données sont présentes
    expect(screen.getByText("N7MMP8 / B-2-8GRZFCS3P")).toBeDefined();
    expect(screen.getByText("YRQFLU /")).toBeDefined();
  });
});

test("Attendu: Le tri sur les requêtes de service s'effectue correctement", async () => {
  render(<HookConsummer />);

  await waitFor(() => {
    expect(screen.getByText("Statut")).toBeDefined();
  });

  fireEvent.click(screen.getByText("Statut"));

  await waitFor(() => {
    expect(screen.getByText("Statut")).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
