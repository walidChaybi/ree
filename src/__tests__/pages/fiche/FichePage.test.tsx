import React from "react";
import { render, waitFor, act } from "@testing-library/react";
import { FichePage } from "../../../views/pages/fiche/FichePage";
import request from "superagent";
import { configEtatcivil } from "../../../mock/superagent-config/superagent-mock-etatcivil";
import { TypeFiche } from "../../../model/etatcivil/enum/TypeFiche";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const fct = jest.fn();

beforeEach(() => {
  window.addEventListener("refreshStyles", fct);
});

test("rendersFichePage render correcty", async () => {
  render(
    <FichePage
      dataFicheIdentifiant={"7566e16c-2b0e-11eb-adc1-0242ac120002"}
      dataFicheCategorie={TypeFiche.RC}
    />
  );

  await waitFor(() => {
    expect(fct).toHaveBeenCalledTimes(1);
  });
});

afterAll(() => {
  superagentMock.unset();
});
