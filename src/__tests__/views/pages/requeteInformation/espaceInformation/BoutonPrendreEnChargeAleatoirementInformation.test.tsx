import { ReponseMesRequetesInformation } from "@mock/data/EspaceInformation";
import { BoutonPrendreEnChargeAleatoirementInformation } from "@pages/requeteInformation/espaceInformation/BoutonPrendreEnChargeAleatoirementInformation";
import {
  URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
  URL_MES_REQUETES_INFORMATION
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { createMemoryHistory } from "history";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";

test("Attendu: BoutonPrendreEnChargeAleatoirement fonctionne correctement dans l'espace Information", async () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES_INFORMATION);
  render(
    <Router history={history}>
      <BoutonPrendreEnChargeAleatoirementInformation />
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
        URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
        ReponseMesRequetesInformation[1].id
      )
    );
  });
});
