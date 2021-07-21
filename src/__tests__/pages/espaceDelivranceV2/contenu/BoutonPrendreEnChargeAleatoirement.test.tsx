import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import request from "superagent";
import { ReponseAppelMesRequetes } from "../../../../mock/data/EspaceDelivrance";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";
import { BoutonPrendreEnChargeAleatoirement } from "../../../../views/pages/espaceDelivrance/v2/contenu/BoutonPrendreEnChargeAleatoirement";
import {
  URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_V2
} from "../../../../views/router/ReceUrls";
const superagentMock = require("superagent-mock")(request, [
  configRequetesV2[0],
  configEtatcivil[0]
]);

test("Attendu: BoutonPrendreEnChargeAleatoirement fonctionne correctement", async () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES_V2);
  render(
    <Router history={history}>
      <BoutonPrendreEnChargeAleatoirement />
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
        URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        ReponseAppelMesRequetes[0].id
      )
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
