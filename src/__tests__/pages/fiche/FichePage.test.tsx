import { render, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configEtatcivil } from "../../../mock/superagent-config/superagent-mock-etatcivil";
import { TypeAlerte } from "../../../model/etatcivil/enum/TypeAlerte";
import { TypeFiche } from "../../../model/etatcivil/enum/TypeFiche";
import { FichePage } from "../../../views/pages/fiche/FichePage";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const fct = jest.fn();

beforeEach(() => {
  window.addEventListener("refreshStyles", fct);
});

test("rendersFichePage render RC correcty", async () => {
  render(
    <FichePage
      index={0}
      dataFicheIdentifiant={"7566e16c-2b0e-11eb-adc1-0242ac120002"}
      dataFicheCategorie={TypeFiche.RC}
    />
  );

  await waitFor(() => {
    expect(fct).toHaveBeenCalledTimes(1);
  });
});

test("rendersFichePage render ACTE correcty", async () => {
  await TypeAlerte.init();
  render(
    <FichePage
      index={0}
      dataFicheIdentifiant={"2748bb45-22cd-41ea-90db-0483b8ffc8a9"}
      dataFicheCategorie={TypeFiche.ACTE}
    />
  );

  await waitFor(() => {
    expect(fct).toHaveBeenCalledTimes(1);
  });
});

afterAll(() => {
  superagentMock.unset();
});
