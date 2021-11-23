import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import request from "superagent";
import { URL_MES_REQUETES_INFORMATION } from "../../../api/appels/requeteApi";
import { ReponseAppelMesRequetes } from "../../../mock/data/EspaceDelivrance";
import { configEtatcivil } from "../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetesV2 } from "../../../mock/superagent-config/superagent-mock-requetes-v2";
import { getUrlWithParam } from "../../../views/common/util/route/routeUtil";
import BoutonPrendreEnChargeAleatoirementRequeteInformation from "../../../views/pages/requeteInformation/espaceInformation/BoutonPrendreEnChargeAleatoirementRequeteInformation";
import { URL_MES_REQUETES_INFORMATION_APERCU_ID } from "../../../views/router/ReceUrls";
const superagentMock = require("superagent-mock")(request, [
  configRequetesV2[0],
  configEtatcivil[0]
]);

test("Attendu: BoutonPrendreEnChargeAleatoirement fonctionne correctement dans l'espace Information", async () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES_INFORMATION);
  render(
    <Router history={history}>
      <BoutonPrendreEnChargeAleatoirementRequeteInformation />
    </Router>
  );

  const bouttonPrendreEnCharge = screen.getByText(
    /Prendre en charge/i
  ) as HTMLButtonElement;

  await act(async () => {
    fireEvent.click(bouttonPrendreEnCharge);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      getUrlWithParam(
        URL_MES_REQUETES_INFORMATION_APERCU_ID,
        ReponseAppelMesRequetes[2].id
      )
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
